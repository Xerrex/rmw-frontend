"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, ShieldCheck } from "lucide-react"
import { useAuthContext } from "@/app/(auth)/AuthContext"

export default function SelectDestinationPage() {
  const router = useRouter()
  const { loading, isAuthenticated, hasManagementAccess } = useAuthContext()

  useEffect(() => {
    if (loading) return
    if (!isAuthenticated) {
      router.replace("/")
      return
    }
    if (!hasManagementAccess) {
      router.replace("/dashboard")
    }
  }, [loading, isAuthenticated, hasManagementAccess, router])

  if (loading || !isAuthenticated || !hasManagementAccess) {
    return null
  }

  return (
    <div className="flex min-h-screen items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl">Where would you like to go?</CardTitle>
          <CardDescription>
            Your account has access to the management pages. Choose where to continue.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3">
          <Button size="lg" className="justify-start gap-2" onClick={() => router.push("/dashboard")}>
            <LayoutDashboard className="size-4" />
            Go to the App
          </Button>
          <Button size="lg" variant="secondary" className="justify-start gap-2" onClick={() => router.push("/management")}>
            <ShieldCheck className="size-4" />
            Go to Management
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
