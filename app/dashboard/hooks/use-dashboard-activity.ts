"use client"

import { useQuery } from "@tanstack/react-query"

import type { ActivityItem } from "./types"

const MOCK_ACTIVITY: ActivityItem[] = [
  {
    id: "activity-1",
    summary: "Ride request approved",
    detail: "You approved Brian Otieno for Nairobi -> Westlands.",
    timestamp: "10 minutes ago",
  },
  {
    id: "activity-2",
    summary: "New request received",
    detail: "Jane Njeri requested 1 seat on Nairobi -> Kiambu.",
    timestamp: "26 minutes ago",
  },
  {
    id: "activity-3",
    summary: "Ride completed",
    detail: "Your morning commute from Nairobi CBD to Ruiru was completed.",
    timestamp: "2 hours ago",
  },
]

async function fetchDashboardActivity() {
  return Promise.resolve(MOCK_ACTIVITY)
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: ["dashboard", "activity"],
    queryFn: fetchDashboardActivity,
  })
}
