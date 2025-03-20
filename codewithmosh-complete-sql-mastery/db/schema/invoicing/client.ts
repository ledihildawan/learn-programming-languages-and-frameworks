import { defineTable } from "@/db/helpers";
import { bigserial, text } from "drizzle-orm/pg-core";

export const invoicingClientsTable = defineTable({
  name: "clients",
  schema: "invoicing",
  columns: {
    clientId: bigserial("client_id", { mode: "number" }).notNull().primaryKey(),
    name: text().notNull(),
    address: text().notNull(),
    city: text().notNull(),
    state: text().notNull(),
    phone: text().notNull(),
  },
});
