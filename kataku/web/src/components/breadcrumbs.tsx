"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { breadcrumbsStore } from "@/store/breadcrumbs-store";
import { useStore } from "@tanstack/react-store";
import { Slash } from "lucide-react";
import { Fragment } from "react";
import { CustomLink } from "./custom-link";

export function Breadcrumbs() {
  const breadcrumbs = useStore(breadcrumbsStore);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <Fragment key={item.title}>
            {index !== breadcrumbs.length - 1 && (
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink asChild={true}>
                  <CustomLink href={item.link}>{item.title}</CustomLink>
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
