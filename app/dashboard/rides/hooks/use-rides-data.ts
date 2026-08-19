"use client"

import { useQuery, useQueryClient, useMutation, keepPreviousData } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";
import type {RidesResponse, CreateRidePayload, CreateRideResponse, Ride, RideRequestDetail, BackendRideRequestStatus, AuditLogEntry } from "./types"


type RidesProps = {
  page: number;
  limit: number;
  search?: string;
  minSeats?: number;
  dateFrom?: string;
  dateTo?: string;
  enabled?: boolean;
}

export function useRides(props: RidesProps) {
  const { page, limit, search, minSeats, dateFrom, dateTo, enabled } = props;
  const {data, isLoading, refetch, isRefetching, isError} = useQuery({
    queryKey: ["dashboard", "rides", page, limit, search, minSeats, dateFrom, dateTo],
    queryFn: async ()=>{
      const params: Record<string, string|number> = { page, limit };
      if (search) params.search = search;
      if (minSeats) params.min_seats = minSeats;
      if (dateFrom) params.date_from = dateFrom;
      if (dateTo) params.date_to = dateTo;
      const response = await apiCaller.get<RidesResponse>("/rides", {params });
      return response.data as RidesResponse
    },
    placeholderData: keepPreviousData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    // refetchOnWindowFocus: true,
    enabled: enabled ?? true,
  })
  return {
    rides: data?.rides || [],
    total: data?.total ?? 0,
    isLoading, refetch, isRefetching, isError
  }
}


export function useCreateRide() {
  const queryClient = useQueryClient();

  const createRideMutation = useMutation<CreateRideResponse, Error, CreateRidePayload>({
    mutationFn: async (payload:CreateRidePayload)=>{
      const response = await apiCaller.post<CreateRideResponse>("/rides", {
        vehicle_plate: payload.vehiclePlate,
        vehicle_model: payload.vehicleModel,
        seats: payload.seats,
        town_starting: payload.townStarting,
        town_ending: payload.townEnding,
        depart_time: payload.departTime,
        end_time: payload.endTime
      })
      return response.data as CreateRideResponse
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["dashboard", "rides"],
      });
    },
  });

  return {
    createRide: createRideMutation.mutateAsync,
    isCreating: createRideMutation.isPending,
    createRideError: createRideMutation.error
  }
}


export function useRideDetails(rideUuid: string, enabled?: boolean){
  const queryClient = useQueryClient();

  const { data, isLoading, refetch, isRefetching, isError} = useQuery<Ride>({
    queryKey: ['ride', rideUuid],
    queryFn: async () => {
      const response = await apiCaller.get<Ride>(`/rides/${rideUuid}`);
      return response.data as Ride;
    },
    placeholderData: () => queryClient.getQueryData<Ride>([
      'ride', rideUuid
    ]),
    staleTime:  1000 * 60 * 5, // 5 minutes
    enabled: enabled ?? true,
  });

  return {
    ride: data,
    isLoading, refetch, isRefetching, isError
  }
}


export function useRideRequests(rideUuid: string, enabled?: boolean) {
  const { data, isLoading, refetch, isRefetching, isError } = useQuery<RideRequestDetail[]>({
    queryKey: ["ride", rideUuid, "requests"],
    queryFn: async () => {
      const response = await apiCaller.get<RideRequestDetail[]>(`/rides/${rideUuid}/requests`);
      return response.data as RideRequestDetail[];
    },
    staleTime: 1000 * 60,
    enabled: enabled ?? true,
  });

  return {
    rideRequests: data || [],
    isLoading, refetch, isRefetching, isError
  }
}


export function useUpdateRideRequestStatus(rideUuid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<RideRequestDetail, Error, { requestUuid: string; status: BackendRideRequestStatus }>({
    mutationFn: async ({ requestUuid, status }) => {
      const response = await apiCaller.put<RideRequestDetail>(
        `/rides/${rideUuid}/requests/${requestUuid}/status`,
        null,
        { params: { rideRequestStatus: status } }
      );
      return response.data as RideRequestDetail;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ride", rideUuid] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "rides"] });
    },
  });

  return {
    updateRequestStatus: mutation.mutateAsync,
    isUpdatingStatus: mutation.isPending,
  }
}


type CreateRideRequestPayload = {
  seats: number;
  pickup: string;
  stop: string;
  passenger_names?: string[];
}

export function useCreateRideRequest(rideUuid: string) {
  const queryClient = useQueryClient();

  const mutation = useMutation<RideRequestDetail, Error, CreateRideRequestPayload>({
    mutationFn: async (payload) => {
      const response = await apiCaller.post<RideRequestDetail>(`/rides/${rideUuid}/requests`, payload);
      return response.data as RideRequestDetail;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ride", rideUuid] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "rides"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard", "rides-requests"] });
    },
  });

  return {
    createRideRequest: mutation.mutateAsync,
    isCreatingRequest: mutation.isPending,
  }
}

export function useRideAuditLogs(rideUuid: string, enabled?: boolean) {
  const { data, isLoading } = useQuery<AuditLogEntry[]>({
    queryKey: ["ride", rideUuid, "audit-logs"],
    queryFn: async () => {
      const response = await apiCaller.get<AuditLogEntry[]>(`/rides/${rideUuid}/audit-logs`);
      return response.data as AuditLogEntry[];
    },
    enabled: enabled ?? true,
  });

  return { auditLogs: data || [], isLoading };
}


