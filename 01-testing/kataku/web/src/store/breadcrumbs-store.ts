import { BreadcrumbItem, BreadcrumbStore } from "@/types";
import { Store } from "@tanstack/react-store";

export function updateBreadcrumbs(values: BreadcrumbItem[]) {
  breadcrumbsStore.setState(() => values);
}

export const breadcrumbsStore = new Store<BreadcrumbStore>([
  { title: "Dashboard", link: "/dashboard" },
]);
