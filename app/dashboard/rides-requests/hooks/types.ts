export type RideRequestStatus = "Pending" | "Accepted" | "Rejected"

// "requester" -> a request the current user made; "owner" -> a request made on a ride the user owns
export type ViewerRole = "requester" | "owner"

export interface RideRequestRideSummary {
  uuid: string
  vehicle_plate: string
  vehicle_model: string
  town_starting: string
  town_ending: string
  depart_time: string
  end_time: string
  status: string
}

export interface RideRequest {
  id: number
  uuid: string
  seats: number
  pickup: string
  stop: string
  status: RideRequestStatus
  created_at: string
  updated_at: string
  ride_id: number
  ride_requester_id: number
  ride: RideRequestRideSummary
  requester_name: string
  viewer_role: ViewerRole
  can_edit: boolean
  passenger_names?: string[] | null
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
  pickup: string
  stop: string
  passenger_names?: string[]
}

export type JoinRideResponse = RideRequest

export interface UpdateRideRequestPayload {
  rideUuid: string
  requestUuid: string
  seats: number
  pickup: string
  stop: string
  passenger_names?: string[]
}

export interface AuditLogEntry {
  id: number
  entity_type: "ride" | "ride_request"
  entity_uuid: string
  action: string
  changes?: Record<string, { from: unknown; to: unknown }> | null
  actor_name?: string | null
  created_at: string
}

