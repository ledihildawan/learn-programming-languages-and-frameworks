import { bigserial, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const tag = pgTable('tags', {
  id: bigserial({ mode: 'number' }).notNull().primaryKey(),
  name: varchar().notNull(),
});

export const user = pgTable('users', {
  id: bigserial({ mode: 'number' }).notNull().primaryKey(),
  username: text().notNull().unique(),
  email: varchar().notNull().unique(),
  bio: varchar(),
  image: varchar(),
  password: varchar().notNull(),
});

export const table = {
  tag,
  user,
} as const;

export type Table = typeof table;
