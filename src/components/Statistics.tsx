import React, {useState, useEffect, useRef} from 'react'
import { useAnimation, motion, useInView } from "framer-motion";

import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';

  import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

const Statistics = () => {
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

    const [stats, setStats] = useState([{day: "", thisWeek: 0, lastWeek: 0}])
    const statsRef = collection(db, "statistics")

    const localStorageKey = 'statsData'

    // function to get data from firestore
    useEffect(() => {
      const getStats = async () => {
        try {
          const data = await getDocs(statsRef);
          const statsData = data.docs.map((doc) => ({
            day: doc.data().day,
            thisWeek: doc.data().thisWeek,
            lastWeek: doc.data().lastWeek,
          }));
  
          // Update the stats state only when necessary
          if (JSON.stringify(statsData) !== JSON.stringify(stats)) {
            setStats(statsData);
            // Cache data in localStorage
            localStorage.setItem(localStorageKey, JSON.stringify(statsData));
          }
        } catch (err) {
          console.error(err);
        }
      };
  
      getStats();
    }, [statsRef, stats]);
    

    const dayLabel = stats.map((stat) => stat.day)
    const thisWeekData = stats.map((stat) => stat.thisWeek)
    const lastWeekData = stats.map((stat) => stat.lastWeek)

     const options = {
      maintainAspectRatio: false,
      responsive: true,
      plugins: {
        legend: {
          position: 'top' as const,
          
        },
        title: {
          display: false,
          text: 'Weekly Comparison',
        },
        
      },
      // maintainAspectRatio: false,
      backgroundColor: 'white',
      scales: {
        y: {
          beginAtZero: true, 
          max: 200, 
          stepSize: 50, 
          ticks: {
            callback: function (value: any) {
              return '$' + value + 'k';
            },
          },
        }
      },
    };
    
    const labels = dayLabel
    
     const data = {
      labels,
      datasets: [

        {
          label: 'lastWeek',
          data: lastWeekData,
          backgroundColor: '#E8E8E8', 
          borderColor: '#E8E8E8', 
          borderWidth: 1,
          barThickness: 16
        },

        {
          label: 'thisWeek',
        data: thisWeekData,
        backgroundColor: '#299D91', 
        borderColor: '3299D91', 
        borderWidth: 1,
        barThickness: 16
      },

      
      ]

    };
    
  return (
    <motion.div 
    ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        hidden: {opacity: 0, y: 75},
        visible: {opacity: 1, y: 0},
      }}
      transition={{ duration: 1 }}
    className='mt-2 w-full h-[258px] bg-[#FFF] px-6 pt-4 pb-10  rounded-lg'>

        <Bar options={options} data={data}  />
    </motion.div>
  )
}


export default Statistics 