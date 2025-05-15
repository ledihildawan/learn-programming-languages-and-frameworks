"use client";

import { KataKuLogo } from "@/components/kataku-logo";
import { useIp } from "@/hooks/use-ip";
import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const ip = useIp();
  const auth = authClient.useSession();

  if (auth.isPending || ip.isPending) {
    return;
  }

  if (auth.data) {
    redirect("/dashboard");
  }

  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <a href="#" className="flex items-center gap-2 self-center font-medium">
          <KataKuLogo width={64} height={64} />
        </a>
        {children}
      </div>
    </div>
  );
}
