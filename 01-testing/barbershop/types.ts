import type { rolesTable, usersTable } from './db/schema';

export type Booleanish = boolean | 'true' | 'false';
export type Numberish = number | string;
export type Nullable<T = void> = T | null | undefined;

export type Role = typeof rolesTable.$inferInsert;
export type User = typeof usersTable.$inferInsert;

export type Auth = Required<Pick<User, 'userId' | 'email'> & { role: string; isEmailVerified: boolean }>;
