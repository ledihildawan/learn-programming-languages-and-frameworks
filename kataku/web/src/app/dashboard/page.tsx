"use client";

import { CustomLink } from "@/components/custom-link";
import { SectionCards } from "@/components/section-cards";
import { authStore } from "@/store/auth-store";
import { updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { useStore } from "@tanstack/react-store";
import { format } from "date-fns";
import { useEffect } from "react";

export default function Page() {
  const auth = useStore(authStore);

  useEffect(() => {
    updateBreadcrumbs([{ title: "Dashboard", link: "/dashboard" }]);
  }, []);

  return (
    <div className="grid gap-8 px-4 lg:px-6">
      <div>
        <div className="text-2xl font-bold">Hello, {auth.user?.name}!</div>
        <div className="mt-4">
          {format(new Date(), "'Today is ' eeee")},{" "}
          {new Date().toLocaleDateString()}. Ready to capture your next great
          idea?{" "}
          <CustomLink className="underline" href="/dashboard/notes/new">
            Add a new note
          </CustomLink>{" "}
          or{" "}
          <CustomLink className="underline" href="/dashboard/notes">
            revisit your existing ones to stay on track!
          </CustomLink>
          .
        </div>
      </div>

      <SectionCards />
    </div>
  );
}
