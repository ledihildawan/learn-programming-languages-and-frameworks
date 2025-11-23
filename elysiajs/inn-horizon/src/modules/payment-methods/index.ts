import { Elysia, t } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { createAuditLog } from '../../utils/system-logs';

export const paymentMethods = new Elysia({ prefix: '/payment-methods' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.paymentMethods.findMany();

      return { success: true, message: 'Payment methods data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch payment methods', error: (error as Error).message };
    }
  })
  .use(
    rateLimit({
      max: 1,
      scoping: 'scoped',
      errorResponse: new Response('rate-limited', {
        status: 429,
        headers: new Headers({
          'Content-Type': 'text/plain',
          'Custom-Header': 'custom',
        }),
      }),
    })
  )
  .onError(({ error, code }) => {
    console.log(code);

    return new Response(error.toString());
  })
  .post(
    '/',
    async ({ body, ip, userAgent, request }) => {
      try {
        const paymentMethod = await db.paymentMethods.create({ data: { ...body } });

        await createAuditLog(
          'CREATE',
          'paymentMethods',
          paymentMethod.id,
          null,
          paymentMethod,
          process.env.USER_ID!,
          process.env.USER_ROLE_NAME!,
          ip.address,
          userAgent,
          {
            route: request.url,
            source: 'HTTP',
          }
        );

        return { success: true, message: 'Payment method created successfully', data: paymentMethod };
      } catch (error) {
        return { success: false, message: 'Failed to create payment method', error: (error as Error).message };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        is_active: t.Boolean(),
      }),
    }
  )
  .guard({
    params: t.Object({
      id: t.String(),
    }),
  })
  .patch(
    '/:id',
    async ({ params, body, ip, userAgent, request }) => {
      try {
        const existing = await db.paymentMethods.findUnique({ where: { id: params.id } });
        if (!existing) {
          return { success: false, message: 'Payment method not found' };
        }

        const updated = await db.paymentMethods.update({
          where: { id: params.id },
          data: { ...body },
        });

        await createAuditLog(
          'UPDATE',
          'paymentMethods',
          updated.id,
          existing,
          updated,
          process.env.USER_ID!,
          process.env.USER_ROLE_NAME!,
          ip.address,
          userAgent,
          {
            route: request.url,
            source: 'HTTP',
          }
        );

        return { success: true, message: 'Payment method updated successfully', data: updated };
      } catch (error) {
        return { success: false, message: 'Failed to update payment method', error: (error as Error).message };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        is_active: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete('/:id', async ({ params, ip, userAgent, request }) => {
    try {
      const existing = await db.paymentMethods.findUnique({ where: { id: params.id } });
      if (!existing) {
        return { success: false, message: 'Payment method not found' };
      }

      const deleted = await db.paymentMethods.delete({ where: { id: params.id } });

      await createAuditLog(
        'DELETE',
        'paymentMethods',
        deleted.id,
        existing,
        null,
        process.env.USER_ID!,
        process.env.USER_ROLE_NAME!,
        ip.address,
        userAgent,
        {
          route: request.url,
          source: 'HTTP',
        }
      );

      return { success: true, message: 'Payment method deleted successfully', data: deleted };
    } catch (error) {
      return { success: false, message: 'Failed to delete payment method', error: (error as Error).message };
    }
  });
