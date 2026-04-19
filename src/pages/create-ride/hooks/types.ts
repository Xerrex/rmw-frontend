export interface RoutePointFormItem {
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateRideFormValues {
  startAddress: string;
  endAddress: string;
  departureTime: string;
  seatsAvailable: number;
  pricePerSeat: number;
  vehicleMake: string;
  vehicleModel: string;
  vehicleColor: string;
  licensePlate: string;
  routePoints: RoutePointFormItem[];
}
