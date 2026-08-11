"use client"

import { useQueryClient, useQuery } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";


export interface UserDetailsResponse{
  first_name: string
  last_name: string
  email: string
}


export function UserData(enabled: boolean) {
  const queryClient = useQueryClient();

  const {data: details, isLoading: isLoadingUser, refetch: refetchUser, 
    isRefetching: isRefetchingUser, isError: isErrorUser} = useQuery<UserDetailsResponse>({
    queryKey: ['user', 'profile'],
    queryFn: async ()=>{ // TODO: Change to authAPICaller
      const response =  await apiCaller.get<UserDetailsResponse>("/auth/me");
      return response.data as UserDetailsResponse
    },
    placeholderData: ()=> queryClient.getQueryData<UserDetailsResponse>(['user', 'profile']),
    staleTime:  1000 * 60 * 5, // 5 minutes
    enabled: enabled,
  })


	return {
    details,
    isLoadingUser,
    refetchUser,
    isRefetchingUser,
    isErrorUser
	}
}
