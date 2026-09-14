"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"
import { useAuthContext } from "@/app/(auth)/AuthContext"

import type { RideRequest } from "./types"

async function fetchRideRequests(): Promise<RideRequest[]> {
  const response = await apiCaller.get<RideRequest[]>("/dashboard/ride-requests")
  return response.data
}

export function useRideRequests() {
  const { isAuthenticated } = useAuthContext()

  return useQuery({
    queryKey: ["dashboard", "ride-requests"],
    queryFn: fetchRideRequests,
    staleTime: 1000 * 60 * 2, // 2 minutes
    // Wait for the access token to be set by the auth bootstrap before fetching.
    enabled: isAuthenticated,
  })
}
