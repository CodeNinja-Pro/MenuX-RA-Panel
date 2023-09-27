import React from 'react'
import Chart from 'react-apexcharts'

const LineChart = ({ options, series }) => {
  return (
    <div className='line-chart py-2'>
      <Chart options={options} series={series} type='line' height={'100%'} />
    </div>
  )
}

export default LineChart
