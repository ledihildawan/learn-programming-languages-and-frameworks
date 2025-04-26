"use client";

import { eden } from "@/lib/eden";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { updateNotFoundDashboard } from "@/store/dashboard-store";
import { updateRecent } from "@/store/recent-store";
import { useQuery } from "@tanstack/react-query";
import { batch } from "@tanstack/react-store";
import { marked } from "marked";
import { useParams } from "next/navigation";
import Script from "next/script";

export default function Page() {
  const params = useParams<{ slug: string }>();

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
            { title: "Dashboard", link: "/dashboard" },
            { title: "Notes", link: "/dashboard/notes" },
            {
              title: res.data.data.title,
              link: `/dashboard/notes/${res.data.data.slug}`,
            },
          ]);
        });

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

  return (
    <>
      <div className="relative flex flex-col justify-center overflow-hidden px-4 lg:px-6">
        <article
          className="dark:prose-invert prose w-full max-w-none"
          dangerouslySetInnerHTML={{ __html: result }}
        ></article>
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
