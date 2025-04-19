"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  breadcrumbsStore,
  generateBreadcrumbsFromPath,
} from "@/store/breadcrumbs-store";
import { useStore } from "@tanstack/react-store";
import { Slash } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Fragment, useEffect, useMemo } from "react";
import { Skeleton } from "./ui/skeleton";

export function Breadcrumbs() {
  const pathname = usePathname();
  const { data: breadcrumbs, isLoading } = useStore(breadcrumbsStore);

  const pathnameArr = useMemo(() => pathname.split("/"), [pathname]);

  useEffect(() => {
    breadcrumbsStore.setState((state) => ({
      ...state,
      data: generateBreadcrumbsFromPath(pathname),
    }));
  }, [pathname]);

  console.log(pathname);

  if (isLoading) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {pathnameArr.map((_, index) => (
            <Fragment key={`breadcrumb-${index}-loading`}>
              {index !== pathnameArr.length - 1 && (
                <Skeleton className={`h-3 w-[68px] rounded-full`} />
              )}
              {index < pathnameArr.length - 1 && (
                <BreadcrumbSeparator className="hidden md:block">
                  <Slash />
                </BreadcrumbSeparator>
              )}
              {index === pathnameArr.length - 1 && (
                <Skeleton className="h-3 w-[68px] rounded-full" />
              )}
            </Fragment>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <Fragment key={item.title}>
            {index !== breadcrumbs.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild={true}>
                  <Link href={item.link}>{item.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block">
                <Slash />
              </BreadcrumbSeparator>
            )}
            {index === breadcrumbs.length - 1 && (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
