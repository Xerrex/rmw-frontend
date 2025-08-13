import { Image } from "antd";
import { CalendarOutlined, FieldTimeOutlined} from "@ant-design/icons";
import  RideImage from "../../assets/car.png";

function RideCard({ride}) {

  const [dpt_date, dpt_time] = ride.depart_time.split(" ");
  const [end_date, end_time] = ride.depart_time.split(" ");
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white rounded-lg p-2 m-1 w-full">
      <div className="flex">
        <Image src={RideImage} alt={"car picture"} width={200} height={200}/>
        <div className="flex grow flex-col p-2 bg-gray-300 dark:bg-gray-700 rounded-lg">
          <p className="text-lg font-semibold">{ride.town_starting}</p>
          <p className="mx-auto text-gray-600 dark:text-gray-300">to</p>
          <p className="text-lg font-semibold">{ride.town_ending}</p>
        </div>
      </div>
    
      <div className="flex flex-col bg-gray-300 dark:bg-gray-700 mt-2 rounded-lg p-2">
        <div className="flex items-center">
          <CalendarOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span className="mr-2">{dpt_date}</span>
          <FieldTimeOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span>{dpt_time} (start)</span>
        </div>
    
        <div className="flex items-center">
          <CalendarOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span className="mr-2">{end_date}</span>
          <FieldTimeOutlined style={{fontSize:"20px"}} className="dark:text-gray-300"/>
          <span>{end_time} (end)</span>
        </div>
      </div>
    
      <div className="flex flex-col mt-2 text-gray-800 dark:text-gray-200">
        <p>Seats: {ride.seats}/{ride.seats} (available)</p>
        <p>Registration: {ride.vehicle_plate}</p>
      </div>
    
      <div className="flex flex-col space-y-2">
        <button className="bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700
         text-white p-4 shadow-lg  transition duration-200 rounded-sm">Join</button>
        
        <button className="bg-indigo-800 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800 
        text-white p-4 shadow-lg  transition duration-200 rounded-sm">View Request(For requester)</button>
        
        <button className="bg-indigo-800 hover:bg-indigo-600 dark:bg-indigo-700 dark:hover:bg-indigo-800
         text-white p-4 shadow-lg  transition duration-200  rounded-sm">View Requests(For Owner)</button>
      </div>
    </div>
  )
}

export default RideCard