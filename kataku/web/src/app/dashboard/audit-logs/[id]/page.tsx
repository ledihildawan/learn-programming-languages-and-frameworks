"use client";

import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { env } from "@/env/client";
import { eden } from "@/lib/eden";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { updateNotFoundDashboard } from "@/store/dashboard-store";
import { AuditLog, Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { Differ, Viewer } from "json-diff-kit";
import "json-diff-kit/dist/viewer.css";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useMemo, useState } from "react";

export default function Page() {
  const [nextAuditLog, setNextAuditLog] = useState<Nullable<AuditLog>>(null);
  const [prevAuditLog, setPrevAuditLog] = useState<Nullable<AuditLog>>(null);

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

        if ([404, 422].includes(res.error?.status)) {
          throw new Error("Not Found :(");
        }

        updateBreadcrumbs([
          { title: "Dashboard", link: "/dashboard" },
          { title: "Audit Logs", link: "/dashboard/audit-logs" },
          {
            title: "Details",
            link: `/dashboard/audit-logs/${res.data?.data?.id}`,
          },
        ]);

        if (res.data.data.newValue) {
          res.data.data.newValue = JSON.parse(res.data.data.newValue);
        }

        if (res.data.data.oldValue) {
          res.data.data.oldValue = JSON.parse(res.data.data.oldValue);
        }

        setNextAuditLog(res.data.nextAuditLog);
        setPrevAuditLog(res.data.prevAuditLog);

        return res.data?.data;
      } catch (error) {
        const message = (error as Error).message;

        if (message.toLowerCase().includes("not found")) {
          updateNotFoundDashboard(true);
        }
      }
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

  const goToNote = (id: number) => {
    topBarLoader.start();

    router.push(`${env.NEXT_PUBLIC_WEB_URL}/dashboard/audit-logs/${id}`);
  };

  useEffect(() => {
    const handleNavigation = (e) => {
      if (document.activeElement!.tagName.toLocaleLowerCase() !== "body") {
        return;
      }

      switch (e.key) {
        case "j":
          return goToNote(prevAuditLog!.id);
        case "k":
          return goToNote(nextAuditLog!.id);
      }
    };

    window.addEventListener("keypress", handleNavigation);

    return () => {
      window.removeEventListener("keypress", handleNavigation);
    };
  }, [prevAuditLog, nextAuditLog]);

  if (query.isPending) {
    return;
  }

  return (
    <div className="grid gap-4 px-4 lg:px-6">
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!prevAuditLog}
                  onClick={() => goToNote(prevAuditLog!.id)}
                >
                  <ChevronLeftIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Prev (J)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={!nextAuditLog}
                  onClick={() => goToNote(nextAuditLog!.id)}
                >
                  <ChevronRightIcon />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Next (K)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              {query.data?.createdAt &&
                new Date(query.data.createdAt).toLocaleString()}
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
  );
}
