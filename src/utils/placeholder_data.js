import moment from "moment";


export const ridesDataTotal = [
  {title: "All Rides", value: 40, type:"allRides"},
  {title: "Rides Offered", value: 10, type:"ridesOffered"},
  {title: "Ride Taken", value: 10, type:"ridesTaken"},
  {title: "Requests Pending", value: 10, type:"requestsPending"},
  {title: "Requests Rejected", value: 10, type:"requestsRejected"}
]


const createUsers = (numberOfUsers)=>{

  const users = [];
  for(let i=1; i<=numberOfUsers; i++){
    const newUser = {
      "id": i,
      "uuid": crypto.randomUUID(),
      "first_name": `John${i}`,
      "last_name": `Doe${i}`,
      "email": `john${i}doe${i}@rmw.ride`,
      "password": `john${i}doe${i}`
    }

    users.push(newUser);
  }
  return users;
}


export const TEST_USERS = createUsers(10);


const generateUserRides = (numberOfRides, ownerId)=>{

  const rides = [];
  for(let r=1; r<=numberOfRides; r++){
    const depart_time = moment().add(60, "minutes").format("DD-MM-YYYY HH:mm");
    const end_time = moment().add(180, "minutes").format("DD-MM-YYYY HH:mm");
    const newRide = {
      "id": rides.length +1,
      "uuid": crypto.randomUUID(),
      "vehicle_plate": `KDT ${r.toString().slice(0, 3).padStart(3, "0")}F`,
      "seats": 4,
      "town_starting": `Town${r}`,
      "town_ending": `Town${r+1}`,
      "depart_time": `${depart_time}`,
      "end_time": `${end_time}`,
      "created_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
      "updated_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
      "owner_id": ownerId
    }
    rides.push(newRide);
  }
  return rides;
}


const createRides = (users, numberOfRides)=>{

  const rides = [];
  users.forEach((user)=>{
    const userRides = generateUserRides(numberOfRides, user.id)
    rides.push(...userRides);
  })
  return rides;
}


export const TEST_RIDES = createRides(TEST_USERS, 2);


const createRidesRequests = (users, rides)=>{
  const statuses = ["Accepted", "Rejected", "Pending"];
  const rideRequests = [];

  rides.forEach((ride, rideIndex)=>{
    users.forEach((user, userIndex)=>{
      if(user.id !== ride.owner_id){
        const newRequest = {
          "id": rideRequests.length + 1,
          "uuid": crypto.randomUUID(),
          "seats": 1,
          "stop": `${user.first_name}${rideIndex}${userIndex}Town`,
          "status": statuses[Math.floor(Math.random() * statuses.length)],
          "created_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
          "updated_at": `${moment().format("DD-MM-YYYY HH:mm")}`,
          "ride_id": ride.id,
          "ride_requester_id": user.id
        }
        rideRequests.push(newRequest);
      }
    })
  })

  return rideRequests;
}

export const TEST_RIDE_REQUESTS = createRidesRequests(TEST_USERS, TEST_RIDES);
