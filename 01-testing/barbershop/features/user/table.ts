import { eventTimestamps, primaryKey } from '@/db/utils';
import { bigint, boolean, pgTable, text, timestamp, varchar } from 'drizzle-orm/pg-core';
import { rolesTable } from '../role/table';

export const usersTable = pgTable('users', {
  userId: primaryKey('user_id'),
  email: varchar().notNull().unique(),
  token: text(),
  verificationToken: text('verification_token'),
  isSignIn: boolean('is_sign_in').default(false),
  isEmailVerified: boolean('is_email_verified').default(false),
  emailVerifiedAt: timestamp('verified_at', { withTimezone: true }),
  lastSignInAt: timestamp('last_sign_in_at', { withTimezone: true }),
  lastSignOutAt: timestamp('last_sign_out_at', { withTimezone: true }),
  ...eventTimestamps,
  roleId: bigint('role_id', { mode: 'number' })
    .default(2)
    .references(() => rolesTable.roleId),
});
