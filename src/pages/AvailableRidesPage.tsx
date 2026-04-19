import React from 'react';
import { Form, Modal, Select, Spin, message } from 'antd';
import { MainLayout } from '../components/Layout';
import { useCreateJoinRequest } from '../hooks/useJoinRequests';
import { RidesFilters } from './available-rides/components/RidesFilters';
import { RidesList } from './available-rides/components/RidesList';
import { useAvailableRidesPage } from './available-rides/hooks/useAvailableRidesPage';
import type { JoinRideFormValues } from './available-rides/hooks/types';
import type { Location, Ride } from '../types/common';

export const AvailableRidesPage: React.FC = () => {
  const [form] = Form.useForm<JoinRideFormValues>();
  const [selectedRide, setSelectedRide] = React.useState<Ride | null>(null);
  const { filters, setFilters, rides, isLoading } = useAvailableRidesPage();
  const createJoinRequest = useCreateJoinRequest();

  const rideRoutePoints = React.useMemo<Location[]>(() => {
    if (!selectedRide) return [];
    return [selectedRide.startLocation, ...selectedRide.route, selectedRide.endLocation];
  }, [selectedRide]);

  const closeModal = () => {
    setSelectedRide(null);
    form.resetFields();
  };

  const handleSubmitJoinRequest = async () => {
    if (!selectedRide) return;

    const values = await form.validateFields();
    if (values.pickupIndex >= values.dropoffIndex) {
      message.error('Pickup must be before drop-off in the route order');
      return;
    }

    try {
      await createJoinRequest.mutateAsync({
        rideId: selectedRide.id,
        pickupLocation: rideRoutePoints[values.pickupIndex],
        dropoffLocation: rideRoutePoints[values.dropoffIndex],
      });
      message.success('Join request sent successfully');
      closeModal();
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unable to send join request';
      message.error(errorMessage);
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Available Rides
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Find and join rides going your way.
          </p>
        </div>

        <RidesFilters
          filters={filters}
          onChange={(next) =>
            setFilters({
              startLocation: next.startLocation ?? '',
              endLocation: next.endLocation ?? '',
            })
          }
        />

        {isLoading ? (
          <div className="flex min-h-56 items-center justify-center">
            <Spin size="large" />
          </div>
        ) : (
          <RidesList rides={rides} onRequestJoin={setSelectedRide} />
        )}

        <Modal
          title="Request to Join Ride"
          open={!!selectedRide}
          onCancel={closeModal}
          onOk={handleSubmitJoinRequest}
          okText="Send Request"
          confirmLoading={createJoinRequest.isPending}
        >
          <Form form={form} layout="vertical" requiredMark={false}>
            <Form.Item
              name="pickupIndex"
              label="Pickup location"
              rules={[{ required: true, message: 'Select pickup location' }]}
            >
              <Select
                placeholder="Select pickup"
                options={rideRoutePoints.map((point, index) => ({
                  label: point.address,
                  value: index,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="dropoffIndex"
              label="Drop-off location"
              rules={[{ required: true, message: 'Select drop-off location' }]}
            >
              <Select
                placeholder="Select drop-off"
                options={rideRoutePoints.map((point, index) => ({
                  label: point.address,
                  value: index,
                }))}
              />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </MainLayout>
  );
};
