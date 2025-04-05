import { auth, getBetterAuthOpenAPIDocumentation } from '@/lib/auth';
import { cors } from '@elysiajs/cors';
import { opentelemetry } from '@elysiajs/opentelemetry';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { note } from './note';
import { store } from './store';

const betterAuthDocumentation = await getBetterAuthOpenAPIDocumentation();

export const app = new Elysia({ prefix: '/api' })
  .use(
    cors({
      origin: 'http://localhost:32462',
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization'],
    })
  )
  .use(opentelemetry())
  .use(
    swagger({
      documentation: betterAuthDocumentation,
    })
  )
  .use(store)
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :(';

    console.error(error);
  })
  .all('/auth/*', ({ request, error }) => {
    const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET'];

    if (BETTER_AUTH_ACCEPT_METHODS.includes(request.method)) {
      return auth.handler(request);
    } else {
      error(405);
    }
  })
  .use(note)
  .ws('/ws', {
    open(ws) {
      ws.data.wsClient.add(ws);
    },
    message(ws, message) {
      Array.from(ws.data.wsClient.list).forEach((wsClient) => wsClient.send(message));
    },
    close(ws) {
      ws.data.wsClient.remove(ws);
    },
  })
  .listen(process.env.SERVER_PORT!);

export type App = typeof app;
