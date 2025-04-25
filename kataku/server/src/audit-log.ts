import { db } from '@/db';
import * as schema from '@/db/schema';
import { Elysia, t } from 'elysia';
import { getUserId } from './user';

export const auditLog = new Elysia({ prefix: '/audit-log', tags: ['audit-log'] }).use(getUserId(false)).post(
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
