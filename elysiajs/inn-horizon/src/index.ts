import { Elysia } from 'elysia';
import { db } from './db';
import { countries } from './modules/countries';
import { languages } from './modules/languages';
import { roles } from './modules/roles';
import { users } from './modules/users';

const app = new Elysia()
  .onError(({ error }) => new Response(error.toString()))
  .group('/api', (app) =>
    app
      .use(roles)
      .use(countries)
      .use(users)
      .use(languages)
      .get('/system-logs', async () => {
        const results = await db.systemLogs.findMany();
        return results;
      })
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
