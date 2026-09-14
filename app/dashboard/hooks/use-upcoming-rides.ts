"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"
import { useAuthContext } from "@/app/(auth)/AuthContext"

import type { UpcomingRide } from "./types"

async function fetchUpcomingRides(): Promise<UpcomingRide[]> {
  const response = await apiCaller.get<UpcomingRide[]>("/dashboard/upcoming-rides")
  return response.data
}

export function useUpcomingRides() {
  const { isAuthenticated } = useAuthContext()

  return useQuery({
    queryKey: ["dashboard", "upcoming-rides"],
    queryFn: fetchUpcomingRides,
    staleTime: 1000 * 60 * 2, // 2 minutes
    // Wait for the access token to be set by the auth bootstrap before fetching.
    enabled: isAuthenticated,
  })
}
