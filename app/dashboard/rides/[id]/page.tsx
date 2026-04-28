"use client"

import { useParams, useRouter } from "next/navigation"
import { useRides, useAllRideRequests } from "../hooks/use-rides"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  CarFront, 
  Users, 
  Clock, 
  MapPin, 
  ArrowRight, 
  Calendar,
  ShieldCheck,
  MoreVertical
} from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RideDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: rides, isLoading: ridesLoading } = useRides()
  const { data: requests, isLoading: requestsLoading } = useAllRideRequests()

  if (ridesLoading || requestsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading ride details...</p>
      </div>
    )
  }

  const ride = rides?.find(r => r.id === id)
  const rideRequests = requests?.filter(req => req.rideId === id) || []

  if (!ride) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Ride Not Found</h2>
        <Button onClick={() => router.back()}>Go Back</Button>
      </div>
    )
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
              ride.status === "completed" ? "bg-green-500" : ride.status === "cancelled" ? "bg-red-500" : "bg-orange-500"
            )} />
            <CardHeader className="flex flex-row items-start justify-between space-y-0">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                   <Badge 
                      variant={ride.status === "completed" ? "default" : ride.status === "cancelled" ? "destructive" : "secondary"}
                      className={cn(
                        "capitalize",
                        ride.status === "upcoming" && "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
                      )}
                    >
                      {ride.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground font-mono">{ride.id}</span>
                </div>
                <CardTitle className="text-3xl font-extrabold flex items-center gap-3 pt-2">
                  {ride.townStarting} <ArrowRight className="h-5 w-5 text-muted-foreground" /> {ride.townEnding}
                </CardTitle>
                <CardDescription className="flex items-center gap-2 text-base">
                  <CarFront className="h-4 w-4" /> {ride.vehiclePlate}
                </CardDescription>
              </div>
              <Button variant="ghost" size="icon">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </CardHeader>
            <CardContent className="grid gap-8 pt-4">
              <div className="grid sm:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Departure Date</p>
                      <p className="font-semibold">{format(new Date(ride.departTime), "EEEE, MMMM do yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <Clock className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Departure Time</p>
                      <p className="font-semibold">{format(new Date(ride.departTime), "h:mm a")}</p>
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
                      <p className="font-semibold">{ride.seats} Total Seats</p>
                    </div>
                  </div>
                   <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Owner</p>
                      <p className="font-semibold">{ride.ownerName || "You"}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Passenger Requests Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold">Passenger Requests</h3>
              <Badge variant="outline">{rideRequests.length} Total</Badge>
            </div>
            
            {rideRequests.length === 0 ? (
              <Card className="border-dashed border-2 bg-muted/20">
                <CardContent className="h-32 flex flex-col items-center justify-center text-muted-foreground">
                   <Users className="h-8 w-8 mb-2 opacity-20" />
                   <p>No requests for this ride yet.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4">
                {rideRequests.map((req) => (
                  <Card key={req.id} className="border-none shadow-sm hover:shadow-md transition-shadow">
                    <CardContent className="p-4 sm:p-6">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                            {req.passengerName.charAt(0)}
                          </div>
                          <div>
                            <h4 className="font-bold">{req.passengerName}</h4>
                            <p className="text-xs text-muted-foreground">{req.route}</p>
                          </div>
                        </div>
                        <Badge variant={req.status === "confirmed" ? "default" : req.status === "pending" ? "secondary" : "destructive"}>
                          {req.status}
                        </Badge>
                      </div>
                      <div className="mt-4 grid grid-cols-2 gap-4 text-sm bg-muted/30 p-3 rounded-lg">
                        <div>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">Pickup</p>
                          <p className="font-medium">{req.pickup}</p>
                        </div>
                        <div>
                          <p className="text-[10px] text-muted-foreground font-bold uppercase">Drop-off</p>
                          <p className="font-medium">{req.dropOff}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar/Action Card */}
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white dark:bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {ride.status === "upcoming" && (
                <>
                  <Button className="w-full">Mark as Completed</Button>
                  <Button variant="destructive" className="w-full">Cancel Ride</Button>
                </>
              )}
              <Button variant="outline" className="w-full">Edit Ride Details</Button>
              <Button variant="ghost" className="w-full text-muted-foreground">Download Summary</Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white dark:bg-card overflow-hidden">
            <div className="aspect-square bg-muted flex flex-col items-center justify-center text-muted-foreground p-6 text-center">
              <MapPin className="h-10 w-10 mb-4 opacity-20" />
              <p className="text-sm font-medium">Route Visualization</p>
              <p className="text-xs">Interactive map coming soon</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
