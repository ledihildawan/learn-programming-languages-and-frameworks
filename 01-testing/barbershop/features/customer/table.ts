import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, pgTable, text, varchar } from 'drizzle-orm/pg-core';
import { usersTable } from '../user/table';

export const customersTable = pgTable('customers', {
  customerId: primaryKey('customer_id'),
  userId: bigint('user_id', { mode: 'number' }).references(() => usersTable.userId),
  firstName: varchar('first_name').notNull(),
  lastName: varchar('last_name'),
  phoneNumber: varchar('phone_number'),
  address: text(),
  ...eventTimestamps,
});
