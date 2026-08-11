'use client';

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { BACKEND_API_URL } from "@/config";

const REQUEST_TIMEOUT_MS = 60000; // 1 minute in milliseconds
const PENDING_RETURN_TO_KEY = "rmw-auth:return-to";



interface TokenResponse {
  access_token: string;
  refresh_token: string;
  token_type: string;
}

interface RefreshResponse {
  details: {
    message: string;
    success: boolean;
    token?: TokenResponse;
  };
}

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
  _skipAuth?: boolean; // Skip adding auth header for public endpoints
}

const getCurrentPath = () => {
  if (typeof window === "undefined") {
    return "/";
  }

  return `${window.location.pathname}${window.location.search}${window.location.hash}`;
};

export const setPendingReturnTo = (returnTo: string) => {
  if (typeof window === "undefined") {
    return;
  }

  window.sessionStorage.setItem(PENDING_RETURN_TO_KEY, returnTo);
};

export const consumePendingReturnTo = () => {
  if (typeof window === "undefined") {
    return null;
  }

  const returnTo = window.sessionStorage.getItem(PENDING_RETURN_TO_KEY);
  if (returnTo) {
    window.sessionStorage.removeItem(PENDING_RETURN_TO_KEY);
  }

  return returnTo;
};



export const noAuthApiCaller = axios.create({
  baseURL: BACKEND_API_URL,
  timeout: REQUEST_TIMEOUT_MS,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});


class AxiosClient {
  private client: AxiosInstance;
  private accessToken: string | null = null;
  private isRefreshing = false;
  private failedQueue: Array<{
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolve: (value: any) => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    reject: (reason?: any) => void;
    config: CustomAxiosRequestConfig;
  }> = [];

  constructor(baseURL: string = BACKEND_API_URL) {
    this.client = axios.create({
      baseURL,
      timeout: REQUEST_TIMEOUT_MS,
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors(): void {
    // Request interceptor - add auth header
    this.client.interceptors.request.use(
      (config: CustomAxiosRequestConfig) => {
        // Skip auth for public endpoints
        if (config._skipAuth) {
          return config;
        }

        const token = this.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor - handle token refresh
    this.client.interceptors.response.use(
      (response) => response,
      async (error: AxiosError) => {
        const originalConfig = error.config as CustomAxiosRequestConfig;

        // Skip refresh for public endpoints or if already retried
        if (
          originalConfig._skipAuth ||
          error.response?.status !== 401 ||
          originalConfig._retry
        ) {
          return Promise.reject(error);
        }

        // If refreshing, queue request
        if (this.isRefreshing) {
          return new Promise((resolve, reject) => {
            this.failedQueue.push({ resolve, reject, config: originalConfig });
          });
        }

        originalConfig._retry = true;
        this.isRefreshing = true;

        try {
          const response = await this.refreshAccessToken();
          const accessToken = response.details?.token?.access_token;

          if (!accessToken) {
            throw new Error('No access token in refresh response');
          }

          this.setAuthToken(accessToken);
          this.processQueue(null);

          // Retry original request with new token
          if (originalConfig.headers) {
            originalConfig.headers.Authorization = `Bearer ${accessToken}`;
          }
          return this.client(originalConfig);
        } catch (refreshError) {
          this.processQueue(refreshError);
          this.clearTokens();

          if (typeof window !== 'undefined') {
            setPendingReturnTo(getCurrentPath());
            toast.error('Session expired. Please login again.');
            window.location.replace('/');
          }
          return Promise.reject(refreshError);
        } finally {
          this.isRefreshing = false;
        }
      }
    );
  }

  private async refreshAccessToken(): Promise<RefreshResponse> {
    const response = await this.client.post<RefreshResponse>('/auth/refresh', undefined, {
      _skipAuth: true,
    } as CustomAxiosRequestConfig);

    return response.data;
  }

  private clearTokens(): void {
    this.accessToken = null;
    delete this.client.defaults.headers.common['Authorization'];
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private processQueue(error: any): void {
    this.failedQueue.forEach((promise) => {
      if (error) {
        promise.reject(error);
      } else {
        this.client(promise.config)
          .then(promise.resolve)
          .catch(promise.reject);
      }
    });
    this.failedQueue = [];
  }

  // Public methods
  public getClient(): AxiosInstance {
    return this.client;
  }

  public hasAuthToken(): boolean {
    return Boolean(this.accessToken);
  }

  public setAuthToken(token: string): void {
    this.accessToken = token;
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthToken(): void {
    this.accessToken = null;
    delete this.client.defaults.headers.common['Authorization'];
  }

  public async logout(): Promise<void> {
    try {
      await this.client.post('/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.clearTokens();
      this.removeAuthToken();
      if (typeof window !== 'undefined') {
        window.location.replace('/');
      }
    }
  }
}

// Singleton instance
const axiosClient = new AxiosClient();
export const apiCaller = axiosClient.getClient();

export default axiosClient;



