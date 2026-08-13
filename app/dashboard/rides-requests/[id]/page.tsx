"use client"

import { useParams, useRouter } from "next/navigation"
import { useRidesRequests } from "../hooks/use-rides-requests-data"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  ArrowLeft, 
  Users, 
  Clock, 
  MapPin, 
  CheckCircle2, 
  XCircle, 
  Ban,
  Calendar,
  User,
  CarFront,
  ArrowRight,
  ShieldCheck
} from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RideRequestDetailsPage() {
  const { id } = useParams()
  const router = useRouter()
  const { data: requests, isLoading } = useRidesRequests()

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading request details...</p>
      </div>
    )
  }

  const request = requests?.find(r => r.id === id)

  if (!request) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <h2 className="text-2xl font-bold">Request Not Found</h2>
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
        <h1 className="text-2xl font-bold tracking-tight">Request Details</h1>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          {/* Main Request Info */}
          <Card className="border-none shadow-md overflow-hidden bg-white dark:bg-card">
            <div className={cn(
              "h-2 w-full",
              request.status === "confirmed" ? "bg-green-500" : request.status === "pending" ? "bg-orange-500" : "bg-red-500"
            )} />
            <CardHeader>
              <div className="flex items-center justify-between mb-4">
                <Badge 
                  variant={request.status === "confirmed" ? "default" : request.status === "pending" ? "secondary" : "destructive"}
                  className={cn(
                    "capitalize",
                    request.status === "pending" && "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
                  )}
                >
                  {request.status}
                </Badge>
                <span className="text-xs text-muted-foreground font-mono">{request.id}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary text-2xl font-extrabold">
                  {request.passengerName.charAt(0)}
                </div>
                <div>
                  <CardTitle className="text-2xl font-extrabold">{request.passengerName}</CardTitle>
                  <CardDescription className="text-base font-medium text-primary">
                    {request.route}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-8 pt-4">
              <div className="grid sm:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Pickup Location</p>
                      <p className="font-semibold text-lg">{request.pickup}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <MapPin className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Drop-off Point</p>
                      <p className="font-semibold text-lg">{request.dropOff}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <Users className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Seats Requested</p>
                      <p className="font-semibold text-lg">{request.seatsRequested} Seat(s)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="mt-1 p-2 bg-primary/10 rounded-lg">
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider">Requested On</p>
                      <p className="font-semibold">{format(new Date(request.createdAt), "PPP p")}</p>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              {/* Related Ride Info */}
              <div className="space-y-4">
                <h3 className="text-lg font-bold flex items-center gap-2">
                  <CarFront className="h-5 w-5 text-primary" /> Linked Ride
                </h3>
                <Card className="bg-muted/30 border-none">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-bold text-primary mb-1">Ride ID: {request.rideId}</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                         Nairobi <ArrowRight className="h-3 w-3" /> Nakuru
                      </p>
                    </div>
                    <Button variant="link" onClick={() => router.push(`/dashboard/rides/${request.rideId}`)}>
                      View Ride Details
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Sidebar */}
        <div className="space-y-6">
          <Card className="border-none shadow-md bg-white dark:bg-card">
            <CardHeader>
              <CardTitle className="text-lg">Request Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {request.status === "pending" ? (
                <>
                  <Button className="w-full bg-green-600 hover:bg-green-700">
                    <CheckCircle2 className="mr-2 h-4 w-4" /> Approve Request
                  </Button>
                  <Button variant="destructive" className="w-full">
                    <XCircle className="mr-2 h-4 w-4" /> Reject Request
                  </Button>
                </>
              ) : request.status === "confirmed" ? (
                <Button variant="outline" className="w-full text-red-500 hover:text-red-600">
                  <Ban className="mr-2 h-4 w-4" /> Cancel Confirmation
                </Button>
              ) : (
                <Button variant="outline" className="w-full">Re-evaluate Request</Button>
              )}
              <Separator className="my-2" />
              <Button variant="ghost" className="w-full">
                Contact Passenger
              </Button>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md bg-white dark:bg-card">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-green-500" />
                <h4 className="font-bold">Verified Rider</h4>
              </div>
              <p className="text-xs text-muted-foreground">
                This passenger has completed 15 rides and has a 4.8/5.0 rating on the platform.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

