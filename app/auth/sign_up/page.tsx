import React from 'react';
import SignUpForm from '@/app/ui/sign-up-form';

function Page() {
  return (
    <div className="py-2 px-2 flex flex-col">
      <h1 className="text-gray-900 text-xl font-medium title-font mb-5 mx-auto">Sign up</h1>
      <SignUpForm/>
    </div>
  )
}

export default Page;