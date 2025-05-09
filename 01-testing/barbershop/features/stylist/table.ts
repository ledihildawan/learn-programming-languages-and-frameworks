import { eventTimestamps, primaryKey } from '@/db/utils';
import { pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const stylistsTable = pgTable('stylists', {
  stylistId: primaryKey('stylist_id'),
  stylistName: varchar('stylist_name').notNull(),
  specialization: text(),
  ...eventTimestamps,
});
