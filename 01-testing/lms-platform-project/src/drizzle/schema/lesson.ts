import { CourseTable } from "./course";
import { relations } from "drizzle-orm";

import { pgEnum, pgTable, text } from "drizzle-orm/pg-core";

import {
  id,
  fkRef,
  createdAt,
  updatedAt,
  nonNullableText,
  nonNullableInteger,
} from "../schemaHelper";
import { CourseSectionTable } from "./courseSection";

export type LessonStatus = (typeof LessonStatuses)[number];

export const LessonStatuses = ["public", "private", "preview"] as const;
export const LessonStatusEnum = pgEnum("lesson_status", LessonStatuses);

export const LessonTable = pgTable("lessons", {
  id,

  name: nonNullableText,
  description: text(),
  youtubeVideoId: nonNullableText,

  order: nonNullableInteger,
  status: LessonStatusEnum().notNull().default("private"),
  sectionId: fkRef(CourseSectionTable.id, { onDelete: "cascade" }),

  createdAt,
  updatedAt,
});

export const LessonRelationships = relations(LessonTable, ({ one, many }) => ({
  section: one(CourseSectionTable, {
    fields: [LessonTable.sectionId],
    references: [CourseSectionTable.id],
  }),
  userLessonsComplete: many(UserLessonCompleteTable),
}));
