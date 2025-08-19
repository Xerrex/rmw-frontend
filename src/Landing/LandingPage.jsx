import {useState, useEffect} from 'react';
import SignUp from '../Auth/SignUp';
import SignIn from '../Auth/SignIn';
import AlertsView from '../AlertContext/AlertsView';
import useAlertsContext from '../AlertContext/useAlertsContextHook';
import { ENVIRONMENT_MODE } from '../utils/config';
import { TEST_USERS } from '../utils/placeholder_data';


function LandingPage() {
  const {rmwAlerts, removeAlert} = useAlertsContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);

  useEffect(()=>{
    if(ENVIRONMENT_MODE === "DEV"){
      console.log("users", TEST_USERS); 
    }
  }) // TODO: Remove for development purposes only.


  const handleSignUpClick = ()=>{
    setShowSignUp(true);
  }

  const handleSignInClick = ()=>{
    setShowSignIn(true);
  }


  return (
    <div className="min-h-screen body-font bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-300">
      <div className="flex justify-center-safe">
         <AlertsView rmwAlerts={rmwAlerts} removeAlert={removeAlert}/>
      </div>
     
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-8xl text-4xl mb-4 font-medium text-gray-900 dark:text-white">Ride my way</h1>
          <p className="mb-8 leading-relaxed sm:text-3xl text-lg text-gray-700 dark:text-gray-300">
            Share a ride if you are going the same direction.</p>
          <div className="flex justify-center">
            <button className="mx-2 inline-flex text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 
              hover:bg-gray-500 dark:hover:bg-gray-600 border-0 py-2 px-4 focus:outline-none rounded text-lg 
              transition-colors duration-200" onClick={()=>handleSignInClick()}>Sign in</button>
             
            <button className="mx-2 inline-flex text-white bg-indigo-500 hover:bg-indigo-600 dark:bg-indigo-600 
              dark:hover:bg-indigo-700 border-0 py-2 px-4 focus:outline-none rounded text-lg transition-colors 
              duration-200" onClick={()=>handleSignUpClick()}>Create an account</button>
          </div>
        </div>
      </div>

      <SignUp isOpen={showSignUp} setIsOpen={setShowSignUp}/>
      <SignIn isOpen={showSignIn} setIsOpen={setShowSignIn}/>
    </div>
  )
}

export default LandingPage;