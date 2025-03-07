import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';
import RidesSearch from '../ui/RidesSearch';
import { RideCard } from '../ui/cards';
import { getRides } from '@/app/lib/data';


async function page() {
  const rides = await getRides();
  return (
    <div className="flex flex-col">
      <RidesSearch/>

      <div className="flex flex-wrap text-black">
        {rides.length < 0 && <p className="mx-auto">There are no rides yet</p>}
        {rides.map((ride)=>(<RideCard key={ride.uuid} Ride={ride}/>))}
      </div>

      <div className="text-black fixed bottom-32 right-8">
        <button className="bg-primaryColorAlt hover:bg-primaryColorHoverAlt text-white p-4 rounded-full shadow-lg  transition duration-200">
          <PlusIcon className="h-5 w-5 text-white" />
        </button>
      </div>
    </div>
  )
}

export default page