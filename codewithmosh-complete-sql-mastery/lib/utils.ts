import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function between(
  value: number,
  lower: number,
  upper: number,
  options = {
    inclusive: false,
  },
): boolean {
  const inclusive = options.inclusive ?? true;

  return inclusive ? value >= lower && value <= upper : value > lower && value < upper;
}
