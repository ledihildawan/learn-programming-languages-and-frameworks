import { Elysia, t } from 'elysia';
import { rateLimit } from 'elysia-rate-limit';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { withDuration } from '../../utils';
import { createAuditLog, flattenDiff, getNestedHumanDiff } from '../../utils/human-diff';

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
    async ({ body, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
      try {
        const { result: paymentMethod, duration_ms } = await withDuration(async () => {
          return await db.paymentMethod.create({ data: { ...body } });
        });

        // ========== EXTRACT METHOD & PATH ==========
        const method = 'POST';
        const pathname = request.url.pathname || '/api/payment-methods';
        const endpoint = `${method} ${pathname}`;

        // ========== CREATE AUDIT LOG ==========
        await createAuditLog({
          action: 'CREATE',
          table_name: 'payment_methods',
          record_id: paymentMethod.id,
          new_data: paymentMethod,
          ip_address: ipData?.address,
          user_agent: userAgentStr,
          endpoint: endpoint, // ← FIXED
          duration_ms,
          status: 'SUCCESS',
          options: {
            source: 'HTTP',
          },
        });

        return {
          success: true,
          message: 'Payment method created successfully',
          data: paymentMethod,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create payment method',
          error: (error as Error).message,
        };
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
    async ({ params, body, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
      try {
        let existing = null;

        const { result: updated, duration_ms } = await withDuration(async () => {
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

        // ========== COMPUTE CHANGES ==========
        const diff = getNestedHumanDiff(existing, updated);
        const changes = flattenDiff(diff);

        // ========== EXTRACT METHOD & PATH ==========
        const method = 'PATCH';
        const pathname = request.url.pathname || '/api/payment-methods/:id';
        const endpoint = `${method} ${pathname}`;

        // ========== CREATE AUDIT LOG ==========
        await createAuditLog({
          action: 'UPDATE',
          table_name: 'payment_methods',
          record_id: existing!.id,
          old_data: existing,
          new_data: updated,
          changes: changes,
          ip_address: ipData?.address,
          user_agent: userAgentStr,
          endpoint: endpoint, // ← FIXED
          duration_ms,
          status: 'SUCCESS',
          options: {
            source: 'HTTP',
          },
        });

        return {
          success: true,
          message: 'Payment method updated successfully',
          data: updated,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update payment method',
          error: (error as Error).message,
        };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        is_active: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete('/:id', async ({ params, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
    try {
      let existing = null;

      const { duration_ms } = await withDuration(async () => {
        existing = await db.paymentMethod.findUnique({
          where: { id: params.id },
        });

        if (!existing) {
          throw new Error('Payment method not found');
        }

        return await db.paymentMethod.delete({
          where: { id: params.id },
        });
      });

      // ========== EXTRACT METHOD & PATH ==========
      const method = 'DELETE';
      const pathname = request.url.pathname || '/api/payment-methods/:id';
      const endpoint = `${method} ${pathname}`;

      // ========== CREATE AUDIT LOG ==========
      await createAuditLog({
        action: 'DELETE',
        table_name: 'payment_methods',
        record_id: existing!.id,
        old_data: existing,
        ip_address: ipData?.address,
        user_agent: userAgentStr,
        endpoint: endpoint, // ← FIXED
        duration_ms,
        status: 'SUCCESS',
        user_id: user?.id || 'unknown',
        user_role: user?.role || 'user',
        user_name: user?.name || 'Unknown',
      });

      return {
        success: true,
        message: 'Payment method deleted successfully',
        data: existing,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete payment method',
        error: (error as Error).message,
      };
    }
  });
