"use client"

import { useState, useEffect } from "react"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod/v4"
import { toast } from "sonner"
import { Dialog, DialogContent, DialogDescription, DialogHeader,
  DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useCreateRide } from "../hooks/use-rides-data"
import { useUserVehicles, useCreateVehicle } from "../../settings/hooks/use-settings"
import { DateTimePicker } from "./DateTimePicker"
import { Loader2, Plus, CarFront, MapPin, Clock } from "lucide-react"

const schema = z.object({
  vehicleId: z.coerce.number().min(1, "Please select a vehicle"),
  seats: z.coerce.number().min(1, "At least 1 seat required"),
  townStarting: z.string().min(1, "Starting town is required"),
  townEnding: z.string().min(1, "Destination is required"),
  departTime: z.date().optional(),
  endTime: z.date().optional(),
}).superRefine((data, ctx) => {
  if (!data.departTime) {
    ctx.addIssue({ code: "custom", message: "Departure time is required", path: ["departTime"] })
  } else if (data.departTime < new Date()) {
    ctx.addIssue({ code: "custom", message: "Departure time cannot be in the past", path: ["departTime"] })
  }

  if (!data.endTime) {
    ctx.addIssue({ code: "custom", message: "Estimated arrival time is required", path: ["endTime"] })
  } else if (data.departTime && data.endTime <= data.departTime) {
    ctx.addIssue({ code: "custom", message: "Estimated arrival must be after departure time", path: ["endTime"] })
  }
})

type FormValues = z.input<typeof schema>
type ValidatedFormValues = z.output<typeof schema>

interface CreateRideModalProps {
  children?: React.ReactNode
}

