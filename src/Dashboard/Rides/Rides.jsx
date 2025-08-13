import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";
import { useSearchParams } from "react-router";
import { SearchOutlined} from "@ant-design/icons";
import useHeaderContext from "../UI/Header/Context/useHeaderContext";

function Rides() {
  const {setTitle} = useHeaderContext();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(()=>{
    setTitle("Rides");
  })

  const handleSearch = useDebouncedCallback((searchText)=>{
    console.log("handleSearch", searchText); // TODO: remove
    if(searchText){
      setSearchParams({"sort": searchText});
    }else{
       setSearchParams({});
    }
  }, 300);

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

      Rides
    </div>
  )
}

export default Rides