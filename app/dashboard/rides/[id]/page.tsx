"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { useRideDetails, useRideRequests } from "../hooks/use-rides-data"
import { RequestRideModal } from "../components/RequestRideModal"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CarFront, Users, Clock, MapPin, ArrowRight,
  Calendar, ShieldCheck, UserPlus, ChevronRight, } from "lucide-react"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import type { RideRequestDetail } from "../hooks/types"
import { RideRequestDetailsSheet, RideRequestSheetData } from "@/app/dashboard/rides-requests/components/RideRequestDetailsSheet"

function toSheetData(req: RideRequestDetail, ride: { town_starting: string; town_ending: string; vehicle_plate: string; vehicle_model: string; depart_time: string; status: string }, rideUuid: string): RideRequestSheetData {
  return {
    rideUuid,
    requestUuid: req.uuid,
    seats: req.seats,
    pickup: req.pickup,
    stop: req.stop,
    status: req.status,
    createdAt: req.created_at,
    requesterName: req.requester_name,
    viewerRole: req.viewer_role,
    canEdit: req.can_edit,
    passengerNames: req.passenger_names,
    ride: {
      townStarting: ride.town_starting,
      townEnding: ride.town_ending,
      vehiclePlate: ride.vehicle_plate,
      vehicleModel: ride.vehicle_model,
      departTime: ride.depart_time,
      status: ride.status,
    },
  }
}

