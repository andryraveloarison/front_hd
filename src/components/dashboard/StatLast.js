import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { reportService } from '../../_services';
import { useQuery } from 'react-query';


const StatLast = () => {
  const canvasRef = useRef(null);
  let chartInstance = null;

  const { Loading, Error, data: statLast = [],error } = useQuery('statLast', () =>
  reportService.getStatLast().then((res) => res.data)
);


  useEffect(() => {

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        x: {
          beginAtZero: true,
          position: 'bottom', 
        },
        y: {
          beginAtZero: true,
        },
      },
    };

    const data = {
      labels: statLast.date,

      datasets: [
        {
          label: 'Ticket creer',
          data: statLast.nouveauCount,
          backgroundColor: 'rgba(63, 81, 181, 0.5)',
          borderColor: 'rgba(63, 81, 181, 1)', // Couleur de la bordure de la courbe
          fill: false, // Désactiver le remplissage sous la courbe
        },
        {
          label: 'Ticket Resolu',
          data: statLast.resoluCount,
          backgroundColor: 'rgba(77, 182, 172, 0.5)',
          borderColor: 'rgba(77, 182, 172, 1)',
          fill: false,
        },
        {
          label: 'Ticket non resolu',
          data: statLast.nonResoluCount,
          backgroundColor: 'rgba(156, 39, 176, 0.5)',
          borderColor: 'rgba(156, 39, 176, 1)',
          fill: false,
        },
      ],
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    chartInstance = new Chart(ctx, {
      type: 'line',
      data: data,
      options: chartOptions,
    });

    return () => {
      chartInstance.destroy();
    };
  
  }, [statLast]);

  if (Loading) {
    return <div>Loading...</div>;
  }
  if (Error) {
    return <div>{error}</div>;

  }

  
  return (

    
    <div className="chart-container" style={{ height: '400px' }}>
      <p className='text-xl '>30 dernier jours</p>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default StatLast;
