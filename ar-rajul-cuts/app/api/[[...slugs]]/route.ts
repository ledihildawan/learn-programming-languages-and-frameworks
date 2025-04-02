import { opentelemetry } from '@elysiajs/opentelemetry';
import { swagger } from '@elysiajs/swagger';
import { Elysia } from 'elysia';
import { note } from './note';
import { user } from './user';

export const app = new Elysia({ prefix: '/api' })
  .use(opentelemetry({}))
  .use(swagger())
  .onError(({ error, code }) => {
    if (code === 'NOT_FOUND') return 'Not Found :(';

    console.error(error);
  })
  .use(user)
  .use(note);

export type App = typeof app;

export const GET = app.handle;
export const PUT = app.handle;
export const POST = app.handle;
export const PATCH = app.handle;
export const DELETE = app.handle;
