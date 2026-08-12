"use client"

import * as React from "react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, 
  SidebarRail,} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import SidebarNavItems from "./sidebarNavItems";
import { useAuthContext } from "@/app/(auth)/AuthContext";

type DashboardUser = {
  name: string
  email: string
  avatar: string
}


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logoutHandler } = useAuthContext();

  const dashboardUser: DashboardUser = {
    name: user ? `${user.first_name} ${user.last_name}`.trim() : SidebarNavItems.user.name,
    email: user?.email ?? SidebarNavItems.user.email,
    avatar: SidebarNavItems.user.avatar,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SidebarNavItems.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarNavItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={dashboardUser} onLogout={logoutHandler} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
