"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

const NextRouteGuardContext = createContext<{
  setShouldBlock: (fn: (() => boolean) | null) => void;
  getShouldBlock: () => boolean;
} | null>(null);

export function NextRouteGuardProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const shouldBlockRef = useRef<(() => boolean) | null>(null);

  const setShouldBlock = (fn: (() => boolean) | null) => {
    shouldBlockRef.current = fn;
  };

  const getShouldBlock = useCallback(() => {
    return typeof shouldBlockRef.current === "function"
      ? shouldBlockRef.current()
      : false;
  }, []);

  useEffect(() => {
    const handler = (e: BeforeUnloadEvent) => {
      if (getShouldBlock()) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handler);

    return () => window.removeEventListener("beforeunload", handler);
  }, [getShouldBlock]);

  useEffect(() => {
    const handler = (e: PopStateEvent) => {
      if (
        getShouldBlock()
        // !confirm("Perubahan belum disimpan. Yakin mau keluar?")
      ) {
        e.preventDefault();

        history.forward();
      }
    };

    window.addEventListener("popstate", handler);

    return () => window.removeEventListener("popstate", handler);
  }, [getShouldBlock]);

  return (
    <NextRouteGuardContext.Provider value={{ setShouldBlock, getShouldBlock }}>
      {children}
    </NextRouteGuardContext.Provider>
  );
}

export const useNavigationNextRouteGuardContext = () => {
  const context = useContext(NextRouteGuardContext);

  if (!context) {
    throw new Error(
      "useNavigationNextRouteGuardContext must be inside NextRouteGuardProvider",
    );
  }

  return context;
};
