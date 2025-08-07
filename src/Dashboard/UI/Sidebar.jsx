import { Layout, Menu } from "antd";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';

const { Sider} = Layout;
const styles = {
  overflow: 'auto',
  height: '100vh',
  position: 'sticky',
  top: 0,
  bottom: 0,
}

function Sidebar({collapsed}) {
  return (
    <Sider style={styles} trigger={null} width={300} collapsible collapsed={collapsed} >
      <div className="p-4 text-white text-center">
        <h1 className="text-xl font-bold">{collapsed ? 'RMW' : 'RIDE MY WAY'}</h1>
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}
        items={[
          {key: '1', icon: <UserOutlined />, label: 'Home',},
          {key: '2', icon: <VideoCameraOutlined />, label: 'Rides',},
          {key: '3', icon: <UploadOutlined />, label: 'Profile', },
        ]}
      />
    </Sider>
  )
}

export default Sidebar