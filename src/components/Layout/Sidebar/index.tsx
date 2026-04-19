import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { HomeOutlined, CarOutlined, FileTextOutlined, PlusOutlined } from '@ant-design/icons';
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
      icon: <HomeOutlined />,
      label: 'Dashboard',
      onClick: () => navigate('/dashboard'),
    },
    {
      key: '/rides',
      icon: <CarOutlined />,
      label: 'Available Rides',
      onClick: () => navigate('/rides'),
    },
    {
      key: '/requests',
      icon: <FileTextOutlined />,
      label: 'Join Requests',
      onClick: () => navigate('/requests'),
    },
  ];

  const selectedKey = menuItems.find((item) => location.pathname.startsWith(item.key))?.key ?? '/dashboard';

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      className="border-r border-slate-200 bg-white dark:bg-slate-800 dark:border-slate-700"
      width={260}
      breakpoint="lg"
      collapsedWidth={0}
    >
      <div className="border-b border-slate-200 p-4 dark:border-slate-700">
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

      <Menu mode="inline" selectedKeys={[selectedKey]} items={menuItems} className="border-0" />
    </Sider>
  );
};
