"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Button } from "@/components/ui/button"
import { useAuthContext } from "../AuthContext"

const signInSchema = z.object({
  email: z.string().email("Enter a valid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  remember: z.boolean(),
})

type SignInValues = z.input<typeof signInSchema>

interface SignInFormProps {
  onForgotPassword: () => void
  onSignUp: () => void
}

export function SignInForm({ onForgotPassword, onSignUp }: SignInFormProps) {
  const {signInHandler} = useAuthContext();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  })

  const onSubmit = async (values: SignInValues) => {
    await signInHandler(values)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <label htmlFor="sign-in-email" className="text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="sign-in-email"
          type="email"
          placeholder="you@example.com"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="sign-in-password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="sign-in-password"
          type="password"
          placeholder="Enter your password"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="flex items-center justify-between gap-3">
        <label className="inline-flex items-center gap-2 text-sm text-muted-foreground">
          <input type="checkbox" className="size-4 accent-primary" {...register("remember")} />
          Remember me
        </label>
        <button
          type="button"
          onClick={onForgotPassword}
          className="text-sm font-medium text-primary hover:underline"
        >
          Forgot password?
        </button>
      </div>

      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Signing in..." : "Sign in"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        New to Ride My Way?{" "}
        <button
          type="button"
          onClick={onSignUp}
          className="font-semibold text-primary hover:underline"
        >
          Create an account
        </button>
      </p>
    </form>
  )
}
