import { BreadcrumbItem, BreadcrumbStore } from "@/types";
import { Store } from "@tanstack/react-store";

export function updateBreadcrumbs(value: string) {
  breadcrumbsStore.setState((state) => ({
    ...state,
    data: generateBreadcrumbsFromPath(value),
  }));
}

export function updateIsLoading(loading: boolean) {
  breadcrumbsStore.setState((state) => ({
    ...state,
    isLoading: loading,
  }));
}

export function updateIsLazy(lazy: boolean) {
  breadcrumbsStore.setState((state) => ({
    ...state,
    isLazy: lazy,
  }));
}

export function generateBreadcrumbsFromPath(value: string) {
  if (routeMapping[value]) {
    return routeMapping[value];
  }

  const segments = value.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    link: `/${segments.slice(0, index + 1).join("/")}`,
    title: segment.charAt(0).toUpperCase() + segment.slice(1),
  }));
}

const routeMapping: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [{ title: "Dashboard", link: "/dashboard" }],
};

export const breadcrumbsStore = new Store<BreadcrumbStore>({
  data: generateBreadcrumbsFromPath("/dashboard"),
  isLazy: false,
  isLoading: false,
});
