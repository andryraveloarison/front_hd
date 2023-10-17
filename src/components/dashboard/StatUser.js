import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { reportService } from '../../_services';
import { useQuery } from 'react-query';

const StatUser = () => {
  const canvasRef = useRef(null);
  let chartInstance = null;


  const { Loading, Error, data: statUser = [],error } = useQuery('statUser', () =>
  reportService.getStatUser().then((res) => res.data)
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
      labels: statUser.tech,
      datasets: [
        {
          label: 'Ticket Assigne',
          data: statUser.assigneCount,
          backgroundColor: 'rgba(63, 81, 181, 0.5)',
          barPercentage: 0.7, // Ajuster la largeur des barres
          categoryPercentage: 0.4, // Ajuster la largeur des groupes de barres
        },
        {
          label: 'Ticket resolu',
          data: statUser.resoluCount,
          backgroundColor: 'rgba(77, 182, 172, 0.5)',
          barPercentage: 0.7,
          categoryPercentage: 0.4,
        },
        {
          label: 'Ticket en Cours',
          data: statUser.enCoursCount,
          backgroundColor: 'rgba(156, 39, 176, 0.5)',
          barPercentage: 0.7,
          categoryPercentage: 0.4,
        },
      ],
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    chartInstance = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: chartOptions,
    });

    return () => {
      chartInstance.destroy();
    };
  }, [statUser]);


  if (Loading) {
    return <div>Loading...</div>;
  }
  if (Error) {
    return <div>{error}</div>;
  }

  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <p className='text-xl'>Performance des techniciens</p>
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};

export default StatUser;


