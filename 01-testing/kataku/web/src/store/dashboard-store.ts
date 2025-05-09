import { DashboardStore } from "@/types";
import { Store } from "@tanstack/react-store";

export function updateNotFoundDashboard(value: boolean) {
  dashboardStore.setState((state) => ({ ...state, notFound: value }));
}

export const dashboardStore = new Store<DashboardStore>({
  notFound: false,
});
