"use client"

import { useQuery } from "@tanstack/react-query"

import type { UpcomingRide } from "./types"

const MOCK_UPCOMING_RIDES: UpcomingRide[] = [
  {
    id: "ride-101",
    route: "Nairobi -> Kiambu",
    startTown: "Nairobi CBD",
    endTown: "Kiambu Town",
    startTime: "07:30 AM",
    etaTime: "08:20 AM",
    seatsAvailable: 2,
    vehicleNumber: "KDD 234R",
  },
  {
    id: "ride-102",
    route: "Nairobi -> Westlands",
    startTown: "South B",
    endTown: "Westlands",
    startTime: "08:10 AM",
    etaTime: "08:45 AM",
    seatsAvailable: 1,
    vehicleNumber: "KCA 822M",
  },
  {
    id: "ride-103",
    route: "Thika -> Nairobi",
    startTown: "Thika Town",
    endTown: "Upper Hill",
    startTime: "05:40 PM",
    etaTime: "06:55 PM",
    seatsAvailable: 3,
    vehicleNumber: "KBR 611P",
  },
]

async function fetchUpcomingRides() {
  return Promise.resolve(MOCK_UPCOMING_RIDES)
}

export function useUpcomingRides() {
  return useQuery({
    queryKey: ["dashboard", "upcoming-rides"],
    queryFn: fetchUpcomingRides,
  })
}
