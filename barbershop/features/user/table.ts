import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, boolean, pgTable, varchar } from 'drizzle-orm/pg-core';
import { rolesTable } from '../role/table';

export const usersTable = pgTable('users', {
  userId: primaryKey('user_id'),
  email: varchar().notNull().unique(),
  isEmailVerified: boolean('is_email_verified').default(false),
  ...eventTimestamps,
  roleId: bigint('role_id', { mode: 'number' })
    .default(2)
    .references(() => rolesTable.roleId),
});
