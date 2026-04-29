"use client"

import { useState, useEffect } from "react"
import { useNotifications } from "../hooks/use-notifications"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Circle, Trash2, CheckCheck, Clock, Filter } from "lucide-react"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"
import { NotificationDialog } from "./NotificationDialog"
import { Notification } from "../hooks/types"
import { useSearchParams } from "next/navigation"

export function NotificationList() {
  const { notifications, isLoading, markAsRead, markAllAsRead } = useNotifications()
  const [selectedNotif, setSelectedNotif] = useState<Notification | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const highlightedId = searchParams.get("id")

  useEffect(() => {
    if (highlightedId && notifications.length > 0) {
      const found = notifications.find(n => n.id === highlightedId)
      if (found) {
        setSelectedNotif(found)
        setDialogOpen(true)
      }
    }
  }, [highlightedId, notifications])

  const handleNotifClick = (notif: Notification) => {
    setSelectedNotif(notif)
    setDialogOpen(true)
    if (!notif.isRead) {
      markAsRead.mutate(notif.id)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-64 space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading notifications...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="gap-2 rounded-full h-8 px-4 text-xs font-bold">
            <Filter className="h-3 w-3" /> Filter
          </Button>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs font-bold gap-2 text-muted-foreground hover:text-primary"
            onClick={() => markAllAsRead.mutate()}
          >
            <CheckCheck className="h-3 w-3" /> Mark all as read
          </Button>
        </div>
        <Badge variant="secondary" className="font-bold">{notifications.length} Total</Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notifications.length === 0 ? (
          <div className="h-64 flex flex-col items-center justify-center border-2 border-dashed rounded-3xl text-muted-foreground bg-muted/20">
            <Bell className="h-12 w-12 mb-4 opacity-10" />
            <p className="text-sm">You're all caught up!</p>
          </div>
        ) : (
          notifications.map((n) => (
            <Card 
              key={n.id} 
              className={cn(
                "cursor-pointer transition-all border-none shadow-sm hover:shadow-md relative overflow-hidden group",
                !n.isRead ? "bg-white dark:bg-card border-l-4 border-l-primary" : "bg-muted/30 opacity-80"
              )}
              onClick={() => handleNotifClick(n)}
            >
              <CardContent className="p-5 flex items-start gap-4">
                <div className={cn(
                  "mt-1 p-2 rounded-xl shrink-0 transition-colors",
                  !n.isRead ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
                )}>
                  <Bell className="h-5 w-5" />
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className={cn("font-bold text-base", !n.isRead && "text-foreground")}>
                      {n.title}
                    </h4>
                    <span className="text-[10px] font-medium text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {n.message}
                  </p>
                </div>
                {!n.isRead && (
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-2 shrink-0 animate-pulse" />
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <NotificationDialog 
        notification={selectedNotif} 
        open={dialogOpen} 
        onOpenChange={setDialogOpen} 
      />
    </div>
  )
}
