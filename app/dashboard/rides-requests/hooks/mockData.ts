import { RideRequest } from "./types"
/**
 * Mock Data
 */
export const MOCK_RIDE_REQUESTS: RideRequest[] = [
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
