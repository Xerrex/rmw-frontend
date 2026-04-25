"use client"

import { useQuery, useMutation } from "@tanstack/react-query"
import { UserSettings } from "./types"

/**
 * Hook to fetch user settings
 */
export type FetchSettingsResponse = UserSettings

export function useSettings() {
  const fetchSettings = async (): Promise<FetchSettingsResponse> => {
    console.log("Fetching user settings from backend...")
    // Mocking the backend call
    return Promise.resolve(MOCK_SETTINGS)
  }

  return useQuery({
    queryKey: ["dashboard", "settings"],
    queryFn: fetchSettings,
  })
}

/**
 * Hook to update user settings
 */
export type UpdateSettingsInput = Partial<UserSettings>
export type UpdateSettingsResponse = { success: boolean; message: string }

export function useUpdateSettings() {
  const updateSettings = async (data: UpdateSettingsInput): Promise<UpdateSettingsResponse> => {
    console.log("Updating user settings with payload:", data)
    // Mocking the backend call
    return Promise.resolve({ success: true, message: "Settings updated successfully" })
  }

  return useMutation({
    mutationFn: updateSettings,
  })
}

/**
 * Mock Data
 */
const MOCK_SETTINGS: UserSettings = {
  profile: {
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+254 712 345 678",
  },
  vehicle: {
    plateNumber: "KBA 123A",
    model: "Toyota Fielder",
    seats: 4,
  },
  notifications: {
    email: true,
    push: true,
    sms: false,
  },
}
