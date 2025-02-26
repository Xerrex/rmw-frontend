import React from 'react';
import Link from 'next/link';
import { RocketLaunchIcon, ArrowPathIcon, RectangleStackIcon } from '@heroicons/react/24/outline';

const links= [
  { name: 'All rides', href: '#', icon: RectangleStackIcon },
  { name: 'Rides offered', href: '#', icon: RocketLaunchIcon },
  { name: 'Ride requests', href: '#', icon: ArrowPathIcon },
]

function Sidenav() {
  return (
    <div className="bg-primaryColorAlt w-64 mr-2 p-2 h-screen overflow-hidden text-white flex flex-col">
      <div className="p-4 text-lg font-semibold border-b border-white">Ride my way</div>
      
        {/* Menu Items */}
        <div id="menu" className="flex-1 mt-10 p-2">
            {links.map((link)=>{
              const LinkIcon = link.icon;
              return(
                <Link className="flex gap-2 mb-1 p-2 hover:bg-gray-700 rounded transition duration-200 font-medium"
                  key={link.name} href={link.href}>
                 <LinkIcon className="w-6" />
                 <p className="hidden md:block">{link.name}</p>
                </Link>
              )
            })}
        </div>
      
        {/* Logout Button */}
        <div className="p-4 border-t border-gray-700">
          <button className="w-full p-2 bg-red-700 text-white rounded hover:bg-red-900 transition duration-200">
            Logout
          </button>
        </div>
    </div>
  )
}

export default Sidenav;