"use client";

import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { env } from "@/env/client";
import { eden } from "@/lib/eden";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { AuditLog, Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Differ, Viewer } from "json-diff-kit";
import "json-diff-kit/dist/viewer.css";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [nextNote, setNextNote] = useState<Nullable<AuditLog>>(null);
  const [prevNote, setPrevNote] = useState<Nullable<AuditLog>>(null);

  const params = useParams<{ id: string }>();
  const router = useRouter();
  const topBarLoader = useTopLoader();

  const query = useQuery({
    queryKey: ["auditLogs", params.id],
    queryFn: async () => {
      try {
        const res = await eden.api["audit-log"]({
          id: Number(params.id),
        }).get();

        if (res.data.data.newValue) {
          res.data.data.newValue = JSON.parse(res.data.data.newValue);
        }

        if (res.data.data.oldValue) {
          res.data.data.oldValue = JSON.parse(res.data.data.oldValue);
        }

        setNextNote(res.data.nextNote);
        setPrevNote(res.data.prevNote);

        return res.data.data;
      } catch (error) {}
    },
  });

  const d = useMemo(
    () =>
      new Differ({
        detectCircular: true,
        maxDepth: undefined,
        showModifications: true,
        arrayDiffMethod: "lcs",
        ignoreCase: false,
        ignoreCaseForKey: false,
        recursiveEqual: true,
      }),
    [],
  );
  const diff = useMemo(
    () => d.diff(query.data?.oldValue, query.data?.newValue),
    [query.data],
  );
  const viewerProps = useMemo(
    () => ({
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
    }),
    [],
  );

  useEffect(() => {
    updateBreadcrumbs("/dashboard/audit-logs/details");
  }, []);

  if (query.isPending) {
    return;
  }

  const goToNote = (id: number) => {
    topBarLoader.start();

    router.push(`${env.NEXT_PUBLIC_WEB_URL}/dashboard/audit-logs/${id}`);
  };

  return (
    <div className="gap-6 px-4 lg:px-6">
      <div className="grid gap-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <CustomLink href="/dashboard/audit-logs">
                <ArrowLeftIcon />
              </CustomLink>
            </Button>
            <span className="text-xl font-bold">Audit Log Details</span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              disabled={!prevNote}
              onClick={() => goToNote(prevNote!.id)}
            >
              <ChevronLeftIcon />
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={!nextNote}
              onClick={() => goToNote(nextNote!.id)}
            >
              <ChevronRightIcon />
            </Button>
          </div>
        </div>

        <Card>
          <CardContent className="grid gap-4">
            <div className="grid md:grid-cols-2">
              <div className="grid gap-2">
                <div className="text-xs">ID</div>
                <div className="font-bold">{query.data?.id}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-xs">User</div>
                <div className="font-bold">{query.data?.user}</div>
              </div>
            </div>
            <div className="grid md:grid-cols-2">
              <div className="grid gap-2">
                <div className="text-xs">Action</div>
                <div className="font-bold">{query.data?.action}</div>
              </div>
              <div className="grid gap-2">
                <div className="text-xs">Module</div>
                <div className="font-bold">{query.data?.module}</div>
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-xs">Created At</div>
              <div className="font-bold">
                {new Date(query.data.createdAt).toLocaleString()}
              </div>
            </div>
            <div className="grid gap-2">
              <div className="text-xs">Description</div>
              <div className="font-bold">{query.data?.description}</div>
            </div>
          </CardContent>
        </Card>

        {query.data?.oldValue && query.data?.newValue && (
          <Card>
            <CardContent>
              <Viewer diff={diff} {...viewerProps} />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
