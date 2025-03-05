import { ridesData } from "./placeholder_data";


export async function getRidesDataTotals(){
    // Gets rides data for the dashboard overview
    const ridesDataTotal = [
        {title: "All Rides", value: 40, type:"allRides"},
        {title: "Rides Offered", value: 10, type:"ridesOffered"},
        {title: "Ride Taken", value: 10, type:"ridesTaken"},
        {title: "Requests Pending", value: 10, type:"requestsPending"},
        {title: "Requests Rejected", value: 10, type:"requestsRejected"}
    ]
    return ridesDataTotal;
}

export async function getRidesDataLast12months(){
    // Gets rides data for the dashboard overview
    return ridesData;
}