"use client";

import { GalleryVerticalEnd } from "lucide-react";
import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";

const itemsRetrievingDataFromASingleTable = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].map((i) => ({
  url: `/retrieving-data-from-a-single-table#exercise-${i}`,
  title: `Exercise ${i}`,
}));

const itemsRetrievingDataFromMultipleTables = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((i) => ({
  url: `/retrieving-data-from-multiple-tables#exercise-${i}`,
  title: `Exercise ${i}`,
}));

const data = {
  navMain: [
    {
      title: "Retrieving Data From a Single Table",
      url: "/retrieving-data-from-a-single-table",
      items: itemsRetrievingDataFromASingleTable,
    },
    {
      title: "Retrieving Data From Multiple Tables",
      url: "/retrieving-data-from-multiple-tables",
      items: itemsRetrievingDataFromMultipleTables,
    },
    {
      title: "Inserting, Updating, and Deleting Data",
      url: "/inserting-updating-and-deleting-data",
      items: [],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [activeItemUrl, setActiveItemUrl] = React.useState<string | null>(null);

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Documentation</span>
                  <span className="">v1.0.0</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild isActive={activeItemUrl === item.url}>
                  <Link href={item.url} className="font-medium" onClick={() => setActiveItemUrl(item.url)}>
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={activeItemUrl === item.url}>
                          <Link href={item.url} onClick={() => setActiveItemUrl(item.url)}>
                            {item.title}
                          </Link>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
