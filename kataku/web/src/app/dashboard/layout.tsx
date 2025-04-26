"use client";

import { AppSidebar } from "@/components/app-sidebar";
import Error500 from "@/components/error-500";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useServerStatus } from "@/hooks/use-server-status";
import { authClient } from "@/lib/auth-client";
import { eden } from "@/lib/eden";
import { authStore } from "@/store/auth-store";
import { dashboardStore } from "@/store/dashboard-store";
import { useStore } from "@tanstack/react-store";
import { notFound, useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { ReactNode, useEffect } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  const auth = authClient.useSession();
  const router = useRouter();
  const dashboard = useStore(dashboardStore);
  const serverStatus = useServerStatus();
  const topBarLoader = useTopLoader();

  useEffect(() => {
    if (localStorage.getItem("isOAuthSignInSuccess")) {
      eden.api["audit-log"].index
        .post({
          action: "sign-in",
          module: "auth",
          createdAt: new Date(),
          description: `The sign-in was successful on ${new Date().toLocaleString()} from a device with the IP ${localStorage.getItem("ip")}.`,
        })
        .then(() => {
          localStorage.removeItem("isOAuthSignInSuccess");
        });
    }
  }, []);

  useEffect(() => {
    topBarLoader.start();

    if (!auth.isPending) {
      topBarLoader.done();
    }

    if (auth.data?.session && auth.data?.user) {
      authStore.setState((state) => ({
        ...state,
        user: auth.data!.user,
        session: auth.data!.session,
      }));
    }
  }, [auth.data]);

  if (serverStatus.isPending || auth.isPending) {
    return;
  }

  if (serverStatus.isError) {
    return <Error500 />;
  }

  if (!auth.data) {
    return router.push("/sign-in");
  }

  if (dashboard.notFound) {
    return notFound();
  }

  return (
    <SidebarProvider>
      <AppSidebar variant="inset" />
      <SidebarInset>
        <SiteHeader />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              {children}
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
