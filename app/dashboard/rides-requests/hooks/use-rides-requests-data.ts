"use client"

import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";
import { RideRequestsResponse, JoinRidePayload, JoinRideResponse } from "./types";

/**
 * Hook to fetch all ride requests
 */

type RideRequestsProps = {
  page: number;
  limit: number;
  search?: string;
  minSeats?: number;
  dateFrom?: string;
  dateTo?: string;
  enabled?: boolean;
}


export function useRideRequests(props: RideRequestsProps) {
  const { page, limit, search, minSeats, dateFrom, dateTo, enabled } = props;

  const { data, isLoading, refetch, isRefetching, isError} = useQuery({
    queryKey: ["dashboard", "rides-requests", 
      page, limit, search, minSeats, dateFrom, dateTo
    ],
    queryFn: async ()=>{
      const params: Record<string, string|number> = { page, limit };
      if (search) params.search = search;
      if (minSeats) params.min_seats = minSeats;
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
      const response = await apiCaller.get<RideRequestsResponse>("/rides/requests", {params});
      return response.data as RideRequestsResponse
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // refetchOnWindowFocus: true,
    enabled: enabled ?? true,
  })
  return{
    rideRequests: data?.r_requests || [],
    total: data?.total ?? 0,
    page: data?.page,
    limit: data?.limit,
    isLoading, refetch, isRefetching, isError
  }
}


export function useJoinRideRequest() {
  const queryClient = useQueryClient();

  const joinRideRequestMutation = useMutation<JoinRideResponse, Error, JoinRidePayload>({
    mutationFn: async (payload: JoinRidePayload)=>{
      const {rideUuid, seats, stop} = payload;
      const response = await apiCaller.post<JoinRideResponse>(`rides/${rideUuid}`,{
        seats, stop
      })
      return response.data as JoinRideResponse
    },
    onSuccess: ()=>{
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "rides-requests"],
      });
    }
  })

  return{
    joinRide: joinRideRequestMutation.mutateAsync,
    isMakingRequest: joinRideRequestMutation.isPending,
    joinRideError: joinRideRequestMutation.error
  }
}
