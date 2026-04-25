export interface DashboardMetric {
  id: string
  label: string
  value: string
  trendText: string
  trendUp: boolean
}

export interface UpcomingRide {
  id: string
  route: string
  startTown: string
  endTown: string
  startTime: string
  etaTime: string
  seatsAvailable: number
  vehicleNumber: string
}

export interface ActivityItem {
  id: string
  summary: string
  detail: string
  timestamp: string
}
