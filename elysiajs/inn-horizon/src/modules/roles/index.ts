import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { createAuditLog } from '../../utils/system-logs';

export const roles = new Elysia({ prefix: '/roles' })
  .use(ip)
  .derive(({ headers }) => ({ userAgent: headers['user-agent'] || '' }))
  .get('/', async () => {
    try {
      const data = await db.roles.findMany();

      return { success: true, message: 'Roles data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch roles', error: (error as Error).message };
    }
  })
  .post(
    '/',
    async ({ body, ip, userAgent }) => {
      try {
        const role = await db.roles.create({ data: { ...body } });

        await createAuditLog(
          'CREATE',
          'roles',
          role.id,
          null,
          role,
          process.env.USER_ID!,
          process.env.USER_ROLE_NAME!,
          ip.address,
          userAgent
        );

        return { success: true, message: 'Role created successfully', data: role };
      } catch (error) {
        return { success: false, message: 'Failed to create role', error: (error as Error).message };
      }
    },
    {
      body: t.Object({
        name: t.String(),
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
    async ({ params, body, ip, userAgent }) => {
      try {
        const existing = await db.roles.findUnique({ where: { id: params.id } });
        if (!existing) {
          return { success: false, message: 'Role not found' };
        }

        const updated = await db.roles.update({
          where: { id: params.id },
          data: { ...body },
        });

        await createAuditLog(
          'UPDATE',
          'roles',
          updated.id,
          existing,
          updated,
          process.env.USER_ID!,
          process.env.USER_ROLE_NAME!,
          ip.address,
          userAgent
        );

        return { success: true, message: 'Role updated successfully', data: updated };
      } catch (error) {
        return { success: false, message: 'Failed to update role', error: (error as Error).message };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String()),
        code: t.Optional(t.String()),
      }),
    }
  )
  .delete('/:id', async ({ params, ip, userAgent }) => {
    try {
      const existing = await db.roles.findUnique({ where: { id: params.id } });
      if (!existing) {
        return { success: false, message: 'Role not found' };
      }

      const deleted = await db.roles.delete({ where: { id: params.id } });

      await createAuditLog(
        'DELETE',
        'roles',
        deleted.id,
        existing,
        null,
        process.env.USER_ID!,
        process.env.USER_ROLE_NAME!,
        ip.address,
        userAgent
      );

      return { success: true, message: 'Role deleted successfully', data: deleted };
    } catch (error) {
      return { success: false, message: 'Failed to delete role', error: (error as Error).message };
    }
  });
