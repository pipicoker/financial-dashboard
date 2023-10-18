import React, {useState, useEffect} from 'react'
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

    const [stats, setStats] = useState([{day: "", thisWeek: 0, lastWeek: 0}])

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
                
              } catch (err) {
                console.error(err);
                
            }
            
        }
        getStats()
    }, [])

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
    <div className=''>
        
        <h3 className=' text-[22px] text-gray02 text-left'>Statistics</h3>

        <div className='w-[728px] h-[258px] bg-[#FFF] px-6 pt-4 pb-10 mt-2 rounded-lg'>
        <Bar options={options} data={data}  />
        </div>
        

        
    </div>
  )
}


export default Statistics 