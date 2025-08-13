import { useSearchParams } from "react-router";
import { useDebouncedCallback } from "use-debounce";
import { SearchOutlined } from "@ant-design/icons";

function Search({placeholder}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = useDebouncedCallback((searchText)=>{
    if(searchText){
      setSearchParams({"sort": searchText});
    }else{
      setSearchParams({});
    }
  }, 300);

  return (
    <div className="flex items-center justify-center">
      <label htmlFor="search" className="sr-only"> Search</label>
      <input className="block w-1/2 rounded-md border-gray-200 dark:border-white py-[9px] pl-10
        mt-2 text-sm outline-2 placeholder:text-gray-500 dark:placeholder:text-white" 
        placeholder={placeholder} onChange={(e)=>handleSearch(e.target.value)}
          defaultValue={searchParams.get('sort')?.toString()}/>

      <SearchOutlined style={{fontSize:"20px", marginLeft:"10px"}}/>
    </div>
  )
}

export default Search