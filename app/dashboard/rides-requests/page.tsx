"use client"

import { useState, useEffect, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { Calendar } from "@/components/ui/calendar"
import { Search, Users, Clock, MapPin, CheckCircle2, XCircle, Ban, ChevronRight, 
  Plus, ChevronLeft, SlidersHorizontal, X, CalendarIcon } from "lucide-react"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import type { DateRange } from "react-day-picker"
import { useRideRequests } from "./hooks/use-rides-requests-data"
import { RideRequest } from "./hooks/types"


const SEAT_OPTIONS = ["1", "2", "3", "4", "5"]
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

function matchesRideRequestSearch(rr: RideRequest, query:string){
  const q = query.toLowerCase()

  return (
    rr.requester_name.toLowerCase().includes(q) ||
    rr.stop.toLowerCase().includes(q)
  )
}

export default function RideRequestsPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchInput, setSearchInput] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [minSeats, setMinSeats] = useState<string>("any")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)


  useEffect(() => {
    const handle = setTimeout(() => {
      setDebouncedSearch(searchInput)
      setPage(1)
    }, 400)
    return () => clearTimeout(handle)
  }, [searchInput])

  const dateFrom = dateRange?.from ? new Date(dateRange.from.setHours(0, 0, 0, 0)).toISOString() : undefined
  const dateTo = dateRange?.to ? new Date(dateRange.to.setHours(23, 59, 59, 999)).toISOString() : undefined
  const minSeatsValue = minSeats === "any" ? undefined : Number(minSeats)

  const { rideRequests, isLoading, total } = useRideRequests({
    page, 
    limit: itemsPerPage,
    search: debouncedSearch,
    minSeats: minSeatsValue,
    dateFrom,
    dateTo,
    enabled: true
  })

  // const filteredRequests = (requests || []).filter((req) => {
  //   const matchesSearch = 
  //     req.passengerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     req.route.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     req.pickup.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     req.dropOff.toLowerCase().includes(searchQuery.toLowerCase());
    
  //   const matchesStatus = statusFilter === "all" || req.status === statusFilter;
    
  //   return matchesSearch && matchesStatus;
  // })

  const filteredRequests = useMemo(()=>{
    return (rideRequests || []).filter((rr) => {
      const matchesSearch = !searchInput || matchesRideRequestSearch(rr, searchInput)
      const matchesStatus = statusFilter === "all" || rr.status === statusFilter;
      return matchesSearch && matchesStatus;
    })
  }, [rideRequests, searchInput, statusFilter])

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))
  const activeFilterCount = (minSeats !== "any" ? 1 : 0) + (dateRange?.from ? 1 : 0)

  function clearFilters() {
    setMinSeats("any")
    setDateRange(undefined)
    setPage(1)
  }

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading requests...</p>
      </div>
    )
  }

  

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Ride Requests
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage and track all request to join rides.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={() => router.push("/dashboard/rides-requests/new")} className="gap-2 shrink-0">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Create Request</span>
          </Button>
          {/* <div className="relative w-full md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search passengers, routes..." 
              className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div> */}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by plate, model, or town..."
            className="pl-10 bg-background/50 backdrop-blur-sm border-primary/20 focus-visible:ring-primary"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
          />
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="gap-2 shrink-0">
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              {activeFilterCount > 0 && (
                <Badge className="h-5 min-w-5 px-1 rounded-full">{activeFilterCount}</Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80" align="end">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">Filters</p>
                {activeFilterCount > 0 && (
                  <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs" onClick={clearFilters}>
                    <X className="h-3 w-3" /> Clear
                  </Button>
                )}
              </div>

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground">Minimum seats available</p>
                <Select value={minSeats} onValueChange={(v) => { setMinSeats(v); setPage(1) }}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Any" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">Any</SelectItem>
                    {SEAT_OPTIONS.map((seat) => (
                      <SelectItem key={seat} value={seat}>{seat}+ seats</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <Separator />

              <div className="space-y-1.5">
                <p className="text-xs font-medium text-muted-foreground flex items-center gap-1.5">
                  <CalendarIcon className="h-3.5 w-3.5" /> Departure date range
                </p>
                <Calendar
                  mode="range"
                  selected={dateRange}
                  onSelect={(range) => { setDateRange(range); setPage(1) }}
                  numberOfMonths={1}
                  className="p-0"
                />
              </div>
            </div>
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-4">
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
                key={req.uuid} 
                className="cursor-pointer hover:shadow-md transition-all border-none shadow-sm group relative overflow-hidden bg-white dark:bg-card"
                onClick={() => router.push(`/dashboard/rides-requests/${req.uuid}`)}
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
                        <h4 className="font-bold text-lg">{req.requester_name}</h4>
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
                      
                      {/** TODO: Fix this route thing */}
                      {/* <div className="flex flex-col gap-1">
                        <span className="font-medium text-primary text-sm">{req.route}</span>
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Pickup: {req.pickup}</span>
                          <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> Drop-off: {req.dropOff}</span>
                        </div>
                      </div> */}

                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1.5 font-medium text-foreground">
                          <Users className="h-3.5 w-3.5 text-primary" />
                          {req.seats} Seats
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="h-3.5 w-3.5" />
                          {format(parse(req.created_at, 'dd-MM-yyyy HH:mm', new Date()), "dd-MM-yyyy HH:mm")}
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

      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span>Rows per page</span>
          <Select value={String(itemsPerPage)} onValueChange={(v) => { setItemsPerPage(Number(v)); setPage(1) }}>
            <SelectTrigger size="sm" className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PAGE_SIZE_OPTIONS.map((size) => (
                <SelectItem key={size} value={String(size)}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-muted-foreground">
            Page {page} of {totalPages}
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline" size="icon-sm"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline" size="icon-sm"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
