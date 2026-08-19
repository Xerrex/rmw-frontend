"use client"

import { useQuery, keepPreviousData, useQueryClient, useMutation } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";
import { RideRequestsResponse, JoinRidePayload, JoinRideResponse, UpdateRideRequestPayload,
  RideRequest, AuditLogEntry } from "./types";
import type { BackendRideRequestStatus } from "../../rides/hooks/types";

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
      const {rideUuid, seats, pickup, stop, passenger_names} = payload;
      const response = await apiCaller.post<JoinRideResponse>(`rides/${rideUuid}/requests`,{
        seats, pickup, stop, passenger_names
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

/**
 * Update the editable details (seats/pickup/stop/passenger_names) of a ride request.
 * Resets the request back to Pending on the backend.
 */
export function useUpdateRideRequestDetails() {
  const queryClient = useQueryClient();

  const mutation = useMutation<RideRequest, Error, UpdateRideRequestPayload>({
    mutationFn: async (payload) => {
      const { rideUuid, requestUuid, seats, pickup, stop, passenger_names } = payload;
      const response = await apiCaller.put<RideRequest>(
        `/rides/${rideUuid}/requests/${requestUuid}`,
        { seats, pickup, stop, passenger_names }
      );
      return response.data as RideRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "rides-requests"] });
      queryClient.invalidateQueries({ queryKey: ["ride"] });
    },
  });

  return {
    updateRideRequestDetails: mutation.mutateAsync,
    isUpdatingDetails: mutation.isPending,
  };
}

/**
 * Accept/reject a ride request from anywhere in the app (not bound to a single ride).
 */
export function useUpdateRideRequestStatusGeneric() {
  const queryClient = useQueryClient();

  const mutation = useMutation<RideRequest, Error, { rideUuid: string; requestUuid: string; status: BackendRideRequestStatus }>({
    mutationFn: async ({ rideUuid, requestUuid, status }) => {
      const response = await apiCaller.put<RideRequest>(
        `/rides/${rideUuid}/requests/${requestUuid}/status`,
        null,
        { params: { rideRequestStatus: status } }
      );
      return response.data as RideRequest;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard", "rides-requests"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "rides"] });
      queryClient.invalidateQueries({ queryKey: ["ride"] });
    },
  });

  return {
    updateRequestStatus: mutation.mutateAsync,
    isUpdatingStatus: mutation.isPending,
  };
}

export function useRideRequestAuditLogs(rideUuid: string, requestUuid: string, enabled?: boolean) {
  const { data, isLoading } = useQuery<AuditLogEntry[]>({
    queryKey: ["ride", rideUuid, "requests", requestUuid, "audit-logs"],
    queryFn: async () => {
      const response = await apiCaller.get<AuditLogEntry[]>(`/rides/${rideUuid}/requests/${requestUuid}/audit-logs`);
      return response.data as AuditLogEntry[];
    },
    enabled: enabled ?? true,
  });

  return { auditLogs: data || [], isLoading };
}

