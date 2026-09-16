"use client"

import * as React from "react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader,
  SidebarRail,} from "@/components/ui/sidebar";
import { LayoutDashboard } from "lucide-react";
import { NavMain } from "@/app/dashboard/components/Sidebar/nav-main";
import { NavUser } from "@/app/dashboard/components/Sidebar/nav-user";
import { TeamSwitcher } from "@/app/dashboard/components/Sidebar/team-switcher";
import ManagementNavItems from "./managementNavItems";
import { useAuthContext } from "@/app/(auth)/AuthContext";

type ManagementUser = {
  name: string
  email: string
  avatar: string
}

export function ManagementSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user, logoutHandler } = useAuthContext();

  const managementUser: ManagementUser = {
    name: user ? `${user.first_name} ${user.last_name}`.trim() : ManagementNavItems.user.name,
    email: user?.email ?? ManagementNavItems.user.email,
    avatar: ManagementNavItems.user.avatar,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={ManagementNavItems.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={ManagementNavItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={managementUser}
          onLogout={logoutHandler}
          secondaryAction={{
            label: "Go to App",
            href: "/dashboard",
            icon: <LayoutDashboard className="size-4" />,
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
