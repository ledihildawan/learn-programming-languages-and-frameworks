import { Elysia } from 'elysia';
import { countries } from './modules/countries';
import { users } from './modules/users';

const app = new Elysia()
  .onError(({ error }) => new Response(error.toString()))
  .group('/api', (app) => app.use(countries).use(users))
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
