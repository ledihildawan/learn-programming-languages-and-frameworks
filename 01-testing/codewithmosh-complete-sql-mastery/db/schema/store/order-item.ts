import { defineTable } from "@/db/helpers";
import { bigint, numeric, primaryKey } from "drizzle-orm/pg-core";
import { storeOrdersTable } from "./order";
import { storeProductsTable } from "./product";

export const storeOrderItemsTable = defineTable({
  name: "order_items",
  schema: "store",
  columns: {
    orderId: bigint("order_id", { mode: "number" })
      .notNull()
      .references(() => storeOrdersTable.orderId, { onUpdate: "cascade" }),
    productId: bigint("product_id", { mode: "number" })
      .notNull()
      .references(() => storeProductsTable.productId, { onUpdate: "cascade" }),
    quantity: bigint({ mode: "number" }).notNull(),
    unitPrice: numeric().notNull(),
  },
  extraConfig: (table) => [primaryKey({ columns: [table.orderId, table.productId] })],
});
