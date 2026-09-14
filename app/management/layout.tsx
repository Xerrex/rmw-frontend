"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ThemeModeToggle } from "@/app/landing/components/theme-mode-toggle";
import { ManagementSidebar } from "./components/Sidebar/management-sidebar";
import { useAuthContext } from "@/app/(auth)/AuthContext";

export default function ManagementLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const router = useRouter()
  const { loading, isAuthenticated, hasManagementAccess, isUserLoading } = useAuthContext()

  useEffect(() => {
    if (loading || isUserLoading) return
    if (!isAuthenticated) {
      router.replace("/")
      return
    }
    if (!hasManagementAccess) {
      router.replace("/dashboard")
    }
  }, [loading, isUserLoading, isAuthenticated, hasManagementAccess, router])

  if (loading || isUserLoading || !isAuthenticated || !hasManagementAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
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
