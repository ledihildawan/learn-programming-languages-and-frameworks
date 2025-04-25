"use client";

import { eden } from "@/lib/eden";
import { updateIsLazy, updateIsLoading } from "@/store/breadcrumbs-store";
import { updateRecent } from "@/store/recent-store";
import { useQuery } from "@tanstack/react-query";
import { batch } from "@tanstack/react-store";
import { marked } from "marked";
import { useParams } from "next/navigation";
import Script from "next/script";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ slug: string }>();

  const query = useQuery({
    queryKey: ["note", params.slug],
    queryFn: async () => {
      try {
        const res = await eden.api.note({ slug: params.slug }).get();

        batch(() => {
          updateRecent(res.data.data);
          updateIsLoading(false);
        });

        return res.data.data;
      } catch (error) {}
    },
  });

  useEffect(() => {
    updateIsLazy(true);
    updateIsLoading(true);
  }, []);

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
        {`
            if (typeof window !== 'undefined' && typeof window.isSpace === 'undefined') {
              window.isSpace = function(code) {
                return code === 0x20 || code === 0x09 || code === 0x0A || code === 0x0B || code === 0x0C || code === 0x0D;
              };
            }
          `}
      </Script>
    </>
  );
}
