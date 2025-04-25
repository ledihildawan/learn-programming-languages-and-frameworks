"use client";

import { eden } from "@/lib/eden";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { useQuery } from "@tanstack/react-query";
import { Differ, Viewer } from "json-diff-kit";
import "json-diff-kit/dist/viewer.css";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ id: string }>();

  const query = useQuery({
    queryKey: ["note", params.id],
    queryFn: async () => {
      try {
        const res = await eden.api["audit-log"]({
          id: Number(params.id),
        }).get();

        res.data.data.newValue = JSON.parse(res.data.data.newValue);
        res.data.data.oldValue = JSON.parse(res.data.data.oldValue);

        return res.data.data;
      } catch (error) {}
    },
  });

  useEffect(() => {
    updateBreadcrumbs("/dashboard/audit-logs/details");
  }, []);

  if (query.isPending) return;

  const d = new Differ({
    detectCircular: true,
    maxDepth: undefined,
    showModifications: true,
    arrayDiffMethod: "lcs",
    ignoreCase: false,
    ignoreCaseForKey: false,
    recursiveEqual: true,
  });
  const diff = d.diff(query.data.oldValue, query.data.newValue);

  const viewerProps = {
    indent: 4,
    lineNumbers: true,
    highlightInlineDiff: true,
    inlineDiffOptions: {
      mode: "word",
      wordSeparator: " ",
    },
    hideUnchangedLines: false,
    syntaxHighlight: {
      theme: "monokai",
    },
    virtual: false,
  };

  return (
    <div className="gap-6 px-4 lg:px-6">
      <Viewer diff={diff} {...viewerProps} />
    </div>
  );
}
