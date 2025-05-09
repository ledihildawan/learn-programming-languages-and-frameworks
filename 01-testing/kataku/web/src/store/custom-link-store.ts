import { Store } from "@tanstack/store";

export const customLinkStore = new Store("");

export function updateCustomLink(value: string) {
  customLinkStore.setState(() => value);
}
