import { createContext, useState } from "react";


const AlertsContext = createContext({});


export const AlertsProvider = ({children})=> {
  /** Alerts Provider
   * Provides system wide alerting.
   */
  const [rmwAlerts, setRmwAlerts] = useState([]);

  const addAlert = (type, message, description)=>{
    /** Add an Alert
     *  an alert consist of {type, message, description}
     * */
    // rmwAlerts.push({type, message, description})
    setRmwAlerts([...rmwAlerts, {type, message, description}])
  }

  const removeAlert = (alertIndex) =>{
    const newAlerts = rmwAlerts.filter((_, index)=>{
      return index !== alertIndex
    });

    setRmwAlerts(newAlerts);
  }
 

  return (
    <AlertsContext.Provider value={{rmwAlerts, addAlert, removeAlert}}>
      {children}
    </AlertsContext.Provider>
  )
}

export default AlertsContext;