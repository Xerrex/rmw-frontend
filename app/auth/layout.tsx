import Link from "next/link";
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function AuthLayout({children,}: Readonly<{children: React.ReactNode;}>){

    return (
        <div className="flex flex-col">
          <div className="mt-2 ml-2">
            <Link href="/" className="flex w-40 justify-start gap-2 bg-primaryColor hover:bg-primaryColorHover
              py-2 px-6 rounded text-white text-sm font-semibold">
              <span>Go back</span>
              <span className="order-first font-bold"><ArrowLeftIcon className="w-5 md:w-6"/> </span>
            </Link>
          </div>
          
          <div className="mt-2">
            {children}
          </div>
          
        </div>
    )
}