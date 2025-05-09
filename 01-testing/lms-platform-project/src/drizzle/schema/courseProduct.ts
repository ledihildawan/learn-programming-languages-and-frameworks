import { CourseTable } from "./course";
import { ProductTable } from "./product";
import { pgTable } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

import { fkRef, createdAt, updatedAt, compositeKey } from "../schemaHelper";

export const CourseProductTable = pgTable(
  "course_products",
  {
    courseId: fkRef(CourseTable.id, { onDelete: "restrict" }),
    productId: fkRef(ProductTable.id, { onDelete: "cascade" }),

    createdAt,
    updatedAt,
  },
  (t) => compositeKey(t.courseId, t.productId)
);

export const CourseProductRelationships = relations(
  CourseProductTable,
  ({ one }) => ({
    course: one(CourseTable, {
      fields: [CourseProductTable.courseId],
      references: [CourseTable.id],
    }),
    product: one(ProductTable, {
      fields: [CourseProductTable.productId],
      references: [ProductTable.id],
    }),
  })
);
