import React from 'react';

function SignUp() {
  return (
    <div className="py-2 px-2 flex flex-col">
      <h1 className="text-gray-900 text-xl font-medium title-font mb-5 mx-auto">Sign up</h1>

      <div className="flex flex-col justify-center bg-gray-100 rounded-lg p-8 w-1/4 mx-auto mt-10">
          <div className="relative mb-4">
            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
              <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 
              focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 
              leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <div className="relative mb-4">
            <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
            <input type="password" id="password" name="password" className="w-full bg-white rounded border border-gray-300 
            focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 
            leading-8 transition-colors duration-200 ease-in-out"/>
          </div>
          <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">Sign up</button>
        </div>
    </div>
  )
}

export default SignUp;