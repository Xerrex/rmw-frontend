import {useState} from 'react';
import { Outlet, useLocation } from 'react-router';
import AlertsView from '../Contexts/AlertContext/AlertsView';
import useAlertsContext from '../Contexts/AlertContext/useAlertsContextHook';
import useAuthContext from '../Contexts/AuthContext/useAuthContextHook';
import SignIn from '../Auth/SignIn';



function Dashboard() {
  const {rmwAlerts, removeAlert} = useAlertsContext();
  const location = useLocation();
  const { userDetails }= useAuthContext();
  const [showSignIn, setShowSignIn] = useState(false);

  const CheckIsAuth = () =>{
  if (userDetails?.token){
    return (<Outlet />)
  }else{
    setShowSignIn(true);
    return ("")
  }
  }


  return (
    <div className="min-h-screen body-font text-gray-600 dark:text-white">
      {/* side bar*/}
      {/* Main Content */}

      <div className="flex justify-center-safe">
        <AlertsView rmwAlerts={rmwAlerts} removeAlert={removeAlert}/>
      </div>
        {CheckIsAuth()}

       <SignIn isOpen={showSignIn} setIsOpen={setShowSignIn} navigateTo={location}/>
    </div>
  )
}

export default Dashboard