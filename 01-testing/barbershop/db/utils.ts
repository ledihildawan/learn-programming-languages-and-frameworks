import { eq, type InferInsertModel } from 'drizzle-orm';
import { bigserial, timestamp, type PgColumn, type PgTable } from 'drizzle-orm/pg-core';
import db from '.';

export const eventTimestamps = {
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).defaultNow(),
  deletedAt: timestamp('deleted_at', { withTimezone: true }),
};

export function primaryKey(columnName: string) {
  return bigserial(columnName, { mode: 'number' }).notNull().primaryKey();
}

export async function first<T>(query: Promise<T[]>): Promise<T | undefined> {
  const results = await query;

  return results?.[0];
}

export async function checkIfRecordExistsInColumn<T extends PgTable, K extends keyof InferInsertModel<T>>(
  table: T,
  column: K,
  value: InferInsertModel<T>[K]
): Promise<boolean> {
  const columnRef = table[column as keyof T] as PgColumn;

  const record = await first(
    db
      .select({ [column]: columnRef })
      .from(table as PgTable)
      .where(eq(columnRef, value))
      .limit(1)
  );

  return record !== undefined;
}
