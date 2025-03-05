export type CardType = {
  title: string;
  value: number | string; 
  type: 'allRides' | 'ridesOffered' | 'ridesTaken' | 'requestsPending' | 'requestsRejected';
}


export type MonthlyRidesData = {
  month: string;
  rides:{
    total: number;
    offered: number;
    taken: number;
    request_pending: number;
    request_rejected: number;
  }
}
