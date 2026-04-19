import React, { useState } from 'react';
import { Layout } from 'antd';
import { AppHeader } from './AppHeader';
import { Sidebar } from './Sidebar';

const { Content } = Layout;

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [sidebarCollapsed] = useState(false);

  return (
    <Layout className="min-h-screen">
      <AppHeader />
      <Layout className="flex-1">
        <Sidebar collapsed={sidebarCollapsed} />
        <Content className="p-6 bg-gray-50 dark:bg-gray-950">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
