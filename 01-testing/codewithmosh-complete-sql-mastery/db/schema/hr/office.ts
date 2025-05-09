import { defineTable } from "@/db/helpers";
import { bigserial, text } from "drizzle-orm/pg-core";

export const hrOfficesTable = defineTable({
  name: "offices",
  schema: "hr",
  columns: {
    officeId: bigserial("office_id", { mode: "number" }).notNull().primaryKey(),
    address: text().notNull(),
    city: text().notNull(),
    state: text().notNull(),
  },
});
