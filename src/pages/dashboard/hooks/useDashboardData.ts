import { useMemo } from 'react';
import { useIncomingJoinRequests, useMyJoinRequests } from '../../../hooks/useJoinRequests';
import { useMyRides } from '../../../hooks/useRides';
import type { DashboardData, DashboardStatItem } from './types';

interface DashboardDataResponse {
  myRides: DashboardData['myRides'];
  myJoinRequests: DashboardData['myJoinRequests'];
  incomingRequests: DashboardData['incomingRequests'];
}

export const useDashboardData = () => {
  const myRidesQuery = useMyRides();
  const myRequestsQuery = useMyJoinRequests();
  const incomingRequestsQuery = useIncomingJoinRequests();

  const data: DashboardDataResponse = {
    myRides: myRidesQuery.data ?? [],
    myJoinRequests: myRequestsQuery.data ?? [],
    incomingRequests: incomingRequestsQuery.data ?? [],
  };

  const stats = useMemo<DashboardStatItem[]>(
    () => [
      { key: 'rides', label: 'My Rides', value: data.myRides.length, tone: 'primary' },
      {
        key: 'incoming',
        label: 'Incoming Requests',
        value: data.incomingRequests.filter((req) => req.status === 'pending').length,
        tone: 'secondary',
      },
      {
        key: 'my-requests',
        label: 'My Join Requests',
        value: data.myJoinRequests.length,
        tone: 'accent',
      },
    ],
    [data.incomingRequests, data.myJoinRequests.length, data.myRides.length]
  );

  const isLoading = myRidesQuery.isLoading || myRequestsQuery.isLoading || incomingRequestsQuery.isLoading;

  return {
    ...data,
    stats,
    isLoading,
  };
};
