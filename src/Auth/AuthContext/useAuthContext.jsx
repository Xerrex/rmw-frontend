import { useContext } from "react";
import AuthContext from "./AuthProvider";


const useAuthContext = ()=>{
    return useContext(AuthContext)
}

export default useAuthContext;
