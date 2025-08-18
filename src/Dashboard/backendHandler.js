import { TEST_RIDES, TEST_RIDE_REQUESTS } from "../utils/placeholder_data";


export async function getRides(){
  /**Get rides
   * 
   * Fetch Rides from the database.
   */
  return TEST_RIDES;
}


export async function getRideRequests(){
  /** Get requests to join a ride
   * 
   * Fetch the requests a users has made.
   */

  return TEST_RIDE_REQUESTS;
}