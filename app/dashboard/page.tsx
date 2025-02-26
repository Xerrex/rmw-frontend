import React from 'react';
import Sidenav from './ui/sidenav';
import Navbar from './ui/navbar';

export default function DashBoard() {
  return (
    <div className="flex bg-slate-200">
      <Sidenav/>

      <div className="flex-1 flex flex-col">
        <Navbar/>
        <div>content</div>
      </div>
    </div>
  );
}
