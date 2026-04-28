"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CarFront, Clock, Users, ArrowRight, Check } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface Step2MatchingRidesProps {
  rides: any[]
  selectedRideId: string | null
  onSelect: (ride: any) => void
  isLoading: boolean
}

export function Step2MatchingRides({ rides, selectedRideId, onSelect, isLoading }: Step2MatchingRidesProps) {
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-48 space-y-3">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-sm text-muted-foreground">Searching for rides...</p>
      </div>
    )
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Available Rides</h3>
        <p className="text-sm text-muted-foreground">Select a ride that fits your schedule.</p>
      </div>

      {rides.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed rounded-xl bg-muted/20">
          <p className="text-muted-foreground">No rides found along this route. Try different locations.</p>
        </div>
      ) : (
        <div className="grid gap-3">
          {rides.map((ride) => (
            <Card 
              key={ride.id} 
              className={cn(
                "cursor-pointer transition-all border-2 relative overflow-hidden",
                selectedRideId === ride.id ? "border-primary bg-primary/5" : "border-transparent hover:border-muted-foreground/20"
              )}
              onClick={() => onSelect(ride)}
            >
              {selectedRideId === ride.id && (
                <div className="absolute top-2 right-2 bg-primary text-white rounded-full p-0.5">
                  <Check className="h-3 w-3" />
                </div>
              )}
              <CardContent className="p-4">
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-bold text-sm">
                      {ride.townStarting} <ArrowRight className="h-3 w-3" /> {ride.townEnding}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {format(new Date(ride.departTime), "h:mm a")}</span>
                      <span className="flex items-center gap-1"><CarFront className="h-3 w-3" /> {ride.vehiclePlate}</span>
                      <span className="flex items-center gap-1 font-bold text-primary"><Users className="h-3 w-3" /> {ride.seats} left</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary" className="text-[10px] uppercase tracking-wider">
                      {ride.status}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
