import { defineTable } from "@/db/helpers";
import { bigint, bigserial, text } from "drizzle-orm/pg-core";
import { storeOrdersTable } from "./order";
import { storeProductsTable } from "./product";

export const storeOrderItemNotesTable = defineTable({
  name: "order_item_notes",
  schema: "store",
  columns: {
    noteId: bigserial("note_id", { mode: "number" }).notNull().primaryKey(),
    orderId: bigint("order_id", { mode: "number" })
      .notNull()
      .references(() => storeOrdersTable.orderId),
    productId: bigserial("product_id  ", { mode: "number" })
      .notNull()
      .references(() => storeProductsTable.productId),
    note: text().notNull(),
  },
});
