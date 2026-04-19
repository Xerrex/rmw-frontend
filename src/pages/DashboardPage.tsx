import React from 'react';
import { MainLayout } from '../components/Layout';
import { useCurrentUser } from '../hooks/useAuth';
import { Spin, Empty, Card, Button, Space } from 'antd';
import { useNavigate } from 'react-router';
import { StatsCards } from './dashboard/components/StatsCards';
import { QuickPanels } from './dashboard/components/QuickPanels';
import { useDashboardData } from './dashboard/hooks/useDashboardData';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: user, isLoading } = useCurrentUser();
  const { stats, myRides, incomingRequests } = useDashboardData();

  if (isLoading) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-96">
          <Spin size="large" />
        </div>
      </MainLayout>
    );
  }

  if (!user) {
    return (
      <MainLayout>
        <div className="flex justify-center items-center min-h-96">
          <Empty description="User not found" />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-5">
        <div>
          <h1 className="mb-1 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Welcome, {user.name}!
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage your rides and requests from your dashboard.
          </p>
        </div>

        <StatsCards stats={stats} />

        <Card className="rounded-2xl border border-slate-200 dark:border-slate-700">
          <Space wrap>
            <Button type="primary" onClick={() => navigate('/rides/create')}>
              Create New Ride
            </Button>
            <Button onClick={() => navigate('/rides')}>Browse Available Rides</Button>
            <Button onClick={() => navigate('/requests')}>Manage Join Requests</Button>
          </Space>
        </Card>

        <QuickPanels rides={myRides} incomingRequests={incomingRequests} />
      </div>
    </MainLayout>
  );
};
