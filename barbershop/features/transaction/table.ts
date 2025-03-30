import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, numeric, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { customersTable } from '../customer/table';

export const transactionsTable = pgTable('transactions', {
  transactionId: primaryKey('transaction_id'),
  customerId: bigint('customer_id', { mode: 'number' })
    .notNull()
    .references(() => customersTable.customerId),
  amount: numeric().notNull(),
  transactionType: varchar('transaction_type').notNull(),
  description: text(),
  transactionDate: timestamp({ withTimezone: true }).notNull().defaultNow(),
  status: varchar().default('completed'),
  ...eventTimestamps,
});
