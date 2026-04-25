"use client"

import { useQuery } from "@tanstack/react-query"
import { AnalyticsData } from "./types"

/**
 * Hook to fetch dashboard analytics
 */
export type FetchAnalyticsResponse = AnalyticsData

export function useAnalytics() {
  const fetchAnalytics = async (): Promise<FetchAnalyticsResponse> => {
    console.log("Fetching analytics from backend...")
    // Mocking the backend call
    return Promise.resolve(MOCK_ANALYTICS_DATA)
  }

  return useQuery({
    queryKey: ["dashboard", "analytics"],
    queryFn: fetchAnalytics,
  })
}

/**
 * Mock Data
 */
const MOCK_ANALYTICS_DATA: AnalyticsData = {
  totalRides: 1250,
  totalRequests: 3420,
  totalPassengers: 890,
  activeDrivers: 45,
  ridesOverTime: [
    { date: "Mon", completed: 45, cancelled: 5 },
    { date: "Tue", completed: 52, cancelled: 8 },
    { date: "Wed", completed: 48, cancelled: 4 },
    { date: "Thu", completed: 61, cancelled: 6 },
    { date: "Fri", completed: 55, cancelled: 10 },
    { date: "Sat", completed: 40, cancelled: 12 },
    { date: "Sun", completed: 35, cancelled: 7 },
  ],
  statusDistribution: [
    { status: "confirmed", count: 2100, fill: "var(--color-confirmed)" },
    { status: "pending", count: 800, fill: "var(--color-pending)" },
    { status: "rejected", count: 320, fill: "var(--color-rejected)" },
    { status: "cancelled", count: 200, fill: "var(--color-cancelled)" },
  ],
}
