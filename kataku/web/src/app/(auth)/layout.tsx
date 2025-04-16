"use client";

import { authClient } from "@/lib/auth-client";
import { GalleryVerticalEnd } from "lucide-react";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const auth = authClient.useSession();

  if (auth.isPending) {
    return;
  }

  if (auth.data) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <div className="bg-primary text-primary-foreground flex h-6 w-6 items-center justify-center rounded-md">
            <GalleryVerticalEnd className="size-4" />
          </div>
          KataKu
        </a>
        {children}
      </div>
    </div>
  );
}
