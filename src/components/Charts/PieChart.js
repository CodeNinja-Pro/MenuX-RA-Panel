import React, { useState } from 'react'
import ReactApexChart from 'react-apexcharts'

const PieChart = ({ chartOptions, chartSeries, type }) => {
  return (
    <ReactApexChart
      options={chartOptions}
      series={chartSeries}
      type={type}
      height={500}
    />
  )
}

export default PieChart
