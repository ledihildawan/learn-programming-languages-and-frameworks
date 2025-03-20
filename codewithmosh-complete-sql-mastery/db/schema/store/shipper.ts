import { defineTable } from "@/db/helpers";
import { bigserial, text } from "drizzle-orm/pg-core";

export const storeShippersTable = defineTable({
  name: "shippers",
  schema: "store",
  columns: {
    shipperId: bigserial("shipper_id", { mode: "number" }).notNull().primaryKey(),
    name: text().notNull(),
  },
});
