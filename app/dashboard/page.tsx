'use client';
import React from 'react';
import Sidebar from '@/app/dashboard/ui/sidebar';
import Navbar from '@/app/dashboard/ui/navbar';

export default function DashBoard() {
  return (
    <div className="flex h-screen bg-slate-100">
      <div className="w-1/5 mr-2">
        <Sidebar />
      </div>
      <div className="w-4/5">
        <div className="bg-white mt-2 mr-2 w-9/12">
          <Navbar/>
        </div>

        <div className="bg-black mt-40 mr-2 text-white w-full">
          Content
        </div>
      </div>
    </div>
  );
}
