'use client';

import { AudioWaveform, Command, Notebook } from 'lucide-react';
import * as React from 'react';

import { NavMain } from '@/components/nav-main';
import { NavRecents } from '@/components/nav-recents';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarRail } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { NavUser } from './nav-user';
import { TeamSwitcher } from './team-switcher';

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const {
    data: session,
    isPending, //loading state
    error, //error object
    refetch, //refetch the session
  } = authClient.useSession();

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
        <NavRecents favorites={data.favorites} />
      </SidebarContent>
      <SidebarRail />
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
