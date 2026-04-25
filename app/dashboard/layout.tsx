import { SidebarInset, SidebarProvider, SidebarTrigger, } from "@/components/ui/sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, 
  BreadcrumbPage, BreadcrumbSeparator, } from "@/components/ui/breadcrumb"
import { ThemeModeToggle } from "@/app/landing/components/theme-mode-toggle";
import { AppSidebar } from "./components/Sidebar/app-sidebar"


export default function DashboardLayout({ children,}: Readonly<{children: React.ReactNode}>) {
	return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <div className="flex flex-col gap-4 p-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SidebarTrigger className="-ml-1" />
              
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Dashboard
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Overview</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            
            <ThemeModeToggle />
          </div>

          <main className="flex-1">{children}</main>

        </div>
      </SidebarInset>
    </SidebarProvider>
	)
}

