import React, {useState, useEffect} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';

import {BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend
  } from "recharts";

  interface CustomYAxisTickProps {
    x: number;
    y: number;
    payload: {
      value: number | string; // Adjust this based on your data
    };
  }

const Statistics = () => {

    const [stats, setStats] = useState([{day: "", thisWeek: 0, lastWeek: 0}])

    // const [goals, setGoals] = useState<{ [x: string]: any }[]>([]);

    const statsRef = collection(db, "statistics")

    // function to get data from firestore
    useEffect(() => {
        const getStats = async () => {

            try {
                const data = await getDocs(statsRef);
                const statsData = data.docs.map((doc) => {
                  // Map Firestore data to the structure of your state
                  return {
                    day: doc.data().day, 
                    thisWeek: doc.data().thisWeek,
                    lastWeek: doc.data().lastWeek,
                  };
                });
        
                // Update the stats state with the fetched and mapped data
                setStats(statsData);
                console.log(stats);
                
              } catch (err) {
                console.error(err);
                
            }
            
        }
        getStats()
    }, [])

    const formatYAxisTick = (tickValue: number) => {
        if (tickValue === 0) return '$0';
        if (tickValue === 50) return '$50k';
        if (tickValue === 100) return '$100k';
        if (tickValue === 150) return '$150k';
        if (tickValue === 200) return '$200k';
    
        // If the tick value doesn't match any specific value, return it as is
        return String(tickValue);
      };

    
    
  return (
    <div className=''>
        
        <h3 className=' text-[22px] text-gray02 '>Statistics</h3>

        
        
        <BarChart
            width={680}
            height={164}
            data={stats}
             margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5 
            }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="day" />
      <YAxis 
      domain={[0,  250]}
      ticks={[ 0, 50, 100, 150, 200]}
      interval={0}
      tickFormatter={formatYAxisTick}
      className='my-4'
    //   tick={<CustomYAxisTick />}
       />
      <Tooltip />
      <Legend />
      <Bar dataKey="lastWeek" fill="#E8E8E8" width={16}   />
      <Bar dataKey="thisWeek" fill="#299D91" 
      />
        </BarChart>
    </div>
  )
}

const CustomYAxisTick = (props: any) => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={20} textAnchor="end" fill="#9F9F9F">
          {payload.value}
        </text>
      </g>
    );
  };

export default Statistics 