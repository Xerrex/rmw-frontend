import { ActivityFeedCard } from "./components/overview/activity-feed-card"
import { DashboardMetrics } from "./components/overview/dashboard-metrics"
import { DashboardQuickActions } from "./components/overview/dashboard-quick-actions"
import { RideRequestsCard } from "./components/overview/ride-requests-card"
import { UpcomingRidesCard } from "./components/overview/upcoming-rides-card"

export default function DashboardPage() {
	return (
		<div className="space-y-5 sm:space-y-6">
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

