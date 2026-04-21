"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"

const resetPasswordSchema = z.object({
  email: z.string().email("Enter a valid email address"),
})

type ResetPasswordValues = z.infer<typeof resetPasswordSchema>

interface ResetPasswordFormProps {
  onBackToSignIn: () => void
}

export function ResetPasswordForm({ onBackToSignIn }: ResetPasswordFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: ResetPasswordValues) => {
    await Promise.resolve(values)
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="space-y-2">
        <label htmlFor="reset-email" className="text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="reset-email"
          type="email"
          placeholder="you@example.com"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("email")}
        />
        {errors.email ? (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        ) : null}
      </div>

      {isSubmitSuccessful ? (
        <p className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
          A reset link has been sent if that email exists in our system.
        </p>
      ) : null}

      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Sending..." : "Send reset link"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Remembered your password?{" "}
        <button
          type="button"
          onClick={onBackToSignIn}
          className="font-semibold text-primary hover:underline"
        >
          Back to sign in
        </button>
      </p>
    </form>
  )
}
