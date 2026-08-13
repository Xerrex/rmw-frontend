export type RideRequestStatus = "pending" | "confirmed" | "cancelled" | "rejected"

export interface RideRequest {
  // id: string
  uuid: string
  seats: string
  stop: string
  status: RideRequestStatus
  created_at: string
  updated_at: string
  requester_name: string
}


export interface RideRequestsResponse {
  ride_requests: RideRequest[]
  total: number
  page: number
  limit: number
}


export interface JoinRidePayload{
  rideUuid: string
  seats: number
  stop: string
}

export type JoinRideResponse = RideRequest
