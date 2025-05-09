import { defineTable } from "@/db/helpers";
import { bigint, bigserial, date, smallint, text } from "drizzle-orm/pg-core";
import { storeCustomersTable } from "./customer";
import { storeOrderStatusesTable } from "./order-status";
import { storeShippersTable } from "./shipper";

export const storeOrdersTable = defineTable({
  name: "orders",
  schema: "store",
  columns: {
    orderId: bigserial("order_id", { mode: "number" }).notNull().primaryKey(),
    customerId: bigint("customer_id", { mode: "number" })
      .notNull()
      .references(() => storeCustomersTable.customerId, { onUpdate: "cascade" }),
    orderDate: date("order_date").notNull(),
    status: smallint()
      .notNull()
      .default(1)
      .references(() => storeOrderStatusesTable.orderStatusId, {
        onUpdate: "cascade",
      }),
    comments: text(),
    shippedDate: date("shipped_date"),
    shipperId: bigint("shipper_id", { mode: "number" }).references(() => storeShippersTable.shipperId, {
      onUpdate: "cascade",
    }),
  },
});
