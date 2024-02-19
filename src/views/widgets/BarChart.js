import React from 'react'
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from  'chart.js'
import  { Bar } from 'react-chartjs-2'

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement
)

function BarChart() {

  var  data = {
        labels: ['Active', 'New', 'Pending', 'Converted', 'Blocked'],
        datasets: [{
          label: ' Customers',
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [

            '#dedede',
            '#a5d3ff',
            '#a5d3ff',
            '#a5d3ff',
            '#dedede'
          ],
          borderWidth: 1
        }]
      }
    var   options = {
        maintainAspectRatio:false,
        scales: {
          y: {
            beginAtZero: true
          }
        },
        legend:{
            labels :{
                fontSize:26
            }
        }
    }

  return (
    <div>
      <Bar
       data={data}
        height={270}
         options={options}
      />
    </div>
  )
}

export default BarChart
