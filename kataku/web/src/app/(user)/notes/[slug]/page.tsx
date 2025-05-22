"use client";

import { CustomLink } from "@/components/custom-link";
import { Button } from "@/components/ui/button";
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
import { updateRecent } from "@/store/recent-store";
import { Note, Nullable } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { batch } from "@tanstack/react-store";
import { ArrowLeftIcon, ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { marked } from "marked";
import { useParams, useRouter } from "next/navigation";
import Script from "next/script";
import { useTopLoader } from "nextjs-toploader";
import { useEffect, useState } from "react";

export default function Page() {
  const [nextNote, setNextNote] = useState<Nullable<Note>>(null);
  const [prevNote, setPrevNote] = useState<Nullable<Note>>(null);

  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const topBarLoader = useTopLoader();

  const query = useQuery({
    queryKey: ["note", params.slug],
    queryFn: async () => {
      try {
        const res = await eden.api.note({ slug: params.slug }).get();

        if (res.error) {
          throw new Error(res.error);
        }

        batch(() => {
          updateRecent({ ...res.data.data, viewedAt: new Date() });
          updateBreadcrumbs([
            { title: "Notes", link: "/notes" },
            {
              title: res.data.data.title,
              link: `/notes/${res.data.data.slug}`,
            },
          ]);
        });

        setNextNote(res.data.nextNote);
        setPrevNote(res.data.prevNote);

        return res.data.data;
      } catch (error) {
        const message = (error as Error).message;

        if (message.toLowerCase().includes("not found")) {
          updateNotFoundDashboard(true);
        }
      }
    },
  });
  const result = marked.parse(query.data?.content || "");

  const goToNote = (slug: string) => {
    topBarLoader.start();

    router.push(`${env.NEXT_PUBLIC_WEB_URL}/notes/${slug}`);
  };

  useEffect(() => {
    document.title = query.data?.title
      ? `${query.data.title} - KataKu`
      : "Loading..";
  }, [query.data]);

  useEffect(() => {
    const handleNavigation = (e) => {
      if (document.activeElement!.tagName.toLocaleLowerCase() !== "body") {
        return;
      }

      if (e.key === "j" && prevNote) {
        return goToNote(prevNote.slug);
      } else if (e.key === "k" && nextNote) {
        return goToNote(nextNote.slug);
      }
    };

    window.addEventListener("keypress", handleNavigation);

    return () => {
      window.removeEventListener("keypress", handleNavigation);
    };
  }, [prevNote, nextNote]);

  return (
    <>
      <div className="grid gap-4">
        <div className="flex items-center justify-between px-4 lg:px-6">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" asChild>
              <CustomLink href="/notes">
                <ArrowLeftIcon />
              </CustomLink>
            </Button>
            <span className="text-xl font-bold">{query.data?.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={!prevNote}
                    onClick={() => goToNote(prevNote!.slug)}
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
                    disabled={!nextNote}
                    onClick={() => goToNote(nextNote!.slug)}
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

        <div className="relative flex flex-col justify-center overflow-hidden px-4 lg:px-6">
          <article
            className="dark:prose-invert prose w-full max-w-none"
            dangerouslySetInnerHTML={{ __html: result }}
          ></article>
        </div>
      </div>

      <Script id="markdown-it-fix" strategy="beforeInteractive">
        {`if (typeof window !== 'undefined' && typeof window.isSpace === 'undefined') {
          window.isSpace = function(code) {
            return code === 0x20 || code === 0x09 || code === 0x0A || code === 0x0B || code === 0x0C || code === 0x0D;
          };
        }`}
      </Script>
    </>
  );
}
