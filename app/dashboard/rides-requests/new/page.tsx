"use client"

import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Step1Locations } from "./components/Step1Locations"
import { Step2MatchingRides } from "./components/Step2MatchingRides"
import { Step3RequestDetails } from "./components/Step3RequestDetails"
import { SummaryPanel } from "./components/SummaryPanel"
import { useRides, useCreateRideRequest } from "../../rides/hooks/use-rides-data"
import type { Ride } from "../../rides/hooks/types"

const STEP_LABELS = ["Route", "Select Ride", "Details"]

export default function NewRideRequestPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)

  const [townStarting, setTownStarting] = useState("")
  const [townEnding, setTownEnding] = useState("")
  const [selectedRide, setSelectedRide] = useState<Ride | null>(null)
  const [seats, setSeats] = useState(1)
  const [pickup, setPickup] = useState("")
  const [stop, setStop] = useState("")
  const [passengerNames, setPassengerNames] = useState<string[]>([])

  const searchTerm = [townStarting, townEnding].filter(Boolean).join(" ")
  const { rides, isLoading: isSearching } = useRides({
    page: 1,
    limit: 20,
    search: searchTerm || undefined,
    enabled: step >= 2,
  })

  const matchingRides = useMemo(
    () => rides.filter((r) => !r.is_owner && r.status === "upcoming" && r.available_seats > 0),
    [rides]
  )

  const { createRideRequest, isCreatingRequest } = useCreateRideRequest(selectedRide?.uuid || "")

  function handlePassengerNameChange(index: number, value: string) {
    setPassengerNames((prev) => {
      const next = [...prev]
      next[index] = value
      return next
    })
  }

  function handleDetailsChange(field: "seats" | "pickup" | "stop", value: string | number) {
    if (field === "seats") setSeats(Number(value) || 1)
    if (field === "pickup") setPickup(String(value))
    if (field === "stop") setStop(String(value))
  }

  function canGoNext() {
    if (step === 1) return townStarting.trim() !== "" || townEnding.trim() !== ""
    if (step === 2) return selectedRide !== null
    return true
  }

  const extraSeatsRequired = Math.max(seats - 1, 0)
  const passengerNamesComplete =
    passengerNames.slice(0, extraSeatsRequired).every((n) => n && n.trim() !== "") &&
    passengerNames.length >= extraSeatsRequired
  const canSubmit = !!selectedRide && pickup.trim() !== "" && stop.trim() !== "" && seats > 0 && passengerNamesComplete

  async function handleSubmit() {
    if (!selectedRide) return
    try {
      await createRideRequest({
        seats,
        pickup,
        stop,
        passenger_names: passengerNames.slice(0, extraSeatsRequired),
      })
      toast.success("Request sent to the ride owner")
      router.push("/dashboard/rides-requests")
    } catch {
      toast.error("Failed to send the request. Please try again.")
    }
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full h-8 w-8">
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Create Ride Request</h1>
          <p className="text-sm text-muted-foreground">Follow the steps to join a ride.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between px-2">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex flex-col items-center gap-2">
                <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                  step === s ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" :
                  step > s ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
                }`}>
                  {step > s ? "✓" : s}
                </div>
                <span className={`text-[10px] font-bold uppercase tracking-wider ${step === s ? "text-primary" : "text-muted-foreground"}`}>
                  {STEP_LABELS[s - 1]}
                </span>
              </div>
            ))}
          </div>

          <div className="min-h-75 bg-white dark:bg-card/50 p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
            {step === 1 && (
              <Step1Locations
                townStarting={townStarting}
                townEnding={townEnding}
                onChange={(field, value) => (field === "townStarting" ? setTownStarting(value) : setTownEnding(value))}
              />
            )}
            {step === 2 && (
              <Step2MatchingRides
                rides={matchingRides}
                selectedRideUuid={selectedRide?.uuid ?? null}
                onSelect={setSelectedRide}
                isLoading={isSearching}
              />
            )}
            {step === 3 && (
              <Step3RequestDetails
                seats={seats}
                pickup={pickup}
                stop={stop}
                passengerNames={passengerNames}
                onChange={handleDetailsChange}
                onPassengerNameChange={handlePassengerNameChange}
              />
            )}

            <div className="flex items-center justify-between mt-10 pt-6 border-t">
              <Button
                variant="ghost"
                disabled={step === 1}
                onClick={() => setStep((s) => Math.max(1, s - 1))}
                className="gap-2"
              >
                <ChevronLeft className="h-4 w-4" /> Back
              </Button>
              {step < 3 ? (
                <Button disabled={!canGoNext()} onClick={() => setStep((s) => Math.min(3, s + 1))} className="gap-2">
                  Next <ChevronRight className="h-4 w-4" />
                </Button>
              ) : null}
            </div>
          </div>
        </div>

        <div>
          <SummaryPanel
            pickup={pickup}
            stop={stop}
            selectedRide={selectedRide}
            seats={seats}
            isPending={isCreatingRequest}
            canSubmit={canSubmit}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  )
}
