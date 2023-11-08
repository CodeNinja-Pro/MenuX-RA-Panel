import Chart from 'chart.js'
import { chartOptions, parseOptions } from '../variables/charts.js'

import Dashboard from './Dashboard.js'

const Index = () => {
  if (window.Chart) {
    parseOptions(Chart, chartOptions())
  }

  return (
    <>
      <Dashboard />
    </>
  )
}

export default Index
