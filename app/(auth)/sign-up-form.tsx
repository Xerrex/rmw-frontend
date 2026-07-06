"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"

import { Button } from "@/components/ui/button"
import { useAuthBackend } from "@/app/(auth)/hooks/useAuthbackend"

const signUpSchema = z
  .object({
    // fullName: z.string().min(2, "Full name must be at least 2 characters"),
    firstName: z.string().min(2, "First name must be at least 2 characters"),
    lastName: z.string().min(2, "Last name must be at least 2 characters"),
    email: z.string().email("Enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(8, "Confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

type SignUpValues = z.infer<typeof signUpSchema>

interface SignUpFormProps {
  onBackToSignIn: () => void
}

export function SignUpForm({ onBackToSignIn }: SignUpFormProps) {
  const { signUp } = useAuthBackend()

  const { 
    register, handleSubmit, formState: { errors, isSubmitting },
  } = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      // fullName: "",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: SignUpValues) => {
    await signUp({
      // fullName: values.fullName,
      firstName: values.firstName,
      lastName: values.lastName,
      email: values.email,
      password: values.password,
    })
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
      {/* <div className="space-y-2">
        <label htmlFor="sign-up-name" className="text-sm font-medium text-foreground">
          Full name
        </label>
        <input
          id="sign-up-name"
          type="text"
          placeholder="Jane Doe"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("fullName")}
        />
        {errors.fullName ? (
          <p className="text-xs text-destructive">{errors.fullName.message}</p>
        ) : null}
      </div> */}
      <div className="space-y-2">
        <label htmlFor="sign-up-fname" className="text-sm font-medium text-foreground">
          First name
        </label>
        <input
          id="sign-up-fname"
          type="text"
          placeholder="John"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("firstName")}
        />
        {errors.firstName ? (
          <p className="text-xs text-destructive">{errors.firstName.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="sign-up-lname" className="text-sm font-medium text-foreground">
          Last name
        </label>
        <input id="sign-up-lname" type="text" placeholder="Doe"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("lastName")}
        />
        {errors.lastName ? (
          <p className="text-xs text-destructive">{errors.lastName.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="sign-up-email" className="text-sm font-medium text-foreground">
          Email address
        </label>
        <input
          id="sign-up-email"
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
        <label htmlFor="sign-up-password" className="text-sm font-medium text-foreground">
          Password
        </label>
        <input
          id="sign-up-password"
          type="password"
          placeholder="At least 8 characters"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("password")}
        />
        {errors.password ? (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        ) : null}
      </div>

      <div className="space-y-2">
        <label htmlFor="sign-up-confirm" className="text-sm font-medium text-foreground">
          Confirm password
        </label>
        <input
          id="sign-up-confirm"
          type="password"
          placeholder="Repeat your password"
          className="h-11 w-full rounded-lg border border-border bg-background px-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/30"
          {...register("confirmPassword")}
        />
        {errors.confirmPassword ? (
          <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
        ) : null}
      </div>

      <Button type="submit" className="h-11 w-full" disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create account"}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{" "}
        <button
          type="button"
          onClick={onBackToSignIn}
          className="font-semibold text-primary hover:underline"
        >
          Sign in
        </button>
      </p>
    </form>
  )
}
