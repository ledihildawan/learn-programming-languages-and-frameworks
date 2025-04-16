"use client";

import { Button } from "@/components/ui/button";
import { authStore } from "@/store/auth-store";
import { useStore } from "@tanstack/react-store";
import Link from "next/link";

export default function Page() {
  const auth = useStore(authStore);

  return (
    <div className="px-4 lg:px-6">
      <div className="flex justify-end">
        <Button asChild>
          <Link href="/dashboard/notes/new">Add Note</Link>
        </Button>
      </div>
    </div>
  );
}
