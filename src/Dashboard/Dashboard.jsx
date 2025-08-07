import {useState} from 'react';
import { Outlet, useLocation } from 'react-router';
import { Layout, Button } from 'antd';
import {MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import AlertsView from '../Contexts/AlertContext/AlertsView';
import useAlertsContext from '../Contexts/AlertContext/useAlertsContextHook';
import useAuthContext from '../Contexts/AuthContext/useAuthContextHook';
import SignIn from '../Auth/SignIn';
import Sidebar from './UI/Sidebar';
import Header from './UI/Header';


function Dashboard() {
  const {rmwAlerts, removeAlert} = useAlertsContext();
  const location = useLocation();
  const { userDetails }= useAuthContext();
  const [showSignIn, setShowSignIn] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  // const CheckIsAuth = () =>{
  // if (userDetails?.token){
  //   return (<Outlet />)
  // }else{
  //   setShowSignIn(true);
  //   return ("")
  // }
  // }


  return (
    <div className="min-h-screen body-font text-gray-600 dark:text-white flex">
       {/* sidebar */}
      <div className="p-2">
        <Sidebar collapsed={collapsed}/>
      </div>
      
       {/* Main Content */}
      <div className="p-2 w-full">
        <div className="flex justify-center-safe">
          <AlertsView rmwAlerts={rmwAlerts} removeAlert={removeAlert}/>
        </div>

        <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
        
        <Outlet />

      </div>
       
      <SignIn isOpen={showSignIn} setIsOpen={setShowSignIn} navigateTo={location}/>
    </div>
  )
}

export default Dashboard