"use client"

import { useEffect, useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

import { ResetPasswordForm } from "@/app/(auth)/forms/reset-password-form"
import { SetPasswordForm } from "@/app/(auth)/forms/set-password-form"
import { SignInForm } from "@/app/(auth)/forms/sign-in-form"
import { SignUpForm } from "@/app/(auth)/forms/sign-up-form"
import { useAuthContext } from "@/app/(auth)/AuthContext"

type AuthView = "signin" | "reset" | "setpassword" | "signup"

const authContent: Record<AuthView, { title: string; description: string }> = {
  signin: {
    title: "Welcome back",
    description: "Sign in to publish rides or request seats on your route.",
  },
  reset: {
    title: "Reset password",
    description: "Enter your email and we will send you reset instructions.",
  },
  setpassword: {
    title: "Set new password",
    description: "Use your reset token to securely set a new password.",
  },
  signup: {
    title: "Create your account",
    description: "Join the Ride My Way community and start sharing trips.",
  },
}

export function AuthPanel() {
  const router = useRouter()
  const { isAuthenticated, loading } = useAuthContext()
  const [view, setView] = useState<AuthView>("signin")
  const searchParams = useSearchParams()
  const urlToken = searchParams?.get("token") ?? searchParams?.get("reset_token") ?? undefined
  const hasResetToken = Boolean(urlToken)
  const shouldShowLoadingGate = loading && !hasResetToken

  useEffect(() => {
    if (hasResetToken) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setView("setpassword")
    }
  }, [hasResetToken])

  useEffect(() => {
    if (!loading && isAuthenticated) {
      router.replace("/dashboard")
    }
  }, [isAuthenticated, loading, router])

  const content = useMemo(() => authContent[view], [view])

  if (shouldShowLoadingGate) {
    return (
      <section className="flex min-h-[50vh] lg:h-full items-center justify-center bg-card/80 px-5 py-12 sm:px-8 lg:px-10">
        <div className="w-full max-w-md space-y-4 rounded-2xl border border-border bg-background p-6 shadow-lg sm:p-8">
          <div className="h-6 w-36 animate-pulse rounded bg-muted" />
          <div className="h-4 w-full animate-pulse rounded bg-muted" />
          <div className="h-4 w-5/6 animate-pulse rounded bg-muted" />
          <div className="h-11 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-11 w-full animate-pulse rounded-lg bg-muted" />
          <div className="h-11 w-full animate-pulse rounded-lg bg-muted" />
        </div>
      </section>
    )
  }

  return (
    <section className="flex min-h-[50vh] lg:h-full items-center justify-center bg-card/80 px-5 py-12 sm:px-8 lg:px-10">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-border bg-background p-6 shadow-lg sm:p-8">
        <header className="space-y-1">
          <h2 className="text-2xl font-bold text-foreground">{content.title}</h2>
          <p className="text-sm text-muted-foreground">{content.description}</p>
        </header>

        {view === "signin" ? (
          <SignInForm
            onForgotPassword={() => setView("reset")}
            onSignUp={() => setView("signup")}
          />
        ) : null}

        {view === "reset" ? (
          <ResetPasswordForm
            onBackToSignIn={() => setView("signin")}
            onSetPassword={() => setView("setpassword")}
          />
        ) : null}

        {view === "setpassword" ? (
          <SetPasswordForm
            onBackToSignIn={() => setView("signin")}
            // onSuccess={() => setView("signin")}
            resetToken={urlToken}
          />
        ) : null}

        {view === "signup" ? (
          <SignUpForm onBackToSignIn={() => setView("signin")} />
        ) : null}
      </div>
    </section>
  )
}
