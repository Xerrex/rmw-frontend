"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Users, Info } from "lucide-react"

interface Step3RequestDetailsProps {
  seats: number
  notes: string
  onChange: (field: "seats" | "notes", value: any) => void
}

export function Step3RequestDetails({ seats, notes, onChange }: Step3RequestDetailsProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="space-y-2">
        <h3 className="text-xl font-bold">Trip Details</h3>
        <p className="text-sm text-muted-foreground">Confirm how many seats you need and any extra info for the driver.</p>
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
            onChange={(e) => onChange("seats", parseInt(e.target.value))}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="notes" className="flex items-center gap-2">
            <Info className="h-4 w-4 text-primary" /> Additional Notes (Optional)
          </Label>
          <textarea 
            id="notes" 
            className="flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            placeholder="e.g. I'll have a small bag, please pick me up at the junction."
            value={notes} 
            onChange={(e) => onChange("notes", e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}
