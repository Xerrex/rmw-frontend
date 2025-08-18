import { Image } from "antd";
import RequestImage from "../../assets/car.png";
import {PushpinOutlined, TeamOutlined, LoadingOutlined, 
  CheckOutlined, CloseOutlined, CalendarOutlined, FieldTimeOutlined} from "@ant-design/icons";


function RideRequestCard({rideRequest}){
  
  const [createdAt_date, createdAt_time] = rideRequest.created_at.split(" ");
  const [updatedAt_date, updatedAt_time] = rideRequest.updated_at.split(" ");

  const handleStatusChange = (status)=>{
    console.log(`HandleStatusChange for ride request ${rideRequest.uuid}`, status);
  }

  return(
    <div className="bg-white text-black rounded-lg p-2 m-1 w-96">
      <div className="flex">
        <Image src={RequestImage} alt={"route picture"} width={200} height={200}/>
        <div className="flex grow items-center justify-center bg-gray-300 rounded-lg">
          <PushpinOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span className="text-lg font-semibold">{rideRequest.stop}</span>
        </div>
      </div>
    
      <div className="flex flex-col mt-2 rounded-lg p-2">
        <div className="flex items-center">
          <TeamOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span className="mr-">Seats</span>
          <span className="mr-2">{rideRequest.seats}</span>
        </div>

        <div className="flex items-center">
          {rideRequest.status === "Pending" && <LoadingOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>}
          {rideRequest.status === "Accepted" && <CheckOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>}
          {rideRequest.status === "Rejected" && <CloseOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>}
          <span className="ml-2 mr-2">Status</span>
          <span className="mr-2">{rideRequest.status}</span>
        </div>

        <div className="flex items-center">
          <CalendarOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span className="mr-2">{createdAt_date}</span>
         <FieldTimeOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span>{createdAt_time} (created at)</span>
        </div>

        <div className="flex items-center">
          <CalendarOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span className="mr-2">{updatedAt_date}</span>
          <FieldTimeOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span>{updatedAt_time} (last updated at)</span>
        </div>

      </div>
      
      {rideRequest.status ==="Pending" && (
        <div className="flex w-full justify-evenly">
          <button className="bg-indigo-800 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white p-4 
            shadow-lg  transition duration-200 rounded-sm" onClick={()=>handleStatusChange("Rejected")}>Reject</button>
          
          <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white p-4 
            shadow-lg  transition duration-200 rounded-sm" onClick={()=>handleStatusChange("Accepted")}>Accept</button>
        </div>
      )}
    
      {rideRequest.status === "Accepted" && (
        <button className="w-full bg-indigo-800 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800 text-white p-4 
        shadow-lg  transition duration-200 rounded-sm" onClick={()=>handleStatusChange("Rejected")}>Reject</button>
      )}

      {rideRequest.status === "Rejected" && (
        <button className="w-full bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700 text-white p-4 
        shadow-lg  transition duration-200 rounded-sm" onClick={()=>handleStatusChange("Accepted")}>Accept</button>
      )}
         
    </div>
  )
}


export default RideRequestCard;
