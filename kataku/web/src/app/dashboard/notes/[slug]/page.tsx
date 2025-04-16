"use client";

import { eden } from "@/lib/eden";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { useQuery } from "@tanstack/react-query";
import { marked } from "marked";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const params = useParams<{ slug: string }>();
  const [content, setContent] = useState("");

  const query = useQuery({
    queryKey: ["note", params.slug],
    queryFn: async () => {
      try {
        const res = await eden.api.note({ slug: params.slug }).get();

        updateBreadcrumbs(res.data.data.title);

        return res.data.data;
      } catch (error) {}
    },
  });

  const result = marked.parse(query.data?.content || "xxxx");

  return (
    <div className="relative flex flex-col justify-center overflow-hidden px-4 lg:px-6">
      <article
        className="prose dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: result }}
      ></article>
    </div>
  );
}
