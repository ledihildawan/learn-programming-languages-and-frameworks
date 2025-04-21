"use client";

import Page from "@/components/page";
import { QueryProvider } from "@/components/query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { topLoaderStore } from "@/store/top-loader-store";
import { useStore } from "@tanstack/react-store";
import { NavigationGuardProvider } from "next-navigation-guard";
import NextTopLoader from "nextjs-toploader";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const topLoader = useStore(topLoaderStore);

  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {topLoader && (
            <NextTopLoader showSpinner={false} color="var(--primary)" />
          )}

          <NuqsAdapter>
            <QueryProvider>
              <NavigationGuardProvider>
                <Page>{children}</Page>
              </NavigationGuardProvider>
            </QueryProvider>
          </NuqsAdapter>

          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
