"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MapPin, Users, CarFront, CheckCircle2, Loader2 } from "lucide-react"
import type { Ride } from "../../../rides/hooks/types"

interface SummaryPanelProps { 
  pickup: string
  stop: string
  selectedRide: Ride | null
  seats: number
  isPending: boolean
  canSubmit: boolean
  onSubmit: () => void
}

export function SummaryPanel({ 
  pickup, 
  stop, 
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
        {/* Selected Ride */}
        <div className="space-y-3">
          <p className="text-[10px] font-bold text-muted-foreground uppercase flex items-center gap-1.5">
            <CarFront className="h-3 w-3" /> Selected Ride
          </p>
          {selectedRide ? (
            <div className="text-sm font-medium">
              <p>{selectedRide.town_starting} to {selectedRide.town_ending}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{selectedRide.vehicle_plate} &middot; {selectedRide.available_seats} seats left</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic">No ride selected</p>
          )}
        </div>

        <Separator />

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
              <p className="text-[10px] font-bold text-muted-foreground uppercase">Stop</p>
              <p className="text-sm font-medium">{stop || "Not set"}</p>
            </div>
          </div>
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
