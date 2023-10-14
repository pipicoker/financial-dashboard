import React from 'react';
// import { Chart as ChartJS, ArcElement, Tooltip, Legend, Chart } from 'chart.js';
import { Chart, ArcElement } from "chart.js";

import { Doughnut } from 'react-chartjs-2';

// ChartJS.register(ArcElement, Tooltip, Legend);
Chart.register(ArcElement);


const GaugeChart = () => {

  // const data = {
  //   labels: [
  //     'Red',
  //     'Blue',
  //   ],
  //   datasets: [{
  //     label: 'Goals',
  //     data: [20000, 12500],
  //     backgroundColor: [
  //       '#299D91',
  //       '#E8E8E8',
  //     ],
  //     circumference: 180,
  //     rotation: 270,
  //     borderWidth: 1,
          
  //   }]

  // };

  const speed = 75;

  const chartData = {
    datasets: [
      {
        data: [20000, 12500],
        backgroundColor: [
                '#299D91',
                '#E8E8E8',
              ],
        borderWidth: 1,
        borderRadius: [20]
      }
    ]
  };
  
  const options = {
    circumference: 180,
    rotation: -90,
    cutout: "90%",
    responsive: true,
    maintainAspectRatio: true,
    aspectRatio: 1.5,
    animation: {
      animateRotate: true
      // onComplete: function (chart: Chart, easing : ) {}
    },
    plugins: {
      legend: { display: false },
      tooltip: { enabled: false }
    }
  };
  
  const guageNeedle = {
    id: "guageNeedle",
    afterDatasetsDraw: (chart: any) => {
      const {
        ctx,
        chartArea: { width }
      } = chart;
      ctx.save();
  
      const angle = Math.PI + (1 / 100) * speed * Math.PI;
  
      const cx = width / 2;
      const cy = chart._metasets[0].data[0].y;
  
      ctx.translate(cx, cy);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.moveTo(0, -3);
      ctx.lineTo(cx, 0);
      ctx.lineTo(0, 3);
      ctx.fillStyle = '#299D91';
      ctx.fill();
      ctx.rotate(-angle);
  
      ctx.translate(-cx, -cy);
      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, 10);
      ctx.fill();
      ctx.restore();
    }
  };
  
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
  
  const speedLabel = {
    id: "speedLabel",
    afterDatasetsDraw: (chart: any) => {
      const { ctx } = chart;
  
      var data = chart._metasets[0].data[0];
      var centerX = data.x;
      var centerY = data.y;
  
      ctx.fillStyle = "#299D91";
      ctx.font = `bolder 1.5em roboto`;
      ctx.textAlign = "center";
      ctx.fillText(speed, centerX, centerY + 24);
    }
  };
  
  const labels = {
    id: "labels",
    afterDatasetsDraw: (chart: any) => {
      const {
        ctx,
        chartArea: { width }
      } = chart;
      ctx.save();
      const cy = chart._metasets[0].data[0].y;
  
      ctx.fillStyle = "rgb(144, 144, 144)";
      ctx.font = `bolder 1em roboto`;
      ctx.textAlign = "center";
      ctx.fillText(0, 10, cy + 15);
      ctx.fillText(20000, width - 20, cy + 15);
    }
  };
  
  return (
    <div className='-mt-12'>
      {/* <Doughnut data={data}  options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}/> */}

<Doughnut
        plugins={[speedLabel, guageNeedle, labels]}
        data={chartData}
        options={options}
      />
    </div>
  )
}

export default GaugeChart