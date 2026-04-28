"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, CarFront, CheckCircle2, Loader2 } from "lucide-react"

interface SummaryPanelProps {
  pickup: string
  dropoff: string
  selectedRide: any | null
  seats: number
  isPending: boolean
  canSubmit: boolean
  onSubmit: () => void
}

export function SummaryPanel({ 
  pickup, 
  dropoff, 
  selectedRide, 
  seats, 
  isPending, 
  canSubmit, 
  onSubmit 
}: SummaryPanelProps) {
  return (
    <Card className="border-none shadow-xl bg-white dark:bg-card sticky top-24">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-bold flex items-center gap-2">
          Request Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Route Info */}
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 bg-primary/10 rounded-full">
              <MapPin className="h-3 w-3 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Pickup</p>
              <p className="text-sm font-medium">{pickup || "Not set"}</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="mt-1 p-1.5 bg-red-100 rounded-full dark:bg-red-900/30">
              <MapPin className="h-3 w-3 text-red-500" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Drop-off</p>
              <p className="text-sm font-medium">{dropoff || "Not set"}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Selected Ride */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
            <CarFront className="h-3 w-3" /> Selected Ride
          </p>
          {selectedRide ? (
            <div className="text-sm font-medium">
              <p>{selectedRide.townStarting} to {selectedRide.townEnding}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedRide.vehiclePlate} • {selectedRide.departTime && new Date(selectedRide.departTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No ride selected</p>
          )}
        </div>

        <Separator />

        {/* Seats */}
        <div className="flex items-center justify-between">
          <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
            <Users className="h-3 w-3" /> Seats
          </p>
          <p className="text-sm font-bold text-primary">{seats} Requested</p>
        </div>
      </CardContent>

      <CardFooter className="pt-2">
        <Button 
          className="w-full h-12 text-base font-bold shadow-lg shadow-primary/20" 
          disabled={!canSubmit || isPending}
          onClick={onSubmit}
        >
          {isPending ? (
            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
          ) : (
            <CheckCircle2 className="mr-2 h-5 w-5" />
          )}
          Send Request
        </Button>
      </CardFooter>
    </Card>
  )
}
