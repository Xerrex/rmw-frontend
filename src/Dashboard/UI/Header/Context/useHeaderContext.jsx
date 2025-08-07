import { useContext } from "react";
import HeaderContext from "./HeaderProvider";


const useHeaderContext = ()=>{
    return useContext(HeaderContext)
}

export default useHeaderContext;
