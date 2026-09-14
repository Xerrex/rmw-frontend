"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"
import { AnalyticsData } from "./types"

interface AnalyticsApiResponse {
  total_rides: number
  total_requests: number
  total_passengers: number
  active_drivers: number
  rides_over_time: { date: string; completed: number; cancelled: number }[]
  status_distribution: { status: string; count: number }[]
}

/**
 * Hook to fetch dashboard analytics from the backend.
 */
export function useAnalytics() {
  const fetchAnalytics = async (): Promise<AnalyticsData> => {
    const response = await apiCaller.get<AnalyticsApiResponse>("/management/analytics")
    const data = response.data
    return {
      totalRides: data.total_rides,
      totalRequests: data.total_requests,
      totalPassengers: data.total_passengers,
      activeDrivers: data.active_drivers,
      ridesOverTime: data.rides_over_time,
      statusDistribution: data.status_distribution,
    }
  }

  return useQuery({
    queryKey: ["management", "analytics"],
    queryFn: fetchAnalytics,
  })
}
