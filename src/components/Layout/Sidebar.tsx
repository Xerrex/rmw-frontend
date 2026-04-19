import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { CarOutlined, FileTextOutlined, CheckCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router';

const { Sider } = Layout;

interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <CarOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/rides',
      icon: <FileTextOutlined />,
      label: 'Available Rides',
      onClick: () => navigate('/rides'),
    },
    {
      key: '/requests',
      icon: <CheckCircleOutlined />,
      label: 'Join Requests',
      onClick: () => navigate('/requests'),
    },
  ];

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800"
      width={250}
    >
      <div className="p-4 border-b border-gray-200 dark:border-gray-800">
        <Button
          type="primary"
          icon={<PlusOutlined />}
          block
          size="large"
          onClick={() => navigate('/rides/create')}
        >
          Create Ride
        </Button>
      </div>

      <Menu
        mode="inline"
        selectedKeys={[location.pathname]}
        items={menuItems}
        className="border-0"
      />
    </Sider>
  );
};
