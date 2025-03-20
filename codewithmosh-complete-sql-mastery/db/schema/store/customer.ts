import { defineTable } from "@/db/helpers";
import { bigserial, date, integer, text } from "drizzle-orm/pg-core";

export const storeCustomersTable = defineTable({
  name: "customers",
  schema: "store",
  columns: {
    customerId: bigserial("customer_id", { mode: "number" }).notNull().primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    birthDate: date("birth_date"),
    phone: text(),
    address: text().notNull(),
    city: text().notNull(),
    state: text().notNull(),
    points: integer().notNull().default(0),
  },
});
