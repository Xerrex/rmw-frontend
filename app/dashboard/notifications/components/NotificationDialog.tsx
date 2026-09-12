"use client"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Notification } from "../hooks/types"
import { Bell, Calendar, Info, MapPin, ArrowRight } from "lucide-react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

interface NotificationDialogProps {
  notification: Notification | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function NotificationDialog({ notification, open, onOpenChange }: NotificationDialogProps) {
  const router = useRouter()
  if (!notification) return null

  const handleAction = () => {
    onOpenChange(false)
    if (notification.type === "request_received") {
      router.push(`/dashboard/rides-requests/${notification.relatedId}`)
    } else if (notification.type === "request_accepted" || notification.type === "ride_update") {
      router.push(`/dashboard/rides/${notification.relatedId}`)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Bell className="h-4 w-4 text-primary" />
            </div>
            <span className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Notification Details</span>
          </div>
          <DialogTitle className="text-xl font-extrabold">{notification.title}</DialogTitle>
          <DialogDescription className="pt-2 text-foreground leading-relaxed">
            {notification.message}
          </DialogDescription>
        </DialogHeader>
        
        <div className="grid gap-4 py-4">
          <div className="flex items-center gap-3 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">{format(new Date(notification.createdAt), "PPP p")}</span>
          </div>
          <div className="flex items-center gap-3 text-sm">
            <Info className="h-4 w-4 text-muted-foreground" />
            <span className="capitalize text-muted-foreground">{notification.type.replace(/_/g, " ")}</span>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
            Close
          </Button>
          {(notification.type !== "general") && (
            <Button onClick={handleAction} className="w-full sm:w-auto gap-2">
              View Related Details <ArrowRight className="h-4 w-4" />
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
