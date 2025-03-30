import { eventTimestamps, primaryKey } from '@/db/utils';
import { numeric, pgTable, text, varchar } from 'drizzle-orm/pg-core';

export const servicesTable = pgTable('services', {
  serviceId: primaryKey('service_id'),
  serviceName: varchar('service_name').notNull(),
  serviceDescription: text('service_description'),
  price: numeric({ mode: 'number' }).notNull(),
  ...eventTimestamps,
});
