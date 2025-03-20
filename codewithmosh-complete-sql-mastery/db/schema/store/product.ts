import { defineTable } from "@/db/helpers";
import { bigint, bigserial, numeric, text } from "drizzle-orm/pg-core";

export const storeProductsTable = defineTable({
  name: "products",
  schema: "store",
  columns: {
    productId: bigserial("product_id", { mode: "number" }).notNull().primaryKey(),
    name: text().notNull(),
    quantityInStock: bigint("quantity_in_stock", { mode: "number" }).notNull(),
    unitPrice: numeric("unit_price").notNull(),
  },
});
