import { useEffect } from "react";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";


function Profile() {
  const {setTitle} = useHeaderContext();

  useEffect(()=>{
    setTitle("Profile");
  })
  return (
    <div>Profile</div>
  )
}

export default Profile