import Image from 'next/image';
import { RocketLaunchIcon, ArrowDownOnSquareIcon, RectangleStackIcon,
  ArrowPathIcon, XMarkIcon, CalendarIcon, ClockIcon} from '@heroicons/react/24/outline';
import { CardType, Ride } from '@/app/lib/definitions';

const iconMap = {
  allRides: RectangleStackIcon,
  ridesOffered: RocketLaunchIcon,
  ridesTaken: ArrowDownOnSquareIcon,
  requestsPending: ArrowPathIcon,
  requestsRejected: XMarkIcon
}


export function Card({title, value, type}: CardType){
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


type CardsPropType = {
  cardsData: CardType[]
}

export function OverViewCards({cardsData}: CardsPropType){
  
  return (
    <div className="flex">
      {cardsData.map((cardData)=>(
        <Card key={cardData.type} title={cardData.title} value={cardData.value} type={cardData.type} />
      ))}
    </div>
  )
}


type RideCardPropType = {
  Ride: Ride;
}

export function RideCard({Ride}: RideCardPropType){

  const [dpt_date, dpt_time] = Ride.depart_time.split(" ");
  const [end_date, end_time] = Ride.depart_time.split(" ");

  return (
    <div className="bg-white text-black rounded-lg p-2 m-1 w-96">
      <div className="flex">
        <Image src="/Car.png" alt={"car picture"} className="mr-4" width={128} height={64}/>
        <div className="flex grow flex-col p-6 bg-gray-300 rounded-lg">
          <p className="text-lg font-semibold">{Ride.town_starting}</p>
          <p className="mx-auto text-lg text-gray-600">to</p>
          <p className="text-lg font-semibold">{Ride.town_ending}</p>
        </div>
      </div>

      <div className="flex flex-col bg-gray-300 mt-2 rounded-lg p-2">
        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2"/>
          <span className="mr-2">{dpt_date}</span>
          <ClockIcon className="h-5 w-5 mr-1"/>
          <span>{dpt_time} (start)</span>
        </div>

        <div className="flex items-center">
          <CalendarIcon className="h-5 w-5 mr-2"/>
          <span className="mr-2">{end_date}</span>
          <ClockIcon className="h-5 w-5 mr-1"/>
          <span>{end_time} (end)</span>
        </div>
      </div>

      <div className="flex flex-col mt-2">
        <p>Seats: {Ride.seats}/{Ride.seats} (available)</p>
        <p>Registration: {Ride.vehicle_plate}</p>
      </div>

      <div className="flex flex-col space-y-2">
        <button className="bg-primaryColorAlt hover:bg-primaryColorHoverAlt text-white p-4 
          shadow-lg  transition duration-200" onClick={()=>join()}>Join</button>
        <button className="bg-primaryColor hover:bg-primaryColorHover text-white p-4 
          shadow-lg  transition duration-200">View Request</button>
      </div>
    </div>
  )
}