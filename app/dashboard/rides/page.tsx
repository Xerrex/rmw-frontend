"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { CarFront, Users, Search, Clock, MapPin, ArrowRight, ChevronRight } from "lucide-react"
import { useRides, useAllRideRequests } from "./hooks/use-rides"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RidesPage() {
  const router = useRouter()
  const { data: rides, isLoading: ridesLoading } = useRides()
  const { data: requests, isLoading: requestsLoading } = useAllRideRequests()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  if (ridesLoading || requestsLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading rides data...</p>
      </div>
    )
  }

  const filteredRides = (rides || []).filter((r) => {
    const matchesSearch = 
      r.townStarting.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.townEnding.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.vehiclePlate.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || r.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Rides Management
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your rides and track their progress.
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
            <RideList 
              data={filteredRides} 
              onRideClick={(id) => router.push(`/dashboard/rides/${id}`)} 
            />
          </div>
        </Tabs>
      </div>
    </div>
  )
}

function RideList({ data, onRideClick }: { data: any[], onRideClick: (id: string) => void }) {
  return (
    <div className="space-y-4">
      {data.length === 0 ? (
        <div className="h-40 flex flex-col items-center justify-center rounded-xl border-2 border-dashed text-muted-foreground bg-muted/20">
          <CarFront className="h-10 w-10 mb-2 opacity-20" />
          <p>No matching rides found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((ride) => (
            <Card 
              key={ride.id} 
              className="cursor-pointer hover:shadow-md transition-all border-none shadow-sm group relative overflow-hidden bg-white dark:bg-card"
              onClick={() => onRideClick(ride.id)}
            >
              <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1",
                ride.status === "completed" ? "bg-green-500" : ride.status === "cancelled" ? "bg-red-500" : "bg-orange-500"
              )} />
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-bold flex items-center gap-2">
                        {ride.townStarting} <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /> {ride.townEnding}
                      </h3>
                      <Badge 
                        variant={ride.status === "completed" ? "default" : ride.status === "cancelled" ? "destructive" : "secondary"}
                        className={cn(
                          "capitalize text-[10px] h-5 px-2",
                          ride.status === "upcoming" && "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
                        )}
                      >
                        {ride.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <Clock className="h-3.5 w-3.5" />
                        {format(new Date(ride.departTime), "MMM d, h:mm a")}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <CarFront className="h-3.5 w-3.5" />
                        {ride.vehiclePlate}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Users className="h-3.5 w-3.5" />
                        {ride.seats} seats
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="text-xs font-medium">View Details</span>
                    <ChevronRight className="h-4 w-4" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
