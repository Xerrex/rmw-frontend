import { useEffect } from "react";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";

function DashboardHome() {
  const {setTitle} = useHeaderContext();

  useEffect(()=>{
    setTitle("Home");
   
  },[])
  return (
    <div>DashHome</div>
  )
}

export default DashboardHome;
