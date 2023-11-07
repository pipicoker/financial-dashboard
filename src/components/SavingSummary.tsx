import React, { PureComponent, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { $CombinedState } from 'redux';

interface FirestoreDocument {
    day: string;
    thisWeek: number;
    lastWeek: number;
    // Add other properties if necessary
  }

const SavingSummary = () => {

    const [data, setData] = useState<any[]>([])
    const savingRef = collection(db, "savingSummary")

    // function to get data from firestore
    useEffect(() => {
        const getGoals = async () => {

            try{
                const data =  await getDocs(savingRef)
                const filteredData = data.docs.map((doc) => ({
                    ...doc.data()
                }))
                setData(filteredData)
                console.log(filteredData);
                
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getGoals()
    }, [])

// const data = [
//   {
//     name: 'Page A',
//     uv: 4000,
//     pv: 2400,
//     amt: 2400,
//   },
//   {
//     name: 'Page B',
//     uv: 3000,
//     pv: 1398,
//     amt: 2210,
//   },
//   {
//     name: 'Page C',
//     uv: 2000,
//     pv: 9800,
//     amt: 2290,
//   },
//   {
//     name: 'Page D',
//     uv: 2780,
//     pv: 3908,
//     amt: 2000,
//   },
//   {
//     name: 'Page E',
//     uv: 1890,
//     pv: 4800,
//     amt: 2181,
//   },
//   {
//     name: 'Page F',
//     uv: 2390,
//     pv: 3800,
//     amt: 2500,
//   },
//   {
//     name: 'Page G',
//     uv: 3490,
//     pv: 4300,
//     amt: 2100,
//   },
// ];

const CustomYAxisTick = (props :any) => {
    const { x, y, payload } = props;
    const formattedValue = `$${payload.value}k`;
    return (
      <text x={x} y={y} dy={-16} fill="#9F9F9F" fontSize={14} textAnchor="end">
        {formattedValue}
      </text>
    );
  };

  const customYAxisTicks = [ 2000, 4000, 6000];

  return (
    <div className='w-full h-[232px] mt-10 bg-[#FFF] px-6 pt-6 '>
        <AreaChart title='Saving Summary'
      width= {712}
      height={180}
      
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      
      <YAxis tick={<CustomYAxisTick />}  />
      <Tooltip />
      <Legend layout="horizontal" verticalAlign="top" align="right" wrapperStyle={{top: 0, }}/>
      <Area
        type="monotone"
        dataKey="thisWeek"
        stackId="1"
        stroke="#299D91"
        strokeWidth={1.5}
        fill="#299D91"
      />
      <Area
        type="monotone"
        dataKey="lastWeek"
        stackId="1"
        stroke="#D1D1D1"
        strokeWidth={2}
        fill="#FFF"
      />
      <text  x={500 / 7} y={10} textAnchor="middle" dominantBaseline="central">
            <tspan className='pb-4 font-bold text-secondary  '>Saving Summary </tspan>
        </text>
    </AreaChart>
    </div>
  )
}

export default SavingSummary