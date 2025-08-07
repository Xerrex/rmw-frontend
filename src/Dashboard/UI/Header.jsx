import React from 'react';
import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

function Header({collapsed, setCollapsed}) {
  return (
  <header className="bg-white text-gray-600 body-font dark:text-white mb-2">
    <div className="w-full flex mx-auto p-5 flex-row items-center">
      <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)} />
    </div>
  </header>
  )
}

export default Header