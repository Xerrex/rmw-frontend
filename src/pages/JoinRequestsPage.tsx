import React from 'react';
import { Card, Spin, Tabs } from 'antd';
import { MainLayout } from '../components/Layout';
import { IncomingRequestsTable } from './join-requests/components/IncomingRequestsTable';
import { MyRequestsTable } from './join-requests/components/MyRequestsTable';
import { useJoinRequestsPage } from './join-requests/hooks/useJoinRequestsPage';

export const JoinRequestsPage: React.FC = () => {
  const { incomingRequests, myRequests, isLoading, isMutating, handleAction } = useJoinRequestsPage();

  return (
    <MainLayout>
      <div className="space-y-6">
        <div>
          <h1 className="mb-2 text-4xl font-bold text-slate-900 dark:text-slate-100">
            Join Requests
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Manage requests from people wanting to join your rides.
          </p>
        </div>

        <Card className="rounded-2xl border border-slate-200 dark:border-slate-700">
          {isLoading ? (
            <div className="flex min-h-56 items-center justify-center">
              <Spin size="large" />
            </div>
          ) : (
            <Tabs
              items={[
                {
                  key: 'incoming',
                  label: `Incoming (${incomingRequests.length})`,
                  children: (
                    <IncomingRequestsTable
                      data={incomingRequests}
                      loading={isMutating}
                      onAction={(requestId, action) => {
                        void handleAction({ requestId, action });
                      }}
                    />
                  ),
                },
                {
                  key: 'my-requests',
                  label: `My Requests (${myRequests.length})`,
                  children: <MyRequestsTable data={myRequests} />,
                },
              ]}
            />
          )}
        </Card>
      </div>
    </MainLayout>
  );
};
