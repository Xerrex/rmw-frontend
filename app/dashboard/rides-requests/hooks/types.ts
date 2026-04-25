export type RideRequestStatus = "pending" | "confirmed" | "cancelled" | "rejected"

export interface RideRequest {
  id: string
  rideId: string
  passengerName: string
  seatsRequested: number
  pickup: string
  dropOff: string
  route: string
  status: RideRequestStatus
  createdAt: string
  updatedAt: string
}
