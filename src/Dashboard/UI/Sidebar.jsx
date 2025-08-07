import { useState } from "react";
import { Layout, Menu } from "antd";
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';

const { Sider} = Layout;
const styles = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  top: 0,
  bottom: 0,
}

const menuItems = [
  {key: '1', icon: <UserOutlined />, label: 'Home',},
  {key: '2', icon: <VideoCameraOutlined />, label: 'Rides',},
  {key: '3', icon: <UploadOutlined />, label: 'Profile',},
]


function Sidebar({collapsed}) {
  const [current, setCurrent] = useState('1');

  const menuItemClicked = (e)=>{
    const itemKey = e.key;
    setCurrent(itemKey);

    const clickedItem = menuItems.find((menuItem)=>{
      return menuItem.key === itemKey;
    })
    console.log("clickedItem", clickedItem);
  }

  return (
    <Sider style={styles} trigger={null} width={300} collapsible collapsed={collapsed} >
      <div className="p-4 text-white text-center">
        <h1 className="text-xl font-bold">{collapsed ? 'RMW' : 'RIDE MY WAY'}</h1>
      </div>
      <Menu onClick={menuItemClicked} theme="dark" mode="inline" selectedKeys={[current]}
        items={menuItems}/>
    </Sider>
  )
}

export default Sidebar