import { redirect } from "next/navigation"

// Ride request details are now shown in a side sheet from the requests list,
// so this standalone route just sends visitors back there.
export default function RideRequestDetailsPage() {
  redirect("/dashboard/rides-requests")
}


