import Link from "next/link";
import { ArrowRightIcon, LockOpenIcon } from '@heroicons/react/24/outline';

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col my-auto items-center sm:items-start">

        <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
          
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Ride My Way</h1>
            <p className="mb-8 leading-relaxed">Share a ride if you are going the same direction.</p>

            <div className="flex justify-center gap-10 w-full">
              <Link href="/auth/sign_in" className="flex justify-start gap-2 bg-indigo-500 hover:bg-indigo-600 
                py-2 px-6 text-white text-lg font-semibold">
                <span>Login</span> 
                <span className="order-first font-bold"><LockOpenIcon className="w-5 md:w-6"/></span>
              </Link>

              <Link href="/auth/sign_up" className="flex justify-start gap-2 bg-gray-100 hover:bg-gray-200 
                py-2 px-6 text-gray-700 text-lg font-semibold">
                <span>SignUp</span>  
                <span className="font-bold"><ArrowRightIcon className="w-5 md:w-6"/></span>
              </Link>

            </div>
          </div>

        </div>
      </main>
      <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
        <a className="flex" href="#" target="_blank" rel="noopener noreferrer">
          Developer</a>
        <a className="flex" href="#" target="_blank" rel="noopener noreferrer">Backend docs</a>
      </footer>
    </div>
  );
}
