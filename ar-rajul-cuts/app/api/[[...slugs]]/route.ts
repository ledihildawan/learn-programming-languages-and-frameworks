import { auth, getBetterAuthOpenAPIDocumentation } from '@/lib/auth';
import { opentelemetry } from '@elysiajs/opentelemetry';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { note } from './note';
import { user } from './user';

const betterAuthDocumentation = await getBetterAuthOpenAPIDocumentation();

export const api = new Elysia({ prefix: '/api' })
  .use(opentelemetry())
  .use(
    swagger({
      documentation: betterAuthDocumentation,
    })
  )
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
  .use(user)
  .use(note);

export type API = typeof api;

export const GET = api.handle;
export const POST = api.handle;
export const PUT = api.handle;
export const PATCH = api.handle;
export const DELETE = api.handle;
