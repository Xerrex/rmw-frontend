"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, MapPin } from "lucide-react"

interface Step3RequestDetailsProps {
  seats: number
  pickup: string
  stop: string
  passengerNames: string[]
  onChange: (field: "seats" | "pickup" | "stop", value: string | number) => void
  onPassengerNameChange: (index: number, value: string) => void
}

export function Step3RequestDetails({
  seats, pickup, stop, passengerNames, onChange, onPassengerNameChange,
}: Step3RequestDetailsProps) {
  const extraSeats = Math.max(seats - 1, 0)

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Trip Details</h3>
        <p className="text-sm text-muted-foreground">Confirm your seats and pickup/drop-off points for this ride.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="seats" className="flex items-center gap-2">
            <Users className="h-4 w-4 text-primary" /> Seats Required
          </Label>
          <Input
            id="seats"
            type="number"
            min={1}
            max={10}
            value={seats}
            onChange={(e) => onChange("seats", parseInt(e.target.value) || 1)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="pickup" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Pickup Point
          </Label>
          <Input
            id="pickup"
            placeholder="e.g. Westlands Stage"
            value={pickup}
            onChange={(e) => onChange("pickup", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="stop" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-500" /> Drop-off Point
          </Label>
          <Input
            id="stop"
            placeholder="e.g. Kenyatta Avenue"
            value={stop}
            onChange={(e) => onChange("stop", e.target.value)}
          />
        </div>

        {extraSeats > 0 && (
          <div className="space-y-2">
            <Label>Additional passenger names</Label>
            <p className="text-xs text-muted-foreground">
              Only visible to the ride owner, used to confirm who occupies the extra seats.
            </p>
            {Array.from({ length: extraSeats }).map((_, index) => (
              <Input
                key={index}
                placeholder={`Passenger ${index + 1} name`}
                value={passengerNames[index] || ""}
                onChange={(e) => onPassengerNameChange(index, e.target.value)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
