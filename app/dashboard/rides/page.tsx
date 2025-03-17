"use client";

import React, {useState, useEffect} from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import RidesSearch from '../ui/RidesSearch';
import { RideCard } from '../ui/Cards';
import { Ride } from '@/app/lib/definitions';
import { getRides } from '@/app/lib/data';


function Page() {
  const [rides, setRides] = useState<Ride[]>([])

  useEffect(()=>{
    getRides()
    .then(data =>{
      setRides(data)
    })
  }, [])

  return (
    <div className="flex flex-col flex-1">
      <RidesSearch/>

      <div className="flex flex-wrap w-full h-[780px] overflow-y-auto hide-scrollbar">
        {rides.length < 0 && <p className="mx-auto text-black">There are no rides yet</p>}
        {rides.map((ride)=>(<RideCard key={ride.uuid} Ride={ride}/>))}
      </div>

      <div className="text-black fixed bottom-20 right-4">
        <button className="bg-primaryColor hover:bg-primaryColorHover text-white p-4 rounded-full shadow-lg  
          transition duration-200"><PlusIcon className="h-8 w-8 text-white" />
        </button>
      </div>
    </div>
  )
}

export default Page;