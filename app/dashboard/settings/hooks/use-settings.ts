"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { apiCaller } from "@/lib/apiCaller"
import type { Vehicle, CreateVehiclePayload, ChangePasswordPayload } from "./types"

export interface UserMeResponse {
  id: number
  uuid: string
  first_name: string
  last_name: string
  email: string
  created_at: string
  updated_at: string
}

export function useUserProfile() {
  return useQuery({
    queryKey: ["user", "me"],
    queryFn: async () => {
      const response = await apiCaller.get<UserMeResponse>("/user/me")
      return response.data
    },
    staleTime: 1000 * 60 * 5,
  })
}

export function useUserVehicles() {
  return useQuery({
    queryKey: ["user", "vehicles"],
    queryFn: async () => {
      const response = await apiCaller.get<Vehicle[]>("/user/vehicles")
      return response.data
    },
    staleTime: 1000 * 60 * 2,
  })
}

export function useCreateVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateVehiclePayload) => {
      const response = await apiCaller.post<Vehicle>("/user/vehicles", payload)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "vehicles"] })
    },
  })
}

export function useDeleteVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (vehicleId: number) => {
      const response = await apiCaller.delete<{ message: string; success: boolean }>(
        `/user/vehicles/${vehicleId}`
      )
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user", "vehicles"] })
    },
  })
}

export function useChangePassword() {
  return useMutation({
    mutationFn: async (payload: ChangePasswordPayload) => {
      const response = await apiCaller.post<{ message: string; success: boolean }>(
        "/user/change-password",
        payload
      )
      return response.data
    },
  })
}
