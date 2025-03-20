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


export type Ride = {
  id: number;
  uuid: string;
  vehicle_plate: string;
  seats: number;
  town_starting: string;
  town_ending: string;
  depart_time: string;
  end_time: string;
  created_at: string;
  updated_at: string;
  owner_id: number;
}


export type User = {
  "id": number,
  "uuid": string,
  "first_name": string,
  "last_name": string,
  "email": string
}


// Define the props interface for the Modal component: Interfaces are more extendible
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

