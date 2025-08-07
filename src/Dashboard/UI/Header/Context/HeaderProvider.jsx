import { createContext, useState } from "react";

const HeaderContext= createContext({});


export const HeaderProvider = ({children})=>{
  /** Header Provider
   * Provides values for the dashboard header
  */
  const [title, setTitle] = useState("Dashboard");

  return (
    <HeaderContext.Provider value={{title, setTitle}}>
      {children}
    </HeaderContext.Provider>
  )

}

export default HeaderContext;
