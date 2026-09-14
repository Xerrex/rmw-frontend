"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { apiCaller } from "@/lib/apiCaller"

export type ManagedUserRole = "user" | "staff" | "admin"

export interface ManagedUser {
  id: number
  uuid: string
  first_name: string
  last_name: string
  email: string
  role: ManagedUserRole
  created_at: string
}

export function useManagementUsers() {
  const queryClient = useQueryClient()

  const { data: users, isLoading } = useQuery<ManagedUser[]>({
    queryKey: ["management", "users"],
    queryFn: async () => {
      const response = await apiCaller.get<ManagedUser[]>("/management/users")
      return response.data
    },
  })

  const { mutate: updateRole, isPending: isUpdatingRole } = useMutation({
    mutationFn: async ({ uuid, role }: { uuid: string; role: ManagedUserRole }) => {
      const response = await apiCaller.put<ManagedUser>(`/management/users/${uuid}/role`, { role })
      return response.data
    },
    onSuccess: () => {
      toast.success("User access updated")
      queryClient.invalidateQueries({ queryKey: ["management", "users"] })
    },
    onError: () => {
      toast.error("Could not update user access", {
        description: "Only admins can change a user's role. Try again.",
      })
    },
  })

  return { users, isLoading, updateRole, isUpdatingRole }
}
