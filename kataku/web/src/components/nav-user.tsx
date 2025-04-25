"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { authClient } from "@/lib/auth-client";
import { eden } from "@/lib/eden";
import { authStore } from "@/store/auth-store";
import { deleteAllRecent } from "@/store/recent-store";
import { useStore } from "@tanstack/react-store";
import { LogOutIcon, MoreVerticalIcon, UserCircleIcon } from "lucide-react";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { useTopLoader } from "nextjs-toploader";
import { useMemo } from "react";

export function NavUser() {
  const auth = useStore(authStore);
  const theme = useTheme();
  const router = useRouter();
  const sidebar = useSidebar();
  const topBarLoader = useTopLoader();

  const avatarFallback = useMemo(() => {
    if (!auth) {
      return "";
    }

    let value = "";

    const nameArr = auth.user?.name.split(" ");

    const firstName = nameArr?.[0];
    const lastName = nameArr?.[nameArr?.length - 1];

    if (firstName) {
      value += firstName[0].toUpperCase();
    }

    if (nameArr?.length! > 1 && lastName) {
      value += lastName[0].toUpperCase();
    }

    return value;
  }, [auth]);

  async function signOut() {
    topBarLoader.start();

    await eden.api["audit-log"].index.post({
      action: "sign-out",
      module: "auth",
      createdAt: new Date(),
      description: `You have successfully signed out on ${new Date().toLocaleString()} from a device with the IP ${localStorage.getItem("ip")}.`,
    });

    authClient.signOut({
      fetchOptions: {
        onSuccess: async () => {
          deleteAllRecent();

          setTimeout(() => {
            theme.setTheme("system");
          }, 400);

          router.push("/sign-in");
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
              <Avatar className="h-8 w-8 rounded-lg grayscale">
                <AvatarImage src={auth.user?.image!} alt={auth.user?.name} />
                <AvatarFallback className="rounded-lg">
                  {avatarFallback}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-medium">{auth.user?.name}</span>
                <span className="text-muted-foreground truncate text-xs">
                  {auth.user?.email}
                </span>
              </div>
              <MoreVerticalIcon className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={sidebar.isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-8 w-8 rounded-lg">
                  <AvatarImage src={auth.user?.image!} alt={auth.user?.name} />
                  <AvatarFallback className="rounded-lg">
                    {avatarFallback}
                  </AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">
                    {auth.user?.name}
                  </span>
                  <span className="text-muted-foreground truncate text-xs">
                    {auth.user?.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                <UserCircleIcon />
                Account
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={signOut}>
              <LogOutIcon />
              Sign Out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
