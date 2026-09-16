"use client"

import { Suspense } from "react"
import { NotificationList } from "./components/NotificationList"

export default function NotificationsPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10 max-w-4xl mx-auto">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Notifications
        </h1>
        <p className="text-muted-foreground mt-1">
          Stay updated with your rides and requests.
        </p>
      </div>

      <Suspense fallback={
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-muted-foreground animate-pulse">Loading view...</p>
        </div>
      }>
        <NotificationList />
      </Suspense>
    </div>
  )
}
