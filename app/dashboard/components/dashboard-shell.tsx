import Link from "next/link"
import { CarFront, ChartSpline, LayoutDashboard, Settings, Users } from "lucide-react"

import { ThemeModeToggle } from "@/app/landing/components/theme-mode-toggle"

const navItems = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "My Rides", href: "#", icon: CarFront },
  { label: "Requests", href: "#", icon: Users },
  { label: "Analytics", href: "#", icon: ChartSpline },
  { label: "Settings", href: "#", icon: Settings },
]

interface DashboardShellProps {
  children: React.ReactNode
}

export function DashboardShell({ children }: DashboardShellProps) {
  return (
    <div className="grid min-h-svh bg-background text-foreground lg:grid-cols-[260px_1fr]">
      <aside className="hidden border-r border-border bg-card/60 px-4 py-6 lg:block">
        <div className="mb-8 flex items-center gap-2 px-2">
          <div className="flex size-9 items-center justify-center rounded-full bg-primary/15 text-primary">
            <CarFront className="size-5" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Ride Sharing</p>
            <p className="text-lg font-semibold">Ride My Way</p>
          </div>
        </div>

        <nav className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
              >
                <Icon className="size-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <div className="flex min-h-svh flex-col">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6 lg:px-8">
          <div>
            <h1 className="text-lg font-semibold">Dashboard</h1>
            <p className="text-xs text-muted-foreground sm:text-sm">
              Welcome back. Manage rides, requests, and rider interactions.
            </p>
          </div>
          <ThemeModeToggle />
        </header>

        <main className="flex-1 px-4 py-5 sm:px-6 sm:py-6 lg:px-8">{children}</main>
      </div>
    </div>
  )
}
