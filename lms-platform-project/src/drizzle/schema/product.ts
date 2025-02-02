import { CourseProductTable } from "./courseProduct";
import { relations } from "drizzle-orm";

import { pgEnum, pgTable } from "drizzle-orm/pg-core";

import {
  id,
  createdAt,
  updatedAt,
  nonNullableText,
  nonNullableInteger,
} from "../schemaHelper";

export type ProductStatus = (typeof productStatuses)[number];

export const productStatuses = ["public", "private"] as const;
export const productStatusEnum = pgEnum("product_status", productStatuses);

export const ProductTable = pgTable("products", {
  id,

  name: nonNullableText,
  status: productStatusEnum().notNull().default("private"),
  imageUrl: nonNullableText,
  description: nonNullableText,
  priceInDollars: nonNullableInteger,

  createdAt,
  updatedAt,
});

export const ProductRelationships = relations(ProductTable, ({ many }) => ({
  courseProducts: many(CourseProductTable),
}));
