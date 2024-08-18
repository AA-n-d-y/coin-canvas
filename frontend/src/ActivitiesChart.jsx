// JSX file for the activities chart

import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Radar } from 'react-chartjs-2';
import { 
    Chart as ChartJS,
    RadialLinearScale,
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
    RadialLinearScale,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    Filler
);  

function ActivitiesChart({activitiesAmountsArray, activitiesArray, currencyFormat}) {  
    
    // Variables

    const maxLength = 10;
    activitiesArray = activitiesArray.map(label =>
        label.length > maxLength ? `${label.substring(0, maxLength)}...` : label
    );

    const data = {
        labels: activitiesArray,
        datasets: [
            {
                label: "Amount",
                data: activitiesAmountsArray,
                fill: true,
                backgroundColor: "rgb(128, 128, 255, 0.5)",
                borderColor: "rgb(77, 77, 255)",
                pointBackgroundColor: "black",
                pointBorderColor: "rgb(77, 77, 255)",
                pointHoverBackgroundColor: "white",
                pointHoverBorderColor: "rgb(77, 77, 255)",
                borderWidth: 3,
                tension: 0.4
            }
        ]
    };

    const options = {
        plugins: {
            legend: {
              position: "top"
            },
            tooltip: {
              callbacks: {
                label: function (tooltipItem) {
                   return `${tooltipItem.dataset.label}: ${currencyFormat}${tooltipItem.raw}`;
                }
              }
            }
        }
    };


    // Returning
    return (
      <>

        {/* Chart */}
        <Radar data = {data} options = {options}/>

      </>
    )
}
  
export default ActivitiesChart