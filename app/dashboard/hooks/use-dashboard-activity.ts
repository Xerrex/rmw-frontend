"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"

import type { ActivityItem } from "./types"

async function fetchDashboardActivity(): Promise<ActivityItem[]> {
  const response = await apiCaller.get<ActivityItem[]>("/dashboard/activity")
  return response.data
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: fetchDashboardActivity,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
