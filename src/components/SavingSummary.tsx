import React, { useEffect, useState, useRef } from 'react';
import { useAnimation, motion, useInView } from "framer-motion";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {useQuery} from 'react-query'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';



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
                
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getGoals()
    }, [savingRef])

     // function to get revenues data from firestore
     const getGoals = async () => {
      try {
        const data = await getDocs(savingRef);
        return data.docs.map((doc) => ({
          ...doc.data(),
        }));
      } catch (err) {
        throw new Error('Failed to fetch card list');
      }
    };

useQuery('getGoals', getGoals, {
      refetchOnWindowFocus: false, 
      onSuccess: (fetchedData) => {
          setData(fetchedData)
      }
    });

const CustomYAxisTick = (props :any) => {
    const { x, y, payload } = props;
    const formattedValue = `$${payload.value}k`;
    return (
      <text x={x} y={y} dy={-16} fill="#9F9F9F" fontSize={14} textAnchor="end">
        {formattedValue}
      </text>
    );
  };

  // const customYAxisTicks = [ 2000, 4000, 6000];

  const controls = useAnimation();
  const ref = useRef(null)
  const inView = useInView(ref)

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
    else {
      controls.start("hidden");
    }
    
  }, [controls, inView]);

  return (
    <motion.div 
    ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {opacity: 0, x: 75},
        visible: {opacity: 1, x: 0},
      }}
      transition={{ duration: 1 }}
    className='lg:w-[66%] flex-auto '>
        <ResponsiveContainer height={232}    className=' mt-10 bg-[#FFF] px-6 pt-6 rounded-lg '>
        <AreaChart title='Saving Summary' className='w-full'
      // width= {712}
      // height={180}
      
      data={data}
      margin={{
        top: 10,
        right: 60,
        left: 0,
        bottom: 25
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
            <tspan className='pb-4 font-bold text-secondary  hidden lg:flex'>Saving Summary </tspan>
        </text>
    </AreaChart>
    </ResponsiveContainer>
    </motion.div>
    
  )
}

export default SavingSummary