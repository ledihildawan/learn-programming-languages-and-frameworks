// hooks/useBlockNavigation.ts
"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export function useBlockNavigation(
  shouldBlock: boolean,
  confirmMessage = "Perubahan belum disimpan. Yakin mau keluar?",
) {
  const router = useRouter();
  const shouldBlockRef = useRef(shouldBlock);
  const confirmMessageRef = useRef(confirmMessage);

  useEffect(() => {
    shouldBlockRef.current = shouldBlock;
    confirmMessageRef.current = confirmMessage;
  }, [shouldBlock, confirmMessage]);

  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (shouldBlockRef.current) {
        e.preventDefault();
        e.returnValue = confirmMessageRef.current;
      }
    };

    const handlePopState = () => {
      if (shouldBlockRef.current && !confirm(confirmMessageRef.current)) {
        // Stay on current page
        window.history.pushState(null, "", window.location.href);
      }
    };

    const originalPush = router.push;
    const originalReplace = router.replace;

    const confirmAndNavigate = (
      method: typeof router.push | typeof router.replace,
    ) => {
      return (...args: Parameters<typeof router.push>) => {
        if (!shouldBlockRef.current || confirm(confirmMessageRef.current)) {
          method(...args);
        }
      };
    };

    // Override router methods locally
    router.push = confirmAndNavigate(originalPush);
    router.replace = confirmAndNavigate(originalReplace);

    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);
      router.push = originalPush;
      router.replace = originalReplace;
    };
  }, []);
}
