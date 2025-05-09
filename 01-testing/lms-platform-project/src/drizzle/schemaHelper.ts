import {
  ReferenceConfig,
  uuid,
  text,
  integer,
  PgColumn,
  timestamp,
  primaryKey,
} from "drizzle-orm/pg-core";

export const id = uuid().primaryKey().defaultRandom();
export const createdAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow();
export const updatedAt = timestamp({ withTimezone: true })
  .notNull()
  .defaultNow()
  .$onUpdate(() => new Date());
export const nonNullableText = text().notNull();
export const nonNullableInteger = integer().notNull();

export function fkRef(col: PgColumn, actions: ReferenceConfig["actions"]) {
  return uuid()
    .notNull()
    .references(() => col, actions);
}

export function compositeKey(
  firstColumn: PgColumn,
  ...restColumns: PgColumn[]
) {
  return [primaryKey({ columns: [firstColumn, ...restColumns] })];
}
