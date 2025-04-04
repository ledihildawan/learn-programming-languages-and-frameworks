'use client';

import { ChevronsUpDown, LogOut } from 'lucide-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { authClient } from '@/lib/auth-client';
import { redirect } from 'next/navigation';
import { useMemo } from 'react';
import { Skeleton } from './ui/skeleton';

interface NavUserProps {
  user: {
    username: string;
  };
}

function User({ user }: NavUserProps) {
  const firstChartUsername = useMemo(() => user.username?.charAt(0).toUpperCase() || 'n', [user.username]);

  const avatarSrc = useMemo(() => `https://placehold.co/32x32?text=${firstChartUsername}`, [firstChartUsername]);

  return user.username ? (
    <>
      <Avatar className="h-8 w-8 rounded-lg">
        <AvatarImage src={avatarSrc} alt={user.username} />
        <AvatarFallback className="rounded-lg">{firstChartUsername}</AvatarFallback>
      </Avatar>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-semibold">{user.username}</span>
      </div>
    </>
  ) : (
    <div className="flex items-center gap-2">
      <Skeleton className="h-8 w-8 rounded-lg" />
      <Skeleton className="h-3 w-[144px]" />
    </div>
  );
}

export function NavUser({ user }: NavUserProps) {
  const { isMobile } = useSidebar();

  async function signOut() {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          redirect('/sign-in');
        },
      },
    });
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <User user={user} />
              {user?.username ? (
                <ChevronsUpDown className="ml-auto size-4" />
              ) : (
                <Skeleton className="h-4 w-4 ml-auto rounded-sm" />
              )}
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <User user={user} />
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => signOut()} className="cursor-pointer">
              <LogOut />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
