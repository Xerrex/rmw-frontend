"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search } from "lucide-react"

interface Step1LocationsProps {
  pickup: string
  dropoff: string
  onChange: (field: "pickup" | "dropoff", value: string) => void
}

export function Step1Locations({ pickup, dropoff, onChange }: Step1LocationsProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Where are you going?</h3>
        <p className="text-sm text-muted-foreground">Enter your pickup and drop-off points to find available rides.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="pickup" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Pickup Point
          </Label>
          <div className="relative">
            <Input 
              id="pickup" 
              placeholder="e.g. Westlands Stage" 
              value={pickup} 
              onChange={(e) => onChange("pickup", e.target.value)}
              className="pl-4"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="dropoff" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-500" /> Drop-off Point
          </Label>
          <div className="relative">
            <Input 
              id="dropoff" 
              placeholder="e.g. Kenyatta Avenue" 
              value={dropoff} 
              onChange={(e) => onChange("dropoff", e.target.value)}
              className="pl-4"
            />
          </div>
        </div>
      </div>

      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
        <Search className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          We'll search for drivers traveling between these locations or along this route.
        </p>
      </div>
    </div>
  )
}
