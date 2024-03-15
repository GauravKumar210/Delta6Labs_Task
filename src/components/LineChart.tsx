import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
 
interface LineChartData {
  data?: number[];
  change:number;
}
 
interface LineChartProps {
  data: LineChartData;
}
 
const LineChart: React.FC<LineChartProps> = ({ data }) => {
  const { change } = data;
  const chartRef = useRef<HTMLCanvasElement | null>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
 
  useEffect(() => {
    const ctx = chartRef.current;
 
    if (!ctx || !data.data) return;
 
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }
 
    chartInstanceRef.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: Array.from({ length: data.data.length }, (_, i) => i + 1), // Fixed labels
        datasets: [{
          label: '',
          data: data.data,
          backgroundColor: 'transparent',
          borderColor: change >= 1 ? 'green' : 'red', // Set borderColor conditionally
          pointBorderColor: 'transparent',
          pointBorderWidth: 1,
          tension: 0.5,
            pointRadius: 0,
            pointHoverRadius: 0,
        }]
      }
      ,
      options: {
        
        plugins: {
          
          legend: {
            display: false
          }
        },
        scales: {
          x: {
            display: false
          },
          y: {
            display: false
          }
        },
        responsive: true, // Disable responsiveness
        maintainAspectRatio: true, // Disable aspect ratio
      }
    });
 
    return () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
      }
    };
  }, [data]);
 
  return (
    <div style={{ height: '100px', transition: "all .3s" }}>
      <canvas ref={chartRef}></canvas>
    </div>
  );
};
 
export default LineChart;
 