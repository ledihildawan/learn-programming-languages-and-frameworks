import { NavigationGuardStore } from "@/types";
import { Store } from "@tanstack/store";

export const navigationGuardStore = new Store<NavigationGuardStore>({
  active: false,
  enabled: false,
});

export function updateActiveNavigationGuard(value: boolean) {
  navigationGuardStore.setState((state) => ({ ...state, active: value }));
}

export function updateEnabledNavigationGuard(value: boolean) {
  navigationGuardStore.setState((state) => ({ ...state, enabled: value }));
}

export function updateStateNavigationGuard(
  value: Partial<NavigationGuardStore>,
) {
  navigationGuardStore.setState((state) => ({ ...state, ...value }));
}
