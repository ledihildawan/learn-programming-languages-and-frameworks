"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumbs } from "@/hooks/use-breadcrumbs";
import { Slash } from "lucide-react";
import Link from "next/link";
import { Fragment } from "react";

export function Breadcrumbs() {
  const breadcrumbs = useBreadcrumbs();

  if (breadcrumbs.isLoading && breadcrumbs.isLazy) return null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.data.map((item, index) => (
          <Fragment key={item.title}>
            {index !== breadcrumbs.data.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild={true}>
                  <Link href={item.link}>{item.title}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < breadcrumbs.data.length - 1 && (
              <BreadcrumbSeparator className="hidden md:block">
                <Slash />
              </BreadcrumbSeparator>
            )}
            {index === breadcrumbs.data.length - 1 && (
              <BreadcrumbPage>{item.title}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
