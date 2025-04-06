import { NavMain } from '@/components/nav-main';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { Command, Notebook } from 'lucide-react';
import * as React from 'react';
import { NavRecents } from './nav-recents';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const data = {
    teams: [
      {
        name: 'Acme Inc',
        logo: Command,
        plan: 'Enterprise',
      },
    ],
    navMain: [
      {
        title: 'Note',
        url: '/dashboard/admin',
        icon: Notebook,
        isActive: true,
      },
    ],
  };

  return (
    <Sidebar className="border-r-0" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        <NavRecents recents={[]} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}
