import type { Ride, JoinRequest } from '../../../types/common';

export interface DashboardStatItem {
  key: string;
  label: string;
  value: number;
  tone: 'primary' | 'secondary' | 'accent';
}

export interface DashboardData {
  myRides: Ride[];
  myJoinRequests: JoinRequest[];
  incomingRequests: JoinRequest[];
}
