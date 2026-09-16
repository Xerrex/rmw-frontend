"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { Notification } from "./types"
import { useEffect, useState } from "react"

const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-1",
    title: "New Ride Request",
    message: "John Doe wants to join your ride to Nakuru.",
    type: "request_received",
    relatedId: "req-1",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(), // 5 mins ago
  },
  {
    id: "notif-2",
    title: "Request Accepted",
    message: "Your request to join Sarah's ride has been accepted.",
    type: "request_accepted",
    relatedId: "ride-1",
    isRead: false,
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 mins ago
  },
  {
    id: "notif-3",
    title: "Ride Cancelled",
    message: "The ride from Kisumu has been cancelled by the driver.",
    type: "ride_update",
    relatedId: "ride-3",
    isRead: true,
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  }
]

export function useNotifications() {
  const queryClient = useQueryClient()

  const { data: notifications = [], isLoading } = useQuery({
    queryKey: ["notifications"],
    queryFn: async () => {
      console.log("Fetching notifications...")
      return Promise.resolve([...MOCK_NOTIFICATIONS])
    }
  })

  const markAsRead = useMutation({
    mutationFn: async (id: string) => {
      console.log(`Marking notification ${id} as read...`)
      return Promise.resolve(id)
    },
    onSuccess: (id) => {
      queryClient.setQueryData(["notifications"], (old: Notification[] | undefined) => {
        if (!old) return []
        return old.map(n => n.id === id ? { ...n, isRead: true } : n)
      })
    }
  })

  const markAllAsRead = useMutation({
    mutationFn: async () => {
      console.log("Marking all notifications as read...")
      return Promise.resolve()
    },
    onSuccess: () => {
      queryClient.setQueryData(["notifications"], (old: Notification[] | undefined) => {
        if (!old) return []
        return old.map(n => ({ ...n, isRead: true }))
      })
    }
  })

  // Socket mock: simulate receiving a new notification every 2 minutes (if not for this being a one-off demo)
  // For now, just a simple effect to show real-time "capability"
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotif: Notification = {
        id: `notif-${Math.random()}`,
        title: "Real-time Update",
        message: "This is a simulated real-time notification.",
        type: "general",
        isRead: false,
        createdAt: new Date().toISOString()
      }
      queryClient.setQueryData(["notifications"], (old: Notification[] | undefined) => {
        if (!old) return [newNotif]
        return [newNotif, ...old]
      })
    }, 15000) // 15 seconds after load

    return () => clearTimeout(timer)
  }, [queryClient])

  return {
    notifications,
    unreadCount: notifications.filter(n => !n.isRead).length,
    isLoading,
    markAsRead,
    markAllAsRead
  }
}
