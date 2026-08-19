export type RideRequestStatus = "pending" | "confirmed" | "cancelled" | "rejected"

export interface RideRequest {
  // id: string
  uuid: string
  seats: string
  pickup: string
  stop: string
  status: RideRequestStatus
  created_at: string
  updated_at: string
  ride:{
    uuid: string
    vehicle_plate: string
    town_starting: string
    town_ending: string
    depart_time: string
    end_time: string
    status: string
  }
  requester_name: string
}


export interface RideRequestsResponse {
  r_requests: RideRequest[]
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
