import React from 'react'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from  'chart.js'
import  { Doughnut } from 'react-chartjs-2'

ChartJS.register(
    Tooltip,
    Legend,
    ArcElement
)

function DougnutChart() {

  var  data = {
        labels: ['New', 'Pending', 'Active'],
        datasets: [{
          label: '# of Votes',
          data: [12, 19, 3],
          backgroundColor: [

            '#dedede',
            '#a5d3ff',
            '#a5d3ff',

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
      <Doughnut
       data={data}
        height={200}
         options={options}
      />
    </div>
  )
}

export default DougnutChart
