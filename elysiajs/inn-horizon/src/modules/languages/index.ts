import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { withDuration } from '../../utils';
import { createAuditLog, flattenDiff, getNestedHumanDiff } from '../../utils/human-diff';

export const languages = new Elysia({ prefix: '/languages' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.language.findMany();
      return { success: true, message: 'Languages data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch languages', error: (error as Error).message };
    }
  })
  .post(
    '/',
    async ({ body, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
      try {
        const { result: language, duration_ms } = await withDuration(async () => {
          return await db.language.create({ data: { ...body } });
        });

        const method = 'POST';
        const pathname = request.url.pathname || '/api/languages';
        const endpoint = `${method} ${pathname}`;

        await createAuditLog({
          action: 'CREATE',
          table_name: 'languages',
          record_id: language.id,
          new_data: language,
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
          message: 'Language created successfully',
          data: language,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create language',
          error: (error as Error).message,
        };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        code: t.String({ minLength: 2, maxLength: 5 }),
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
          existing = await db.language.findUnique({
            where: { id: params.id },
          });

          if (!existing) {
            throw new Error('Language not found');
          }

          return await db.language.update({
            where: { id: params.id },
            data: { ...body },
          });
        });

        const diff = getNestedHumanDiff(existing, updated);
        const changes = flattenDiff(diff);

        const method = 'PATCH';
        const pathname = request.url.pathname || '/api/languages/:id';
        const endpoint = `${method} ${pathname}`;

        await createAuditLog({
          action: 'UPDATE',
          table_name: 'languages',
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
          message: 'Language updated successfully',
          data: updated,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update language',
          error: (error as Error).message,
        };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        code: t.Optional(t.String({ minLength: 2, maxLength: 5 })),
        is_active: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete('/:id', async ({ params, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
    try {
      let existing = null;

      const { duration_ms } = await withDuration(async () => {
        existing = await db.language.findUnique({
          where: { id: params.id },
        });

        if (!existing) {
          throw new Error('Language not found');
        }

        return await db.language.delete({
          where: { id: params.id },
        });
      });

      const method = 'DELETE';
      const pathname = request.url.pathname || '/api/languages/:id';
      const endpoint = `${method} ${pathname}`;

      await createAuditLog({
        action: 'DELETE',
        table_name: 'languages',
        record_id: existing!.id,
        old_data: existing,
        ip_address: ipData?.address,
        user_agent: userAgentStr,
        endpoint: endpoint,
        duration_ms,
        status: 'SUCCESS',
      });

      return {
        success: true,
        message: 'Language deleted successfully',
        data: existing,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete language',
        error: (error as Error).message,
      };
    }
  });
