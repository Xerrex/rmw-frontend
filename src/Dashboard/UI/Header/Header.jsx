import { Button, Dropdown, Space } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, DownOutlined, 
  SmileOutlined, AlertOutlined } from '@ant-design/icons';
import useHeaderContext from './Context/useHeaderContext';
import useAuthContext from '../../../Auth/AuthContext/useAuthContextHook';

const items = [
  { key: '1', label: (<span>1st menu item</span>),},
  {key: '2',label: (<span>2nd menu item (disabled) </span>), icon: <SmileOutlined />, disabled: true,},
  {key: '3', label: ( <span>3rd menu item (disabled)</span>), disabled: true, },
  {key: '4', danger: true, label: 'a danger item',},
];

function Header({collapsed, setCollapsed}) {
  const {title} = useHeaderContext();
  const {userDetails} = useAuthContext();

  console.log("userDetails", userDetails);

  return (
  <header className="bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-200 body-font 
      shadow-sm dark:shadow-gray-700/50 transition-colors duration-200 mb-2">
    <div className="w-full flex mx-auto p-5 flex-row items-center justify-between">
      <div className="mx-2 flex items-center">
        <Button type="text" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700" 
        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>} onClick={() => setCollapsed(!collapsed)} />
        <h1 className="text-black dark:text-white font-bold text-xl ml-5">{title}</h1>
      </div>
      
      <div className='mr-2 text-black dark:text-gray-300'>
        <Dropdown menu={{ items }} overlayClassName="dark:bg-gray-700 dark:text-white">
          <Space className="hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded">
            {userDetails?.first_name && (<span className="text-white font-bold">{userDetails.first_name}</span>)}
            <AlertOutlined className="dark:text-gray-300"/> 
            <DownOutlined className="dark:text-gray-300"/> </Space>
        </Dropdown>
        
      </div>
      
    </div>
  </header>
  )
}

export default Header