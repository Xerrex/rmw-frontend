"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"

import type { UpcomingRide } from "./types"

async function fetchUpcomingRides(): Promise<UpcomingRide[]> {
  const response = await apiCaller.get<UpcomingRide[]>("/dashboard/upcoming-rides")
  return response.data
}

export function useUpcomingRides() {
  return useQuery({
    queryKey: ["dashboard", "upcoming-rides"],
    queryFn: fetchUpcomingRides,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
