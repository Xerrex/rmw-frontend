export interface UserProfile {
  firstName: string
  lastName: string
  email: string
  phone?: string
  avatar?: string
}

export interface VehicleDetails {
  plateNumber: string
  model: string
  seats: number
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
