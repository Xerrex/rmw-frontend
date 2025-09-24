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
    return {success: true, email: resData.details.email, error: null}
  }else if(res.status === 409){
    return {success: false, email: null, error: "Email address already in use, use a different address"}
  }else{
    return {success: false, email: null, error: "Account was not created successfully"};
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

 

  try {
    const res = await axiosWithoutAuth.post(url, reqData);
    if(res.status === 200){
      const resData = await res.data;
      return {success: true, data:{...resData.details, ...resData.token}, error: null};
    }

  }catch( error){
    return {success: false, data:null, error: error.response.data.detail};
  }

  return {success: false, data:null, error: "Sign in into your account was not successful"};
}
