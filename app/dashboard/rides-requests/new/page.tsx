"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react"
import { Step1Locations } from "./components/Step1Locations"
import { Step2MatchingRides } from "./components/Step2MatchingRides"
import { Step3RequestDetails } from "./components/Step3RequestDetails"
import { SummaryPanel } from "./components/SummaryPanel"
import { useSearchRides } from "../../rides/hooks/use-rides-data"
import { useCreateRequest } from "../hooks/use-rides-requests-data"

export default function NewRideRequestPage() {
  // const router = useRouter()
  // const [step, setStep] = useState(1)
  
  // // Form State
  // const [formData, setFormData] = useState({
  //   pickup: "",
  //   dropoff: "",
  //   selectedRide: null as any | null,
  //   seats: 1,
  //   notes: ""
  // })

  // // Hooks
  // const { mutateAsync: searchRides, isPending: isSearching } = useSearchRides()
  // const { mutate: createRequest, isPending: isCreating } = useCreateRequest()
  // const [matchingRides, setMatchingRides] = useState<any[]>([])

  // const handleFieldChange = (field: string, value: any) => {
  //   setFormData(prev => ({ ...prev, [field]: value }))
  // }

  // const nextStep = async () => {
  //   if (step === 1) {
  //     // Trigger search when moving to step 2
  //     const results = await searchRides({ pickup: formData.pickup, dropoff: formData.dropoff })
  //     setMatchingRides(results)
  //   }
  //   setStep(prev => prev + 1)
  // }

  // const prevStep = () => {
  //   setStep(prev => prev - 1)
  // }

  // const handleSubmit = () => {
  //   createRequest(formData)
  //   router.push("/dashboard/rides-requests")
  // }

  // const canGoNext = () => {
  //   if (step === 1) return formData.pickup.trim() !== "" && formData.dropoff.trim() !== ""
  //   if (step === 2) return formData.selectedRide !== null
  //   return true
  // }

  // const canSubmit = formData.pickup !== "" && formData.dropoff !== "" && formData.selectedRide !== null && formData.seats > 0

  // return (
  //   <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
  //     <div className="flex items-center gap-4">
  //       <Button variant="outline" size="icon" onClick={() => router.back()} className="rounded-full h-8 w-8">
  //         <ArrowLeft className="h-4 w-4" />
  //       </Button>
  //       <div>
  //         <h1 className="text-2xl font-bold tracking-tight">Create Ride Request</h1>
  //         <p className="text-sm text-muted-foreground">Follow the steps to join a ride.</p>
  //       </div>
  //     </div>

  //     <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
  //       {/* Stepper Content */}
  //       <div className="lg:col-span-2 space-y-8">
  //         {/* Stepper Progress */}
  //         <div className="flex items-center justify-between px-2">
  //           {[1, 2, 3].map((s) => (
  //             <div key={s} className="flex flex-col items-center gap-2">
  //               <div className={`h-8 w-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
  //                 step === s ? "bg-primary text-white scale-110 shadow-lg shadow-primary/20" : 
  //                 step > s ? "bg-green-500 text-white" : "bg-muted text-muted-foreground"
  //               }`}>
  //                 {step > s ? "✓" : s}
  //               </div>
  //               <span className={`text-[10px] font-bold uppercase tracking-wider ${step === s ? "text-primary" : "text-muted-foreground"}`}>
  //                 {s === 1 ? "Route" : s === 2 ? "Select Ride" : "Details"}
  //               </span>
  //             </div>
  //           ))}
  //         </div>

  //         <div className="min-h-[300px] bg-white dark:bg-card/50 p-6 sm:p-8 rounded-3xl shadow-sm border border-border/50">
  //           {step === 1 && (
  //             <Step1Locations 
  //               pickup={formData.pickup} 
  //               dropoff={formData.dropoff} 
  //               onChange={(f, v) => handleFieldChange(f, v)} 
  //             />
  //           )}
  //           {step === 2 && (
  //             <Step2MatchingRides 
  //               rides={matchingRides} 
  //               selectedRideId={formData.selectedRide?.id} 
  //               onSelect={(ride) => handleFieldChange("selectedRide", ride)}
  //               isLoading={isSearching}
  //             />
  //           )}
  //           {step === 3 && (
  //             <Step3RequestDetails 
  //               seats={formData.seats} 
  //               notes={formData.notes} 
  //               onChange={(f, v) => handleFieldChange(f, v)} 
  //             />
  //           )}

  //           <div className="flex items-center justify-between mt-10 pt-6 border-t">
  //             <Button 
  //               variant="ghost" 
  //               onClick={prevStep} 
  //               disabled={step === 1}
  //               className="gap-2"
  //             >
  //               <ChevronLeft className="h-4 w-4" /> Back
  //             </Button>
  //             {step < 3 && (
  //               <Button 
  //                 onClick={nextStep} 
  //                 disabled={!canGoNext() || isSearching}
  //                 className="gap-2 px-6"
  //               >
  //                 {isSearching ? "Searching..." : "Continue"} <ChevronRight className="h-4 w-4" />
  //               </Button>
  //             )}
  //           </div>
  //         </div>
  //       </div>

  //       {/* Summary Panel (Responsive) */}
  //       <div className="lg:col-span-1">
  //         <SummaryPanel 
  //           pickup={formData.pickup}
  //           dropoff={formData.dropoff}
  //           selectedRide={formData.selectedRide}
  //           seats={formData.seats}
  //           isPending={isCreating}
  //           canSubmit={canSubmit}
  //           onSubmit={handleSubmit}
  //         />
  //       </div>
  //     </div>
  //   </div>
  // )
}
