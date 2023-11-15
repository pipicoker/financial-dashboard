import React, { useEffect, useRef} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { selectPresentAmount, selectTargetAmount,} from '../redux/goalsFormSlice'

import { Chart, ArcElement } from "chart.js";

import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);


const GaugeChart = () => {
  const targetAmount = useSelector(selectTargetAmount)
    const presentAmount = useSelector(selectPresentAmount)

  // const [goals, setGoals] = useState<any[]>([]);
// console.log(goals);

    const goalsRef = collection(db, "goals")
    const speedRef = useRef(0);
    const targetRef = useRef(0);

    //function to get data from firestore
    useEffect(() => {
        const getGoals = async () => {

            try{
                const data =  await getDocs(goalsRef)
                const filteredData = data.docs.map((doc) => ({
                  id: doc.id, 
                  target: doc.data().target, 
                  targetAchieved: doc.data().targetAchieved
                }))
                // setGoals(filteredData)

                const speed = filteredData.reduce((total, goal) => total + goal.targetAchieved, 0);
                speedRef.current = speed;

                const target = filteredData.reduce((total, goal) => total + goal.target, 0);
                targetRef.current = target;
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getGoals()
    }, [goalsRef])
  
  

    const userTarget = (targetAmount !== undefined && targetAmount !== "") ? Number(targetAmount) : targetRef.current;
    const userTargetAchieved = (presentAmount !== undefined && presentAmount !== "") ? Number(presentAmount) :speedRef.current;
    

    const log = () => {
      console.log('targetRef.current:', targetRef.current);
      console.log('speedRef.current:', speedRef.current);
    }
    
    
    const data = {
    labels: [
      'Target Achieved',
      'Target',
    ],
    datasets: [{
      label: 'Goals',
      data: [ userTargetAchieved, userTarget],
      backgroundColor: [
        '#299D91',
        '#E8E8E8',
      ],
      circumference: 180,
      rotation: 270,
      borderWidth: 1,
    }]

  };
  
  const speedLabel = {
    id: "speedLabel",
    afterDatasetsDraw: (chart: any) => {
      const { ctx } = chart;
  
      var data = chart._metasets[0].data[0];
      var centerX = data.x;
      var centerY = data.y;
  
      ctx.fillStyle = "#191919";
      ctx.font = `16px`;
      ctx.textAlign = "center";

    
        const speed = (presentAmount !== undefined && presentAmount !== "") ? Number(presentAmount) : speedRef.current;
 
      
    const formattedSpeed = formatSpeed(speed); // Format the speed value

    ctx.fillText(formattedSpeed, centerX, centerY);

    }
  };

  // Function to format the speed value
function formatSpeed(speed: number) {
  if (speed >= 1000) {
    return (speed / 1000).toFixed(1) + "k"; // Format as "X.Xk" for values over 1000
  } else {
    return speed.toString();
  }
}
  
  const labels = {
    id: "labels",
    afterDatasetsDraw: (chart: any) => {
      const {
        ctx,
        chartArea: { width }
      } = chart;
      ctx.save();
      const cy = chart._metasets[0].data[0].y;
  
      ctx.fillStyle = "#D1D1D1";
      ctx.font = `12px`;
      ctx.textAlign = "center";
      ctx.fillText("$0", 10, cy + 15);

      const target = (targetAmount !== undefined && targetAmount !== "") ? Number(targetAmount) : targetRef.current;
    const formattedtarget = formatTarget(target); // Format the speed value
      ctx.fillText(formattedtarget, width - 20, cy + 15);
    }
  };

  //format the target value
  function formatTarget(target: number) {
    if (target >= 1000) {
      return (target / 1000).toFixed(1) + "k"; // Format as "X.Xk" for values over 1000
    } else {
      return target.toString();
    }
  }
  
  
  return (
    <div className='-mt-14'>
      <Doughnut data={data}  options={{
          plugins: {
            legend: {
              display: false,
            }, 
          },
        }} plugins={[labels, speedLabel]}>

      </Doughnut>

      <p className='text-xs font-medium text-defaultBlack' onClick={log}>Target vs Achievement</p>

   {/* <Doughnut plugins={[speedLabel, guageNeedle, labels]}
        data={chartData}
        options={options}>

   </Doughnut> */}

    </div>
  )
}

export default GaugeChart
