"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search, Users, Clock, MapPin, CheckCircle2, XCircle, Ban, ChevronRight, Plus } from "lucide-react"
import { useRidesRequests } from "./hooks/use-rides-requests"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RideRequestsPage() {
  const router = useRouter()
  const { data: requests, isLoading } = useRidesRequests()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading requests...</p>
      </div>
    )
  }

  const filteredRequests = (requests || []).filter((req) => {
    const matchesSearch = 
      req.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.dropOff.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  })

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ride Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all incoming passenger requests.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/dashboard/rides-requests/new")} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Request</span>
          </Button>
          <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search passengers, routes..." 
              className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap">
          <TabsList className="inline-flex h-12 items-center justify-start rounded-none border-b bg-transparent p-0 w-full mb-6">
            <TabsTrigger value="all" className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
              All Requests
            </TabsTrigger>
            <TabsTrigger value="pending" className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
              <Clock className="mr-2 h-4 w-4" />
              Pending
            </TabsTrigger>
            <TabsTrigger value="confirmed" className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
              <CheckCircle2 className="mr-2 h-4 w-4" />
              Confirmed
            </TabsTrigger>
            <TabsTrigger value="cancelled" className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
              <Ban className="mr-2 h-4 w-4" />
              Cancelled
            </TabsTrigger>
            <TabsTrigger value="rejected" className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-4 pb-3 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
              <XCircle className="mr-2 h-4 w-4" />
              Rejected
            </TabsTrigger>
          </TabsList>
        </ScrollArea>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
          {filteredRequests.length === 0 ? (
            <div className="h-40 flex flex-col items-center justify-center rounded-xl border-2 border-dashed text-muted-foreground bg-muted/20">
              <Users className="h-10 w-10 mb-2 opacity-20" />
              <p>No requests found matching your criteria.</p>
            </div>
          ) : (
            filteredRequests.map((req) => (
              <Card 
                key={req.id} 
                className="cursor-pointer hover:shadow-md transition-all border-none shadow-sm group relative overflow-hidden bg-white dark:bg-card"
                onClick={() => router.push(`/dashboard/rides-requests/${req.id}`)}
              >
                <div className={cn(
                  "absolute left-0 top-0 bottom-0 w-1",
                  req.status === "confirmed" ? "bg-green-500" : 
                  req.status === "pending" ? "bg-orange-500" : "bg-red-500"
                )} />
                <CardContent className="p-4 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h4 className="font-bold text-lg">{req.passengerName}</h4>
                        <Badge 
                          variant={req.status === "confirmed" ? "default" : req.status === "pending" ? "secondary" : "destructive"}
                          className={cn(
                            "capitalize text-[10px] h-5 px-2",
                            req.status === "pending" && "bg-orange-100 text-orange-700 hover:bg-orange-100 dark:bg-orange-900/30 dark:text-orange-400"
                          )}
                        >
                          {req.status}
                        </Badge>
                      </div>
                      
                      <div className="flex flex-col gap-1">
                        <span className="font-medium text-primary text-sm">{req.route}</span>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Pickup: {req.pickup}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Drop-off: {req.dropOff}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                          <Users className="h-3.5 w-3.5 text-primary" />
                          {req.seatsRequested} Seats
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {format(new Date(req.createdAt), "MMM d, h:mm a")}
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
            ))
          )}
        </div>
      </Tabs>
    </div>
  )
}
