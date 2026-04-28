"use client"

import { useQuery } from "@tanstack/react-query"
import { RideRequest } from "./types"

/**
 * Hook to fetch all ride requests
 */
export type FetchRideRequestsResponse = RideRequest[]

export function useRidesRequests() {
  const fetchRideRequests = async (): Promise<FetchRideRequestsResponse> => {
    console.log("Fetching all ride requests from backend...")
    // Mocking the backend call
    return Promise.resolve(MOCK_RIDE_REQUESTS)
  }

  return useQuery({
    queryKey: ["dashboard", "rides-requests"],
    queryFn: fetchRideRequests,
  })
}

export function useCreateRequest() {
  const createRequest = async (data: any) => {
    console.log("Creating new ride request with payload:", data)
    return Promise.resolve({ success: true, id: "req-" + Math.random().toString(36).substr(2, 9) })
  }

  return {
    mutate: createRequest,
    isPending: false, // Mock
  }
}

/**
 * Mock Data
 */
const MOCK_RIDE_REQUESTS: RideRequest[] = [
  {
    id: "req-101",
    rideId: "ride-1",
    passengerName: "David Kimani",
    seatsRequested: 1,
    pickup: "Junction Mall",
    dropOff: "Prestige Plaza",
    route: "Ngong Road",
    status: "pending",
    createdAt: "2026-04-25T10:00:00Z",
    updatedAt: "2026-04-25T10:00:00Z",
  },
  {
    id: "req-102",
    rideId: "ride-1",
    passengerName: "Sarah Wanjiku",
    seatsRequested: 2,
    pickup: "Adams Arcade",
    dropOff: "Valley Arcade",
    route: "Ngong Road",
    status: "confirmed",
    createdAt: "2026-04-25T11:00:00Z",
    updatedAt: "2026-04-25T11:30:00Z",
  },
  {
    id: "req-103",
    rideId: "ride-2",
    passengerName: "Michael Ochieng",
    seatsRequested: 1,
    pickup: "Westlands",
    dropOff: "Parklands",
    route: "Waiyaki Way",
    status: "rejected",
    createdAt: "2026-04-25T09:00:00Z",
    updatedAt: "2026-04-25T09:15:00Z",
  },
  {
    id: "req-104",
    rideId: "ride-3",
    passengerName: "Faith Mutua",
    seatsRequested: 1,
    pickup: "South B",
    dropOff: "South C",
    route: "Mombasa Road",
    status: "cancelled",
    createdAt: "2026-04-25T08:30:00Z",
    updatedAt: "2026-04-25T08:45:00Z",
  },
]
