import { useEffect, useState } from "react";
import { useSearchParams } from "react-router";
import { PlusCircleOutlined} from "@ant-design/icons";
import { FloatButton } from "antd";
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

  

  console.log("rides", rides);
  return (
    <div className="flex flex-col">
      <Search placeholder={"Search rides"}/>

      <div className="mt-2">
      {rides.length < 1 ? (<span>There are no rides yet</span>):(
        <div className="flex flex-wrap gap-2">
          {rides.map((ride)=>(
            <div className="w-96">
              <RideCard key={ride.uuid} ride={ride}/>
            </div>
          ))}
        </div>
      )}
      </div>

      <FloatButton shape="circle" type="primary" style={{ insetInlineEnd: 94, width:65, height:65, fontSize:30, lineHeight:'60px'}}
        icon={<PlusCircleOutlined style={{fontSize:"22px"}}/>} onClick={() => console.log('Floating button onClick')}/>
    </div>
  )
}

export default Rides;
