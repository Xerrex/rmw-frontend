import { authSignUp } from "@/app/lib/actions_auth";

export default function SignUpForm(){

    return(
        <form className="space-y-3" action={authSignUp}>
          <div className="flex flex-col justify-center bg-gray-100 rounded-lg p-8 w-1/4 mx-auto mt-10">
            <div className="relative mb-4">
              <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 
                focus:border-primaryColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 
                leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <div className="relative mb-4">
              <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
              <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 
              focus:border-primaryColor focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 
              leading-8 transition-colors duration-200 ease-in-out"/>
            </div>
            <button className="text-white bg-primaryColor hover:bg-primaryColorHover border-0 py-2 px-8 
            focus:outline-none  rounded text-lg">Sign up</button>
          </div> 
        </form>
      )
}