// components/LandingNav.tsx
import React from 'react';
import { Button, Flex, Space, Dropdown, type MenuProps } from 'antd';
import { SunOutlined, MoonOutlined, LaptopOutlined } from '@ant-design/icons';
import { useTheme } from '../../../contexts/ThemeContext';

export const LandingNav: React.FC = () => {
  const { theme, setTheme, resolvedTheme } = useTheme();

  const themeItems: MenuProps['items'] = [
    {
      key: 'light',
      label: 'Light Mode',
      icon: <SunOutlined />,
      onClick: () => setTheme('light'),
    },
    {
      key: 'dark',
      label: 'Dark Mode',
      icon: <MoonOutlined />,
      onClick: () => setTheme('dark'),
    },
    {
      key: 'system',
      label: 'System Mode',
      icon: <LaptopOutlined />,
      onClick: () => setTheme('system'),
    },
  ];

  const getThemeIcon = () => {
    if (theme === 'light') return <SunOutlined />;
    if (theme === 'dark') return <MoonOutlined />;
    return <LaptopOutlined />;
  };

  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 md:px-6">
      <Flex align="center" gap={12}>
        <div className="h-8 w-8 rounded-xl bg-sky-600 dark:bg-sky-500" />
        <div>
          <p className="m-0 text-sm font-semibold tracking-wide text-slate-900 dark:text-slate-100">RideFlow</p>
          <p className="m-0 text-xs text-slate-500 dark:text-slate-400">Route-based rideshare</p>
        </div>
      </Flex>

      <Space size="middle">
        <Dropdown menu={{ items: themeItems }} placement="bottomRight" trigger={['click']}>
          <Button icon={getThemeIcon()} shape="circle" />
        </Dropdown>
        <Button htmlType="button">Sign In</Button>
        <Button type="primary" htmlType="button">
          Get Started
        </Button>
      </Space>
    </header>
  );
};