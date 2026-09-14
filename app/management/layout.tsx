"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeModeToggle } from "@/app/landing/components/theme-mode-toggle";
import { ManagementSidebar } from "./components/Sidebar/management-sidebar";
import { useAuthContext } from "@/app/(auth)/AuthContext";

export default function ManagementLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const { loading, isAuthenticated, hasManagementAccess } = useAuthContext()

  useEffect(() => {
    if (loading) return
    if (!isAuthenticated) {
      router.replace("/")
      return
    }
    if (!hasManagementAccess) {
      router.replace("/dashboard")
    }
  }, [loading, isAuthenticated, hasManagementAccess, router])

  if (loading || !isAuthenticated || !hasManagementAccess) {
    return null
  }

  return (
    <SidebarProvider>
      <ManagementSidebar />
      <SidebarInset>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex items-center justify-between">
            <SidebarTrigger className="-ml-1" />
            <ThemeModeToggle />
          </div>

          <main className="flex-1">{children}</main>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
