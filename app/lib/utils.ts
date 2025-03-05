import { MonthlyRidesData } from "./definitions";

export function generateYAxis(ridesData: MonthlyRidesData []){
  /**Generate Y axis labels
   * Based on the highest record and in 10s
   */
  const yAxisLabels = [];
  // Get the highest number
  const monthsHighest = ridesData.map(({rides})=>{
    return Math.max(...[rides.offered, rides.taken, rides.request_pending, rides.request_rejected])
  })
  const highestRecord = Math.max(...monthsHighest)
  const topLabel = Math.ceil(highestRecord / 10)* 10;

  for (let y =topLabel; y>=0; y-=10){
    yAxisLabels.push(`${y/10}`);
  }

  return {yAxisLabels, topLabel};
}
