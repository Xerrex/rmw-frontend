import React from "react";
import { BellIcon } from '@heroicons/react/24/outline';

function Navbar() {
  const unreadNotifications = 3;
  return (
    <div className="bg-white shadow-sm p-4 flex items-center justify-between mt-2 mx-auto w-11/12">
      <h1 className="text-xl font-semibold text-black">Dashboard</h1>
      <div className="relative">
        <BellIcon className="h-6 w-6 text-gray-700 cursor-pointer" />
        {/* Notification Badge */}
        {unreadNotifications > 0 && (
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">
            {unreadNotifications}
          </div>
        )}
      </div>
    </div>
  );
}

export default Navbar;
