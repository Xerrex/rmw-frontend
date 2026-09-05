"use client"

import { useEffect, useState } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { toast } from "sonner"
import {
  Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import {
  MapPin, Users, Clock, Check, X, Pencil, Loader2, CarFront, ArrowRight, History,
} from "lucide-react"
import {
  useUpdateRideRequestDetails, useUpdateRideRequestStatusGeneric, useRideRequestAuditLogs,
} from "@/app/dashboard/rides-requests/hooks/use-rides-requests-data"

export type RideRequestStatus = "Pending" | "Accepted" | "Rejected"
export type ViewerRole = "requester" | "owner"

export interface RideRequestSheetData {
  rideUuid: string
  requestUuid: string
  seats: number
  pickup: string
  stop: string
  status: RideRequestStatus
  createdAt: string
  requesterName?: string | null
  viewerRole?: ViewerRole | null
  canEdit: boolean
  passengerNames?: string[] | null
  ride: {
    townStarting: string
    townEnding: string
    vehiclePlate: string
    vehicleModel: string
    departTime: string
    status: string
  }
}

function parseServerDate(value: string) {
  try {
    // Try with milliseconds first
    return parse(value, "yyyy-MM-dd'T'HH:mm:ss.SSSSSS", new Date());
  } catch {
    try {
      // Try without milliseconds
      return parse(value, "yyyy-MM-dd'T'HH:mm:ss", new Date());
    } catch {
      // Fallback to native parsing
      return new Date(value);
    }
  }
}

function buildEditSchema(seats: number) {
  return z.object({
    seats: z.coerce.number().min(1, "At least 1 seat required"),
    pickup: z.string().min(1, "Pickup point is required"),
    stop: z.string().min(1, "Drop-off point is required"),
    passengerNames: z.array(z.object({ value: z.string().min(1, "Name is required") })),
  })
}

interface RideRequestDetailsSheetProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  data: RideRequestSheetData | null
}

