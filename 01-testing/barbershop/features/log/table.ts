import { primaryKey } from '@/db/utils';
import { bigint, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from '../user/table';

export const logsTable = pgTable('logs', {
  logId: primaryKey('log_id'),
  userId: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => usersTable.userId),
  action: varchar().notNull(),
  actionDetails: text('action_details'),
  createdAt: timestamp('created_at', { withTimezone: true }).defaultNow(),
  ipAddress: varchar('ip_address'),
});
