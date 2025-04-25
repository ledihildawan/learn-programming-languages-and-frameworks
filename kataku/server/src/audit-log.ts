import { db } from '@/db';
import * as schema from '@/db/schema';
import { count, desc, eq } from 'drizzle-orm';
import { Elysia, t } from 'elysia';
import { first, getPaginationInfo, withPagination } from './db/utils';
import { getUserId } from './user';

export const auditLog = new Elysia({ prefix: '/audit-log', tags: ['audit-log'] })
  .use(getUserId(false))
  .get(
    '/',
    async ({ query: { page, pageSize }, userId }) => {
      const query = db
        .select({
          user: schema.users.name,
          action: schema.auditLogs.action,
          module: schema.auditLogs.module,
          description: schema.auditLogs.description,
          createdAt: schema.auditLogs.createdAt,
        })
        .from(schema.auditLogs)
        .leftJoin(schema.users, eq(schema.users.id, schema.auditLogs.userId))
        .where(eq(schema.auditLogs.userId, userId!));

      const auditLogs = await withPagination(query.$dynamic(), desc(schema.auditLogs.createdAt), page, pageSize);
      const total =
        (
          await first(
            db
              .select({ id: schema.auditLogs.id, total: count() })
              .from(schema.auditLogs)
              .leftJoin(schema.users, eq(schema.users.id, schema.auditLogs.userId))
              .where(eq(schema.auditLogs.userId, userId!))
              .groupBy(schema.auditLogs.id)
          )
        )?.total || 0;

      return {
        data: auditLogs,
        pagination: getPaginationInfo(total, page, pageSize),
      };
    },
    {
      query: t.Object({
        page: t.Number(),
        pageSize: t.Number(),
      }),
    }
  )
  .post(
    '/',
    async ({ body, userId }) => {
      const auditLog = await db
        .insert(schema.auditLogs)
        .values({ ...body, userId: userId ?? body.userId })
        .returning();

      return { success: true, data: auditLog?.[0] };
    },
    {
      body: t.Object({
        oldValue: t.Optional(t.String()),
        newValue: t.Optional(t.String()),
        description: t.String(),
        action: t.String(),
        module: t.String(),
        createdAt: t.Date(),
        userId: t.Optional(t.String()),
      }),
    }
  );
