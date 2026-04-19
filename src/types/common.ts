/**
 * Common types used across the application
 */

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  profileImage?: string;
  createdAt: string;
}

export interface Location {
  address: string;
  latitude: number;
  longitude: number;
  name?: string;
}

export interface Ride {
  id: string;
  driverId: string;
  driver: User;
  startLocation: Location;
  endLocation: Location;
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
  route: Location[]; // List of waypoints
  passengers: Passenger[];
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface Passenger {
  userId: string;
  user: User;
  pickupLocation: Location;
  dropoffLocation: Location;
  status: 'joined' | 'pending' | 'completed' | 'cancelled';
  joinedAt: string;
}

export interface JoinRequest {
  id: string;
  rideId: string;
  userId: string;
  user: User;
  pickupLocation: Location;
  dropoffLocation: Location;
  status: 'pending' | 'accepted' | 'rejected' | 'cancelled';
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  hasMore: boolean;
}

export interface ApiError {
  message: string;
  code: string;
  details?: Record<string, unknown>;
}
