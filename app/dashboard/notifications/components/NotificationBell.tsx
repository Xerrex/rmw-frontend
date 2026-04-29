"use client"

import { Bell, BellRing, Circle } from "lucide-react"
import { useNotifications } from "../hooks/use-notifications"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { formatDistanceToNow } from "date-fns"
import { cn } from "@/lib/utils"

export function NotificationBell() {
  const { notifications, unreadCount, markAsRead } = useNotifications()
  const router = useRouter()
  const latestNotifications = notifications.slice(0, 10)

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9 rounded-full bg-muted/50 hover:bg-muted transition-colors">
          {unreadCount > 0 ? (
            <BellRing className="h-5 w-5 text-primary animate-pulse" />
          ) : (
            <Bell className="h-5 w-5 text-muted-foreground" />
          )}
          {unreadCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80 p-0 shadow-2xl border-primary/10 overflow-hidden rounded-xl bg-popover text-popover-foreground">
        <DropdownMenuLabel className="p-4 bg-muted/50 flex items-center justify-between">
          <span className="font-bold">Notifications</span>
          {unreadCount > 0 && (
            <span className="text-[10px] bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
              {unreadCount} New
            </span>
          )}
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="m-0" />
        
        <ScrollArea className="h-[350px]">
          {latestNotifications.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              <p className="text-sm">No notifications yet.</p>
            </div>
          ) : (
            <div className="flex flex-col">
              {latestNotifications.map((n) => (
                <DropdownMenuItem 
                  key={n.id} 
                  className={cn(
                    "p-4 flex flex-col items-start gap-1 cursor-pointer transition-colors focus:bg-accent focus:text-accent-foreground",
                    !n.isRead ? "bg-primary/5 dark:bg-primary/10" : "bg-transparent"
                  )}
                  onClick={() => {
                    markAsRead.mutate(n.id)
                    router.push(`/dashboard/notifications?id=${n.id}`)
                  }}
                >
                  <div className="flex items-center gap-2 w-full">
                    {!n.isRead && <Circle className="h-2 w-2 fill-green-500 text-green-500" />}
                    <span className="font-bold text-sm truncate">{n.title}</span>
                    <span className="ml-auto text-[10px] text-muted-foreground font-medium">
                      {formatDistanceToNow(new Date(n.createdAt), { addSuffix: true })}
                    </span>
                  </div>
                  <p className="text-[11px] text-muted-foreground line-clamp-2 pl-4">
                    {n.message}
                  </p>
                </DropdownMenuItem>
              ))}
            </div>
          )}
        </ScrollArea>
        
        <DropdownMenuSeparator className="m-0" />
        <div className="p-2 bg-muted/50 sticky bottom-0">
          <Button 
            className="w-full text-xs h-8 font-bold"
            onClick={() => router.push("/dashboard/notifications")}
          >
            View All Notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
