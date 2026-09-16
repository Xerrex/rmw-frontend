"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MapPin, Search } from "lucide-react"

interface Step1LocationsProps {
  townStarting: string
  townEnding: string
  onChange: (field: "townStarting" | "townEnding", value: string) => void
}

export function Step1Locations({ townStarting, townEnding, onChange }: Step1LocationsProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Where are you going?</h3>
        <p className="text-sm text-muted-foreground">Search rides by starting and ending town.</p>
      </div>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="townStarting" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-primary" /> Starting Town
          </Label>
          <Input
            id="townStarting"
            placeholder="e.g. Nairobi"
            value={townStarting}
            onChange={(e) => onChange("townStarting", e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="townEnding" className="flex items-center gap-2">
            <MapPin className="h-4 w-4 text-red-500" /> Ending Town
          </Label>
          <Input
            id="townEnding"
            placeholder="e.g. Mombasa"
            value={townEnding}
            onChange={(e) => onChange("townEnding", e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 bg-primary/5 rounded-xl border border-primary/10 flex items-start gap-3">
        <Search className="h-5 w-5 text-primary shrink-0 mt-0.5" />
        <p className="text-xs text-muted-foreground">
          We'll search for available rides matching either town. You can leave one blank to broaden the search.
        </p>
      </div>
    </div>
  )
}
