import { pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";

import { id, createdAt, updatedAt, nonNullableText } from "../schemaHelper";
import { relations } from "drizzle-orm";

export type UserRole = (typeof userRoles)[number];

export const userRoles = ["user", "admin"] as const;
export const userRoleEnum = pgEnum("user_role", userRoles);

export const UserTable = pgTable("users", {
  id,

  clerkUserId: nonNullableText.unique(),

  email: nonNullableText,

  name: nonNullableText,
  role: userRoleEnum().notNull().default("user"),
  imageUrl: text(),
  deletedAt: timestamp({ withTimezone: true }),

  createdAt,
  updatedAt,
});

export const UserRelationships = relations(UserTable, ({ many }) => ({
  //
}));
