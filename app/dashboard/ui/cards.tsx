import { RocketLaunchIcon, ArrowDownOnSquareIcon, RectangleStackIcon,
  ArrowPathIcon, XMarkIcon} from '@heroicons/react/24/outline';
import { CardType } from '@/app/lib/definitions';

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