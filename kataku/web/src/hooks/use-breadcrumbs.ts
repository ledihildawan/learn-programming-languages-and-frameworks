"use client";

import { breadcrumbsStore, updateBreadcrumbs } from "@/store/breadcrumbs-store";
import { useStore } from "@tanstack/react-store";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

type BreadcrumbItem = {
  title: string;
  link: string;
};

// This allows to add custom title as well
const routeMapping: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [{ title: "Dashboard", link: "/dashboard" }],
  // Add more custom mappings as needed
};

export function useBreadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = useStore(breadcrumbsStore);

  useEffect(() => {
    updateBreadcrumbs();
  }, [pathname]);

  return breadcrumbs;
}
