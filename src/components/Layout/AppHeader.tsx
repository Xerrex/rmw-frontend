import React from 'react';
import { Layout, Dropdown, Avatar, Space } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useLogout } from '../../hooks/useAuth';
import { ThemeToggle } from '../ThemeToggle';
import { message } from 'antd';

const { Header } = Layout;

export const AppHeader: React.FC = () => {
  const navigate = useNavigate();
  const logoutMutation = useLogout();

  const handleLogout = async () => {
    try {
      await logoutMutation.mutateAsync();
      message.success('Logged out successfully');
      navigate('/login');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Logout failed';
      message.error(errorMessage);
    }
  };

  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
      onClick: () => navigate('/profile'),
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Header
      className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 shadow-sm"
      style={{ padding: '0 24px' }}
    >
      <div className="max-w-7xl mx-auto h-full flex items-center justify-between">
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400 m-0">
            RideShare
          </h1>
        </div>

        <Space size="large">
          <ThemeToggle />
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <Avatar
              icon={<UserOutlined />}
              className="bg-blue-600 cursor-pointer"
              size="large"
            />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};
