import type { Ride } from '../../../types/common';

export interface AvailableRideFilters {
  startLocation?: string;
  endLocation?: string;
}

export interface JoinRideFormValues {
  pickupIndex: number;
  dropoffIndex: number;
}

export interface AvailableRidesViewModel {
  rides: Ride[];
  isLoading: boolean;
}
