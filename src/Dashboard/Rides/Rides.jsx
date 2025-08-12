import { useEffect } from "react";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";

function Rides() {
  const {setTitle} = useHeaderContext();

  useEffect(()=>{
    setTitle("Rides");
  })

  return (
    <div>Rides</div>
  )
}

export default Rides