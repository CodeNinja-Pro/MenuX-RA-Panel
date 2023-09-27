import React from 'react'
import Bar from 'react-apexcharts'

const BarChart = props => {
  return (
    <div id='chart' className='py-2'>
      <Bar
        options={props.options}
        series={props.series}
        type='bar'
        width='100%'
        height={450}
      />
    </div>
  )
}

export default BarChart
