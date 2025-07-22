import React, {useState} from 'react';
import SignUp from '../Auth/SignUp';
import SignIn from '../Auth/SignIn';
import AlertsView from '../Contexts/AlertsView';
import useAlertsContext from '../Contexts/useAlertsContextHook';


function Home() {
  const [rmwAlerts, removeAlert] = useAlertsContext();
  const [showSignUp, setShowSignUp] = useState(false);
  const [showSignIn, setShowSignIn] = useState(false);


  const handleSignUpClick = ()=>{
    setShowSignUp(true);
  }

  const handleSignInClick = ()=>{
    setShowSignIn(true);
  }


  return (
    <div className="min-h-screen body-font text-gray-600 dark:text-white">
      {rmwAlerts && <AlertsView rmwAlerts={rmwAlerts} removeAlert={removeAlert}/>} 
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="text-center lg:w-2/3 w-full">
          <h1 className="title-font sm:text-8xl text-4xl mb-4 font-medium text-gray-900 
            dark:text-white">Ride my way</h1>
          <p className="mb-8 leading-relaxed sm:text-3xl text-lg">Share a ride if you are going the same direction.</p>
          <div className="flex justify-center">
            <button className="inline-flex text-gray-700 bg-gray-100 border-0 py-2 px-6 focus:outline-none
             hover:bg-gray-500 rounded text-lg" onClick={()=>handleSignUpClick()}>Sign upx</button>

            <button className="ml-4 inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none
             hover:bg-indigo-800 rounded text-lg" onClick={()=>handleSignInClick()}>Sign in</button>
          </div>
        </div>
      </div>

      <SignUp isOpen={showSignUp} setIsOpen={setShowSignUp}/>
      <SignIn isOpen={showSignIn} setIsOpen={setShowSignIn}/>
    </div>
  )
}

export default Home