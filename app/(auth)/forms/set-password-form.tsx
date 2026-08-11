"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { useAuthBackend } from "@/app/(auth)/hooks/useAuthbackend"

const setPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SetPasswordValues = z.infer<typeof setPasswordSchema>

interface SetPasswordFormProps {
  onBackToSignIn: () => void
  onSuccess?: () => void
  resetToken?: string
}

export function SetPasswordForm({ onBackToSignIn, onSuccess, resetToken }: SetPasswordFormProps) {
  const { setPasswordAPI } = useAuthBackend()

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<SetPasswordValues>({
    resolver: zodResolver(setPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: SetPasswordValues) => {
    if (!resetToken) {
      return
    }

    try {
      await setPasswordAPI.mutateAsync({
        resetToken,
        password: values.password,
      })
      onSuccess?.()
    } catch (error) {
      console.error("Failed to set password", error)
    }
  }

  if (!resetToken) {
    return (
      <div className="space-y-4">
        <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
          This password reset link is missing or invalid. Please request a new reset link and try again.
        </p>
        <Button type="button" className="h-11 w-full" onClick={onBackToSignIn}>
          Back to sign in
        </Button>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>

      <div className="space-y-2">
        <label htmlFor="set-password-password" className="text-sm font-medium text-foreground">
          New password
        </label>
        <input
          id="set-password-password"
          type="password"
          placeholder="At least 8 characters"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("password")}
        />
        {errors.password ? <p className="text-xs text-destructive">{errors.password.message}</p> : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="set-password-confirm" className="text-sm font-medium text-foreground">
          Confirm new password
        </label>
        <input
          id="set-password-confirm"
          type="password"
          placeholder="Repeat your new password"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      {isSubmitSuccessful ? (
        <p className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-2 text-sm text-primary">
          Password updated successfully. You can now sign in with your new password.
        </p>
      ) : null}

      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Updating password..." : "Set password"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Ready to continue?{" "}
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
