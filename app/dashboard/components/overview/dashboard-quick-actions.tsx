import Link from "next/link"
import { CirclePlus, Search, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"

export function DashboardQuickActions() {
  return (
    <section className="rounded-xl border border-border bg-card p-4 shadow-sm sm:p-5">
      <h2 className="text-base font-semibold">Quick actions</h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Start the next trip faster with one click.
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-3">
        <Button asChild className="h-10 justify-start gap-2">
          <Link href="#">
            <CirclePlus className="size-4" />
            Create ride
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-10 justify-start gap-2">
          <Link href="#">
            <Search className="size-4" />
            Find rides
          </Link>
        </Button>

        <Button asChild variant="outline" className="h-10 justify-start gap-2">
          <Link href="#">
            <UserPlus className="size-4" />
            Invite rider
          </Link>
        </Button>
      </div>
    </section>
  )
}
