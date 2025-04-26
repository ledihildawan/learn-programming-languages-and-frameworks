import { db } from '@/db';
import * as schema from '@/db/schema';
import { asc, count, desc, eq, gt, lt } from 'drizzle-orm';
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
          id: schema.auditLogs.id,
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
  )
  .get(
    '/:id',
    async ({ params: { id }, error }) => {
      const auditLog = await first(
        db
          .select({
            id: schema.auditLogs.id,
            user: schema.users.name,
            action: schema.auditLogs.action,
            module: schema.auditLogs.module,
            newValue: schema.auditLogs.newValue,
            oldValue: schema.auditLogs.oldValue,
            description: schema.auditLogs.description,
            createdAt: schema.auditLogs.createdAt,
          })
          .from(schema.auditLogs)
          .leftJoin(schema.users, eq(schema.users.id, schema.auditLogs.userId))
          .where(eq(schema.auditLogs.id, id))
      );

      if (!auditLog) {
        return error(404, 'Not Found :(');
      }

      const nextAuditLog = await first(
        db
          .select()
          .from(schema.auditLogs)
          .where(gt(schema.auditLogs.id, auditLog.id))
          .orderBy(asc(schema.auditLogs.id))
          .limit(1)
      );
      const prevAuditLog = await first(
        db
          .select()
          .from(schema.auditLogs)
          .where(lt(schema.auditLogs.id, auditLog.id))
          .orderBy(desc(schema.auditLogs.id))
          .limit(1)
      );

      return {
        data: auditLog,
        nextAuditLog,
        prevAuditLog,
      };
    },
    {
      params: t.Object({
        id: t.Number(),
      }),
    }
  );
