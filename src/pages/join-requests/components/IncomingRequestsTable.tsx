import React from 'react';
import { Button, Space, Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { JoinRequest } from '../../../types/common';

interface IncomingRequestsTableProps {
  data: JoinRequest[];
  onAction: (requestId: string, action: 'accept' | 'reject') => void;
  loading?: boolean;
}

export const IncomingRequestsTable: React.FC<IncomingRequestsTableProps> = ({ data, onAction, loading }) => {
  const columns: ColumnsType<JoinRequest> = [
    {
      title: 'Rider',
      dataIndex: ['user', 'name'],
      key: 'rider',
    },
    {
      title: 'Pickup',
      dataIndex: ['pickupLocation', 'address'],
      key: 'pickup',
    },
    {
      title: 'Drop-off',
      dataIndex: ['dropoffLocation', 'address'],
      key: 'dropoff',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => <Tag>{status}</Tag>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_value, record) => (
        <Space>
          <Button type="primary" onClick={() => onAction(record.id, 'accept')}>
            Accept
          </Button>
          <Button danger onClick={() => onAction(record.id, 'reject')}>
            Reject
          </Button>
        </Space>
      ),
    },
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} pagination={false} />;
};
