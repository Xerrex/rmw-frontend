'use server'
import {redirect} from 'next/navigation';
import { revalidatePath } from 'next/cache'


export async function authSignUp(formdata: FormData){
  /** handles the user registration */
  console.log("Sign Up data", formdata);
  revalidatePath("/auth/sign_up");
  redirect("/auth/sign_in");
}


export async function authSignIn(formData: FormData){
  /** Handles user sign up */

  console.log("Sign In data", formData);
  revalidatePath("/auth/sign_in");
  redirect("/dashboard")
}
