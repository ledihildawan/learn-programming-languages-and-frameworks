import { table } from './db/schema';

export type Tag = typeof table.tag.$inferInsert;
export type User = typeof table.user.$inferInsert;
export type Article = typeof table.article.$inferInsert;
