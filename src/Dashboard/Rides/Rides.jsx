import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";
import Search from "../UI/Search";
import { getAllRides } from "../backendHandler";
import RideCard from "./RideCard";
import CreateRide from "./CreateRide";
import EditRide from "./EditRide";



function Rides() {
  const {setTitle} = useHeaderContext();
  const [searchParams ] = useSearchParams();
  const [rides, setRides] = useState([]);
  const [showCreateRide, setShowCreateRide] = useState(false);
  const [showEditRide, setShowEditRide] = useState(false);
  const [editRide, setEditRide] = useState({})


  useEffect(()=>{
    console.log("Search terms", searchParams.get("sort"));
    setTitle("Rides");

    getAllRides()
    .then((ridesData)=>{
      // console.log("Your rides are here", ridesData)
      setRides(ridesData);
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const openRideEditor = (ride)=>{
    setEditRide(ride);
    setShowEditRide(true);
  }


  return (
    <div className="flex flex-col relative">
      <div className="flex justify-center w-full p-4">
        <Search placeholder={"Search rides"}/>
        <button className="w-1/3 bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700
         text-white shadow-lg  transition duration-200 rounded-sm p-4" onClick={()=>setShowCreateRide(true)}>
          Create a ride
        </button>
      </div>
      

      <div className="mt-2">
      {rides.length < 1 ? (<span>There are no rides yet</span>):(
        <div className="flex flex-wrap gap-2">
          {rides.map((ride)=>(
            <div key={ride.uuid} className="lg:w-96 w-full">
              <RideCard  ride={ride} openRideEditor={openRideEditor}/>
            </div>
          ))}
        </div>
      )}
      </div>
      <CreateRide isOpen={showCreateRide} setIsOpen={setShowCreateRide}/>
      <EditRide isOpen={showEditRide} setIsOpen={setShowEditRide} ride={editRide}/>
    </div>
  )
}

export default Rides;