export default function RideDetailsPage() {
  const params = useParams<{ id: string }>()
  const router = useRouter()
  const rideUuid = params.id

  const { ride, isLoading: rideLoading } = useRideDetails(rideUuid)
  const { rideRequests, isLoading: requestsLoading } = useRideRequests(rideUuid, !!ride)
  const [selectedUuid, setSelectedUuid] = useState<string | null>(null)
  const [sheetOpen, setSheetOpen] = useState(false)

  if (rideLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading ride details...</p>
      </div>
    )
  }

  if (!ride) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Ride Not Found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
  }

  const selectedRequest = rideRequests.find((r) => r.uuid === selectedUuid) || null

  function openRequestDetails(req: RideRequestDetail) {
    setSelectedUuid(req.uuid)
    setSheetOpen(true)
  }

  return (
    <div className="space-y-6 pb-20 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <h1 className="text-2xl font-bold tracking-tight">Ride Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Info Card */}
          <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-card">
            <div className={cn(
              "h-2 w-full",
              ride.status === "completed" ? "bg-green-500" : ride.status === "canceled" ? "bg-red-500" : "bg-orange-500"
            )} />
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={ride.status === "completed" ? "default" : ride.status === "canceled" ? "destructive" : "secondary"}
                    className={cn(
                      "capitalize",
                      ride.status === "upcoming" && "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
                    )}
                  >
                    {ride.status}
                  </Badge>
                  {ride.is_owner && <Badge variant="outline">Your ride</Badge>}
                  <span className="text-xs text-muted-foreground font-mono">{ride.uuid}</span>
                </div>
                <CardTitle className="text-3xl font-extrabold flex items-center gap-3 pt-2">
                  {ride.town_starting} <ArrowRight className="h-5 w-5 text-muted-foreground" /> {ride.town_ending}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                  <CarFront className="h-4 w-4" /> {ride.vehicle_model} &middot; {ride.vehicle_plate}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="grid gap-8 pt-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Departure Date & Time</p>
                      <p className="font-semibold"> {format(parse(ride.depart_time, 'dd-MM-yyyy HH:mm', new Date()), "dd-MM-yyyy HH:mm")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Estimated Arrival Date & Time</p>
                      <p className="font-semibold"> {format(parse(ride.end_time, 'dd-MM-yyyy HH:mm', new Date()), "dd-MM-yyyy HH:mm")}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Available Seats</p>
                      <p className="font-semibold">{ride.available_seats} of {ride.seats} Seats</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Owner</p>
                      <p className="font-semibold">{ride.owner_name || "Unknown"}</p>
                    </div>
                  </div>
                </div>
              </div>

              {!ride.is_owner && ride.status === "upcoming" && (
                <div className="pt-2 border-t">
                  {ride.has_requested ? (
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                      You have requested to join this ride
                    </Badge>
                  ) : (
                    <RequestRideModal rideUuid={ride.uuid} rideRoute={`${ride.town_starting} to ${ride.town_ending}`}>
                      <Button className="gap-2">
                        <UserPlus className="h-4 w-4" />
                        Join Ride
                      </Button>
                    </RequestRideModal>
                  )}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Passenger Requests Section */}
          {ride.is_owner && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold">Passenger Requests</h3>
                <Badge variant="outline">{rideRequests.length} Total</Badge>
              </div>

              {requestsLoading ? (
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : rideRequests.length === 0 ? (
                <Card className="border-dashed border-2 bg-muted/20">
                  <CardContent className="h-32 flex flex-col items-center justify-center text-muted-foreground">
                    <Users className="h-8 w-8 mb-2 opacity-20" />
                    <p>No requests for this ride yet.</p>
                  </CardContent>
                </Card>
              ) : (
                <div className="grid gap-4">
                  {rideRequests.map((req) => (
                    <RequestCard
                      key={req.uuid}
                      request={req}
                      isSelected={selectedUuid === req.uuid}
                      onClick={() => openRequestDetails(req)}
                    />
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Passenger's own request */}
          {!ride.is_owner && ride.has_requested && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold">Your Request</h3>
              {requestsLoading ? (
                <div className="h-32 flex items-center justify-center text-muted-foreground">
                  <div className="w-6 h-6 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                </div>
              ) : (
                rideRequests.map((req) => (
                  <RequestCard
                    key={req.uuid}
                    request={req}
                    isSelected={selectedUuid === req.uuid}
                    onClick={() => openRequestDetails(req)}
                  />
                ))
              )}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white dark:bg-card overflow-hidden">
            <div className="aspect-square bg-muted flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
              <MapPin className="h-10 w-10 mb-4 opacity-20" />
              <p className="text-sm font-medium">Route Visualization</p>
              <p className="text-xs">Interactive map coming soon</p>
            </div>
          </Card>
        </div>
      </div>

      <RideRequestDetailsSheet
        open={sheetOpen}
        onOpenChange={setSheetOpen}
        data={selectedRequest ? toSheetData(selectedRequest, ride, ride.uuid) : null}
      />
    </div>
  )
}

function RequestCard({
  request, onClick, isSelected,
}: {
  request: RideRequestDetail
  onClick?: () => void
  isSelected?: boolean
}) {
  return (
    <Card
      className={cn(
        "border-none shadow-sm hover:shadow-md transition-shadow cursor-pointer",
        isSelected && "ring-2 ring-primary shadow-md"
      )}
      onClick={onClick}
    >
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
              {(request.requester_name || "?").charAt(0)}
            </div>
            <div>
              <h4 className="font-bold">{request.requester_name || "Passenger"}</h4>
              <p className="text-xs text-muted-foreground">{request.seats} seat{request.seats === 1 ? "" : "s"} requested</p>
            </div>
          </div>
          <Badge variant={request.status === "Accepted" ? "default" : request.status === "Pending" ? "secondary" : "destructive"}>
            {request.status}
          </Badge>
        </div>
        <div className="mt-4 flex items-center justify-between gap-4">
          <div className="text-sm bg-muted/30 p-3 rounded-lg flex-1">
            <p className="text-[10px] text-muted-foreground font-bold uppercase">Pick up</p>
            <p className="font-medium">{request.pickup}</p>
          </div>
          <div className="text-sm bg-muted/30 p-3 rounded-lg flex-1">
            <p className="text-[10px] text-muted-foreground font-bold uppercase">Stop</p>
            <p className="font-medium">{request.stop}</p>
          </div>
          <ChevronRight className="h-4 w-4 text-muted-foreground shrink-0" />
        </div>
      </CardContent>
    </Card>
  )
}
