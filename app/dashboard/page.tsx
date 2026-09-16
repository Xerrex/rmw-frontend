import { ActivityFeedCard } from "./components/overview/activity-feed-card";
import { DashboardMetrics } from "./components/overview/dashboard-metrics";
import { DashboardQuickActions } from "./components/overview/dashboard-quick-actions";
import { RideRequestsCard } from "./components/overview/ride-requests-card";
import { UpcomingRidesCard } from "./components/overview/upcoming-rides-card";

export default function Page() {
  return (
    <div className="space-y-8">
      <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6 lg:px-8">
        <div>
          <h1 className="text-lg font-semibold">Dashboard</h1>
          <p className="text-xs text-muted-foreground sm:text-sm">
            Welcome back. Manage rides, requests, and rider interactions.
          </p>
        </div>
      </header>
        
      <DashboardMetrics />

      <DashboardQuickActions />

      <div className="grid gap-5 xl:grid-cols-[1.25fr_1fr]">
        <UpcomingRidesCard />
        <RideRequestsCard />
      </div>
      <ActivityFeedCard />
    </div>
  )
}
