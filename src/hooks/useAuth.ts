import { useMutation, useQuery } from '@tanstack/react-query';
import apiClient from '../services/apiClient';
import type { AuthResponse, User } from '../types/common';

// Auth API Types
interface LoginRequest {
  email: string;
  password: string;
}

interface SignUpRequest {
  name: string;
  email: string;
  password: string;
  phone: string;
}

/**
 * Hook to login user
 */
export const useLogin = () => {
  return useMutation({
    mutationFn: async (credentials: LoginRequest): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
};

/**
 * Hook to sign up user
 */
export const useSignUp = () => {
  return useMutation({
    mutationFn: async (data: SignUpRequest): Promise<AuthResponse> => {
      const response = await apiClient.post<AuthResponse>('/auth/signup', data);
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('user', JSON.stringify(data.user));
    },
  });
};

/**
 * Hook to logout user
 */
export const useLogout = () => {
  return useMutation({
    mutationFn: async () => {
      await apiClient.post('/auth/logout');
    },
    onSuccess: () => {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      localStorage.removeItem('user');
    },
  });
};

/**
 * Hook to get current user
 */
export const useCurrentUser = () => {
  return useQuery({
    queryKey: ['currentUser'],
    queryFn: async (): Promise<User> => {
      const response = await apiClient.get<User>('/auth/me');
      return response.data;
    },
    enabled: !!localStorage.getItem('accessToken'),
    staleTime: 1000 * 60 * 10, // 10 minutes
  });
};

/**
 * Hook to refresh token
 */
export const useRefreshToken = () => {
  return useMutation({
    mutationFn: async (): Promise<AuthResponse> => {
      const refreshToken = localStorage.getItem('refreshToken');
      const response = await apiClient.post<AuthResponse>('/auth/refresh', {
        refreshToken,
      });
      return response.data;
    },
    onSuccess: (data) => {
      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
    },
  });
};
