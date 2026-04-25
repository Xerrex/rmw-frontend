"use client"

import { useRideRequests } from "@/app/dashboard/hooks/use-ride-requests"

const statusStyles = {
  pending: "bg-amber-500/15 text-amber-700 dark:text-amber-300",
  approved: "bg-emerald-500/15 text-emerald-700 dark:text-emerald-300",
  rejected: "bg-rose-500/15 text-rose-700 dark:text-rose-300",
} as const

export function RideRequestsCard() {
  const { data, isLoading } = useRideRequests()

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-base font-semibold">Ride requests</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Review incoming passenger requests for your routes.
      </p>

      <div className="mt-4 space-y-3">
        {isLoading
          ? Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="h-20 animate-pulse rounded-lg border border-border bg-muted/40" />
            ))
          : data?.map((request) => (
              <article
                key={request.id}
                className="rounded-lg border border-border bg-background p-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold">{request.passengerName}</p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {request.route} • {request.seatsRequested} seat(s)
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Pickup: {request.pickup} • Drop-off: {request.dropOff}
                    </p>
                  </div>
                  <span className={`rounded-full px-2 py-1 text-xs font-medium capitalize ${statusStyles[request.status]}`}>
                    {request.status}
                  </span>
                </div>
              </article>
            ))}
      </div>
    </section>
  )
}
