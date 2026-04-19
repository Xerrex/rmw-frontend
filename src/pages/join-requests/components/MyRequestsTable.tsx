import React from 'react';
import { Table, Tag } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { JoinRequest } from '../../../types/common';

interface MyRequestsTableProps {
  data: JoinRequest[];
  loading?: boolean;
}

export const MyRequestsTable: React.FC<MyRequestsTableProps> = ({ data, loading }) => {
  const columns: ColumnsType<JoinRequest> = [
    {
      title: 'Driver',
      dataIndex: ['user', 'name'],
      key: 'driver',
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
  ];

  return <Table rowKey="id" columns={columns} dataSource={data} loading={loading} pagination={false} />;
};
