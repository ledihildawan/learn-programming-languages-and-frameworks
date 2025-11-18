import { Elysia } from 'elysia';

const app = new Elysia()
  .group('/api', (app) => app.get('/countries', () => 'get coutnries'))

  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
