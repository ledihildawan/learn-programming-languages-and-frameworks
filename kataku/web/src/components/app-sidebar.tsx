"use client";

import { NavMain } from "@/components/nav-main";
import { NavRecent } from "@/components/nav-recent";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { recentStore } from "@/store/recent-store";
import { useStore } from "@tanstack/react-store";
import {
  LayoutDashboardIcon,
  ListIcon,
  NotebookIcon,
  SettingsIcon,
} from "lucide-react";
import * as React from "react";
import { CustomLink } from "./custom-link";
import { KataKuLogo } from "./kataku-logo";

const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: LayoutDashboardIcon,
    },
    {
      title: "Notes",
      url: "/notes",
      icon: NotebookIcon,
    },
    {
      title: "Audit Logs",
      url: "/audit-logs",
      icon: ListIcon,
    },
  ],
  navSecondary: [
    {
      title: "Settings",
      url: "/settings",
      icon: SettingsIcon,
    },
  ],
  documents: [],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const recent = useStore(recentStore) as any;
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <CustomLink href="/" className="flex items-center gap-2">
                <KataKuLogo height={20} width={20}></KataKuLogo>
                <span className="text-base font-semibold">KataKu</span>
              </CustomLink>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavRecent items={recent} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
