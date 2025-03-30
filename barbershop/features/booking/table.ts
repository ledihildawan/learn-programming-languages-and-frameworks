import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, pgTable, timestamp, varchar } from 'drizzle-orm/pg-core';
import { customersTable } from '../customer/table';
import { servicesTable } from '../service/table';
import { stylistsTable } from '../stylist/table';

export const bookingsTable = pgTable('bookings', {
  bookingId: primaryKey('booking_id'),
  customerId: bigint('customer_id', { mode: 'number' })
    .notNull()
    .references(() => customersTable.customerId),
  serviceId: bigint('service_id', { mode: 'number' })
    .notNull()
    .references(() => servicesTable.serviceId),
  stylistId: bigint('stylist_id', { mode: 'number' })
    .notNull()
    .references(() => stylistsTable.stylistId),
  bookingTime: timestamp({ withTimezone: true }).notNull(),
  status: varchar().default('pending'),
  ...eventTimestamps,
});
