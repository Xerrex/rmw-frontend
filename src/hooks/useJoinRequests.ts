import { useQuery, useMutation } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import type { JoinRequest } from '../types/common';

// Types for join requests
interface CreateJoinRequestData {
  rideId: string;
  pickupLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
  dropoffLocation: {
    address: string;
    latitude: number;
    longitude: number;
  };
}

/**
 * Hook to fetch pending join requests for rides user created
 */
export const useIncomingJoinRequests = () => {
  return useQuery({
    queryKey: ['incomingJoinRequests'],
    queryFn: async (): Promise<JoinRequest[]> => {
      const response = await apiClient.get<JoinRequest[]>('/join-requests/incoming');
      return response.data;
    },
    enabled: !!localStorage.getItem('accessToken'),
  });
};

/**
 * Hook to fetch join requests made by current user
 */
export const useMyJoinRequests = () => {
  return useQuery({
    queryKey: ['myJoinRequests'],
    queryFn: async (): Promise<JoinRequest[]> => {
      const response = await apiClient.get<JoinRequest[]>('/join-requests/my-requests');
      return response.data;
    },
    enabled: !!localStorage.getItem('accessToken'),
  });
};

/**
 * Hook to fetch join requests for a specific ride
 */
export const useRideJoinRequests = (rideId: string) => {
  return useQuery({
    queryKey: ['rideJoinRequests', rideId],
    queryFn: async (): Promise<JoinRequest[]> => {
      const response = await apiClient.get<JoinRequest[]>(`/rides/${rideId}/join-requests`);
      return response.data;
    },
    enabled: !!rideId,
  });
};

/**
 * Hook to create a join request
 */
export const useCreateJoinRequest = () => {
  return useMutation({
    mutationFn: async (data: CreateJoinRequestData): Promise<JoinRequest> => {
      const response = await apiClient.post<JoinRequest>('/join-requests', data);
      return response.data;
    },
  });
};

/**
 * Hook to accept a join request
 */
export const useAcceptJoinRequest = () => {
  return useMutation({
    mutationFn: async (requestId: string): Promise<JoinRequest> => {
      const response = await apiClient.put<JoinRequest>(
        `/join-requests/${requestId}/accept`
      );
      return response.data;
    },
  });
};

/**
 * Hook to reject a join request
 */
export const useRejectJoinRequest = () => {
  return useMutation({
    mutationFn: async (requestId: string): Promise<JoinRequest> => {
      const response = await apiClient.put<JoinRequest>(
        `/join-requests/${requestId}/reject`
      );
      return response.data;
    },
  });
};

/**
 * Hook to cancel a join request
 */
export const useCancelJoinRequest = () => {
  return useMutation({
    mutationFn: async (requestId: string): Promise<void> => {
      await apiClient.delete(`/join-requests/${requestId}`);
    },
  });
};
