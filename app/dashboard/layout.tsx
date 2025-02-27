"use client"
import React, { useState } from "react";
import Sidenav from "./ui/sidenav";
import Navbar from "./ui/navbar";


export default function DashboardLayout({children}: {children: React.ReactNode}){
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const unreadNotifications = 3;

  const notifications = [
    { id: 1, text: 'You have a new message', read: false },
    { id: 2, text: 'Your order has been shipped', read: true },
    { id: 3, text: 'Reminder: Meeting at 3 PM', read: false },
    { id: 4, text: 'Reminder: Meeting at 10 PM', read: false },
  ];


  return(
    <div className="flex bg-slate-200">
      <Sidenav/>
      <div className="flex-1 flex flex-col">
        <Navbar unreadNotifications={unreadNotifications}  isNotificationOpen={isNotificationOpen} 
        setIsNotificationOpen={setIsNotificationOpen}/>

        {/* Notification Dropdown */}
        {isNotificationOpen && (
          <div className="absolute right-4 top-20 z-10 mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg">
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2 text-black">Notifications</h3>
              <ul>
                {notifications.map((notification) => (
                  <li key={notification.id} className={`p-2 ${!notification.read ? 'font-bold' : ''}`}>
                    <p className="text-sm text-gray-700">{notification.text}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        <div className="flex-1 p-4">{children}</div>
      </div>
    </div>
  )
}