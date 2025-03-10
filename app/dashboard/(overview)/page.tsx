import React from 'react';
import { OverViewCards } from '../ui/Cards';
import RidesChart from '../ui/rides_chart';
import { getRidesDataTotals, getRidesDataLast12months } from '@/app/lib/data';


export default async function DashBoard() {

  const cardsData = await getRidesDataTotals();
  const ridesData = await getRidesDataLast12months();

  return (
    <main>
      <OverViewCards cardsData={cardsData}/>
      <RidesChart ridesData={ridesData} />
    </main>
  );
}
