import { Store } from "@tanstack/store";

export const topLoaderStore = new Store(true);

export function updateTopLoader(value: boolean) {
  topLoaderStore.setState(() => value);
}
