import { Elysia } from 'elysia';
import { paymentsRoute } from './modules/payments';
import { bookingRoute } from './modules/payments/booking';
import { webhookRoute } from './modules/payments/webhooks';

const app = new Elysia()
  // .use(helmet())
  // .use(
  //   logger({
  //     logIP: false,
  //     writer: {
  //       write(msg: string) {
  //         console.log(msg);
  //       },
  //     },
  //   })
  // )
  // .onError(({ error, code }) => {
  //   console.log(code);

  //   return new Response(error.toString());
  // })
  .get('/', () => {
    return 'https://0e4346f93439.ngrok-free.app/midtrans/webhook';
  })
  .use(bookingRoute)
  .use(paymentsRoute)
  .use(webhookRoute)
  // .group('/api', (app) =>
  //   app
  //     .use(roles)
  //     .use(countries)
  //     .use(users)
  //     .use(languages)
  //     .use(paymentMethods)
  //     .get('/system-logs', async () => {
  //       const results = await db.systemLog.findMany();
  //       return results;
  //     })
  // )
  // .onAfterResponse(({ set }) => {
  //   console.log(set.status, set.headers);
  // })
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
