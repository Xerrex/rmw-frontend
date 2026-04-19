import React from 'react';
import { Layout, Dropdown, Avatar, Space, message } from 'antd';
import { LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router';
import { useLogout } from '../../../hooks/useAuth';
import { ThemeToggle } from '../../ThemeToggle';

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
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Logout',
      onClick: handleLogout,
      danger: true,
    },
  ];

  return (
    <Header
      className="sticky top-0 z-50 border-b border-slate-200 bg-white dark:bg-slate-800 shadow-sm dark:border-slate-700"
      style={{ padding: '0 24px' }}
    >
      <div className="mx-auto flex h-full w-full max-w-7xl items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-8 w-8 rounded-full bg-sky-600 dark:bg-sky-500" />
          <h1 className="m-0 text-xl font-bold text-sky-600 dark:text-sky-400">RideFlow</h1>
        </div>

        <Space size="large">
          <ThemeToggle />
          <Dropdown menu={{ items: userMenuItems }} trigger={['click']}>
            <Avatar icon={<UserOutlined />} className="cursor-pointer bg-sky-600 dark:bg-sky-500" size="large" />
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};
