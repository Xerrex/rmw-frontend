"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Pie, PieChart, Cell } from "recharts"
import { useAnalytics } from "./hooks/use-analytics"
import { CarFront, Users, CheckCircle2, TrendingUp, TrendingDown, Users2 } from "lucide-react"

export default function AnalyticsPage() {
  const { data, isLoading } = useAnalytics()

  if (isLoading || !data) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] space-y-4">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-muted-foreground animate-pulse">Loading analytics...</p>
      </div>
    )
  }

  const chartConfig = {
    completed: {
      label: "Completed",
      color: "oklch(0.5 0.134 242.749)",
    },
    cancelled: {
      label: "Cancelled",
      color: "oklch(0.704 0.191 22.216)",
    },
    confirmed: {
      label: "Confirmed",
      color: "oklch(0.5 0.134 242.749)",
    },
    pending: {
      label: "Pending",
      color: "oklch(0.8 0.1 200)",
    },
    rejected: {
      label: "Rejected",
      color: "oklch(0.6 0.2 30)",
    },
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-linear-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          Analytics Overview
        </h1>
        <p className="text-muted-foreground mt-1">
          Monitor your platform&apos;s performance and growth metrics.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Total Rides</CardTitle>
            <CarFront className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalRides.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" /> +12% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Ride Requests</CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalRequests.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" /> +25% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Total Passengers</CardTitle>
            <Users2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalPassengers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3 text-green-500" /> +8% from last month
            </p>
          </CardContent>
        </Card>
        <Card className="border-none shadow-lg bg-card/50 backdrop-blur-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Active Drivers</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.activeDrivers.toLocaleString()}</div>
            <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
              <TrendingDown className="h-3 w-3 text-red-500" /> -2% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Weekly Activity Bar Chart */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Weekly Ride Activity</CardTitle>
            <CardDescription>Completed vs Cancelled rides over the last 7 days.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-75 w-full">
              <BarChart data={data.ridesOverTime}>
                <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fill: 'currentColor', fontSize: 12 }}
                />
                <YAxis hide />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar 
                  dataKey="completed" 
                  fill="var(--color-completed)" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
                <Bar 
                  dataKey="cancelled" 
                  fill="var(--color-cancelled)" 
                  radius={[4, 4, 0, 0]} 
                  animationDuration={1500}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        {/* Request Status Distribution Pie Chart */}
        <Card className="border-none shadow-xl bg-card/50 backdrop-blur-md">
          <CardHeader>
            <CardTitle>Request Distribution</CardTitle>
            <CardDescription>Breakdown of ride requests by status.</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig} className="h-75 w-full">
              <PieChart>
                <Pie
                  data={data.statusDistribution}
                  dataKey="count"
                  nameKey="status"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  stroke="none"
                >
                  {data.statusDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={`var(--color-${entry.status})`} />
                  ))}
                </Pie>
                <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                <ChartLegend content={<ChartLegendContent />} />
              </PieChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
