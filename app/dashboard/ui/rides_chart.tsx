import React from 'react';
import { CalendarIcon } from '@heroicons/react/24/outline';
import { MonthlyRidesData } from '@/app/lib/definitions';
import { generateYAxis } from '@/app/lib/utils';
import { inter } from '@/app/ui/fonts';


type PropType ={
  ridesData: MonthlyRidesData[];
}

function RidesChart({ridesData}: PropType) {

  const chartHeight = 350;
  const { yAxisLabels, topLabel } = generateYAxis(ridesData);
  
  if (!ridesData || ridesData.length === 0) {
    return <p className="mt-4 text-gray-400">No data available.</p>;
  }


  return (
    <div className="w-full md:col-span-4">
      <h2 className={`${inter.className} mb-4 text-xl md:text-2xl`}>Ride</h2>

      <div className="rounded-xl bg-gray-50 p-4">
        <div className="sm:grid-cols-13 mt-0 grid grid-cols-12 items-end gap-2 rounded-md bg-white p-4 md:gap-4">
          <div className="mb-6 hidden flex-col justify-between text-sm text-gray-400 
            sm:flex" style={{ height: `${chartHeight}px` }}>
            {yAxisLabels.map((label) => (<p key={label}>{label}</p>))}
          </div>

          {ridesData.map(({month, rides}) => (
            <div key={month} className="flex flex-col items-center gap-2">
              <div className="flex w-[90px]">
                <div className="w-[30px] rounded-md bg-green-300" style={{ height: `${(chartHeight / topLabel) * rides.offered}px`, }}></div>
                <div className="w-[30px] rounded-md bg-blue-300" style={{ height: `${(chartHeight / topLabel) * rides.taken}px`, }}></div>
                <div className="w-[30px] rounded-md bg-red-300" style={{ height: `${(chartHeight / topLabel) * rides.request_rejected}px`, }}></div>
              </div>
              <p className="-rotate-90 text-sm text-gray-400 sm:rotate-0">{month}</p>
            </div>
          ))}
        </div>
        <div className="flex items-center pb-2 pt-6">
          <CalendarIcon className="h-5 w-5 text-gray-500" />
          <h3 className="ml-2 text-sm text-gray-500 ">Last 12 months</h3>
        </div>
      </div>
    </div>
  )
}

export default RidesChart;