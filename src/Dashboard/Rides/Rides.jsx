import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { PlusCircleOutlined} from "@ant-design/icons";
import { Tooltip } from "antd";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";
import Search from "../UI/Search";
import { getRides } from "../backendHandler";
import RideCard from "./RideCard";



function Rides() {
  const {setTitle} = useHeaderContext();
  const [searchParams ] = useSearchParams();
  const [rides, setRides] = useState([]);

  useEffect(()=>{
    console.log("Search terms", searchParams.get("sort"));
    setTitle("Rides");

    getRides()
    .then((ridesData)=>{
      setRides(ridesData);
    })
  });

  const handleCreateRide = ()=> {
    console.log("Handling creating a ride");
  }

  return (
    <div className="flex flex-col relative">
      <Search placeholder={"Search rides"}/>

      <div className="mt-2">
      {rides.length < 1 ? (<span>There are no rides yet</span>):(
        <div className="flex flex-wrap gap-2">
          {rides.map((ride)=>(
            <div key={ride.uuid} className="w-96">
              <RideCard  ride={ride}/>
            </div>
          ))}
        </div>
      )}
      </div>

      <div className="fixed bottom-30 right-30 z-20">
        <Tooltip title="Create a new ride">
          <button className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700
         text-white shadow-lg  transition duration-200 rounded-full p-4" onClick={()=>handleCreateRide()}>
          <PlusCircleOutlined style={{fontSize:"40px"}}/></button>
        </Tooltip>
        
      </div>
    </div>
  )
}

export default Rides;
