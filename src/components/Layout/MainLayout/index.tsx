import React, { useState } from 'react';
import { Layout, Button } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import { Outlet } from 'react-router';
import { AppHeader } from '../AppHeader';
import { Sidebar } from '../Sidebar';

const { Content } = Layout;

interface MainLayoutProps {
  children?: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <AppHeader />
      <Layout className="flex-1 bg-transparent">
        <Sidebar collapsed={sidebarCollapsed} />
        <Content className="relative p-4 md:p-6">
          <Button
            type="text"
            icon={sidebarCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setSidebarCollapsed((prev) => !prev)}
            className="mb-3 lg:hidden"
          />
          <div className="mx-auto w-full max-w-7xl">{children ?? <Outlet />}</div>
        </Content>
      </Layout>
    </Layout>
  );
};
