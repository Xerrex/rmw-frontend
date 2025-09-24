import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router";

const AuthContext = createContext({});


export const AuthProvider = ({children})=>{
  /** Auth Provider 
   * Provides User Details throughout the app
  */
 const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(()=>{
    const userData = getUser();
    if(userData !== null && userData !== undefined){
     setUserDetails(userData);
     navigate("/dashboard");
    }else {
      // navigate the user to the login page.
      navigate("/");
      localStorage.clear();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const saveUserDetails = (userData)=>{
    console.log("Sign in response", userData); // TODO: remove
    localStorage.setItem("userDetails", JSON.stringify(userData))
  }
  
  const getUser = ()=>{
    const userData = localStorage.getItem("user");
    return JSON.parse(userData);
  }

  const logout = ()=>{
    navigate("/");
     localStorage.clear();
  }

  return (
    <AuthContext.Provider value={{saveUserDetails, userDetails, logout}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext;