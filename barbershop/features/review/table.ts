import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, pgTable, smallint, text } from 'drizzle-orm/pg-core';
import { customersTable } from '../customer/table';
import { servicesTable } from '../service/table';
import { stylistsTable } from '../stylist/table';

export const reviewsTable = pgTable('reviews', {
  reviewId: primaryKey('review_id'),
  customerId: bigint('customer_id', { mode: 'number' })
    .notNull()
    .references(() => customersTable.customerId),
  stylistId: bigint('stylist_id', { mode: 'number' })
    .notNull()
    .references(() => stylistsTable.stylistId),
  serviceId: bigint('service_id', { mode: 'number' })
    .notNull()
    .references(() => servicesTable.serviceId),
  rating: smallint().notNull(),
  reviewText: text('review_text'),
  ...eventTimestamps,
});
