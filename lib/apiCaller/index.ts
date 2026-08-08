'use client';

import axios, { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';
import { toast } from 'sonner';
import { BACKEND_API_URL } from "@/config";

const REQUEST_TIMEOUT_MS = 60000; // 1 minute in milliseconds



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



export const noAuthApiCaller = axios.create({
  baseURL: BACKEND_API_URL,
  timeout: REQUEST_TIMEOUT_MS,
  headers: {
    'Content-Type': 'application/json',
  },
});


class AxiosClient {
  private client: AxiosInstance;
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
      timeout:  REQUEST_TIMEOUT_MS,
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

        const token = this.getAccessToken();
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
          const refreshToken = this.getRefreshToken();
          if (!refreshToken) {
            throw new Error('No refresh token available');
          }

          const response = await this.refreshAccessToken(refreshToken);
          const { access_token, refresh_token } = response;

          this.setTokens(access_token, refresh_token);
          this.processQueue(null);

          // Retry original request with new token
          if (originalConfig.headers) {
            originalConfig.headers.Authorization = `Bearer ${access_token}`;
          }
          return this.client(originalConfig);
        } catch (refreshError) {
          this.processQueue(refreshError);
          this.clearTokens();
          
          // Redirect to login
          if (typeof window !== 'undefined') {
            toast.error('Session expired. Please login again.');
            window.location.href = '/auth/login';
          }
          return Promise.reject(refreshError);
        } finally {
          this.isRefreshing = false;
        }
      }
    );
  }

  private async refreshAccessToken(refreshToken: string): Promise<TokenResponse> {
    const response = await axios.post<RefreshResponse>(
      `${this.client.defaults.baseURL}/auth/refresh`,
      { refresh_token: refreshToken }
    );

    if (!response.data.details.token) {
      throw new Error('No token in refresh response');
    }

    return response.data.details.token;
  }

  private getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('access_token');
  }

  private getRefreshToken(): string | null {
    if (typeof window === 'undefined') return null;
    return localStorage.getItem('refresh_token');
  }

  private setTokens(accessToken: string, refreshToken: string): void {
    if (typeof window === 'undefined') return;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
  }

  private clearTokens(): void {
    if (typeof window === 'undefined') return;
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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

  public setAuthToken(token: string): void {
    this.client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }

  public removeAuthToken(): void {
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
        window.location.href = '/auth/login';
      }
    }
  }
}

// Singleton instance
const axiosClient = new AxiosClient();
export const apiCaller = axiosClient.getClient();

export default axiosClient;



