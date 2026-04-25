"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Search, Users, Clock, MapPin, CheckCircle2, XCircle, Ban, Filter } from "lucide-react"
import { useRidesRequests } from "./hooks/use-rides-requests"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

export default function RideRequestsPage() {
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
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ride Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all incoming passenger requests.
          </p>
        </div>
        <div className="relative w-full md:w-72">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search passengers, routes..." 
            className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <Tabs value={statusFilter} onValueChange={setStatusFilter} className="w-full">
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
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
          <ScrollBar orientation="horizontal" />
        </ScrollArea>

        <div className="mt-2">
          <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-2xl font-bold">Requests List</CardTitle>
                <CardDescription>
                  Showing {filteredRequests.length} {statusFilter !== "all" ? statusFilter : ""} requests.
                </CardDescription>
              </div>
              <Badge variant="outline" className="h-6">
                Total: {filteredRequests.length}
              </Badge>
            </CardHeader>
            <CardContent className="p-0">
              <ScrollArea className="w-full rounded-md border">
                <Table>
                  <TableHeader className="bg-muted/50">
                    <TableRow>
                      <TableHead className="pl-6">Passenger</TableHead>
                      <TableHead>Route & Stops</TableHead>
                      <TableHead>Seats</TableHead>
                      <TableHead>Request Date</TableHead>
                      <TableHead className="text-right pr-6">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredRequests.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
                          No requests found matching your criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredRequests.map((req) => (
                        <TableRow key={req.id} className="hover:bg-primary/5 transition-colors">
                          <TableCell className="font-semibold pl-6">{req.passengerName}</TableCell>
                          <TableCell>
                            <div className="flex flex-col gap-1">
                              <span className="font-medium text-primary text-sm">{req.route}</span>
                              <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
                                <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> From: {req.pickup}</span>
                                <span className="flex items-center gap-1"><MapPin className="h-2.5 w-2.5" /> To: {req.dropOff}</span>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1.5">
                              <Users className="h-3.5 w-3.5 text-muted-foreground" />
                              {req.seatsRequested}
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground text-sm">
                            {format(new Date(req.createdAt), "MMM d, h:mm a")}
                          </TableCell>
                          <TableCell className="text-right pr-6">
                            <Badge 
                              variant={
                                req.status === "confirmed" ? "default" : 
                                req.status === "pending" ? "secondary" : 
                                "destructive"
                              }
                              className="capitalize"
                            >
                              {req.status}
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
        </div>
      </Tabs>
    </div>
  )
}
