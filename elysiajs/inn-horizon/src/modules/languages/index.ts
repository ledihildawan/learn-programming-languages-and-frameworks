import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
// import { createAuditLog } from '../../utils/system-logs';

export const languages = new Elysia({ prefix: '/languages' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.languages.findMany();

      return { success: true, message: 'Languages data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch languages', error: (error as Error).message };
    }
  })
  .post(
    '/',
    async ({ body, ip, userAgent, request }) => {
      try {
        const language = await db.languages.create({ data: { ...body } });

        // await createAuditLog(
        //   'CREATE',
        //   'languages',
        //   language.id,
        //   null,
        //   language,
        //   process.env.USER_ID!,
        //   process.env.USER_ROLE_NAME!,
        //   ip.address,
        //   userAgent,
        //   {
        //     route: request.url,
        //     source: 'HTTP',
        //   }
        // );

        return { success: true, message: 'Language created successfully', data: language };
      } catch (error) {
        return { success: false, message: 'Failed to create language', error: (error as Error).message };
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
        const existing = await db.languages.findUnique({ where: { id: params.id } });
        if (!existing) {
          return { success: false, message: 'Language not found' };
        }

        const updated = await db.languages.update({
          where: { id: params.id },
          data: { ...body },
        });

        // await createAuditLog(
        //   'UPDATE',
        //   'languages',
        //   updated.id,
        //   existing,
        //   updated,
        //   process.env.USER_ID!,
        //   process.env.USER_ROLE_NAME!,
        //   ip.address,
        //   userAgent,
        //   {
        //     route: request.url,
        //     source: 'HTTP',
        //   }
        // );

        return { success: true, message: 'Language updated successfully', data: updated };
      } catch (error) {
        return { success: false, message: 'Failed to update language', error: (error as Error).message };
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
      const existing = await db.languages.findUnique({ where: { id: params.id } });
      if (!existing) {
        return { success: false, message: 'Language not found' };
      }

      const deleted = await db.languages.delete({ where: { id: params.id } });

      // await createAuditLog(
      //   'DELETE',
      //   'languages',
      //   deleted.id,
      //   existing,
      //   null,
      //   process.env.USER_ID!,
      //   process.env.USER_ROLE_NAME!,
      //   ip.address,
      //   userAgent,
      //   {
      //     route: request.url,
      //     source: 'HTTP',
      //   }
      // );

      return { success: true, message: 'Language deleted successfully', data: deleted };
    } catch (error) {
      return { success: false, message: 'Failed to delete language', error: (error as Error).message };
    }
  });
