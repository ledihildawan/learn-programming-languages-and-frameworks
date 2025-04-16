"use client";

import { eden } from "@/lib/eden";
import { useQuery } from "@tanstack/react-query";
import markdownit from "markdown-it";
import { useParams } from "next/navigation";
import { useState } from "react";

const md = markdownit();

export default function Page() {
  const params = useParams<{ slug: string }>();
  const [content, setContent] = useState("");

  const query = useQuery({
    queryKey: ["note", params.slug],
    queryFn: () => eden.api.note({ slug: params.slug }).get(),
  });

  const result = md.render(query.data?.data?.data?.content || "xxxx");

  return (
    <div className="relative flex flex-col justify-center overflow-hidden bg-gray-50 py-8 lg:py-12">
      <article
        className="prose"
        dangerouslySetInnerHTML={{ __html: result }}
      ></article>
    </div>
  );
}
