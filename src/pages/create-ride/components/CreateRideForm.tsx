import React from 'react';
import { Button, Card, DatePicker, Form, Input, InputNumber, Space, message } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useCreateRidePage } from '../hooks/useCreateRidePage';
import type { CreateRideFormValues } from '../hooks/types';

export const CreateRideForm: React.FC = () => {
  const [form] = Form.useForm<CreateRideFormValues>();
  const navigate = useNavigate();
  const { submitRide, isPending } = useCreateRidePage();

  const onFinish = async (values: CreateRideFormValues) => {
    try {
      await submitRide({ payload: values });
      message.success('Ride created successfully');
      navigate('/dashboard');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to create ride';
      message.error(errorMessage);
    }
  };

  return (
    <Card className="mx-auto max-w-4xl rounded-2xl border border-slate-200 dark:border-slate-700">
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        requiredMark={false}
        initialValues={{
          seatsAvailable: 1,
          pricePerSeat: 0,
          routePoints: [{ address: '', latitude: 0, longitude: 0 }],
        }}
      >
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <Form.Item name="startAddress" label="Start location" rules={[{ required: true }]}>
            <Input placeholder="e.g. Downtown Terminal" />
          </Form.Item>
          <Form.Item name="endAddress" label="End location" rules={[{ required: true }]}>
            <Input placeholder="e.g. City Mall" />
          </Form.Item>
          <Form.Item name="departureTime" label="Departure time" rules={[{ required: true }]}>
            <DatePicker showTime className="w-full" />
          </Form.Item>
          <Form.Item name="seatsAvailable" label="Seats available" rules={[{ required: true }]}>
            <InputNumber min={1} className="w-full" />
          </Form.Item>
          <Form.Item name="pricePerSeat" label="Price per seat" rules={[{ required: true }]}>
            <InputNumber min={0} className="w-full" />
          </Form.Item>
          <Form.Item name="licensePlate" label="License plate" rules={[{ required: true }]}>
            <Input placeholder="ABC-1234" />
          </Form.Item>
          <Form.Item name="vehicleMake" label="Vehicle make" rules={[{ required: true }]}>
            <Input placeholder="Toyota" />
          </Form.Item>
          <Form.Item name="vehicleModel" label="Vehicle model" rules={[{ required: true }]}>
            <Input placeholder="Corolla" />
          </Form.Item>
          <Form.Item name="vehicleColor" label="Vehicle color" rules={[{ required: true }]}>
            <Input placeholder="Blue" />
          </Form.Item>
        </div>

        <Form.List name="routePoints">
          {(fields, { add, remove }) => (
            <div className="space-y-3">
              <p className="font-semibold">Route checkpoints</p>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} align="start" className="flex w-full" wrap>
                  <Form.Item
                    {...restField}
                    name={[name, 'address']}
                    rules={[{ required: true, message: 'Address required' }]}
                    className="min-w-55"
                  >
                    <Input placeholder="Checkpoint address" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'latitude']} className="min-w-35">
                    <InputNumber className="w-full" placeholder="Lat" />
                  </Form.Item>
                  <Form.Item {...restField} name={[name, 'longitude']} className="min-w-35">
                    <InputNumber className="w-full" placeholder="Lng" />
                  </Form.Item>
                  <Button danger icon={<MinusCircleOutlined />} onClick={() => remove(name)}>
                    Remove
                  </Button>
                </Space>
              ))}
              <Button type="dashed" icon={<PlusOutlined />} onClick={() => add()}>
                Add checkpoint
              </Button>
            </div>
          )}
        </Form.List>

        <Form.Item className="mt-6">
          <Space>
            <Button type="primary" htmlType="submit" loading={isPending}>
              Create Ride
            </Button>
            <Button onClick={() => navigate('/dashboard')}>Cancel</Button>
          </Space>
        </Form.Item>
      </Form>
    </Card>
  );
};
