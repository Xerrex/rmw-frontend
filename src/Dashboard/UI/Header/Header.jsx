import { Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import useHeaderContext from './Context/useHeaderContext';

function Header({collapsed, setCollapsed}) {
  const {title} = useHeaderContext();

  return (
  <header className="bg-white text-gray-600 body-font dark:text-white mb-2">
    <div className="w-full flex mx-auto p-5 flex-row items-center">
      <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)} />
      <h1 className="text-black font-bold text-xl ml-5">{title}</h1>
    </div>
  </header>
  )
}

export default Header