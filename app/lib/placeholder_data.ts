import moment from "moment";

export const ridesOverViewData = [
  { month: 'Dec', 
    rides:{
      total:40,
      offered: 10,
      taken: 10,
      request_pending: 10,
      request_rejected: 10
    }
  },
  { month: 'Jan', 
    rides:{
      total:40,
      offered: 10,
      taken: 10,
      request_pending: 10,
      request_rejected: 10
    }
  },
  { month: 'Feb', 
    rides:{
      total:40,
      offered: 10,
      taken: 10,
      request_pending: 10,
      request_rejected: 10
    }
  },
  { month: 'Mar', 
    rides:{
      total:40,
      offered: 10,
      taken: 10,
      request_pending: 10,
      request_rejected: 10
    }
  }
]


export const generateRides = (rides: number)=>{
  /** Generates rides
   * 
   * Returns a list of rides 
   */

  const ridesData = [];
  

  for(let i=1; i<=rides; i++){
    const depart_time = moment().add(60, "minutes").format("DD-MM-YYYY HH:mm");
    const end_time = moment().add(180, "minutes").format("DD-MM-YYYY HH:mm");

    const newRide = {
      "id": i,
      "uuid": `0426e05b-e321-40fb-ae08-19fed9d0c${i}`,
      "vehicle_plate": `KDS ${i.toString().slice(0, 3).padStart(3, "0")}D`,
      "seats": 4,
      "town_starting": `Town${i}`,
      "town_ending": `Town${i+1}`,
      "depart_time": `${depart_time}`,
      "end_time": `${end_time}`,
      "created_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
      "updated_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
      "owner_id": Math.floor(Math.random() * rides)
    }

    ridesData.push(newRide);
  }
  return ridesData;
}