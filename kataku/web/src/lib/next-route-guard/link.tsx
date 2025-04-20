"use client";

import { default as NextLink, LinkProps as NextLinkProps } from "next/link";
import { useRouter } from "next/navigation";
import { useNavigationNextRouteGuardContext } from "./next-route-guard-provider";

type LinkProps = NextLinkProps & {
  children: React.ReactNode;
  className?: string;
  onBeforeNavigate?: () => Promise<boolean> | boolean;
};

export function Link({
  href,
  children,
  className,
  replace,
  scroll,
  prefetch,
  shallow,
  legacyBehavior,
  onBeforeNavigate,
  ...rest
}: LinkProps) {
  const router = useRouter();
  const { getShouldBlock } = useNavigationNextRouteGuardContext();

  const handleClick = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    // Step 1: Kalau guard aktif
    if (getShouldBlock()) {
      if (onBeforeNavigate) {
        const proceed = await onBeforeNavigate();
        if (!proceed) return;
      } else if (!confirm("Perubahan belum disimpan. Lanjut?")) {
        return;
      }
    }

    // Step 2: Navigasi dilakukan manual
    if (replace) {
      router.replace(href as string);
    } else {
      router.push(href as string);
    }
  };

  return (
    <NextLink
      href={"#"}
      replace={replace}
      scroll={scroll}
      prefetch={prefetch}
      shallow={shallow}
      className={className}
      onClick={handleClick}
      {...rest}
    >
      {children}
    </NextLink>
  );
}
