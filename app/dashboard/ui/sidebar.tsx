import React from 'react';

export default function Sidebar() {
  
  return (
    <aside className="hidden md:block lg:block bg-green-200/50 backdrop-blur-md h-full">
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-4 text-green-800">Sidebar</h2>
        <ul>
          <li className="mb-2">
            <a href="#" className="text-green-600 hover:text-green-800">Link 1</a>
          </li>
          <li className="mb-2">
            <a href="#" className="text-green-600 hover:text-green-800">Link 2</a>
          </li>
          {/* Add more links as needed */}
        </ul>
      </div>
    </aside>
  );
}