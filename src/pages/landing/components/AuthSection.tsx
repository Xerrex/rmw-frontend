import React from 'react';
import { Tabs } from 'antd';
import { LoginForm, SignUpForm } from '../../../components/Auth';
import type { AuthTabKey } from '../hooks/types';

interface AuthSectionProps {
  activeTab: AuthTabKey;
  onTabChange: (tab: AuthTabKey) => void;
}

export const AuthSection: React.FC<AuthSectionProps> = ({ activeTab, onTabChange }) => {
  return (
    <section className="px-4 py-14">
      <div className="mx-auto max-w-2xl rounded-2xl border border-slate-200 bg-white dark:bg-slate-800 p-4 shadow-sm dark:border-slate-700 md:p-6">
        <Tabs
          activeKey={activeTab}
          onChange={(key) => onTabChange(key as AuthTabKey)}
          items={[
            {
              key: 'login',
              label: 'Sign In',
              children: <LoginForm />,
            },
            {
              key: 'signup',
              label: 'Create Account',
              children: <SignUpForm />,
            },
          ]}
        />
      </div>
    </section>
  );
};
