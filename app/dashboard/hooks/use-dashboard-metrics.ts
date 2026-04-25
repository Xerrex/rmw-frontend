"use client"

import { useQuery } from "@tanstack/react-query"

import type { DashboardMetric } from "./types"

const MOCK_METRICS: DashboardMetric[] = [
  {
    id: "active-rides",
    label: "Active rides",
    value: "8",
    trendText: "+2 from yesterday",
    trendUp: true,
  },
  {
    id: "pending-requests",
    label: "Pending requests",
    value: "13",
    trendText: "+4 in last 24h",
    trendUp: true,
  },
  {
    id: "completed-trips",
    label: "Completed this week",
    value: "21",
    trendText: "+9% completion rate",
    trendUp: true,
  },
  {
    id: "cost-savings",
    label: "Community savings",
    value: "$1,480",
    trendText: "$230 more than last week",
    trendUp: true,
  },
]

async function fetchDashboardMetrics() {
  return Promise.resolve(MOCK_METRICS)
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: fetchDashboardMetrics,
  })
}
