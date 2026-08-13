export type RideRequestStatus = "pending" | "approved" | "rejected" | "cancelled"

export type RideStatus = "upcoming" | "completed" | "cancelled"


export interface Ride {
  id: number
  uuid: string
  vehicle_plate: string
  seats: number
  town_starting: string
  town_ending: string
  depart_time: string
  end_time: string
  created_at: string
  updated_at: string
  status?: RideStatus
  // ownerName?: string
}

export interface RidesResponse{
  rides: Ride[]
}

export interface CreateRidePayload{
  vehiclePlate: string
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







