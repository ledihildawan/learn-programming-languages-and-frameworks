"use client";

import { breadcrumbsStore, updateData } from "@/store/breadcrumbs-store";
import { useStore } from "@tanstack/react-store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export function useBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = useStore(breadcrumbsStore);

  useEffect(() => {
    updateData({ pathname });
  }, [pathname]);

  return breadcrumbs;
}
