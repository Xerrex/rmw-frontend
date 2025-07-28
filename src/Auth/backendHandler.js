import { axiosWithoutAuth } from "../utils/rmwAxios";


export async function signUpHandler(formValues){
  /** Handle the sign up call with the backend */
  // {"firstName": "sasass","lastName": "asasas","email": "asasas","password": "sasasas"}
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
  /**  Handle the sign in call to the backend */
  // {email: 'sasas', password: 'sasasa'}

  const url = "/auth/signin";
  const reqData = {
    "email": formValues.email,
    "password": formValues.password
  }

  const res = await axiosWithoutAuth.post(url, reqData);
  const resData = await res.data

  return resData;
}
