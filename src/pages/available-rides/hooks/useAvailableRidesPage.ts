import { useMemo, useState } from 'react';
import { useAvailableRides } from '../../../hooks/useRides';
import type { AvailableRideFilters, AvailableRidesViewModel } from './types';

interface AvailableRidesInput {
  startLocation: string;
  endLocation: string;
}

interface AvailableRidesResponse {
  rides: AvailableRidesViewModel['rides'];
}

export const useAvailableRidesPage = () => {
  const [filters, setFilters] = useState<AvailableRidesInput>({ startLocation: '', endLocation: '' });

  const queryFilters: AvailableRideFilters = {
    startLocation: filters.startLocation || undefined,
    endLocation: filters.endLocation || undefined,
  };

  const ridesQuery = useAvailableRides(queryFilters);

  const response: AvailableRidesResponse = useMemo(
    () => ({ rides: ridesQuery.data?.data ?? [] }),
    [ridesQuery.data?.data]
  );

  return {
    filters,
    setFilters,
    rides: response.rides,
    isLoading: ridesQuery.isLoading,
  };
};
