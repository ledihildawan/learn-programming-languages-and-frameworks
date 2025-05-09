"use client";

import { Loader2 } from "lucide-react";
import { useLinkStatus } from "next/link";

export default function LoadingIndicator() {
  const { pending } = useLinkStatus();

  return pending ? <Loader2 className="size-4 animate-spin" /> : null;
}
