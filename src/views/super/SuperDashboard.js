import React, { useEffect, useState } from 'react'
import { ThemeMain } from '../../components/common/Theme'
import OnlyHeader from '../../components/Headers/OnlyHeader'
import {
  Box,
  Card,
  ThemeProvider,
  Typography,
  CardContent,
  Grid,
  Paper
} from '@mui/material'
import { Container } from 'reactstrap'

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts'
import SuperUser from '../../assets/common/dashboard/SuperUser.png'
import SuperHand from '../../assets/common/dashboard/SuperHand.png'
import SuperChart from '../../assets/common/dashboard/SuperChart.png'
import SuperHome from '../../assets/common/dashboard/SuperHome.png'
import SuperDollar from '../../assets/common/dashboard/SuperDollar.png'

// Image load
import DashboardStatisticItem from '../common/DashboardStatisticItem'
import DonutChart from '../common/DonutChart'
import SidebarDonut from '../common/SidebarDonut'

// Chart load
import BarChartForm from '../../components/Charts/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import { getAllMenuItems } from '../../store/actions/superAction'
import {
  sortItemByConversionRate,
  sortItemByView
} from './StatisticalAnalysis/statisticalFunc'
import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateRangePicker } from '@mui/x-date-pickers-pro'

export default function SuperDashboard () {
  const dispatch = useDispatch()

  let endDate = new Date()
  let startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 1)

  const [dateRange, setDateRange] = useState([dayjs(startDate), dayjs(endDate)])

  const revenueByItems = {
    labels: ['Pizza', 'Burger', 'Bread'],
    colors: ['#7AF27F', '#FFB800', '#EF4B4B'],
    options: {
      chart: { type: 'donut' },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: { enabled: false },
      fill: {
        colors: ['#7ABAF2', '#FFB800', '#EF4B4B']
      },
      states: {
        hover: { filter: { type: 'lighten', value: 0.5 } },
        active: { filter: { type: 'none', value: 0 } }
      },
      stroke: { width: 0 },
      plotOptions: {
        pie: {
          expandOnClick: false,
          donut: {
            size: '70%',
            labels: {
              show: true,
              name: { show: false },
              total: {
                show: true,
                formatter: function (w) {
                  const totals = w.globals.seriesTotals
                  const result = totals.reduce((a, b) => a + b, 0)
                  return result
                }
              }
            }
          }
        }
      }
    },
    series: [44, 55, 41]
  }

  const chartData = [
    {
      name: 'Cheesy',
      rate: 80.6
    },
    {
      name: 'Cheesy ',
      rate: 76.5
    },
    {
      name: 'Thin Pizza',
      rate: 68.4
    },
    {
      name: 'Crunch Pasta',
      rate: 56.3
    },
    {
      name: 'House',
      rate: 45.3
    },
    {
      name: 'Creamy Pasta',
      rate: 36.2
    },
    {
      name: 'Cheesy',
      rate: 80.6
    },
    {
      name: 'Cheesy ',
      rate: 76.5
    },
    {
      name: 'Thin Pizza',
      rate: 68.4
    },
    {
      name: 'Crunch Pasta',
      rate: 56.3
    },
    {
      name: 'House',
      rate: 45.3
    },
    {
      name: 'Creamy Pasta',
      rate: 36.2
    }
  ]

  const [mostClickItems, setMostClickItems] = useState({
    chart: {
      type: 'bar',
      stacked: true
    },
    xaxis: {
      labels: {
        style: {
          colors: '#0074D9',
          fontFamily: 'Poppins',
          fontSize: '12px'
        }
      },
      categories: chartData?.map(item => {
        return item?.name
      })
    },
    yaxis: {
      labels: {
        style: {
          colors: '#0074D9',
          fontFamily: 'Poppins'
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '30%',
        barHeight: '70%',
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 100000000,
              color: '#0074D9' // Blue shade
            }
          ],
          backgroundBarColors: [],
          backgroundBarOpacity: 1,
          backgroundBarRadius: 0
        },
        dataLabels: {
          position: 'top',
          offsetY: -10,
          style: {
            fontSize: '18px',
            colors: []
          }
        }
      }
    },
    dataLabels: {
      enabled: true,
      formatter: function (val) {
        return val
      },
      offsetY: -25,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  })

  const mostClickItemsSeries = [
    {
      name: 'Clicked',
      data: chartData?.map(item => {
        return item?.rate
      })
    }
  ]

  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ]

  return (
    <>
      {/* <OnlyHeader /> */}
      <Box marginTop={'190px'}>
        <ThemeProvider theme={ThemeMain}>
          <Container className='mt--7 mb-5' fluid>
            <Container fluid>
              <Grid marginBottom={1} width={'100%'}>
                <Grid
                  item
                  xs={12}
                  lg={4}
                  display={'flex'}
                  justifyContent={'flex-end'}
                >
                  <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                      localeText={{ start: 'Start', end: 'End' }}
                      value={dateRange}
                      onChange={newValue => setDateRange(newValue)}
                    />
                  </DemoContainer>
                </Grid>
              </Grid>
              <Card sx={{ boxShadow: 'none' }}>
                <CardContent>
                  <Grid container spacing={2} columns={10}>
                    <Grid item spacing={2} xs={12} md={2}>
                      <DashboardStatisticItem
                        title={'Total Customers'}
                        value={'1234'}
                        stat={'7.2%'}
                        color='#0074D9'
                        id={'chart1'}
                        background={'#0074d91f'}
                        revenueComponent={SuperHome}
                      />
                    </Grid>
                    <Grid item spacing={2} xs={12} md={2}>
                      <DashboardStatisticItem
                        title={'Total Customers'}
                        value={'1234'}
                        stat={'7.2%'}
                        color='#09BD3B'
                        id={'chart2'}
                        revenueComponent={SuperDollar}
                      />
                    </Grid>
                    <Grid item spacing={2} xs={12} md={2}>
                      <DashboardStatisticItem
                        title={'Total Customers'}
                        value={'1234'}
                        stat={'7.2%'}
                        color='#FF8A00'
                        id={'chart3'}
                        revenueComponent={SuperUser}
                      />
                    </Grid>
                    <Grid item spacing={2} xs={12} md={2}>
                      <DashboardStatisticItem
                        title={'Total Customers'}
                        value={'1234'}
                        stat={'7.2%'}
                        color='#FF0000'
                        id={'chart4'}
                        revenueComponent={SuperHand}
                      />
                    </Grid>
                    <Grid item spacing={2} xs={12} md={2}>
                      <DashboardStatisticItem
                        title={'Customers'}
                        value={'1234'}
                        stat={'7.2%'}
                        color={'#7534FF'}
                        id={'chart5'}
                        revenueComponent={SuperChart}
                      />
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              <Grid container spacing={2}>
                <Grid item xs={12} lg={8}>
                  <Card
                    sx={{
                      boxShadow: 'none',
                      marginTop: '20px',
                      height: '100%'
                    }}
                  >
                    <CardContent>
                      <Typography
                        marginLeft={2}
                        fontWeight={'bold'}
                        textAlign={'left'}
                        fontSize={'20px'}
                      >
                        Product Performance
                      </Typography>
                      <BarChartForm
                        options={mostClickItems}
                        series={mostClickItemsSeries}
                      />
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} lg={4}>
                  <Card
                    sx={{
                      boxShadow: 'none',
                      marginTop: '20px',
                      height: '100%'
                    }}
                  >
                    <CardContent>
                      <Typography fontWeight={'bold'} fontSize={'20px'}>
                        New Promoter Score
                      </Typography>
                      <Typography fontWeight={'bold'}>Avrage: 7.34</Typography>
                      <Box sx={{ width: '100%' }}>
                        <DonutChart
                          options={revenueByItems.options}
                          series={revenueByItems.series}
                        />
                        <SidebarDonut
                          options={revenueByItems.labels}
                          series={revenueByItems.series}
                          colors={revenueByItems.colors}
                        />
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={2} marginTop={3}>
                <Grid item xs={12}>
                  <Card sx={{ boxShadow: 'none' }}>
                    <CardContent>
                      <Typography
                        fontWeight={'bold'}
                        textAlign={'left'}
                        fontSize={'20px'}
                        marginBottom={3}
                        marginLeft={5}
                      >
                        Active Merchants
                      </Typography>
                      <div style={{ width: '100%', height: 430 }}>
                        <ResponsiveContainer>
                          <AreaChart
                            width={730}
                            height={250}
                            data={data}
                            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                          >
                            <defs>
                              <linearGradient
                                id='colorUv'
                                x1='0'
                                y1='0'
                                x2='0'
                                y2='1'
                              >
                                <stop
                                  offset='5%'
                                  stopColor='#0074D9'
                                  stopOpacity={0.8}
                                />
                                <stop
                                  offset='95%'
                                  stopColor='#ffffff'
                                  stopOpacity={0}
                                />
                              </linearGradient>
                            </defs>
                            <XAxis dataKey='name' />
                            <YAxis />
                            <CartesianGrid strokeDasharray='3 3' />
                            <Tooltip />
                            <Area
                              type='monotone'
                              dataKey='uv'
                              stroke='#0074D9'
                              fillOpacity={1}
                              fill='url(#colorUv)'
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={2} marginTop={3}>
                <Grid item xs={12}>
                  <Card sx={{ boxShadow: 'none' }}>
                    <CardContent>
                      <Typography
                        marginLeft={2}
                        fontWeight={'bold'}
                        textAlign={'left'}
                        fontSize={'20px'}
                      >
                        Merchants
                      </Typography>
                      <Typography>Merchants sorted based on types</Typography>
                      <BarChartForm
                        options={mostClickItems}
                        series={mostClickItemsSeries}
                      />
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
              <Grid container spacing={2} marginTop={3}>
                <Grid item xs={12}>
                  <Card sx={{ boxShadow: 'none' }}>
                    <CardContent>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={12} lg={6}>
                            <Typography
                              fontWeight={'bold'}
                              textAlign={'left'}
                              fontSize={'20px'}
                              marginBottom={3}
                              marginLeft={5}
                            >
                              Visits
                            </Typography>
                          </Grid>
                          <Grid item xs={12} lg={6}>
                            <Box
                              display={'flex'}
                              justifyContent={'end'}
                              alignItems={'center'}
                            >
                              <Paper
                                sx={{
                                  width: '15px',
                                  height: '15px',
                                  borderRadius: '50%',
                                  backgroundColor: '#0074D9',
                                  marginRight: 1
                                }}
                              ></Paper>
                              <Typography marginRight={1}>
                                Restaurants
                              </Typography>
                              <Paper
                                sx={{
                                  width: '15px',
                                  height: '15px',
                                  borderRadius: '50%',
                                  backgroundColor: '#FF9920',
                                  marginRight: 1
                                }}
                              ></Paper>
                              <Typography marginRight={1}>Cafe</Typography>
                              <Paper
                                sx={{
                                  width: '15px',
                                  height: '15px',
                                  borderRadius: '50%',
                                  backgroundColor: '#7DDC97',
                                  marginRight: 1
                                }}
                              ></Paper>
                              <Typography marginRight={1}>
                                Food Truck
                              </Typography>
                              <Paper
                                sx={{
                                  width: '15px',
                                  height: '15px',
                                  borderRadius: '50%',
                                  backgroundColor: '#FF5959',
                                  marginRight: 1
                                }}
                              ></Paper>
                              <Typography marginRight={1}>Hotel</Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                      <div style={{ width: '100%', height: 430 }}>
                        <ResponsiveContainer>
                          <LineChart
                            width={500}
                            height={300}
                            data={data}
                            margin={{
                              top: 5,
                              right: 30,
                              left: 20,
                              bottom: 5
                            }}
                          >
                            <CartesianGrid strokeDasharray='3 3' />
                            <XAxis dataKey='name' />
                            <YAxis />
                            <Tooltip />
                            <Line
                              type='monotone'
                              dataKey='pv'
                              stroke='#7DDC97'
                              activeDot={{ r: 8 }}
                            />
                            <Line
                              type='monotone'
                              dataKey='uv'
                              stroke='#0074D9'
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
            </Container>
          </Container>
        </ThemeProvider>
      </Box>
    </>
  )
}
