import { useEffect } from "react";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";
import { ridesDataTotal } from "../../utils/placeholder_data";
import { BarChartOutlined, RiseOutlined, RocketOutlined, 
  LoadingOutlined, CloseOutlined} from '@ant-design/icons';


const iconMap = {
  "allRides": <BarChartOutlined style={{fontSize: '20px', color: '#020618'}}/>,
  "ridesOffered": <RiseOutlined style={{fontSize: '20px', color: '#020618'}}/>,
  "ridesTaken": <RocketOutlined style={{fontSize: '20px', color: '#020618'}}/>,
  "requestsPending": <LoadingOutlined style={{fontSize: '20px', color: '#020618'}}/>,
  "requestsRejected": <CloseOutlined style={{fontSize: '20px', color: '#020618'}}/>
}


function DashboardHome() {
  const {setTitle} = useHeaderContext();
  console.log(ridesDataTotal);

  useEffect(()=>{
    setTitle("Home");
   
  })
  return (
    <div className="flex flex-col p-1">

      {/** Overview cards */}
      <div className="flex justify-evenly">
        {ridesDataTotal.map((ridesTotal)=>(
          <div key={ridesTotal.title} className="bg-white shadow-sm rounded-lg p-2 w-60">
            <div className="flex p-4">
             {iconMap[ridesTotal.type]}
              <h3 className="ml-2 text-sm font-medium text-black">{ridesTotal.title}</h3>
            </div>
            <p className="truncate rounded-xl bg-white px-6 py-4 text-center text-2xl text-black">
              {ridesTotal.value}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 flex justify-evenly">
        {/** Graph */}
        <div> rides</div>

        {/** Recent requests as list */}
        <div>Request list</div>
      </div>
      

      

    </div>
  )
}

export default DashboardHome;
