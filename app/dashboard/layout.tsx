import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { ThemeModeToggle } from "@/app/landing/components/theme-mode-toggle";
import { AppSidebar } from "./components/Sidebar/app-sidebar";
import { DynamicBreadcrumb } from "./components/breadcrumb";
import { BreadcrumbProvider } from "./components/breadcrumb/breadcrumb-context";
import { NotificationBell } from "./notifications/components/NotificationBell";

export default function DashboardLayout({ children,}: Readonly<{children: React.ReactNode}>) {
	return (
    <BreadcrumbProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <div className="flex flex-col gap-4 p-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="-ml-1" />
                <DynamicBreadcrumb />
              </div>

              <div className="flex items-center gap-2">
                <NotificationBell />
                <ThemeModeToggle />
              </div>
            </div>

            <main className="flex-1">{children}</main>

          </div>
        </SidebarInset>
      </SidebarProvider>
    </BreadcrumbProvider>
	)
}

