"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"

import type { DashboardMetric } from "./types"

async function fetchDashboardMetrics(): Promise<DashboardMetric[]> {
  const response = await apiCaller.get<DashboardMetric[]>("/dashboard/metrics")
  return response.data
}

export function useDashboardMetrics() {
  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: fetchDashboardMetrics,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
