import { useEffect, useState } from 'react';
// import { useSearchParams } from "react-router";
// import { FloatButton } from "antd";
import useHeaderContext from '../UI/Header/Context/useHeaderContext';
import Search from '../UI/Search';
import { getRideRequests } from '../backendHandler';
import RideRequestCard from './RideRequestCard';


function RideRequests() {
  const {setTitle} = useHeaderContext();
  // const [searchParams ] = useSearchParams();
  const [rideRequests, setRideRequests] = useState([]);

  
  useEffect(()=>{
    setTitle("Ride Requests");
    // console.log("Search terms", searchParams.get("sort"));
    getRideRequests()
    .then((rideRequestData)=>{
      setRideRequests(rideRequestData);
      
    })
  })

  console.log("rideRequest", rideRequests);

  return (
    <div className="flex flex-col">
      <Search placeholder={"Search ride request"}/>
      
      <div className="mt-2">
        {rideRequests.length < 1 ? (<span>You have no ride requests</span>):(
          <div className="flex flex-wrap gap-2">
            {rideRequests.map((rideRequest)=>(
              <div className="w-96">
                <RideRequestCard key={rideRequest.uuid} rideRequest={rideRequest} />
              </div>))}
          </div>)}
      </div>
    </div>
  )
}

export default RideRequests;
