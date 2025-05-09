import { eventTimestamps, primaryKey } from '@/db/utils';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const rolesTable = pgTable('roles', {
  roleId: primaryKey('role_id'),
  roleName: text('role_name').notNull(),
  description: text(),
  ...eventTimestamps,
});
