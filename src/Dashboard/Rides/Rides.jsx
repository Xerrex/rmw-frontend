import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router";
import { SearchOutlined, PlusCircleOutlined} from "@ant-design/icons";
import { FloatButton } from "antd";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";
import { getRides } from "../backendHandler";
import RideCard from "./RideCard";


function Rides() {
  const {setTitle} = useHeaderContext();
  const [searchParams, setSearchParams] = useSearchParams();
  const [rides, setRides] = useState([]);

  useEffect(()=>{
    setTitle("Rides");

    getRides()
    .then((ridesData)=>{
      setRides(ridesData);
    })
  }, [rides]);

  const handleSearch = useDebouncedCallback((searchText)=>{
    console.log("handleSearch", searchText); // TODO: remove
    if(searchText){
      setSearchParams({"sort": searchText});
    }else{
       setSearchParams({});
    }
  }, 300);

  console.log("rides", rides);
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-center">
        <label htmlFor="search" className="sr-only"> Search</label>
        <input className="block w-1/2 rounded-md border-gray-200 dark:border-white py-[9px] pl-10
          mt-2 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-white" 
          placeholder="Search ride" onChange={(e)=>handleSearch(e.target.value)}
           defaultValue={searchParams.get('sort')?.toString()}/>

        <SearchOutlined style={{fontSize:"20px", marginLeft:"10px"}}/>
      </div>

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
