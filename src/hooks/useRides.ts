import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import type { Ride, PaginatedResponse } from '../types/common';

// Types for ride operations
interface CreateRideRequest {
  startLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  endLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  startTime: string;
  departureTime: string;
  seatsAvailable: number;
  pricePerSeat: number;
  vehicleInfo: {
    make: string;
    model: string;
    licensePlate: string;
    color: string;
  };
  route: Array<{
    address: string;
    latitude: number;
    longitude: number;
  }>;
}

interface UpdateRideRequest extends Partial<CreateRideRequest> {
  status?: 'active' | 'completed' | 'cancelled';
}

interface RideFilters {
  startLocation?: string;
  endLocation?: string;
  departureDate?: string;
  page?: number;
  pageSize?: number;
}

/**
 * Hook to fetch all available rides
 */
export const useAvailableRides = (filters?: RideFilters) => {
  return useQuery({
    queryKey: ['availableRides', filters],
    queryFn: async (): Promise<PaginatedResponse<Ride>> => {
      const response = await apiClient.get<PaginatedResponse<Ride>>('/rides', {
        params: {
          status: 'active',
          ...filters,
        },
      });
      return response.data;
    },
  });
};

/**
 * Hook to fetch rides created by current user
 */
export const useMyRides = () => {
  return useQuery({
    queryKey: ['myRides'],
    queryFn: async (): Promise<Ride[]> => {
      const response = await apiClient.get<Ride[]>('/rides/my-rides');
      return response.data;
    },
    enabled: !!localStorage.getItem('accessToken'),
  });
};

/**
 * Hook to fetch single ride by ID
 */
export const useRide = (rideId: string) => {
  return useQuery({
    queryKey: ['ride', rideId],
    queryFn: async (): Promise<Ride> => {
      const response = await apiClient.get<Ride>(`/rides/${rideId}`);
      return response.data;
    },
    enabled: !!rideId,
  });
};

/**
 * Hook to create a new ride
 */
export const useCreateRide = () => {
  return useMutation({
    mutationFn: async (data: CreateRideRequest): Promise<Ride> => {
      const response = await apiClient.post<Ride>('/rides', data);
      return response.data;
    },
  });
};

/**
 * Hook to update a ride
 */
export const useUpdateRide = () => {
  return useMutation({
    mutationFn: async ({
      rideId,
      data,
    }: {
      rideId: string;
      data: UpdateRideRequest;
    }): Promise<Ride> => {
      const response = await apiClient.put<Ride>(`/rides/${rideId}`, data);
      return response.data;
    },
  });
};

/**
 * Hook to delete a ride
 */
export const useDeleteRide = () => {
  return useMutation({
    mutationFn: async (rideId: string): Promise<void> => {
      await apiClient.delete(`/rides/${rideId}`);
    },
  });
};

/**
 * Hook to search rides by route
 */
export const useSearchRides = (startLocation?: string, endLocation?: string) => {
  return useQuery({
    queryKey: ['searchRides', startLocation, endLocation],
    queryFn: async (): Promise<Ride[]> => {
      const response = await apiClient.get<Ride[]>('/rides/search', {
        params: {
          startLocation,
          endLocation,
          status: 'active',
        },
      });
      return response.data;
    },
    enabled: !!(startLocation && endLocation),
  });
};
