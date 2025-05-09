import { db } from '@/db';
import * as schema from '@/db/schema';
import { and, count, desc, eq, not, sql } from 'drizzle-orm';
import { Elysia } from 'elysia';
import { first } from './db/utils';
import { getUserId } from './user';

export const dashboard = new Elysia({ prefix: '/dashboard', tags: ['dashboard'] })
  .use(getUserId(false))
  .get('/', async ({ userId }) => {
    const totalNotes =
      (
        await first(
          db
            .select({ author: schema.users.name, total: count() })
            .from(schema.notes)
            .leftJoin(schema.users, eq(schema.users.id, schema.notes.author))
            .where(eq(schema.notes.author, userId))
            .groupBy(schema.users.name)
        )
      )?.total || 0;

    const totalNotesThisMonth =
      (
        await first(
          db
            .select({ author: schema.users.name, total: count() })
            .from(schema.notes)
            .leftJoin(schema.users, eq(schema.users.id, schema.notes.author))
            .where(
              and(
                sql`${schema.notes.createdAt} >= ${sql`DATE_TRUNC('month', CURRENT_DATE)`}`,
                eq(schema.notes.author, userId)
              )
            )
            .groupBy(schema.users.name)
        )
      )?.total || 0;

    const lastEditedNote = await first(
      db
        .select({ title: schema.notes.title, updatedAt: schema.notes.updatedAt })
        .from(schema.notes)
        .where(and(eq(schema.notes.author, userId), not(eq(schema.notes.createdAt, schema.notes.updatedAt))))
        .orderBy(desc(schema.notes.updatedAt))
        .limit(1)
    );

    return {
      data: {
        totalNotes,
        lastEditedNote,
        totalNotesThisMonth,
      },
    };
  });
