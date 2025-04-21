import { Store } from "@tanstack/store";
import { unique } from "radash";

export const historyStore = new Store<string[]>([]);

export function updateHistory(link: string) {
  historyStore.setState((histories) => unique([...histories, link]));
}
