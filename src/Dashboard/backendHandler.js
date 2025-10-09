import { axiosWithAuth } from "../utils/rmwAxios";
import { TEST_RIDES, TEST_RIDE_REQUESTS } from "../utils/placeholder_data";
import { ENVIRONMENT_MODE } from "../utils/config";


export async function getAllRides(){
  /**Get rides
   * 
   * Fetch Rides from the database.
   */
  if(ENVIRONMENT_MODE==="DEV"){
    return TEST_RIDES;
  }

  
  
  try{
    const res =  await axiosWithAuth.get("/rides/");
    if(res.status === 200){
      const ridesData = await res.data;
      return ridesData.rides;
    }

  }catch(error){
    console.log(error)
    return null;
  }
 
}


export async function getRideRequests(){
  /** Get requests to join a ride
   * 
   * Fetch the requests a users has made.
   */

  return TEST_RIDE_REQUESTS;
}