import { bigint, bigserial, numeric, text } from "drizzle-orm/pg-core";
import { defineTable } from "../helpers";

export const inventoryProductsTable = defineTable({
  schema: "invetory",
  name: "products",
  columns: {
    productId: bigserial("product_id", { mode: "number" }).notNull().primaryKey(),
    name: text().notNull(),
    quantityInStock: bigint("quanity_in_stock", { mode: "number" }).notNull(),
    unitPrice: numeric("unit_price").notNull(),
  },
});
