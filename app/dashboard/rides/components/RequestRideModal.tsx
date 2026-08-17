"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCreateRideRequest } from "../hooks/use-rides-data"
import { toast } from "sonner"
import { Loader2, Users, MapPin } from "lucide-react"

const schema = z.object({
  seatsRequested: z.coerce.number().min(1, "At least 1 seat required"),
  pickup: z.string().min(1, "Pickup point is required"),
  dropOff: z.string().min(1, "Drop-off point is required"),
})

type FormValues = z.input<typeof schema>
type ValidatedFormValues = z.output<typeof schema>


interface RequestRideModalProps {
  rideUuid: string
  rideRoute: string
  children: React.ReactNode
}

export function RequestRideModal({ rideUuid, rideRoute, children }: RequestRideModalProps) {
  const [open, setOpen] = useState(false)
  const { createRideRequest, isCreatingRequest } = useCreateRideRequest(rideUuid)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues, unknown, ValidatedFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      seatsRequested: 1,
      pickup: "",
      dropOff: "",
    },
  })

  async function onSubmit(values: ValidatedFormValues) {
    try {
      await createRideRequest({
        seats: values.seatsRequested,
        pickup: values.pickup,
        stop: values.dropOff
      })
      toast.success("Request sent to the ride owner")
      setOpen(false)
      reset()
    } catch {
      toast.error("Failed to send request. Please try again.")
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-106.25" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            Join Ride
          </DialogTitle>
          <DialogDescription>
            Request to join the ride: <span className="font-semibold text-primary">{rideRoute}</span>
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="seatsRequested" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Number of Seats
            </Label>
            <Input id="seatsRequested" type="number" min={1} {...register("seatsRequested")} />
            {errors.seatsRequested && (
              <p className="text-xs text-destructive">{errors.seatsRequested.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="pickup" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" /> Pickup Point
            </Label>
            <Input id="pickup" placeholder="Specific stage or landmark" {...register("pickup")} />
            {errors.pickup && (
              <p className="text-xs text-destructive">{errors.pickup.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="dropOff" className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-red-500" /> Drop-off Point
            </Label>
            <Input id="dropOff" placeholder="Destination within the route" {...register("dropOff")} />
            {errors.dropOff && (
              <p className="text-xs text-destructive">{errors.dropOff.message}</p>
            )}
          </div>

          <DialogFooter className="pt-4">
            <Button type="button" variant="outline" disabled={isCreatingRequest} onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isCreatingRequest}>
              {isCreatingRequest && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Send Request
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
