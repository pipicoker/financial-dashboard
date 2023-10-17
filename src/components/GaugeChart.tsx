import React, {useState, useEffect, useRef} from 'react'
import { db } from '../config/firebase'
import { getDocs, collection } from 'firebase/firestore';
import { Chart, ArcElement } from "chart.js";

import { Doughnut } from 'react-chartjs-2';

Chart.register(ArcElement);


const GaugeChart = () => {

  const [goals, setGoals] = useState<any[]>([]);

    const goalsRef = collection(db, "goals")
    const speedRef = useRef(0);
    const targetRef = useRef(0);

    // function to get data from firestore
    useEffect(() => {
        const getGoals = async () => {

            try{
                const data =  await getDocs(goalsRef)
                const filteredData = data.docs.map((doc) => ({
                  id: doc.id, 
                  target: doc.data().target, 
                  targetAchieved: doc.data().targetAchieved
                }))
                setGoals(filteredData)

                const speed = filteredData.reduce((total, goal) => total + goal.targetAchieved, 0);
                speedRef.current = speed;

                const target = filteredData.reduce((total, goal) => total + goal.target, 0);
                targetRef.current = target;
                
            } catch (err) {
                console.error(err);
                
            }
            
        }
        getGoals()
    }, [])
  
    const data = {
    labels: [
      'Red',
      'Blue',
    ],
    datasets: [{
      label: 'Goals',
      data: [20000, 12500],
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

      const speed = speedRef.current;
    const formattedSpeed = formatSpeed(speed); // Format the speed value

    ctx.fillText(formattedSpeed, centerX, centerY);

    }
  };

  // Function to format the speed value
function formatSpeed(speed: any) {
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

      const target = targetRef.current;
    const formattedtarget = formatTarget(target); // Format the speed value

      ctx.fillText(formattedtarget, width - 20, cy + 15);
    }
  };

  //format the target value
  function formatTarget(target: any) {
    if (target >= 1000) {
      return (target / 1000).toFixed(1) + "k"; // Format as "X.Xk" for values over 1000
    } else {
      return target.toString();
    }
  }

  // const chartData = {
  //   datasets: [
  //     {
  //       data: [12500, 20000],
  //       backgroundColor: [
  //               '#299D91',
  //               '#E8E8E8',
  //             ],
  //       borderWidth: 1,
  //       borderRadius: [20]
  //     }
  //   ]
  // };
  
  // const options = {
  //   circumference: 180,
  //   rotation: -90,
  //   cutout: "90%",
  //   responsive: true,
  //   maintainAspectRatio: true,
  //   aspectRatio: 1.5,
  //   animation: {
  //     animateRotate: true
  //     // onComplete: function (chart: Chart, easing : ) {}
  //   },
  //   plugins: {
  //     legend: { display: false },
  //     tooltip: { enabled: false }
  //   }
  // };
  
  // const guageNeedle = {
  //   id: "guageNeedle",
  //   afterDatasetsDraw: (chart: any) => {
  //     const {
  //       ctx,
  //       chartArea: { width }
  //     } = chart;
  //     ctx.save();
  
  //     const angle = Math.PI + (1 / 100) * speed * Math.PI;
  
  //     const cx = width / 2;
  //     const cy = chart._metasets[0].data[0].y;
  
  //     ctx.translate(cx, cy);
  //     ctx.rotate(angle);
  //     ctx.beginPath();
  //     ctx.moveTo(0, -3);
  //     ctx.lineTo(cx, 0);
  //     ctx.lineTo(0, 3);
  //     ctx.fillStyle = '#299D91';
  //     ctx.fill();
  //     ctx.rotate(-angle);
  
  //     ctx.translate(-cx, -cy);
  //     ctx.beginPath();
  //     ctx.arc(cx, cy, 5, 0, 10);
  //     ctx.fill();
  //     ctx.restore();
  //   }
  // };
  
  
  
  // const pointer = {
  //   id: "pointer",
  //   afterDatasetsDraw: (chart: any) => {
  //     const { ctx } = chart;
  
  //     var data = chart._metasets[0].data[0];
  
  //     var radius = data.innerRadius + (data.outerRadius - data.innerRadius) / 2;
  
  //     var centerX = data.x;
  //     var centerY = data.y;
  
  //     const angle = Math.PI * (speed / 100) + Math.PI;
  
  //     var x = centerX + radius * Math.cos(angle);
  //     var y = centerY + radius * Math.sin(angle);
  
  //     ctx.save();
  
  //     ctx.beginPath();
  //     ctx.lineWidth = 6;
  //     ctx.arc(x, y, 12, 0, 2 * Math.PI);
  //     ctx.stroke();
  
  //     ctx.restore();
  //   }
  // };
  
  
  
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

      <p className='text-xs font-medium text-defaultBlack'>Target vs Achievement</p>

   {/* <Doughnut plugins={[speedLabel, guageNeedle, labels]}
        data={chartData}
        options={options}>

   </Doughnut> */}

    </div>
  )
}

export default GaugeChart