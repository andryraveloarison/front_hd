import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';
import { reportService } from '@/_services';
import { useQuery } from 'react-query';

const StatCurrent = () => {
  const canvasRef = useRef(null);
  let chartInstance = null;

  const { Loading, Error, data: statCurrent = [],error } = useQuery('statCurrent', () =>
  reportService.getStatCurrent().then((res) => res.data)
);

  useEffect(() => {
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
    };

    const data = {
      labels: ['Nouveau', 'En cours', 'en Attente', 'non Resolu'],
      datasets: [
        {
          label: 'Ticket',
          data: [statCurrent.nouveau,
                 statCurrent.encours,
                 statCurrent.enAttente,
                 statCurrent.nonResolu],
          backgroundColor: [
            'rgba(63, 81, 181, 0.5)',
            'rgba(77, 182, 172, 0.5)',
            'rgba(66, 133, 244, 0.5)',
            'rgba(233, 30, 99, 0.5)',
          ],
        },
      ],
    };

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    chartInstance = new Chart(ctx, {
      type: 'doughnut',
      data: data,
      options: chartOptions,
    });

    return () => {
      chartInstance.destroy();
    };
    // eslint-disable-next-line
  }, [statCurrent]);
  
  if (Loading) {
    return <div>Loading...</div>;
  }
  if (Error) {
    return <div>{error}</div>;

  }


  return (
    <div className="chart-container" style={{ height: '400px' }}>
      <canvas ref={canvasRef} className="mx-auto"></canvas>
      
    </div>
  );
};

export default StatCurrent;



