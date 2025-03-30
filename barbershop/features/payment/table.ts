import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, numeric, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { bookingsTable } from '../booking/table';
import { transactionsTable } from '../transaction/table';

export const paymentsTable = pgTable('payments', {
  paymentId: primaryKey('payment_id'),
  bookingId: bigint('booking_id', { mode: 'number' })
    .notNull()
    .references(() => bookingsTable.bookingId),
  amount: numeric().notNull(),
  paymentMethod: varchar('payment_method').notNull(),
  paymentStatus: varchar('payment_status').default('pending'),
  paymentTime: timestamp('payment_time', { withTimezone: true }).notNull().defaultNow(),
  transactionId: bigint('transaction_id', { mode: 'number' })
    .notNull()
    .references(() => transactionsTable.transactionId),
  payment_url: text(),
  ...eventTimestamps,
});
