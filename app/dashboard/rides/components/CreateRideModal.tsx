"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { Dialog, DialogContent,  DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter,} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCreateRide } from "../hooks/use-rides-data"
import { Loader2, Plus, CarFront, MapPin, Clock } from "lucide-react"

const schema = z.object({
  vehiclePlate: z.string().min(1, "Vehicle plate is required"),
  seats: z.coerce.number().min(1, "At least 1 seat required"),
  townStarting: z.string().min(1, "Starting town is required"),
  townEnding: z.string().min(1, "Destination is required"),
  departTime: z.string().min(1, "Departure time is required"),
  endTime: z.string().min(1, "Estimated arrival time is required"),
})

type FormValues = z.input<typeof schema>
type ValidatedFormValues = z.output<typeof schema>

interface CreateRideModalProps {
  children?: React.ReactNode
}

export function CreateRideModal({ children }: CreateRideModalProps) {
  const [open, setOpen] = useState(false)
  const { createRide, isCreating } = useCreateRide()

  const { register, handleSubmit, reset, formState: { errors },
  } = useForm<FormValues, unknown, ValidatedFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehiclePlate: "",
      seats: 3,
      townStarting: "",
      townEnding: "",
      departTime: "",
      endTime: "",
    },
  })

  async function onSubmit(values: ValidatedFormValues) {
    await createRide(values)
    setOpen(false)
    reset()
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ?? (
          <Button className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Ride</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-125">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <CarFront className="h-5 w-5 text-primary" /> New Trip
          </DialogTitle>
          <DialogDescription>
            Share your route and let passengers join you.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
          {/* Vehicle & Seats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="vehiclePlate">Vehicle Plate</Label>
              <Input id="vehiclePlate" placeholder="KBA 123X" {...register("vehiclePlate")} />
              {errors.vehiclePlate && (
                <p className="text-xs text-destructive">{errors.vehiclePlate.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="seats">Available Seats</Label>
              <Input id="seats" type="number" min={1} {...register("seats")} />
              {errors.seats && (
                <p className="text-xs text-destructive">{errors.seats.message}</p>
              )}
            </div>
          </div>

          {/* Route */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="townStarting" className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-primary" /> From
              </Label>
              <Input id="townStarting" placeholder="Nairobi" {...register("townStarting")} />
              {errors.townStarting && (
                <p className="text-xs text-destructive">{errors.townStarting.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="townEnding" className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-red-500" /> To
              </Label>
              <Input id="townEnding" placeholder="Nakuru" {...register("townEnding")} />
              {errors.townEnding && (
                <p className="text-xs text-destructive">{errors.townEnding.message}</p>
              )}
            </div>
          </div>

          {/* Times */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <Label htmlFor="departTime" className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" /> Departure
              </Label>
              <Input id="departTime" type="datetime-local" {...register("departTime")} />
              {errors.departTime && (
                <p className="text-xs text-destructive">{errors.departTime.message}</p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="endTime" className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 opacity-50" /> Est. Arrival
              </Label>
              <Input id="endTime" type="datetime-local" {...register("endTime")} />
              {errors.endTime && (
                <p className="text-xs text-destructive">{errors.endTime.message}</p>
              )}
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreating}>
              {isCreating && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Trip
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
