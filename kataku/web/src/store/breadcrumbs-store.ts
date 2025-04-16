import { Store } from "@tanstack/react-store";

export interface BreadcrumbItem {
  link: string;
  title: string;
}

interface BreadcrumbStore {
  data: BreadcrumbItem[];
  isLazy: boolean;
  isLoading: boolean;
}

export function updateData({
  isLazy,
  pathname,
  customTitle,
}: {
  isLazy?: boolean;
  pathname: string;
  customTitle?: string;
}) {
  breadcrumbsStore.setState((state) => ({
    ...state,
    data: generateBreadcrumbsFromPath({ pathname, customTitle }),
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

export function generateBreadcrumbsFromPath({
  isLazy,
  pathname,
  customTitle,
}: {
  isLazy?: boolean;
  pathname: string;
  customTitle?: string;
}) {
  if (routeMapping[pathname]) {
    return routeMapping[pathname];
  }

  const segments = pathname.split("/").filter(Boolean);

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

export const breadcrumbsStore = new Store<BreadcrumbStore>({
  data: generateBreadcrumbsFromPath({ pathname: "/dashboard" }),
  isLazy: false,
  isLoading: false,
});
