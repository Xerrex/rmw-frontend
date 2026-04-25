"use client"

import { Clock3, MapPin } from "lucide-react"

import { useUpcomingRides } from "@/app/dashboard/hooks/use-upcoming-rides"

export function UpcomingRidesCard() {
  const { data, isLoading } = useUpcomingRides()

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-base font-semibold">Upcoming rides</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Next trips you are driving or joining.
      </p>

      <div className="mt-4 space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-lg border border-border bg-muted/40" />
            ))
          : data?.map((ride) => (
              <article
                key={ride.id}
                className="rounded-lg border border-border bg-background p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{ride.route}</p>
                    <p className="mt-1 text-xs text-muted-foreground">Vehicle: {ride.vehicleNumber}</p>
                  </div>
                  <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                    {ride.seatsAvailable} seats left
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <MapPin className="size-3.5" />
                    {ride.startTown} to {ride.endTown}
                  </span>
                  <span className="inline-flex items-center gap-1">
                    <Clock3 className="size-3.5" />
                    {ride.startTime} • ETA {ride.etaTime}
                  </span>
                </div>
              </article>
            ))}
      </div>
    </section>
  )
}
