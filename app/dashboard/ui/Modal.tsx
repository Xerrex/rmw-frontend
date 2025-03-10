import React from 'react';
import { ModalProps } from '@/app/lib/definitions';


const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      {/* Modal Container */}
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3 p-6">
        {/* Modal Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
              viewBox="0 0 24 24" stroke="currentColor" >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Modal Content */}
        <div className="mb-4">
          {children}
        </div>

        {/* Modal Footer (Optional) 
        <div className="flex justify-end">
          <button onClick={onClose} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600" >
            Close </button>
        </div>*/}
      </div>
    </div>
  );
};

export default Modal;