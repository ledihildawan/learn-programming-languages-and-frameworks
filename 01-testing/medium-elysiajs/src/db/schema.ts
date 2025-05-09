import { relations } from 'drizzle-orm';
import { bigint, bigserial, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';

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

export const userRelations = relations(user, ({ many }) => ({
  articles: many(article),
}));

export const article = pgTable('articles', {
  id: bigserial({ mode: 'number' }).notNull().primaryKey(),
  slug: text(),
  title: text().notNull(),
  description: text().default(''),
  body: text().default(''),
  createdAt: timestamp('created_at', { withTimezone: true }).notNull().defaultNow(),
  updatedAt: timestamp('updated_at', { withTimezone: true }).notNull().defaultNow(),
  tagList: text('tag_list').array().notNull(),
  favoritesCount: bigint('favorites_count', { mode: 'number' }).default(0),
  authorId: bigint('author_id', { mode: 'number' })
    .notNull()
    .references(() => user.id),
});

export const articleRelations = relations(article, ({ one }) => ({
  author: one(user, {
    fields: [article.authorId],
    references: [user.id],
  }),
}));

export const table = {
  tag,
  user,
  article,
} as const;

export type Table = typeof table;
