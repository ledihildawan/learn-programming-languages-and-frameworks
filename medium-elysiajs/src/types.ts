import { table } from './db/schema';

export type User = typeof table.user.$inferInsert;
