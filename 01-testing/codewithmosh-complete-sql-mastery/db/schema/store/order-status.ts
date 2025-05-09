import { defineTable } from "@/db/helpers";
import { bigserial, text } from "drizzle-orm/pg-core";

export const storeOrderStatusesTable = defineTable({
  name: "order_statuses",
  schema: "store",
  columns: {
    orderStatusId: bigserial("order_status_id", { mode: "number" }).notNull().primaryKey(),
    name: text().notNull(),
  },
});
