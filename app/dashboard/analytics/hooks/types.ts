export interface RideStat {
  date: string
  completed: number
  cancelled: number
}

export interface StatusDistribution {
  status: string
  count: number
  fill: string
}

export interface AnalyticsData {
  totalRides: number
  totalRequests: number
  totalPassengers: number
  activeDrivers: number
  ridesOverTime: RideStat[]
  statusDistribution: StatusDistribution[]
}
