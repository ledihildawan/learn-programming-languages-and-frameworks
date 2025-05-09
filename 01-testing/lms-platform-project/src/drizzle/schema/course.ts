import { CourseProductTable } from "./courseProduct";
import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { id, createdAt, updatedAt, nonNullableText } from "../schemaHelper";

export const CourseTable = pgTable("courses", {
  id,

  name: nonNullableText,
  description: nonNullableText,

  createdAt,
  updatedAt,
});

export const CourseRelationships = relations(CourseTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
}));
