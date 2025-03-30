import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, boolean, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from '../user/table';

export const notificationsTable = pgTable('notifications', {
  notificationId: primaryKey('notification_id'),
  userId: bigint('user_id', { mode: 'number' })
    .notNull()
    .references(() => usersTable.userId),
  message: text().notNull(),
  notificationType: varchar('notification_type'),
  isRead: boolean('is_read').default(false),
  ...eventTimestamps,
});
