import { Store } from "@/types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isSlug(value: string) {
  return /^(?![-_])([a-zA-Z0-9-_.\u00C0-\u00FF]+(?:(?<=\w)[-_](?=\w))?)*[a-zA-Z0-9]$/i.test(
    value,
  );
}

export function updateStore<T>(
  store: Store<T>,
  key: keyof T,
  value: T[keyof T],
) {
  store.setState((state) => ({
    ...state,
    [key]: value,
  }));
}
