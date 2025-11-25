import { logger } from '@grotto/logysia';
import { Elysia } from 'elysia';
import { helmet } from 'elysia-helmet';
import { db } from './db';
import { countries } from './modules/countries';
import { languages } from './modules/languages';
import { paymentMethods } from './modules/payment-methods';
import { roles } from './modules/roles';
import { users } from './modules/users';

const app = new Elysia()
  .use(helmet())
  .use(
    logger({
      logIP: false,
      writer: {
        write(msg: string) {
          console.log(msg);
        },
      },
    })
  )
  .onError(({ error, code }) => {
    console.log(code);

    return new Response(error.toString());
  })
  .group('/api', (app) =>
    app
      .use(roles)
      .use(countries)
      .use(users)
      .use(languages)
      .use(paymentMethods)
      .get('/system-logs', async () => {
        const results = await db.systemLog.findMany();
        return results;
      })
  )
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
