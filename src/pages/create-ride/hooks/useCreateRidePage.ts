import dayjs from 'dayjs';
import { useCreateRide } from '../../../hooks/useRides';
import type { CreateRideFormValues } from './types';

interface CreateRideInput {
  payload: CreateRideFormValues;
}

interface CreateRideResponse {
  createdRideId: string;
}

export const useCreateRidePage = () => {
  const createRideMutation = useCreateRide();

  const submitRide = async (input: CreateRideInput): Promise<CreateRideResponse> => {
    const { payload } = input;

    const response = await createRideMutation.mutateAsync({
      startLocation: {
        address: payload.startAddress,
        latitude: 0,
        longitude: 0,
      },
      endLocation: {
        address: payload.endAddress,
        latitude: 0,
        longitude: 0,
      },
      startTime: dayjs(payload.departureTime).toISOString(),
      departureTime: dayjs(payload.departureTime).toISOString(),
      seatsAvailable: payload.seatsAvailable,
      pricePerSeat: payload.pricePerSeat,
      vehicleInfo: {
        make: payload.vehicleMake,
        model: payload.vehicleModel,
        color: payload.vehicleColor,
        licensePlate: payload.licensePlate,
      },
      route: payload.routePoints.map((point) => ({
        address: point.address,
        latitude: point.latitude,
        longitude: point.longitude,
      })),
    });

    return { createdRideId: response.id };
  };

  return {
    submitRide,
    isPending: createRideMutation.isPending,
  };
};
