export type RideRequestStatus = "pending" | "approved" | "rejected" | "cancelled"

export type RideStatus = "upcoming" | "completed" | "cancelled"

export interface RideRequest {
  id: string
  rideId: string
  passengerName: string
  seatsRequested: number
  pickup: string
  dropOff: string
  route: string
  status: RideRequestStatus
}

export interface Ride {
  id: string
  vehiclePlate: string
  seats: number
  townStarting: string
  townEnding: string
  departTime: string
  endTime: string
  status: RideStatus
  ownerName?: string
}
