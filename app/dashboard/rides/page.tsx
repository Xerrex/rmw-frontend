"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"
import { CarFront, Users, Ban, CheckCircle2, XCircle, Search, Clock, MapPin, ArrowRight } from "lucide-react"
import { useRides, useAllRideRequests } from "./hooks/use-rides"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RidesPage() {
  const { data: rides, isLoading: ridesLoading } = useRides()
  const { data: requests, isLoading: requestsLoading } = useAllRideRequests()
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRideId, setSelectedRideId] = useState<string | null>(null)
  const [statusFilter, setStatusFilter] = useState("all")

  if (ridesLoading || requestsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading rides data...</p>
      </div>
    )
  }

  const selectedRide = rides?.find(r => r.id === selectedRideId)
  const selectedRideRequests = requests?.filter(req => req.rideId === selectedRideId) || []

  const filteredRides = (rides || []).filter((r) => {
    const matchesSearch = 
      r.townStarting.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.townEnding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Rides Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your rides and passenger requests.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search rides, routes..." 
            className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-4">
        <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
          <div className="flex items-center justify-between border-b pb-1">
            <TabsList className="h-10 bg-transparent p-0 gap-6">
              <TabsTrigger value="all" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-2 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                All Rides
              </TabsTrigger>
              <TabsTrigger value="upcoming" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-2 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="completed" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-2 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                Completed
              </TabsTrigger>
              <TabsTrigger value="cancelled" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-2 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                Cancelled
              </TabsTrigger>
            </TabsList>
            <div className="text-xs text-muted-foreground font-medium">
              {filteredRides.length} {statusFilter} rides found
            </div>
          </div>

          <div className="mt-6">
            <RideTable 
              data={filteredRides} 
              onRideClick={(id) => setSelectedRideId(id)} 
            />
          </div>
        </Tabs>
      </div>

      <Sheet open={!!selectedRideId} onOpenChange={(open) => !open && setSelectedRideId(null)}>
        <SheetContent className="sm:max-w-2xl overflow-y-auto">
          {selectedRide && (
            <div className="space-y-8 py-4">
              <SheetHeader>
                <div className="flex items-center gap-2 mb-2">
                   <Badge 
                      variant={selectedRide.status === "completed" ? "default" : selectedRide.status === "cancelled" ? "destructive" : "secondary"}
                      className="capitalize"
                    >
                      {selectedRide.status}
                    </Badge>
                    <span className="text-xs text-muted-foreground">{selectedRide.id}</span>
                </div>
                <SheetTitle className="text-2xl font-bold flex items-center gap-2">
                   {selectedRide.townStarting} <ArrowRight className="h-4 w-4 text-muted-foreground" /> {selectedRide.townEnding}
                </SheetTitle>
                <SheetDescription className="flex items-center gap-4 mt-2">
                   <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {format(new Date(selectedRide.departTime), "PPP p")}</span>
                   <span className="flex items-center gap-1"><CarFront className="h-3 w-3" /> {selectedRide.vehiclePlate}</span>
                </SheetDescription>
              </SheetHeader>

              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-muted/30 border-none">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-primary">{selectedRide.seats}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Seats</span>
                  </CardContent>
                </Card>
                 <Card className="bg-muted/30 border-none">
                  <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                    <span className="text-2xl font-bold text-primary">{selectedRideRequests.length}</span>
                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Total Requests</span>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" /> Passenger Requests
                  </h3>
                  <Badge variant="outline">{selectedRideRequests.length}</Badge>
                </div>
                <RequestTable data={selectedRideRequests} />
              </div>
            </div>
          )}
        </SheetContent>
      </Sheet>
    </div>
  )
}

function RideTable({ data, onRideClick }: { data: any[], onRideClick: (id: string) => void }) {
  return (
    <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md overflow-hidden">
      <CardContent className="p-0">
        <ScrollArea className="w-full rounded-md">
          <Table>
            <TableHeader className="bg-muted/50">
              <TableRow>
                <TableHead className="w-[150px] pl-6">Vehicle</TableHead>
                <TableHead>Route</TableHead>
                <TableHead>Departure</TableHead>
                <TableHead>Seats</TableHead>
                <TableHead className="text-right pr-6">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                    No matching rides found.
                  </TableCell>
                </TableRow>
              ) : (
                data.map((ride) => (
                  <TableRow 
                    key={ride.id} 
                    className="hover:bg-primary/5 transition-colors cursor-pointer group"
                    onClick={() => onRideClick(ride.id)}
                  >
                    <TableCell className="font-semibold pl-6">{ride.vehiclePlate}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-primary group-hover:underline underline-offset-4">{ride.townStarting}</span>
                        <span className="text-muted-foreground text-xs">→</span>
                        <span className="font-medium">{ride.townEnding}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(ride.departTime), "MMM d, h:mm a")}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5 text-muted-foreground" />
                        {ride.seats}
                      </div>
                    </TableCell>
                    <TableCell className="text-right pr-6">
                      <Badge 
                        variant={ride.status === "completed" ? "default" : ride.status === "cancelled" ? "destructive" : "secondary"}
                        className="capitalize"
                      >
                        {ride.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

function RequestTable({ data }: { data: any[] }) {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="h-32 flex flex-col items-center justify-center border-2 border-dashed rounded-xl text-muted-foreground">
          <Users className="h-8 w-8 mb-2 opacity-20" />
          No requests for this ride yet.
        </div>
      ) : (
        <div className="grid gap-4">
          {data.map((request) => (
            <Card key={request.id} className="overflow-hidden border-none shadow-md bg-background/50">
              <div className={cn(
                "h-1 w-full",
                request.status === "pending" ? "bg-yellow-500" : 
                request.status === "approved" ? "bg-green-500" : "bg-red-500"
              )} />
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="font-bold text-lg">{request.passengerName}</h4>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {request.route}
                    </p>
                  </div>
                  <Badge 
                    variant={request.status === "approved" ? "default" : request.status === "pending" ? "secondary" : "destructive"}
                    className="capitalize"
                  >
                    {request.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-sm bg-muted/20 p-2 rounded-lg">
                  <div>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase block">Pickup</span>
                    {request.pickup}
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground font-bold uppercase block">Dropoff</span>
                    {request.dropOff}
                  </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-sm font-medium">
                    <Users className="h-4 w-4 text-primary" />
                    {request.seatsRequested} Seats Requested
                  </div>
                  {request.status === "pending" && (
                     <div className="flex gap-2">
                        <button className="text-xs font-bold text-red-500 hover:underline">Reject</button>
                        <button className="text-xs font-bold text-primary hover:underline">Approve</button>
                     </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
