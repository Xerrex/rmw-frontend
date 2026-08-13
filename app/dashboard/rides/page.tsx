"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import type { DateRange } from "react-day-picker"
import {
  CarFront, Users, Search, Clock, ArrowRight, ChevronRight, ChevronLeft,
  UserPlus, SlidersHorizontal, CalendarIcon, X,
} from "lucide-react"
import { useRides } from "./hooks/use-rides-data"
import { CreateRideModal } from "./components/CreateRideModal"
import { RequestRideModal } from "./components/RequestRideModal"
import { format, parse } from "date-fns"
import { cn } from "@/lib/utils"
import { Ride } from "./hooks/types"

const SEAT_OPTIONS = ["1", "2", "3", "4", "5"]
const PAGE_SIZE_OPTIONS = [5, 10, 20, 50]

function matchesRideSearch(ride: Ride, query: string) {
  const q = query.toLowerCase()
  return (
    ride.vehicle_plate.toLowerCase().includes(q) ||
    ride.vehicle_model.toLowerCase().includes(q) ||
    ride.town_starting.toLowerCase().includes(q) ||
    ride.town_ending.toLowerCase().includes(q)
  )
}

export default function RidesPage() {
  const router = useRouter()
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [searchInput, setSearchInput] = useState("")
  const [debouncedSearch, setDebouncedSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [minSeats, setMinSeats] = useState<string>("any")
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined)

  // Search locally against the currently loaded page instantly; only hit the
  // backend once the user pauses typing.
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

  const { rides, total, isLoading: ridesLoading } = useRides({
    page,
    limit: itemsPerPage,
    search: debouncedSearch,
    minSeats: minSeatsValue,
    dateFrom,
    dateTo,
    enabled: true,
  })

  const filteredRides = useMemo(() => {
    return (rides || []).filter((r) => {
      const matchesSearch = !searchInput || matchesRideSearch(r, searchInput)
      const matchesStatus = statusFilter === "all" || r.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [rides, searchInput, statusFilter])

  const totalPages = Math.max(1, Math.ceil(total / itemsPerPage))
  const activeFilterCount = (minSeats !== "any" ? 1 : 0) + (dateRange?.from ? 1 : 0)

  function clearFilters() {
    setMinSeats("any")
    setDateRange(undefined)
    setPage(1)
  }

  // Mock: Check if user has already requested a ride
  const hasRequested = (rideId: string) => {
    // return requests?.some(req => req.rideId === rideId)
    return false
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500 pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            Rides
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your rides and track their progress.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <CreateRideModal />
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
              <TabsTrigger value="canceled" className="relative h-10 rounded-none border-b-2 border-b-transparent bg-transparent px-2 pb-2 pt-2 font-semibold text-muted-foreground transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none">
                Canceled
              </TabsTrigger>
            </TabsList>
            <div className="text-xs text-muted-foreground font-medium">
              {filteredRides.length} {statusFilter} rides found
            </div>
          </div>

          <div className="mt-6">
            {ridesLoading ? (
              <div className="flex flex-col items-center justify-center h-[40vh] space-y-4">
                <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground animate-pulse">Loading rides data...</p>
              </div>
            ) : (
              <RideList
                data={filteredRides}
                hasRequested={hasRequested}
                onRideClick={(id) => router.push(`/dashboard/rides/${id}`)}
              />
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


function RideList({ data, hasRequested, onRideClick }: { data: Ride[], hasRequested: (id: string) => boolean, onRideClick: (id: string) => void }) {
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
              className="hover:shadow-md transition-all border-none shadow-sm group relative overflow-hidden bg-white dark:bg-card"
            >
              <div className={cn(
                "absolute left-0 top-0 bottom-0 w-1",
                ride.status === "completed" ? "bg-green-500" : ride.status === "canceled" ? "bg-red-500" : "bg-orange-500"
              )} />
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="text-lg font-bold flex items-center gap-2">
                          {ride.town_starting} <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" /> {ride.town_ending}
                        </h3>
                        <Badge 
                          variant={ride.status === "completed" ? "default" : ride.status === "canceled" ? "destructive" : "secondary"}
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
                          {format(parse(ride.depart_time, 'dd-MM-yyyy HH:mm', new Date()), "dd-MM-yyyy HH:mm")}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <CarFront className="h-3.5 w-3.5" />
                          {ride.vehicle_plate}
                        </span>
                      </div>
                    </div>
                    <Button variant="ghost" size="icon" className="shrink-0" onClick={() => onRideClick(ride.uuid)}>
                      <ChevronRight className="h-5 w-5" />
                    </Button>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-4 border-t">
                    <div className="flex items-center gap-1.5 text-sm font-medium">
                      <Users className="h-4 w-4 text-primary" />
                      {ride.seats} seats available
                    </div>
                    
                    {!hasRequested(ride.uuid) && ride.status === "upcoming" ? (
                      <RequestRideModal rideUuid={ride.uuid} rideRoute={`${ride.town_starting} to ${ride.town_ending}`}>
                        <Button size="sm" variant="outline" className="gap-2">
                          <UserPlus className="h-4 w-4" />
                          Join Ride
                        </Button>
                      </RequestRideModal>
                    ) : hasRequested(ride.uuid) ? (
                      <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200">
                        Requested
                      </Badge>
                    ) : null}
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
