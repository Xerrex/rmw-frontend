import { useContext } from "react";
import AlertsContext from "./AlertProvider";

const useAlertsContext = ()=>{
    return useContext(AlertsContext);
}

export default useAlertsContext;
