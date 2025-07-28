import { createContext, useState } from "react";

const AuthContext = createContext({});


export const AuthProvider = ({children})=>{
  /** Auth Provider 
   * Provides User Details throughout the app
  */
  const [userDetails, setUserDetails] = useState(null);

  return (
    <AuthContext.Provider value={{userDetails, setUserDetails}}>
      {children}
    </AuthContext.Provider>
  )

}

export default AuthContext;