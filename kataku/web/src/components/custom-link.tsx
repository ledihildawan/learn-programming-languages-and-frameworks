"use client";

import { updateCustomLink } from "@/store/custom-link-store";
import { updateHistory } from "@/store/history-store";
import {
  navigationGuardStore,
  updateActiveNavigationGuard,
} from "@/store/navigation-guard-store";
import { batch, useStore } from "@tanstack/react-store";
import Link from "next/link";

interface CustomLinkProps extends React.ComponentProps<typeof Link> {
  children: React.ReactNode;
}

export function CustomLink({ children, ...props }: CustomLinkProps) {
  const navigationGuard = useStore(navigationGuardStore);

  return (
    <Link
      onNavigate={(e) => {
        updateHistory(props.href.toString());

        if (navigationGuard.enabled) {
          e.preventDefault();

          batch(() => {
            updateCustomLink(props.href.toString());
            updateActiveNavigationGuard(true);
          });
        }
      }}
      {...props}
    >
      {children}
    </Link>
  );
}
