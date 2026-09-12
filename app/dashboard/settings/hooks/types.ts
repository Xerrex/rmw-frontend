export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
}

export interface Vehicle {
  id: number
  uuid: str
  vehicle_plate: str
  vehicle_model: str
  seats: number
  owner_id: number
  created_at: string
  updated_at: string
}

export interface CreateVehiclePayload {
  vehicle_plate: string
  vehicle_model: string
  seats: number
}

export interface ChangePasswordPayload {
  current_password: string
  new_password: string
}

export interface NotificationSettings {
  email: boolean
  push: boolean
  sms: boolean
}

export interface UserSettings {
  profile: UserProfile
  vehicle: VehicleDetails
  notifications: NotificationSettings
}

export interface VehicleDetails {
  plateNumber: string
  model: string
  seats: number
}
