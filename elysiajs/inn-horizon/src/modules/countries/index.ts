import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { withDuration } from '../../utils';
import { createAuditLog, flattenDiff, getNestedHumanDiff } from '../../utils/human-diff';

export const countries = new Elysia({ prefix: '/countries' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.country.findMany();
      return { success: true, message: 'Countries data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch countries', error: (error as Error).message };
    }
  })
  .post(
    '/',
    async ({ body, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
      try {
        const { result: country, duration_ms } = await withDuration(async () => {
          return await db.country.create({ data: { ...body } });
        });

        const method = 'POST';
        const pathname = request.url.pathname || '/api/countries';
        const endpoint = `${method} ${pathname}`;

        await createAuditLog({
          action: 'CREATE',
          table_name: 'countries',
          record_id: country.id,
          new_data: country,
          ip_address: ipData?.address,
          user_agent: userAgentStr,
          endpoint: endpoint,
          duration_ms,
          status: 'SUCCESS',
          options: {
            source: 'HTTP',
          },
        });

        return {
          success: true,
          message: 'Country created successfully',
          data: country,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create country',
          error: (error as Error).message,
        };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        code: t.String({ minLength: 2, maxLength: 2 }),
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
          existing = await db.country.findUnique({
            where: { id: params.id },
          });

          if (!existing) {
            throw new Error('Country not found');
          }

          return await db.country.update({
            where: { id: params.id },
            data: { ...body },
          });
        });

        const diff = getNestedHumanDiff(existing, updated);
        const changes = flattenDiff(diff);

        const method = 'PATCH';
        const pathname = request.url.pathname || '/api/countries/:id';
        const endpoint = `${method} ${pathname}`;

        await createAuditLog({
          action: 'UPDATE',
          table_name: 'countries',
          record_id: existing!.id,
          old_data: existing,
          new_data: updated,
          changes: changes,
          ip_address: ipData?.address,
          user_agent: userAgentStr,
          endpoint: endpoint,
          duration_ms,
          status: 'SUCCESS',
          options: {
            source: 'HTTP',
          },
        });

        return {
          success: true,
          message: 'Country updated successfully',
          data: updated,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update country',
          error: (error as Error).message,
        };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        code: t.Optional(t.String({ minLength: 2, maxLength: 2 })),
      }),
    }
  )
  .delete('/:id', async ({ params, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
    try {
      let existing = null;

      const { duration_ms } = await withDuration(async () => {
        existing = await db.country.findUnique({
          where: { id: params.id },
        });

        if (!existing) {
          throw new Error('Country not found');
        }

        return await db.country.delete({
          where: { id: params.id },
        });
      });

      const method = 'DELETE';
      const pathname = request.url.pathname || '/api/countries/:id';
      const endpoint = `${method} ${pathname}`;

      await createAuditLog({
        action: 'DELETE',
        table_name: 'countries',
        record_id: existing!.id,
        old_data: existing,
        ip_address: ipData?.address,
        user_agent: userAgentStr,
        endpoint: endpoint,
        duration_ms,
        status: 'SUCCESS',
        user_id: user?.id || 'unknown',
        user_role: user?.role || 'user',
        user_name: user?.name || 'Unknown',
      });

      return {
        success: true,
        message: 'Country deleted successfully',
        data: existing,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete country',
        error: (error as Error).message,
      };
    }
  });
