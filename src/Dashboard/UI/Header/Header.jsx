import { Button, Dropdown, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, 
  SmileOutlined, AlertOutlined } from '@ant-design/icons';
import useHeaderContext from './Context/useHeaderContext';

const items = [
  { key: '1', label: (<span>1st menu item</span>),},
  {key: '2',label: (<span>2nd menu item (disabled) </span>), icon: <SmileOutlined />, disabled: true,},
  {key: '3', label: ( <span>3rd menu item (disabled)</span>), disabled: true, },
  {key: '4', danger: true, label: 'a danger item',},
];

function Header({collapsed, setCollapsed}) {
  const {title} = useHeaderContext();

  return (
  <header className="bg-white text-gray-600 body-font dark:text-white mb-2">
    <div className="w-full flex mx-auto p-5 flex-row items-center justify-between">
      <div className="mx-2 flex items-center">
        <Button type="text" icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        onClick={() => setCollapsed(!collapsed)} />
        <h1 className="text-black font-bold text-xl ml-5">{title}</h1>
      </div>
      
      <div className='mr-2 text-black'>
        <Dropdown menu={{ items }}>
          <Space> <AlertOutlined /> <DownOutlined /> </Space>
        </Dropdown>
        
      </div>
      
    </div>
  </header>
  )
}

export default Header