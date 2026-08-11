"use client"

import { useEffect, useMemo, useState } from "react"
import { useSearchParams } from "next/navigation"

import { ResetPasswordForm } from "@/app/(auth)/forms/reset-password-form"
import { SetPasswordForm } from "@/app/(auth)/forms/set-password-form"
import { SignInForm } from "@/app/(auth)/forms/sign-in-form"
import { SignUpForm } from "@/app/(auth)/forms/sign-up-form"

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
  const [view, setView] = useState<AuthView>("signin")
  const searchParams = useSearchParams()
  const urlToken = searchParams?.get("token") ?? searchParams?.get("reset_token") ?? undefined
  const hasResetToken = Boolean(urlToken)

  useEffect(() => {
    if (hasResetToken) {
      setView("setpassword")
    }
  }, [hasResetToken])

  const content = useMemo(() => authContent[view], [view])

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
            onSuccess={() => setView("signin")}
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
