import React from 'react';
import { Card, Col, Row, Tag } from 'antd';
import type { JoinRequest, Ride } from '../../../types/common';

interface QuickPanelsProps {
  rides: Ride[];
  incomingRequests: JoinRequest[];
}

export const QuickPanels: React.FC<QuickPanelsProps> = ({ rides, incomingRequests }) => {
  const latestRide = rides[0];
  const pendingIncoming = incomingRequests.filter((request) => request.status === 'pending').slice(0, 5);

  return (
    <Row gutter={[16, 16]}>
      <Col xs={24} lg={12}>
        <Card title="Latest Ride" className="rounded-2xl border border-slate-200 dark:border-slate-700">
          {latestRide ? (
            <div className="space-y-2">
              <p>
                {latestRide.startLocation.address} {' -> '} {latestRide.endLocation.address}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Seats: {latestRide.seatsAvailable}</p>
              <Tag color="blue">{latestRide.status}</Tag>
            </div>
          ) : (
            <p className="text-slate-600 dark:text-slate-300">No rides created yet.</p>
          )}
        </Card>
      </Col>
      <Col xs={24} lg={12}>
        <Card title="Pending Incoming Requests" className="rounded-2xl border border-slate-200 dark:border-slate-700">
          {pendingIncoming.length === 0 ? (
            <p className="text-slate-600 dark:text-slate-300">No pending requests.</p>
          ) : (
            <div className="space-y-2">
              {pendingIncoming.map((request) => (
                <div key={request.id} className="rounded-lg border border-slate-200 p-3 text-sm dark:border-slate-700">
                  <p className="font-medium">{request.user.name}</p>
                  <p className="text-slate-600 dark:text-slate-300">
                    {request.pickupLocation.address} {' -> '} {request.dropoffLocation.address}
                  </p>
                </div>
              ))}
            </div>
          )}
        </Card>
      </Col>
    </Row>
  );
};
