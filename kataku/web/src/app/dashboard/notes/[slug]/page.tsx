"use client";

import { eden } from "@/lib/eden";
import {
  updateBreadcrumbs,
  updateIsLazy,
  updateIsLoading,
} from "@/store/breadcrumbs-store";
import { updateRecent } from "@/store/recent-store";
import { useQuery } from "@tanstack/react-query";
import { batch } from "@tanstack/react-store";
import { marked } from "marked";
import { useParams, usePathname } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const params = useParams<{ slug: string }>();
  const pathname = usePathname();

  const query = useQuery({
    queryKey: ["note", params.slug],
    queryFn: async () => {
      try {
        const res = await eden.api.note({ slug: params.slug }).get();

        batch(() => {
          updateBreadcrumbs({
            pathname,
            customTitle: res.data.data.title,
          });
          updateIsLazy(false);
          updateIsLoading(false);
        });

        updateRecent(res.data.data);

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
    <div className="relative flex flex-col justify-center overflow-hidden px-4 lg:px-6">
      <article
        className="dark:prose-invert prose w-full max-w-none"
        dangerouslySetInnerHTML={{ __html: result }}
      ></article>
    </div>
  );
}
