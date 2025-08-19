import { axiosWithoutAuth } from "../utils/rmwAxios";
import { ENVIRONMENT_MODE } from "../utils/config";
import { TEST_USERS } from "../utils/placeholder_data";


export async function signUpHandler(formValues){
  /** Sign Up Handler
   * Handle the sign up call with the backend 
   */


  if(ENVIRONMENT_MODE==="DEV"){
    console.log("Environment mode", ENVIRONMENT_MODE);
    console.log("Sign up values", formValues);
    return null;
  }

  const url = "/auth/signup";
  const reqData = {
    "first_name": formValues.firstName,
    "last_name": formValues.lastName,
    "email": formValues.email,
    "password": formValues.password
  }

  const res = await axiosWithoutAuth.post(url, reqData);

  if(res.status === 200){
    const resData = await res.data;
    console.log("Sign up response", resData); // TODO: remove
    return resData;
  }else{
    // TODO: handle 409 error {"detail": "User with email zjixv@telegmail.com exists."}
    return null;
  }
  
}


export async function signInHandler(formValues){
  /**  Sign In Handler
   * Handle the sign in call to the backend 
  */
  // {email: 'sasas', password: 'sasasa'}

  if(ENVIRONMENT_MODE==="DEV"){
    console.log("Environment mode", ENVIRONMENT_MODE); // TODO: remove
    console.log("Form values", formValues); // TODO: remove
    const user = TEST_USERS.find((user)=>user.email === formValues.email);
    if(user && user.password == formValues.password){
      return {
        "message": "Successful sign in(DEV Mode)",
        "details": {
          "uuid": user.uuid,
          "first_name": user.first_name,
          "last_name": user.last_name,
          "email": user.email
        },
        "token": {
          "access_token": user.uuid,
          "token_type": "bearer"
        }
      }
    }else{
      return null;
    }
  }

  const url = "/auth/signin";
  const reqData = {
    "email": formValues.email,
    "password": formValues.password
  }

  const res = await axiosWithoutAuth.post(url, reqData);
  if(res.status === 200){
    const resData = await res.data;
    console.log("Sign in response", resData); // TODO: remove
    return resData;
  }else{
    return null;
  }
}
