import { Store } from "@tanstack/react-store";

interface BreadcrumbItem {
  title: string;
  link: string;
}

export function updateBreadcrumbs(customTitle?: string) {
  breadcrumbsStore.setState(() => generateBreadcrumbsFromPath(customTitle));
}

export function generateBreadcrumbsFromPath(customTitle?: string) {
  if (routeMapping[location.pathname]) {
    return routeMapping[location.pathname];
  }

  const segments = location.pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => {
    const title = segment.charAt(0).toUpperCase() + segment.slice(1);
    const isLastIndex = index === segments.length - 1;

    return {
      link: `/${segments.slice(0, index + 1).join("/")}`,
      title: isLastIndex ? customTitle! || title : title,
    };
  });
}

const routeMapping: Record<string, BreadcrumbItem[]> = {
  "/dashboard": [{ title: "Dashboard", link: "/dashboard" }],
};

export const breadcrumbsStore = new Store<BreadcrumbItem[]>(
  generateBreadcrumbsFromPath(),
);
