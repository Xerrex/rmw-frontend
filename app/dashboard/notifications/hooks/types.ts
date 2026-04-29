export type NotificationType = "ride_update" | "request_received" | "request_accepted" | "request_rejected" | "general"

export interface Notification {
  id: string
  title: string
  message: string
  type: NotificationType
  relatedId?: string // e.g. rideId or requestId
  isRead: boolean
  createdAt: string
}
