import type { JoinRequest } from '../../../types/common';

export interface JoinRequestsData {
  incoming: JoinRequest[];
  myRequests: JoinRequest[];
}

export type RequestAction = 'accept' | 'reject';