export function RideRequestDetailsSheet({ open, onOpenChange, data }: RideRequestDetailsSheetProps) {
  console.log("Ride request detail", data)
  const [isEditing, setIsEditing] = useState(false)
  const { updateRideRequestDetails, isUpdatingDetails } = useUpdateRideRequestDetails()
  const { updateRequestStatus, isUpdatingStatus } = useUpdateRideRequestStatusGeneric()
  const { auditLogs } = useRideRequestAuditLogs(data?.rideUuid ?? "", data?.requestUuid ?? "", open && !!data)

  const schema = buildEditSchema(data?.seats ?? 1)
  const form = useForm<z.input<typeof schema>, unknown, z.output<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      seats: data?.seats ?? 1,
      pickup: data?.pickup ?? "",
      stop: data?.stop ?? "",
      passengerNames: (data?.passengerNames ?? []).map((value) => ({ value })),
    },
  })
  const { fields, replace } = useFieldArray({ control: form.control, name: "passengerNames" })
  const watchedSeats = form.watch("seats")

  useEffect(() => {
    if (data) {
      form.reset({
        seats: data.seats,
        pickup: data.pickup,
        stop: data.stop,
        passengerNames: (data.passengerNames ?? []).map((value) => ({ value })),
      })
      setIsEditing(false)
    }
  }, [data?.requestUuid])

  useEffect(() => {
    const required = Math.max(Number(watchedSeats || 1) - 1, 0)
    const current = form.getValues("passengerNames") || []
    if (current.length !== required) {
      const next = Array.from({ length: required }, (_, i) => current[i] ?? { value: "" })
      replace(next)
    }
  }, [watchedSeats])

  if (!data) return null

  const isBusy = isUpdatingDetails || isUpdatingStatus
  const isOwner = data.viewerRole === "owner"
  const isRequester = data.viewerRole === "requester"

  function handleOpenChange(next: boolean) {
    if (!next && isBusy) return // don't allow closing mid-action
    onOpenChange(next)
  }

  async function handleStatusChange(status: "Accepted" | "Rejected") {
    if (!data) return
    try {
      await updateRequestStatus({ rideUuid: data.rideUuid, requestUuid: data.requestUuid, status })
      toast.success(`Request ${status.toLowerCase()}`)
    } catch {
      toast.error("Failed to update the request. Please try again.")
    }
  }

  async function onSubmitEdit(values: z.output<typeof schema>) {
    if (!data) return
    try {
      await updateRideRequestDetails({
        rideUuid: data.rideUuid,
        requestUuid: data.requestUuid,
        seats: values.seats,
        pickup: values.pickup,
        stop: values.stop,
        passenger_names: values.passengerNames.map((p) => p.value),
      })
      toast.success("Request updated and set back to pending")
      setIsEditing(false)
    } catch {
      toast.error("Failed to update the request. Please try again.")
    }
  }

  return (
    <Sheet open={open} onOpenChange={handleOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-2">
            <Badge
              variant={data.status === "Accepted" ? "default" : data.status === "Pending" ? "secondary" : "destructive"}
              className={cn(data.status === "Pending" && "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400")}
            >
              {data.status}
            </Badge>
            {isOwner && <Badge variant="outline">Request on your ride</Badge>}
            {isRequester && <Badge variant="outline">Your request</Badge>}
          </div>
          <SheetTitle className="text-xl font-bold">{data.requesterName || "Passenger"}</SheetTitle>
          <SheetDescription className="flex items-center gap-2 text-primary font-medium">
            <CarFront className="h-4 w-4" /> {data.ride.townStarting} <ArrowRight className="h-3 w-3" /> {data.ride.townEnding}
          </SheetDescription>
        </SheetHeader>

        <div className="px-6 pb-6 space-y-6">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            {data?.ride?.departTime ? (format(new Date(data.ride.departTime), "dd-MM-yyyy HH:mm")): ("-")} &middot; {data.ride.vehiclePlate}
          </div>

          {!isEditing ? (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="text-sm bg-muted/30 p-3 rounded-lg">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Pick up</p>
                  <p className="font-medium flex items-center gap-1"><MapPin className="h-3 w-3" /> {data.pickup}</p>
                </div>
                <div className="text-sm bg-muted/30 p-3 rounded-lg">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Stop</p>
                  <p className="font-medium flex items-center gap-1"><MapPin className="h-3 w-3" /> {data.stop}</p>
                </div>
              </div>
              <div className="text-sm bg-muted/30 p-3 rounded-lg">
                <p className="text-[10px] text-muted-foreground font-bold uppercase flex items-center gap-1"><Users className="h-3 w-3" /> Seats</p>
                <p className="font-medium">{data.seats} seat{data.seats === 1 ? "" : "s"}</p>
              </div>

              {(isRequester || (isOwner && data.status === "Accepted")) && data.passengerNames && data.passengerNames.length > 0 && (
                <div className="text-sm bg-muted/30 p-3 rounded-lg space-y-1">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase">Additional passengers</p>
                  {data.passengerNames.map((name, idx) => (
                    <p key={idx} className="font-medium">{name}</p>
                  ))}
                </div>
              )}

              {isRequester && data.canEdit && (
                <Button variant="outline" className="w-full gap-2" onClick={() => setIsEditing(true)}>
                  <Pencil className="h-4 w-4" /> Edit request details
                </Button>
              )}
              {isRequester && !data.canEdit && data.status === "Pending" && (
                <p className="text-xs text-muted-foreground">
                  This request can no longer be edited (ride is starting soon or no longer upcoming).
                </p>
              )}
            </div>
          ) : (
            <form onSubmit={form.handleSubmit(onSubmitEdit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="seats" className="flex items-center gap-2"><Users className="h-4 w-4" /> Seats</Label>
                <Input id="seats" type="number" min={1} {...form.register("seats")} />
                {form.formState.errors.seats && (
                  <p className="text-xs text-destructive">{form.formState.errors.seats.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="pickup" className="flex items-center gap-2"><MapPin className="h-4 w-4 text-primary" /> Pickup</Label>
                <Input id="pickup" {...form.register("pickup")} />
                {form.formState.errors.pickup && (
                  <p className="text-xs text-destructive">{form.formState.errors.pickup.message}</p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="stop" className="flex items-center gap-2"><MapPin className="h-4 w-4 text-red-500" /> Stop</Label>
                <Input id="stop" {...form.register("stop")} />
                {form.formState.errors.stop && (
                  <p className="text-xs text-destructive">{form.formState.errors.stop.message}</p>
                )}
              </div>

              {fields.length > 0 && (
                <div className="space-y-2">
                  <Label>Additional passenger names</Label>
                  {fields.map((field, index) => (
                    <div key={field.id} className="space-y-1">
                      <Input placeholder={`Passenger ${index + 1} name`} {...form.register(`passengerNames.${index}.value` as const)} />
                      {form.formState.errors.passengerNames?.[index]?.value && (
                        <p className="text-xs text-destructive">
                          {form.formState.errors.passengerNames[index]?.value?.message}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex items-center gap-2 pt-2">
                <Button type="button" variant="outline" className="flex-1" disabled={isBusy} onClick={() => setIsEditing(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={isBusy}>
                  {isUpdatingDetails && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Save changes
                </Button>
              </div>
            </form>
          )}

          {auditLogs.length > 0 && (
            <div className="space-y-2 pt-2">
              <Separator />
              <p className="text-xs font-bold text-muted-foreground uppercase flex items-center gap-1.5 pt-2">
                <History className="h-3.5 w-3.5" /> Activity
              </p>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {auditLogs.map((log) => (
                  <div key={log.id} className="text-xs text-muted-foreground">
                    <span className="font-medium text-foreground capitalize">{log.action.replace("_", " ")}</span>
                    {" "}by {log.actor_name || "system"} &middot; {format(new Date(log.created_at), "dd-MM-yyyy HH:mm")}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {isOwner && data.status === "Pending" && !isEditing && (
          <SheetFooter className="flex-row gap-2 border-t pt-4">
            <Button variant="outline" className="flex-1 gap-2" disabled={isBusy} onClick={() => handleStatusChange("Rejected")}>
              {isUpdatingStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : <X className="h-4 w-4" />} Reject
            </Button>
            <Button className="flex-1 gap-2" disabled={isBusy} onClick={() => handleStatusChange("Accepted")}>
              {isUpdatingStatus ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Accept
            </Button>
          </SheetFooter>
        )}
      </SheetContent>
    </Sheet>
  )
}
