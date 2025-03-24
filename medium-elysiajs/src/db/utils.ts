import { eq, InferInsertModel } from 'drizzle-orm';
import { PgColumn, PgTable } from 'drizzle-orm/pg-core';
import { db } from '.';

export async function first<T>(query: Promise<T[]>): Promise<T | undefined> {
  const results = await query;

  return results?.[0];
}

export async function recordExists<T extends PgTable, K extends keyof InferInsertModel<T>>(
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
