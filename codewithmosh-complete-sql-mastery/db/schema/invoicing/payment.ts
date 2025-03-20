import { defineTable } from "@/db/helpers";
import { bigint, bigserial, date, numeric } from "drizzle-orm/pg-core";
import { invoicingClientsTable } from "./client";
import { invoicingInvoicesTable } from "./invoice";
import { invoicingPaymentMethodsTable } from "./payment-method";

export const invoicingPaymentsTable = defineTable({
  name: "payments",
  schema: "invoicing",
  columns: {
    paymentId: bigserial("payment_id", { mode: "number" }).notNull().primaryKey(),
    clientId: bigint("client_id", { mode: "number" })
      .notNull()
      .references(() => invoicingClientsTable.clientId, { onUpdate: "cascade" }),
    invoiceId: bigint("invoice_id", { mode: "number" })
      .notNull()
      .references(() => invoicingInvoicesTable.invoiceId, { onUpdate: "cascade" }),
    date: date().notNull(),
    amount: numeric().notNull(),
    paymentMethod: bigint("payment_method", { mode: "number" })
      .notNull()
      .references(() => invoicingPaymentMethodsTable.paymentMethodId),
  },
});
