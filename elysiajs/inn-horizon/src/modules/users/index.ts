import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { withDuration } from '../../utils';
import { createAuditLog, flattenDiff, getNestedHumanDiff } from '../../utils/human-diff';
import { hashPassword } from '../../utils/users';

export const users = new Elysia({ prefix: '/users' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.user.findMany({
        include: {
          role: true,
          country: true,
          userSettings: true,
        },
      });
      return { success: true, message: 'Users data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch users', error: (error as Error).message };
    }
  })
  .post(
    '/',
    async ({ body, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
      try {
        const { result: newUser, duration_ms } = await withDuration(async () => {
          const hashedPassword = await hashPassword(body.password);
          return await db.user.create({
            data: {
              username: body.username,
              email: body.email,
              password_hash: hashedPassword,
              first_name: body.first_name,
              last_name: body.last_name,
              role_id: body.role_id,
              country_id: body.country_id,
              is_active: body.is_active ?? true,
              is_verified: body.is_verified ?? false,
            },
            include: {
              role: true,
              country: true,
              userSettings: true,
            },
          });
        });

        const method = 'POST';
        const pathname = request.url.pathname || '/api/users';
        const endpoint = `${method} ${pathname}`;

        await createAuditLog({
          action: 'CREATE',
          table_name: 'users',
          record_id: newUser.id,
          new_data: newUser,
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
          message: 'User created successfully',
          data: newUser,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to create user',
          error: (error as Error).message,
        };
      }
    },
    {
      body: t.Object({
        username: t.String({ minLength: 3 }),
        email: t.String({ format: 'email' }),
        password: t.String({ minLength: 6 }),
        first_name: t.String(),
        last_name: t.String(),
        role_id: t.String(),
        country_id: t.String(),
        is_active: t.Optional(t.Boolean()),
        is_verified: t.Optional(t.Boolean()),
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
          existing = await db.user.findUnique({
            where: { id: params.id },
            include: { role: true, country: true, userSettings: true },
          });

          if (!existing) {
            throw new Error('User not found');
          }

          const updateData: any = {
            ...body,
          };

          if (body.password) {
            updateData.password_hash = await hashPassword(body.password);
            delete updateData.password;
          }

          return await db.user.update({
            where: { id: params.id },
            data: updateData,
            include: { role: true, country: true, userSettings: true },
          });
        });

        const diff = getNestedHumanDiff(existing, updated);
        const changes = flattenDiff(diff);

        const method = 'PATCH';
        const pathname = request.url.pathname || '/api/users/:id';
        const endpoint = `${method} ${pathname}`;

        await createAuditLog({
          action: 'UPDATE',
          table_name: 'users',
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
          message: 'User updated successfully',
          data: updated,
        };
      } catch (error) {
        return {
          success: false,
          message: 'Failed to update user',
          error: (error as Error).message,
        };
      }
    },
    {
      body: t.Object({
        username: t.Optional(t.String({ minLength: 3 })),
        email: t.Optional(t.String({ format: 'email' })),
        password: t.Optional(t.String({ minLength: 6 })),
        first_name: t.Optional(t.String()),
        last_name: t.Optional(t.String()),
        role_id: t.Optional(t.String()),
        country_id: t.Optional(t.String()),
        is_active: t.Optional(t.Boolean()),
        is_verified: t.Optional(t.Boolean()),
      }),
    }
  )
  .delete('/:id', async ({ params, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
    try {
      let existing = null;

      const { duration_ms } = await withDuration(async () => {
        existing = await db.user.findUnique({
          where: { id: params.id },
          include: { role: true, country: true, userSettings: true },
        });

        if (!existing) {
          throw new Error('User not found');
        }

        return await db.user.delete({
          where: { id: params.id },
        });
      });

      const method = 'DELETE';
      const pathname = request.url.pathname || '/api/users/:id';
      const endpoint = `${method} ${pathname}`;

      await createAuditLog({
        action: 'DELETE',
        table_name: 'users',
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
        message: 'User deleted successfully',
        data: existing,
      };
    } catch (error) {
      return {
        success: false,
        message: 'Failed to delete user',
        error: (error as Error).message,
      };
    }
  });
