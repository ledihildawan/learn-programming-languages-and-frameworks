import { auth, getBetterAuthOpenAPIDocumentation } from '@/lib/auth';
import { cors } from '@elysiajs/cors';
import { opentelemetry } from '@elysiajs/opentelemetry';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { WEB_URL } from './constants';
import { note } from './note';
import { store } from './store';

const betterAuthDocumentation = await getBetterAuthOpenAPIDocumentation();

export const app = new Elysia()
  .use(
    cors({
      origin: WEB_URL,
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
  .get('/status', () => {
    return {
      status: 'Server is online',
      uptime: Bun.nanoseconds() / 1e9,
      timestamp: new Date().toISOString(),
    };
  })
  .group('/api', (app) =>
    app
      .all('/auth/*', ({ request, error }) => {
        const BETTER_AUTH_ACCEPT_METHODS = ['POST', 'GET'];

        if (BETTER_AUTH_ACCEPT_METHODS.includes(request.method)) {
          return auth.handler(request);
        } else {
          error(405);
        }
      })
      .use(note)
  )
  .listen(process.env.APP_PORT!);

console.log(`🦊 Elysia is running at http://${app.server?.hostname}:${app.server?.port}`);

export type App = typeof app;
