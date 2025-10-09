import {useState} from 'react';
import { Outlet, useLocation } from 'react-router';
import AlertsView from '../AlertContext/AlertsView';
import useAlertsContext from '../AlertContext/useAlertsContextHook';
import { HeaderProvider } from './UI/Header/Context/HeaderProvider';
import SignIn from '../Auth/SignIn';
import Sidebar from './UI/Sidebar';
import Header from './UI/Header/Header';


function Dashboard() {
  const {rmwAlerts, removeAlert} = useAlertsContext();
  const location = useLocation();
  // const { userDetails }= useAuthContext();
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
    <div className="min-h-screen body-font text-gray-600 dark:text-gray-200 bg-gray-50 
      dark:bg-gray-900 transition-colors duration-200 flex">
       {/* sidebar */}
      <div className="p-2">
        <Sidebar collapsed={collapsed}/>
      </div>
      
       {/* Main Content */}
      <div className="p-2 w-full">
        
        <HeaderProvider>
          <div className="flex flex-col">
            <div className="sticky z-40">
              <Header collapsed={collapsed} setCollapsed={setCollapsed}/>
            </div>
            <div className="flex justify-center-safe absolute right-0 left-0 z-50">
              <AlertsView rmwAlerts={rmwAlerts} removeAlert={removeAlert}/>
            </div>
          
            <Outlet />
            
          </div>
        
        </HeaderProvider>
        
      </div>
       
      <SignIn isOpen={showSignIn} setIsOpen={setShowSignIn} navigateTo={location}/>
    </div>
  )
}

export default Dashboard