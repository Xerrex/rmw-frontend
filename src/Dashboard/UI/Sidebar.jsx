import { useState } from "react";
import { useNavigate } from "react-router";
import { Layout, Menu } from "antd";
import { BarChartOutlined, UserOutlined, CarOutlined } from '@ant-design/icons';


const { Sider} = Layout;
const styles = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  top: 0,
  bottom: 0,
}

const menuItems = [
  {key: '1', icon: <BarChartOutlined />, label: 'Home', path: '/dashboard/home',},
  {key: '2', icon: <CarOutlined />, label: 'Rides', path: '/dashboard/rides',},
  {key: '3', icon: <UserOutlined />, label: 'Profile', path: '/dashboard/profile',},
]


function Sidebar({collapsed}) {
  const navigate = useNavigate();
  const [current, setCurrent] = useState('1');

  const menuItemClicked = (e)=>{
    const itemKey = e.key;
    setCurrent(itemKey);

    const clickedItem = menuItems.find((menuItem)=>menuItem.key === itemKey)
    console.log("clickedItem", clickedItem); // TODO: Remove
    navigate(clickedItem.path)
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