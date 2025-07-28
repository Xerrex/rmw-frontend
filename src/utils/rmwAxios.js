import axios from "axios";
import { BACKEND_BASE_URL } from "./config";


function withoutAuthAxios(){
    const instance = axios.create({
      baseURL: BACKEND_BASE_URL,
      allowAbsoluteUrls: false,
      // timeout: 5000,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    return instance;
}


function withAuthAxios(){
  const token = "dadadad" // TODO get token from localstorage
  const instance = axios.create({
    baseURL: BACKEND_BASE_URL,
    // allowAbsoluteUrls: false,
    timeout: 5000,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });

  return instance;
}


export const axiosWithoutAuth = withoutAuthAxios();
export const axiosWithAuth = withAuthAxios();
