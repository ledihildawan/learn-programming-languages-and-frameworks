import { CourseTable } from "./course";
import { LessonTable } from "./lesson";
import { relations } from "drizzle-orm";

import { pgEnum, pgTable } from "drizzle-orm/pg-core";

import {
  id,
  fkRef,
  createdAt,
  updatedAt,
  nonNullableText,
  nonNullableInteger,
} from "../schemaHelper";

export type CourseSectionStatus = (typeof courseSectionStatuses)[number];

export const courseSectionStatuses = ["public", "private"] as const;
export const courseSectionStatusEnum = pgEnum(
  "course_section_status",
  courseSectionStatuses
);

export const CourseSectionTable = pgTable("course_sections", {
  id,

  name: nonNullableText,
  status: courseSectionStatusEnum().notNull().default("private"),
  order: nonNullableInteger,
  courseId: fkRef(CourseTable.id, { onDelete: "cascade" }),

  createdAt,
  updatedAt,
});

export const CourseSectionRelationships = relations(
  CourseSectionTable,
  ({ one, many }) => ({
    course: one(CourseTable, {
      fields: [CourseSectionTable.courseId],
      references: [CourseTable.id],
    }),
    leassons: many(LessonTable),
  })
);
