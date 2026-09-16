"use client"

import { useDashboardActivity } from "@/app/dashboard/hooks/use-dashboard-activity"

export function ActivityFeedCard() {
  const { data, isLoading } = useDashboardActivity()

  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-base font-semibold">Recent activity</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Keep track of events across rides and requests.
      </p>

      <div className="mt-4 space-y-4">
        {isLoading ? (
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="h-14 animate-pulse rounded-lg border border-border bg-muted/40" />
          ))
        ) : !data || data.length === 0 ? (
          <p className="py-4 text-xs text-muted-foreground">
            No recent activity yet.
          </p>
        ) : (
          data.map((item) => (
            <article key={item.id} className="relative pl-5">
              <span className="absolute left-0 top-1.5 size-2 rounded-full bg-primary" />
              <p className="text-sm font-medium">{item.summary}</p>
              <p className="text-xs text-muted-foreground">{item.detail}</p>
              <p className="mt-1 text-[11px] text-muted-foreground">{item.timestamp}</p>
            </article>
          ))
        )}
      </div>
    </section>
  )
}
