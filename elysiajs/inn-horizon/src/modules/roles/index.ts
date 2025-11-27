import { Elysia, t } from 'elysia';
import { db } from '../../db';
import { ip } from '../../plugins/ip';
import { userAgent } from '../../plugins/userAgent';
import { withDuration } from '../../utils';
import { createAuditLog, flattenDiff, getNestedHumanDiff } from '../../utils/human-diff';

export const roles = new Elysia({ prefix: '/roles' })
  .use(ip)
  .use(userAgent)
  .get('/', async () => {
    try {
      const data = await db.role.findMany();
      return { success: true, message: 'Roles data fetched successfully', data };
    } catch (error) {
      return { success: false, message: 'Failed to fetch roles', error: (error as Error).message };
    }
  })
  .post(
    '/',
    async ({ body, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
      let role = null;
      try {
        // ========== VALIDATE INPUT ==========
        if (!body?.name || typeof body.name !== 'string' || body.name.trim() === '') {
          return {
            success: false,
            message: 'Invalid input: name is required and must be a non-empty string',
          };
        }

        const { result: createdRole, duration_ms } = await withDuration(async () => {
          return await db.role.create({
            data: {
              name: body.name.trim(),
            },
          });
        });

        role = createdRole;

        // ========== VALIDATE RESULT ==========
        if (!role || !role.id) {
          throw new Error('Role creation returned invalid data');
        }

        const method = 'POST';
        const pathname = request.url.pathname || '/api/roles';
        const endpoint = `${method} ${pathname}`;

        // ========== CREATE AUDIT LOG - SUCCESS ==========
        await createAuditLog({
          action: 'CREATE',
          table_name: 'roles',
          record_id: role.id,
          new_data: role,
          ip_address: ipData?.address,
          user_agent: userAgentStr,
          endpoint: endpoint,
          duration_ms,
          status: 'SUCCESS',
          options: {
            source: 'HTTP',
          },
          user_id: user?.id || 'unknown',
          user_role: user?.role || 'user',
          user_name: user?.name || 'Unknown',
        });

        return {
          success: true,
          message: 'Role created successfully',
          data: role,
        };
      } catch (error) {
        const errorMsg = (error as Error).message || 'Unknown error occurred';

        // ========== CREATE AUDIT LOG - FAILURE ==========
        if (role?.id) {
          await createAuditLog({
            action: 'CREATE',
            table_name: 'roles',
            record_id: role.id,
            new_data: role,
            ip_address: ipData?.address,
            user_agent: userAgentStr,
            endpoint: `POST ${request.url.pathname || '/api/roles'}`,
            duration_ms: 0,
            status: 'FAILURE',
            user_id: user?.id || 'unknown',
            user_role: user?.role || 'user',
            user_name: user?.name || 'Unknown',
          });
        } else {
          // ← Jika tidak ada ID, log error tanpa record_id
          await createAuditLog({
            action: 'CREATE',
            table_name: 'roles',
            record_id: 'FAILED',
            new_data: body,
            ip_address: ipData?.address,
            user_agent: userAgentStr,
            endpoint: `POST ${request.url.pathname || '/api/roles'}`,
            duration_ms: 0,
            status: 'FAILURE',
            user_id: user?.id || 'unknown',
            user_role: user?.role || 'user',
            user_name: user?.name || 'Unknown',
          }).catch((logErr) => console.error('Audit log error:', logErr));
        }

        console.error('❌ Role creation error:', errorMsg);

        return {
          success: false,
          message: 'Failed to create role',
          error: errorMsg,
        };
      }
    },
    {
      body: t.Object({
        name: t.String({ minLength: 1 }),
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
      let existing = null;
      try {
        const { result: updated, duration_ms } = await withDuration(async () => {
          existing = await db.role.findUnique({
            where: { id: params.id },
          });

          if (!existing) {
            throw new Error('Role not found');
          }

          return await db.role.update({
            where: { id: params.id },
            data: { ...body },
          });
        });

        if (!updated) {
          throw new Error('Update returned invalid data');
        }

        const diff = getNestedHumanDiff(existing, updated);
        const changes = flattenDiff(diff);

        const method = 'PATCH';
        const pathname = request.url.pathname || '/api/roles/:id';
        const endpoint = `${method} ${pathname}`;

        // ========== CREATE AUDIT LOG - SUCCESS ==========
        await createAuditLog({
          action: 'UPDATE',
          table_name: 'roles',
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
          user_id: user?.id || 'unknown',
          user_role: user?.role || 'user',
          user_name: user?.name || 'Unknown',
        });

        return {
          success: true,
          message: 'Role updated successfully',
          data: updated,
        };
      } catch (error) {
        const errorMsg = (error as Error).message || 'Unknown error occurred';

        // ========== CREATE AUDIT LOG - FAILURE ==========
        if (existing?.id) {
          await createAuditLog({
            action: 'UPDATE',
            table_name: 'roles',
            record_id: existing.id,
            old_data: existing,
            new_data: body,
            ip_address: ipData?.address,
            user_agent: userAgentStr,
            endpoint: `PATCH ${request.url.pathname || '/api/roles/:id'}`,
            duration_ms: 0,
            status: 'FAILURE',
            user_id: user?.id || 'unknown',
            user_role: user?.role || 'user',
            user_name: user?.name || 'Unknown',
          }).catch((logErr) => console.error('Audit log error:', logErr));
        }

        console.error('❌ Role update error:', errorMsg);

        return {
          success: false,
          message: 'Failed to update role',
          error: errorMsg,
        };
      }
    },
    {
      body: t.Object({
        name: t.Optional(t.String({ minLength: 1 })),
      }),
    }
  )
  .delete('/:id', async ({ params, ip: ipData, userAgent: userAgentStr, request, user }: any) => {
    let existing = null;
    try {
      const { duration_ms } = await withDuration(async () => {
        existing = await db.role.findUnique({
          where: { id: params.id },
        });

        if (!existing) {
          throw new Error('Role not found');
        }

        return await db.role.delete({
          where: { id: params.id },
        });
      });

      const method = 'DELETE';
      const pathname = request.url.pathname || '/api/roles/:id';
      const endpoint = `${method} ${pathname}`;

      // ========== CREATE AUDIT LOG - SUCCESS ==========
      await createAuditLog({
        action: 'DELETE',
        table_name: 'roles',
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
        message: 'Role deleted successfully',
        data: existing,
      };
    } catch (error) {
      const errorMsg = (error as Error).message || 'Unknown error occurred';

      // ========== CREATE AUDIT LOG - FAILURE ==========
      await createAuditLog({
        action: 'DELETE',
        table_name: 'roles',
        record_id: params.id || 'UNKNOWN',
        old_data: existing,
        ip_address: ipData?.address,
        user_agent: userAgentStr,
        endpoint: `DELETE ${request.url.pathname || '/api/roles/:id'}`,
        duration_ms: 0,
        status: 'FAILURE',
        user_id: user?.id || 'unknown',
        user_role: user?.role || 'user',
        user_name: user?.name || 'Unknown',
      }).catch((logErr) => console.error('Audit log error:', logErr));

      console.error('❌ Role deletion error:', errorMsg);

      return {
        success: false,
        message: 'Failed to delete role',
        error: errorMsg,
      };
    }
  });
