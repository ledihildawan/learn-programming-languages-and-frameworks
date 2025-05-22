"use client";

import { AuditLogTable } from "@/features/audit-logs/components/audit-log-table";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    document.title = "Audit Logs - KataKu";

    updateBreadcrumbs([{ title: "Audit Logs", link: "/audit-logs" }]);
  }, []);

  return (
    <div className="gap-6 px-4 lg:px-6">
      <AuditLogTable />
    </div>
  );
}
