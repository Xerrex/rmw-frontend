"use client"

import { ArrowDownRight, ArrowUpRight } from "lucide-react"

import { useDashboardMetrics } from "@/app/dashboard/hooks/use-dashboard-metrics"

export function DashboardMetrics() {
  const { data, isLoading } = useDashboardMetrics()

  if (isLoading) {
    return (
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="h-28 animate-pulse rounded-xl border border-border bg-muted/40" />
        ))}
      </section>
    )
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {data?.map((metric) => (
        <article key={metric.id} className="rounded-xl border border-border bg-card p-4 shadow-sm">
          <p className="text-sm text-muted-foreground">{metric.label}</p>
          <p className="mt-3 text-2xl font-bold text-foreground">{metric.value}</p>
          <p
            className={`mt-2 inline-flex items-center gap-1 text-xs font-medium ${metric.trendUp ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}`}
          >
            {metric.trendUp ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
            {metric.trendText}
          </p>
        </article>
      ))}
    </section>
  )
}
