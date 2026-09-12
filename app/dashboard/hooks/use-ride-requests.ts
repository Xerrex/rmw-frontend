"use client"

import { useQuery } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"

import type { RideRequest } from "./types"

async function fetchRideRequests(): Promise<RideRequest[]> {
  const response = await apiCaller.get<RideRequest[]>("/dashboard/ride-requests")
  return response.data
}

export function useRideRequests() {
  return useQuery({
    queryKey: ["dashboard", "ride-requests"],
    queryFn: fetchRideRequests,
    staleTime: 1000 * 60 * 2, // 2 minutes
  })
}
