import { AuditLogTable } from "@/features/audit-logs/components/audit-log-table";

export default function Page() {
  return (
    <div className="gap-6 px-4 lg:px-6">
      <AuditLogTable />
    </div>
  );
}
