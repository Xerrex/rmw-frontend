"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"
import { useAuthContext } from "@/app/(auth)/AuthContext"

import type { DashboardMetric } from "./types"

async function fetchDashboardMetrics(): Promise<DashboardMetric[]> {
  const response = await apiCaller.get<DashboardMetric[]>("/dashboard/metrics")
  return response.data
}

export function useDashboardMetrics() {
  const { isAuthenticated } = useAuthContext()

  return useQuery({
    queryKey: ["dashboard", "metrics"],
    queryFn: fetchDashboardMetrics,
    staleTime: 1000 * 60 * 2, // 2 minutes
    // Wait for the access token to be set by the auth bootstrap before fetching.
    enabled: isAuthenticated,
  })
}
