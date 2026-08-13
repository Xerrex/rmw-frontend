"use client"

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { apiCaller } from "@/lib/apiCaller";
import type {RidesResponse, CreateRidePayload, CreateRideResponse, Ride } from "./types"


type RidesProps = {
  page: number;
  limit: number;
  search?: string;
  enabled?: boolean;
}

export function useRides(props: RidesProps) {
  const queryClient = useQueryClient();
  const { page, limit, search, enabled } = props;
  const {data, isLoading, refetch, isRefetching, isError} = useQuery({
    queryKey: ["dashboard", "rides", page, limit],
    queryFn: async ()=>{
      const params: Record<string, string|number> = { page, limit };
      if (search) params.search = search;
      const response = await apiCaller.get<RidesResponse>("/rides", {params });
      return response.data as RidesResponse
    },
    placeholderData: () => queryClient.getQueryData<RidesResponse>([
      "dashboard", "rides"
    ]),
    staleTime: 5 * 60 * 1000, // 5 minutes
    // refetchOnWindowFocus: true,
    enabled: enabled ?? true,
  })
  return {
    rides: data?.rides || [], 
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
    ride: data || [],
    isLoading, refetch, isRefetching, isError
  }
}

// export function useSearchRides() {
//   const searchRides = async (params: { pickup: string; dropoff: string }) => {
//     console.log("Searching rides with params:", params)
//     // Return rides that match the route roughly
//     return Promise.resolve(MOCK_RIDES.filter(r => 
//       r.townStarting.toLowerCase().includes(params.pickup.toLowerCase()) || 
//       r.townEnding.toLowerCase().includes(params.dropoff.toLowerCase())
//     ))
//   }

//   return {
//     mutateAsync: searchRides,
//     isPending: false, // Mock
//   }
// }
