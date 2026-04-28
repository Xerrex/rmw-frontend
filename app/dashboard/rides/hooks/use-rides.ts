"use client"

import { useQuery } from "@tanstack/react-query"
import type { Ride, RideRequest } from "./types"

const MOCK_RIDES: Ride[] = [
  {
    id: "ride-1",
    vehiclePlate: "KBA 123A",
    seats: 4,
    townStarting: "Nairobi",
    townEnding: "Nakuru",
    departTime: "2026-04-26T08:00:00Z",
    endTime: "2026-04-26T11:00:00Z",
    status: "upcoming",
  },
  {
    id: "ride-2",
    vehiclePlate: "KBB 456B",
    seats: 3,
    townStarting: "Mombasa",
    townEnding: "Nairobi",
    departTime: "2026-04-25T06:00:00Z",
    endTime: "2026-04-25T14:00:00Z",
    status: "completed",
  },
  {
    id: "ride-3",
    vehiclePlate: "KBC 789C",
    seats: 2,
    townStarting: "Kisumu",
    townEnding: "Eldoret",
    departTime: "2026-04-27T09:00:00Z",
    endTime: "2026-04-27T12:00:00Z",
    status: "cancelled",
  },
]

const MOCK_RIDE_REQUESTS: RideRequest[] = [
  {
    id: "req-1",
    rideId: "ride-1",
    passengerName: "John Doe",
    seatsRequested: 1,
    pickup: "Westlands",
    dropOff: "Kenyatta Avenue",
    route: "Westlands -> CBD",
    status: "pending",
  },
  {
    id: "req-2",
    rideId: "ride-1",
    passengerName: "Jane Smith",
    seatsRequested: 2,
    pickup: "South C",
    dropOff: "Upper Hill",
    route: "South C -> Upper Hill",
    status: "rejected",
  },
  {
    id: "req-3",
    rideId: "ride-2",
    passengerName: "Alice Kamau",
    seatsRequested: 1,
    pickup: "Pangani",
    dropOff: "Ngara",
    route: "Pangani -> Ngara",
    status: "cancelled",
  },
]

async function fetchRides() {
  console.log("Fetching rides from backend...")
  return Promise.resolve(MOCK_RIDES)
}

async function fetchRideRequests() {
  console.log("Fetching ride requests from backend...")
  return Promise.resolve(MOCK_RIDE_REQUESTS)
}

export function useRides() {
  return useQuery({
    queryKey: ["dashboard", "rides"],
    queryFn: fetchRides,
  })
}

export function useAllRideRequests() {
  return useQuery({
    queryKey: ["dashboard", "all-ride-requests"],
    queryFn: fetchRideRequests,
  })
}

export function useCreateRide() {
  const createRide = async (data: Partial<Ride>) => {
    console.log("Creating new ride with payload:", data)
    return Promise.resolve({ success: true, id: "ride-" + Math.random().toString(36).substr(2, 9) })
  }

  return {
    mutate: createRide,
    isPending: false, // Mock
  }
}

export function useSearchRides() {
  const searchRides = async (params: { pickup: string; dropoff: string }) => {
    console.log("Searching rides with params:", params)
    // Return rides that match the route roughly
    return Promise.resolve(MOCK_RIDES.filter(r => 
      r.townStarting.toLowerCase().includes(params.pickup.toLowerCase()) || 
      r.townEnding.toLowerCase().includes(params.dropoff.toLowerCase())
    ))
  }

  return {
    mutateAsync: searchRides,
    isPending: false, // Mock
  }
}
