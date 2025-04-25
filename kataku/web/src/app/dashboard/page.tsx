"use client";

import { CustomLink } from "@/components/custom-link";
import { SectionCards } from "@/components/section-cards";

export default function Page() {
  return (
    <div className="grid gap-4 px-4 lg:px-6">
      <div>
        <div className="text-2xl font-bold">Welcome to KataKu!</div>
        <div className="mt-4">
          Add a{" "}
          <CustomLink className="underline" href="/dashboard/notes/new">
            new note
          </CustomLink>{" "}
          or{" "}
          <CustomLink className="underline" href="/dashboard/notes">
            view existing ones
          </CustomLink>
          .
        </div>
      </div>

      <SectionCards />
    </div>
  );
}
