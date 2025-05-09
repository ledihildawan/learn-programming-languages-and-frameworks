import { defineTable } from "@/db/helpers";
import { bigserial, text } from "drizzle-orm/pg-core";

export const invoicingPaymentMethodsTable = defineTable({
  name: "payment_methods",
  schema: "invoicing",
  columns: {
    paymentMethodId: bigserial("payment_method_id", { mode: "bigint" }).notNull().primaryKey(),
    name: text().notNull(),
  },
});
