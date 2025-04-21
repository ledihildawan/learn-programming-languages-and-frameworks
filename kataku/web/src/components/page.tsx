"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { env } from "@/env/client";
import { customLinkStore } from "@/store/custom-link-store";
import { historyStore } from "@/store/history-store";
import {
  navigationGuardStore,
  updateActiveNavigationGuard,
  updateStateNavigationGuard,
} from "@/store/navigation-guard-store";
import { updateTopLoader } from "@/store/top-loader-store";
import { batch, useStore } from "@tanstack/react-store";
import { useNavigationGuard } from "next-navigation-guard";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { ReactNode } from "react";

export default function Page({ children }: { children: ReactNode }) {
  const router = useRouter();
  const topLoader = useTopLoader();
  const histories = useStore(historyStore);
  const customLink = useStore(customLinkStore);
  const navigationGuard = useStore(navigationGuardStore);
  const nextNavigationGuard = useNavigationGuard({
    enabled: navigationGuard.enabled,
  });

  return (
    <>
      {children}

      <AlertDialog open={navigationGuard.active || nextNavigationGuard.active}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to leave?</AlertDialogTitle>
            <AlertDialogDescription>
              You have unsaved changes. If you leave, your changes will be lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <Button
              variant="outline"
              onClick={() => {
                if (navigationGuard.active) {
                  updateActiveNavigationGuard(false);
                } else {
                  nextNavigationGuard.reject();
                }
              }}
            >
              Stay on Page
            </Button>
            <Button
              onClick={() => {
                if (navigationGuard.active) {
                  batch(() => {
                    updateTopLoader(true);
                    updateStateNavigationGuard({
                      active: false,
                      enabled: false,
                    });
                  });

                  if (
                    !histories.includes(
                      location.href.replace(env.NEXT_PUBLIC_WEB_URL, ""),
                    )
                  ) {
                    topLoader.start();
                  }

                  setTimeout(() => {
                    router.push(customLink);
                  }, 0);
                } else {
                  nextNavigationGuard.accept();
                }
              }}
            >
              Leave Page
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
