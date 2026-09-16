"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShieldCheck } from "lucide-react"
import { useAuthContext } from "@/app/(auth)/AuthContext"

export default function SelectDestinationPage() {
  const router = useRouter()
  const { loading, isAuthenticated, hasManagementAccess, isUserLoading } = useAuthContext()

  useEffect(() => {
    if (loading || isUserLoading) return
    if (!isAuthenticated) {
      router.replace("/")
      return
    }
    if (!hasManagementAccess) {
      router.replace("/dashboard")
    }
  }, [loading, isUserLoading, isAuthenticated, hasManagementAccess, router])

  if (loading || isUserLoading || !isAuthenticated || !hasManagementAccess) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <Dialog open modal>
      <DialogContent showCloseButton={false} onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle>Where would you like to go?</DialogTitle>
          <DialogDescription>
            Your account has access to the management pages. Choose where to continue.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="flex-col gap-2 sm:flex-col">
          <Button size="lg" className="justify-start gap-2 w-full" onClick={() => router.push("/dashboard")}>
            <LayoutDashboard className="size-4" />
            Go to the App
          </Button>
          <Button size="lg" variant="secondary" className="justify-start gap-2 w-full" onClick={() => router.push("/management")}>
            <ShieldCheck className="size-4" />
            Go to Management
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
