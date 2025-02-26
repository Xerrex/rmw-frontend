import React from 'react';
import SignInForm from '@/app/ui/sign-in-form';


function Page() {
  return (
    <div className="py-2 px-2 flex flex-col">
      <h1 className="text-white text-xl font-medium title-font mb-5 mx-auto">Sign In</h1>
      <SignInForm />
    </div>
  )
}

export default Page;