export function CreateRideModal({ children }: CreateRideModalProps) {
  const [open, setOpen] = useState(false)
  const { createRide, isCreating } = useCreateRide()
  const { data: vehicles, isLoading: isVehiclesLoading } = useUserVehicles()
  const createVehicle = useCreateVehicle()

  // Add Vehicle Sub-Dialog
  const [isAddVehicleOpen, setIsAddVehicleOpen] = useState(false)
  const [newPlate, setNewPlate] = useState("")
  const [newModel, setNewModel] = useState("")
  const [newSeats, setNewSeats] = useState(4)

  const { register, handleSubmit, reset, control, setValue, watch, formState: { errors },
  } = useForm<FormValues, unknown, ValidatedFormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      vehicleId: undefined,
      seats: 3,
      townStarting: "",
      townEnding: "",
      departTime: undefined,
      endTime: undefined,
    },
  })

  const selectedVehicleId = watch("vehicleId")

  // Auto-select first vehicle if available and none selected
  useEffect(() => {
    if (vehicles && vehicles.length > 0 && !selectedVehicleId) {
      setValue("vehicleId", vehicles[0].id)
      setValue("seats", vehicles[0].seats)
    }
  }, [vehicles, selectedVehicleId, setValue])

  async function onSubmit(values: ValidatedFormValues) {
    const selectedVeh = vehicles?.find((v) => v.id === values.vehicleId)
    try {
      await createRide({
        vehicleId: values.vehicleId,
        vehiclePlate: selectedVeh?.vehicle_plate,
        vehicleModel: selectedVeh?.vehicle_model,
        seats: values.seats,
        townStarting: values.townStarting,
        townEnding: values.townEnding,
        departTime: values.departTime!.toISOString(),
        endTime: values.endTime!.toISOString(),
      })
      toast.success("Ride created successfully")
      setOpen(false)
      reset()
    } catch {
      toast.error("Failed to create ride. Please try again.")
    }
  }

  function handleOpenChange(nextOpen: boolean) {
    if (isCreating) return
    setOpen(nextOpen)
    if (!nextOpen) reset()
  }

  const handleCreateVehicle = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPlate.trim() || !newModel.trim()) {
      toast.error("Plate and model are required.")
      return
    }
    try {
      const created = await createVehicle.mutateAsync({
        vehicle_plate: newPlate,
        vehicle_model: newModel,
        seats: newSeats,
      })
      toast.success("Vehicle created successfully")
      setValue("vehicleId", created.id)
      setValue("seats", created.seats)
      setIsAddVehicleOpen(false)
      setNewPlate("")
      setNewModel("")
      setNewSeats(4)
    } catch (err: any) {
      toast.error(err.response?.data?.detail || "Failed to create vehicle")
    }
  }

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          {children ?? (
            <Button className="gap-2 shrink-0">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Create Ride</span>
            </Button>
          )}
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-125"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <CarFront className="h-5 w-5 text-primary" /> New Trip
            </DialogTitle>
            <DialogDescription>
              Share your route and let passengers join you.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 pt-2">
            {/* Vehicle Selection & Quick Add */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="vehicleSelect">Select Vehicle</Label>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="h-7 text-xs gap-1 text-primary hover:text-primary/80"
                  onClick={() => setIsAddVehicleOpen(true)}
                >
                  <Plus className="h-3.5 w-3.5" /> Add New Vehicle
                </Button>
              </div>

              <Controller
                name="vehicleId"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(val) => {
                      const numVal = Number(val)
                      field.onChange(numVal)
                      const v = vehicles?.find((item) => item.id === numVal)
                      if (v) setValue("seats", v.seats)
                    }}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={isVehiclesLoading ? "Loading vehicles..." : "Choose a vehicle"} />
                    </SelectTrigger>
                    <SelectContent>
                      {vehicles?.map((v) => (
                        <SelectItem key={v.id} value={String(v.id)}>
                          {v.vehicle_plate} — {v.vehicle_model} ({v.seats} seats)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              />
              {errors.vehicleId && (
                <p className="text-xs text-destructive">{errors.vehicleId.message}</p>
              )}
            </div>

            {/* Seats */}
            <div className="space-y-1.5">
              <Label htmlFor="seats">Available Seats</Label>
              <Input id="seats" type="number" min={1} {...register("seats")} />
              {errors.seats && (
                <p className="text-xs text-destructive">{errors.seats.message}</p>
              )}
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
                <Controller
                  name="departTime"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      id="departTime"
                      value={field.value}
                      onChange={field.onChange}
                      minDate={new Date()}
                      placeholder="Pick departure"
                    />
                  )}
                />
                {errors.departTime && (
                  <p className="text-xs text-destructive">{errors.departTime.message}</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="endTime" className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 opacity-50" /> Est. Arrival
                </Label>
                <Controller
                  name="endTime"
                  control={control}
                  render={({ field }) => (
                    <DateTimePicker
                      id="endTime"
                      value={field.value}
                      onChange={field.onChange}
                      minDate={new Date()}
                      placeholder="Pick arrival"
                    />
                  )}
                />
                {errors.endTime && (
                  <p className="text-xs text-destructive">{errors.endTime.message}</p>
                )}
              </div>
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" disabled={isCreating} onClick={() => handleOpenChange(false)}>
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

      {/* Quick Add Vehicle Sub-Dialog */}
      <Dialog open={isAddVehicleOpen} onOpenChange={setIsAddVehicleOpen}>
        <DialogContent
          className="sm:max-w-md"
          onInteractOutside={(e) => e.preventDefault()}
        >
          <DialogHeader>
            <DialogTitle>Add New Vehicle</DialogTitle>
            <DialogDescription>
              Register a new vehicle to use for your ride.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleCreateVehicle} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="quickPlate">Plate Number</Label>
              <Input
                id="quickPlate"
                placeholder="KDA 123X"
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quickModel">Vehicle Model</Label>
              <Input
                id="quickModel"
                placeholder="Toyota Fielder"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                required
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="quickSeats">Total Seats</Label>
              <Input
                id="quickSeats"
                type="number"
                min={1}
                value={newSeats}
                onChange={(e) => setNewSeats(parseInt(e.target.value) || 1)}
                required
              />
            </div>
            <DialogFooter className="pt-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsAddVehicleOpen(false)}
                disabled={createVehicle.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createVehicle.isPending}>
                {createVehicle.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create & Select
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  )
}
