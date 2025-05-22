"use client";

import { NoteTable } from "@/features/notes/components/note-table";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    updateBreadcrumbs([{ title: "Notes", link: "/notes" }]);
  }, []);

  return (
    <div className="gap-6 px-4 lg:px-6">
      <NoteTable />
    </div>
  );
}
