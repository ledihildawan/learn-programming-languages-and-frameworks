"use client";

import { useEffect } from "react";
import { useNavigationNextRouteGuardContext } from "./next-route-guard-provider";

export function useRouteGuard(shouldBlock: () => Promise<boolean> | boolean) {
  const { setShouldBlock } = useNavigationNextRouteGuardContext();

  useEffect(() => {
    setShouldBlock(() => shouldBlock);

    return () => {
      setShouldBlock(null);
    };
  }, [shouldBlock, setShouldBlock]);
}
