import { defineTable } from "@/db/helpers";
import { AnyPgColumn, bigint, bigserial, text } from "drizzle-orm/pg-core";
import { hrOfficesTable } from "./office";

export const hrEmployeesTable = defineTable({
  name: "employees",
  schema: "hr",
  columns: {
    employeeId: bigserial("employee_id", { mode: "number" }).notNull().primaryKey(),
    firstName: text("first_name").notNull(),
    lastName: text("last_name").notNull(),
    jobTitle: text("job_title").notNull(),
    salary: bigint({ mode: "number" }).notNull(),
    reportTo: bigint("report_to", { mode: "number" }).references((): AnyPgColumn => hrEmployeesTable.employeeId),
    officeId: bigint("office_id", { mode: "number" }).references(() => hrOfficesTable.officeId, {
      onUpdate: "cascade",
    }),
  },
});
