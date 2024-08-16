// JSX file for the summary chart

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './App.css';
import { Line } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);  

function SummaryChart({amountsArray, datesArray, currencyFormat}) {  
    
    // Variables

    const data = {
        labels: datesArray,
        datasets: [
            {
                label: "Balance",
                data: amountsArray,
                fill: true,
                backgroundColor: "rgb(77, 121, 255, 0.5)",
                borderColor: "rgb(51, 102, 255)",
                borderWidth: 3,
                tension: 0.4
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
              position: 'top'
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                   return `${tooltipItem.dataset.label}: ${currencyFormat}${tooltipItem.raw}`;
                }
              }
            }
          },
          scales: {
            x: {
              title: {
                display: true,
                text: "Date"
              }
            },
            y: {
              title: {
                display: true,
                text: "Balance"
              },
              beginAtZero: true
            }
        }
    };


    // Returning
    return (
      <>

        {/* Chart */}
        <Line data = {data} options = {options}/>

      </>
    )
}
  
export default SummaryChart