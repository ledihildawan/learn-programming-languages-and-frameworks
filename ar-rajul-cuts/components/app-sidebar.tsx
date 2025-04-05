'use client';

import { AudioWaveform, Command, Notebook } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavRecents } from '@/components/nav-recents';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { App } from '@/server';
import { treaty } from '@elysiajs/eden';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

const server = treaty<App>(`http://localhost:44720`, {
  fetch: { credentials: 'include' },
});

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = authClient.useSession();

  const [recents, setRecents] = React.useState<any[]>([]);

  React.useEffect(() => {
    server.api.note.index.get().then(({ data }) => {
      setRecents(data?.data as any);
    });

    const recents = server.api.ws.subscribe();

    recents.subscribe((message: any) => {
      setRecents(message.data.data);
    });

    return () => {
      recents.close();
    };
  }, []);

  const data = {
    user: {
      name: session?.user.name,
      username: session?.user.username,
      avatar: '/avatars/shadcn.jpg',
    },
    teams: [
      {
        name: 'Acme Inc',
        logo: Command,
        plan: 'Enterprise',
      },
      {
        name: 'Acme Corp.',
        logo: AudioWaveform,
        plan: 'Startup',
      },
      {
        name: 'Evil Corp.',
        logo: Command,
        plan: 'Free',
      },
    ],
    navMain: [
      {
        title: 'Note',
        url: '/note',
        icon: Notebook,
        isActive: true,
      },
    ],
    favorites: [
      {
        name: 'Project Management & Task Tracking',
        url: '#',
        emoji: '📊',
      },
      {
        name: 'Family Recipe Collection & Meal Planning',
        url: '#',
        emoji: '🍳',
      },
      {
        name: 'Fitness Tracker & Workout Routines',
        url: '#',
        emoji: '💪',
      },
      {
        name: 'Book Notes & Reading List',
        url: '#',
        emoji: '📚',
      },
      {
        name: 'Sustainable Gardening Tips & Plant Care',
        url: '#',
        emoji: '🌱',
      },
      {
        name: 'Language Learning Progress & Resources',
        url: '#',
        emoji: '🗣️',
      },
      {
        name: 'Home Renovation Ideas & Budget Tracker',
        url: '#',
        emoji: '🏠',
      },
      {
        name: 'Personal Finance & Investment Portfolio',
        url: '#',
        emoji: '💰',
      },
      {
        name: 'Movie & TV Show Watchlist with Reviews',
        url: '#',
        emoji: '🎬',
      },
      {
        name: 'Daily Habit Tracker & Goal Setting',
        url: '#',
        emoji: '✅',
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
        <NavRecents recents={recents} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
