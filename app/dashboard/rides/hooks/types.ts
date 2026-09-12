export type RideRequestStatus = "pending" | "approved" | "rejected" | "cancelled"

export type RideStatus = "upcoming" | "completed" | "rescheduled" | "canceled"


export interface Ride {
  id: number
  uuid: string
  vehicle_id?: number | null
  vehicle_plate: string
  vehicle_model: string
  seats: number
  town_starting: string
  town_ending: string
  depart_time: string
  end_time: string
  created_at: string
  updated_at: string
  status: RideStatus
  owner_name?: string | null
  available_seats: number
  is_owner: boolean
  pending_requests_count?: number | null
  has_requested?: boolean | null
}

export interface RidesResponse{
  rides: Ride[]
  total: number
  page: number
  limit: number
}

export interface CreateRidePayload{
  vehicleId?: number
  vehiclePlate?: string
  vehicleModel?: string
  seats: number
  townStarting: string
  townEnding: string
  departTime: string
  endTime: string
}

export type CreateRideResponse = Ride;



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

// Real backend-driven ride request shape, used on the ride details page.
export type BackendRideRequestStatus = "Pending" | "Accepted" | "Rejected"
export type ViewerRole = "requester" | "owner"

export interface RideRequestDetail {
  id: number
  uuid: string
  seats: number
  pickup: string
  stop: string
  status: BackendRideRequestStatus
  created_at: string
  updated_at: string
  ride_id: number
  ride_requester_id: number
  requester_name?: string | null
  viewer_role?: ViewerRole | null
  can_edit: boolean
  passenger_names?: string[] | null
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







