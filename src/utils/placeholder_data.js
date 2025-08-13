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
      "email": `john${i}doe${i}@rmw.ride`
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
      "id": `${r}_${ownerId}`,
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

export const TEST_RIDES = createRides(TEST_USERS, 5);

