import { useEffect } from 'react';
import { useSearchParams } from "react-router";
import useHeaderContext from '../UI/Header/Context/useHeaderContext';
import Search from '../UI/Search';


function RideRequests() {
  const {setTitle} = useHeaderContext();
  const [searchParams ] = useSearchParams();

  useEffect(()=>{
    setTitle("Ride Requests");
    console.log("Search terms", searchParams.get("sort"));
    
  })

  return (
    <div className="flex flex-col">
      <Search placeholder={"Search ride request"}/>
    </div>
  )
}

export default RideRequests;
