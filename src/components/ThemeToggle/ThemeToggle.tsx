import React from 'react';
import { Button, Dropdown, Space } from 'antd';
import { SunOutlined, BgColorsOutlined } from '@ant-design/icons';
import { useTheme } from '../../contexts/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { isDark, setIsDark, setUseSystemTheme, useSystemTheme } = useTheme();

  const items = [
    {
      key: 'light',
      label: (
        <Space>
          <SunOutlined />
          Light Mode
        </Space>
      ),
      onClick: () => {
        setIsDark(false);
        setUseSystemTheme(false);
      },
    },
    {
      key: 'dark',
      label: (
        <Space>
          <BgColorsOutlined />
          Dark Mode
        </Space>
      ),
      onClick: () => {
        setIsDark(true);
        setUseSystemTheme(false);
      },
    },
    {
      type: 'divider' as const,
    },
    {
      key: 'system',
      label: 'Use System Preference',
      onClick: () => {
        setUseSystemTheme(true);
      },
    },
  ];

  return (
    <Dropdown
      menu={{ items }}
      trigger={['click']}
    >
      <Button
        type="text"
        size="large"
        aria-label="Toggle color mode"
        icon={isDark ? <BgColorsOutlined /> : <SunOutlined />}
        className={useSystemTheme ? 'border border-current' : undefined}
      />
    </Dropdown>
  );
};
