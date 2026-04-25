"use client"

import * as React from "react"

import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, 
  SidebarRail,} from "@/components/ui/sidebar";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";
import { TeamSwitcher } from "./team-switcher";
import SidebarNavItems from "./sidebarNavItems";


export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={SidebarNavItems.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={SidebarNavItems.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={SidebarNavItems.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
