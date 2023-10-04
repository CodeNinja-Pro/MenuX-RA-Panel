import React from 'react'
import Chart from 'react-apexcharts'

const Donut = props => {
  return (
    <div className='donut'>
      <Chart
        options={props.options}
        series={props.series}
        type='donut'
        // width='500'
      />
    </div>
  )
}

export default Donut
