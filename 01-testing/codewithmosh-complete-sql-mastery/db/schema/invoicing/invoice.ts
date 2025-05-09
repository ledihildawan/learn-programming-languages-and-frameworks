import { defineTable } from "@/db/helpers";
import { bigint, bigserial, date, numeric, text } from "drizzle-orm/pg-core";
import { invoicingClientsTable } from "./client";

export const invoicingInvoicesTable = defineTable({
  name: "invoices",
  schema: "invoicing",
  columns: {
    invoiceId: bigserial("invoice_id", { mode: "number" }).notNull().primaryKey(),
    number: text().notNull(),
    clientId: bigint("client_id", { mode: "number" })
      .notNull()
      .references(() => invoicingClientsTable.clientId, { onDelete: "restrict", onUpdate: "cascade" }),
    invoiceTotal: numeric("invoice_total").notNull(),
    paymentTotal: numeric("payment_total").notNull().default("0.00"),
    invoiceDate: date("invoice_date").notNull(),
    dueDate: date("due_date").notNull(),
    paymentDate: date("payment_date"),
  },
});
