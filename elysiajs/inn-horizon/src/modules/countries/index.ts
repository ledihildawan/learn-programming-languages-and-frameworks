import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { createAuditLog } from '../../utils/system-logs';

export const countries = new Elysia({ prefix: '/countries' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.countries.findMany();

      return { success: true, message: 'Countries data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch countries', error: (error as Error).message };
    }
  })
  .post(
    '/',
    async ({ body, ip, userAgent, request }) => {
      try {
        const country = await db.countries.create({ data: { ...body } });

        await createAuditLog(
          'CREATE',
          'countries',
          country.id,
          null,
          country,
          process.env.USER_ID!,
          process.env.USER_ROLE_NAME!,
          ip.address,
          userAgent,
          {
            route: request.url,
            source: 'HTTP',
          }
        );

        return { success: true, message: 'Country created successfully', data: country };
      } catch (error) {
        return { success: false, message: 'Failed to create country', error: (error as Error).message };
      }
    },
    {
      body: t.Object({
        name: t.String(),
        code: t.String(),
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
        const existing = await db.countries.findUnique({ where: { id: params.id } });
        if (!existing) {
          return { success: false, message: 'Country not found' };
        }

        const updated = await db.countries.update({
          where: { id: params.id },
          data: { ...body },
        });

        await createAuditLog(
          'UPDATE',
          'countries',
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

        return { success: true, message: 'Country updated successfully', data: updated };
      } catch (error) {
        return { success: false, message: 'Failed to update country', error: (error as Error).message };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        code: t.Optional(t.String()),
      }),
    }
  )
  .delete('/:id', async ({ params, ip, userAgent, request }) => {
    try {
      const existing = await db.countries.findUnique({ where: { id: params.id } });
      if (!existing) {
        return { success: false, message: 'Country not found' };
      }

      const deleted = await db.countries.delete({ where: { id: params.id } });

      await createAuditLog(
        'DELETE',
        'countries',
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

      return { success: true, message: 'Country deleted successfully', data: deleted };
    } catch (error) {
      return { success: false, message: 'Failed to delete country', error: (error as Error).message };
    }
  });
