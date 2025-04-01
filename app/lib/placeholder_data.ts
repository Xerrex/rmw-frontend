import moment from "moment";
import { Ride, User, RideRequest } from "./definitions";


const createTestUsers = (users: number): User[]=>{
  /** Generates users
   * 
   * returns a list of users
  */

  const createdUsers = [];

  for (let i=1; i<=users; i++){
    const newUser = { 
      "id": i,
      "uuid": "6c723bcc-b8d3-4a25-9c92-75f01fe8c189",
      "first_name": `John${i}`,
      "last_name": `Doe${i}`,
      "email": `john${i}doe${i}@rmw.ride`
    }
    createdUsers.push(newUser)
  }

  return createdUsers;
}


export const TEST_USERS = createTestUsers(10);


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


const generateRides = (rides: number, ownerId: number): Ride[]=>{
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
      "uuid": `0426e${i}b-e321-40fb${i}-ae08-19fed9d0c${i}`,
      "vehicle_plate": `KDS ${i.toString().slice(0, 3).padStart(3, "0")}D`,
      "seats": 4,
      "town_starting": `Town${i}`,
      "town_ending": `Town${i+1}`,
      "depart_time": `${depart_time}`,
      "end_time": `${end_time}`,
      "created_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
      "updated_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
      "owner_id": ownerId
    }

    ridesData.push(newRide);
  }
  return ridesData;
}


const createTestRides = (): Ride[]=>{
  /** Create test rides
   * Creates rides for every user.
   */

  const rides:Ride[] = [];

  TEST_USERS.forEach((user)=>{
    const userRides = generateRides(5, user.id);
    rides.push(...userRides);
  })

  return rides;
}


export const TEST_RIDES = createTestRides();


const createRideRequests = (): RideRequest[]=>{
  /**Create Ride request for every ride 
   * 
  */
 const statuses = ["Accepted", "Rejected", "Pending"]

  const rideRequests: RideRequest[] = [];

  TEST_RIDES.forEach((ride, rideIndex)=>{
    TEST_USERS.forEach((user, userIndex)=>{

      if (user.id !== ride.owner_id){
        const newRequest = {
          id: rideRequests.length + 1,
          uuid: `${ride.uuid}-rr${rideRequests.length+1}`,
          seats: 1,
          stop: `${user.first_name}${rideIndex}${userIndex}Town`,
          status: statuses[Math.floor(Math.random() * statuses.length)],
          created_at: `${moment().format("DD-MM-YYYY HH:mm")}`,
          updated_at: `${moment().format("DD-MM-YYYY HH:mm")}`,
          ride_id: ride.id,
          ride_requester_id: user.id
        }

        rideRequests.push(newRequest);
      }
     
    })
  })

  return rideRequests;
}


export const TEST_RIDE_REQUESTS = createRideRequests();
