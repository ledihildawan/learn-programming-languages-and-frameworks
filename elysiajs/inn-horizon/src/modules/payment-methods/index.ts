import { Elysia, t } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { withDuration } from '../../utils';
import { flattenDiff, getChangeSummary, getNestedHumanDiff } from '../../utils/human-diff';

export const paymentMethods = new Elysia({ prefix: '/payment-methods' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.paymentMethod.findMany();

      return { success: true, message: 'Payment methods data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch payment methods', error: (error as Error).message };
    }
  })
  .use(
    rateLimit({
      max: 11,
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
  .post(
    '/',
    async ({ body, ip, userAgent, request }) => {
      try {
        const {
          result: paymentMethod,
          duration_ms,
          status,
        } = await withDuration(async () => {
          const method = await db.paymentMethod.create({ data: { ...body } });
          return method;
        });

        await db.systemLog.create({
          data: {
            action: 'CREATE',
            table_name: 'payment_methods',
            user_id: process.env.USER_ID!,
            actor_role: process.env.USER_ROLE_NAME!,
            ip_address: ip.address,
            user_agent: userAgent,
            duration_ms: duration_ms,
            route: request.url,
            metadata: {
              source: 'HTTP',
            },
            new_data: paymentMethod,
            status,
            record_id: paymentMethod!.id,
            message: getChangeSummary({
              action: 'CREATE',
              table_name: 'payment_methods',
              user: {
                id: process.env.USER_ID!,
                role: process.env.USER_ROLE_NAME!,
              },
              ip_address: ip.address,
              user_agent: userAgent,
              duration_ms: duration_ms,
              route_endpoint: request.url,
              metadata: {
                source: 'HTTP',
              },
              new_data: paymentMethod,
              status,
              record_id: paymentMethod!.id,
            }),
          },
        });

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
        let existing = null;

        const {
          result: updated,
          duration_ms,
          status,
        } = await withDuration(async () => {
          existing = await db.paymentMethod.findUnique({
            where: { id: params.id },
          });

          if (!existing) {
            throw new Error('Payment method not found');
          }

          return await db.paymentMethod.update({
            where: { id: params.id },
            data: { ...body },
          });
        });

        console.log(flattenDiff(getNestedHumanDiff(existing, updated)));

        await db.systemLog.create({
          data: {
            action: 'UPDATE',
            table_name: 'payment_methods',
            user_id: process.env.USER_ID!,
            actor_role: process.env.USER_ROLE_NAME!,
            ip_address: ip.address,
            user_agent: userAgent,
            duration_ms: duration_ms,
            route: request.url,
            metadata: {
              source: 'HTTP',
            },
            new_data: updated,
            old_data: existing as any,
            status,
            changes: getNestedHumanDiff(existing, updated),
            record_id: existing!.id,
            message: getChangeSummary({
              action: 'UPDATE',
              table_name: 'payment_methods',
              user_id: process.env.USER_ID!,
              role: process.env.USER_ROLE_NAME!,
              ip_address: ip.address,
              user_agent: userAgent,
              duration_ms: duration_ms,
              route_endpoint: request.url,
              metadata: {
                source: 'HTTP',
              },
              new_data: updated,
              old_data: existing,
              status,
              record_id: existing!.id,
            }),
          },
        });

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
      const existing = await db.paymentMethod.findUnique({ where: { id: params.id } });
      if (!existing) {
        return { success: false, message: 'Payment method not found' };
      }

      const deleted = await db.paymentMethod.delete({ where: { id: params.id } });

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
