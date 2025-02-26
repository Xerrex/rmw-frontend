import { RocketLaunchIcon, ArrowPathIcon, RectangleStackIcon } from '@heroicons/react/24/outline';

const iconMap = {
  allRides: RectangleStackIcon,
  ridesOffered: RocketLaunchIcon,
  rideRequests: ArrowPathIcon
}


type CardType = {
  title: string;
  value: number | string; 
  type: 'allRides' | 'ridesOffered' | 'rideRequests';
}


export function Card({title,value,type,}: CardType){
  const Icon = iconMap[type];
  return (
    <div className="bg-white shadow-sm rounded-lg p-2 mx-auto w-60">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-black" /> : null}
        <h3 className="ml-2 text-sm font-medium text-black">{title}</h3>
      </div>
      <p className="truncate rounded-xl bg-white px-6 py-4 text-center text-2xl text-black">
        {value}
      </p>
    </div>
  )
}


export function OverViewCards(){

  const ridesData = [
    {title: "All Rides", value: 20, type:"allRides"},
    {title: "Rides Offered", value: 10, type:"ridesOffered"},
    {title: "Ride Requests", value: 10, type:"rideRequests"}
  ]
  
  return (
    <div className="flex">
      {ridesData.map((rideData)=>(
        <Card key={rideData.type} title={rideData.title} value={rideData.value} type={rideData.type} />
      ))}
    </div>
  )
}