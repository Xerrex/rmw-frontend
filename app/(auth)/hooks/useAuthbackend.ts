"use client"

import { useCallback } from "react"

export interface SignInPayload {
	email: string
	password: string
	remember: boolean
}

export interface SignUpPayload {
	// fullName: string
	firstName:  string
  lastName:  string
	email: string
	password: string
}

export interface ResetPasswordPayload {
	email: string
}

export interface SetPasswordPayload {
	email: string
	resetToken: string
	password: string
}

async function logAuthCall<TPayload>(operation: string, payload: TPayload) {
	// Simulates a backend request boundary.
	console.log(`[auth:${operation}]`, payload)
	await Promise.resolve()
}

export function useAuthBackend() {
	const signIn = useCallback(async (payload: SignInPayload) => {
		await logAuthCall("sign-in", payload)
	}, [])

	const signUp = useCallback(async (payload: SignUpPayload) => {
		await logAuthCall("sign-up", payload)
	}, [])

	const requestPasswordReset = useCallback(async (payload: ResetPasswordPayload) => {
		await logAuthCall("request-password-reset", payload)
	}, [])

	const setPassword = useCallback(async (payload: SetPasswordPayload) => {
		await logAuthCall("set-password", payload)
	}, [])

	return {
		signIn,
		signUp,
		requestPasswordReset,
		setPassword,
	}
}

