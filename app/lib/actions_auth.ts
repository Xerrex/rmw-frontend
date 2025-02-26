'use server'
import {redirect} from 'next/navigation';
import { revalidatePath } from 'next/cache'


export async function authSignUp(formdata: FormData){
  /** Handle user registration */
  console.log("Sign Up data", formdata);
  revalidatePath("/auth/sign_up");
  redirect("/auth/sign_in");
}


export async function authSignIn(formData: FormData){
  /** Handle user sign up */

  console.log("Sign In data", formData);
  revalidatePath("/auth/sign_in");
  redirect("/dashboard");
}


export async function logout(){
  /** Handle user logout */
  console.log("Logging out the user");
  //TODO: remove auth 
  redirect("/auth/sign_in");
}