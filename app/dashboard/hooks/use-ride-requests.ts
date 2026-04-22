"use client"

import { useQuery } from "@tanstack/react-query"

import type { RideRequest } from "./types"

const MOCK_RIDE_REQUESTS: RideRequest[] = [
  {
    id: "req-450",
    passengerName: "Jane Njeri",
    seatsRequested: 1,
    pickup: "Muthaiga",
    dropOff: "Kiambu Road Junction",
    route: "Nairobi -> Kiambu",
    status: "pending",
  },
  {
    id: "req-451",
    passengerName: "Brian Otieno",
    seatsRequested: 2,
    pickup: "Ngara",
    dropOff: "Westlands Stage",
    route: "Nairobi -> Westlands",
    status: "approved",
  },
  {
    id: "req-452",
    passengerName: "Amina Noor",
    seatsRequested: 1,
    pickup: "Thika Superhighway",
    dropOff: "Museum Hill",
    route: "Thika -> Nairobi",
    status: "pending",
  },
]

async function fetchRideRequests() {
  return Promise.resolve(MOCK_RIDE_REQUESTS)
}

export function useRideRequests() {
  return useQuery({
    queryKey: ["dashboard", "ride-requests"],
    queryFn: fetchRideRequests,
  })
}
