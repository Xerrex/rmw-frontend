import React from 'react';
import { Button, Card, Col, Empty, Row, Tag } from 'antd';
import type { Ride } from '../../../types/common';

interface RidesListProps {
  rides: Ride[];
  onRequestJoin: (ride: Ride) => void;
}

export const RidesList: React.FC<RidesListProps> = ({ rides, onRequestJoin }) => {
  if (rides.length === 0) {
    return (
      <Card className="rounded-2xl border border-slate-200 dark:border-slate-700">
        <Empty description="No rides available for selected filters" />
      </Card>
    );
  }

  return (
    <Row gutter={[16, 16]}>
      {rides.map((ride) => (
        <Col key={ride.id} xs={24} lg={12}>
          <Card className="h-full rounded-2xl border border-slate-200 dark:border-slate-700">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="m-0 text-lg font-semibold">{ride.driver.name}</h3>
                <Tag color="blue">{ride.status}</Tag>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300">
                {ride.startLocation.address} {' -> '} {ride.endLocation.address}
              </p>
              <div className="flex flex-wrap gap-3 text-sm">
                <span>Seats: {ride.seatsAvailable}</span>
                <span>Price: ${ride.pricePerSeat}</span>
              </div>
              <Button type="primary" onClick={() => onRequestJoin(ride)}>
                Request to Join
              </Button>
            </div>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
