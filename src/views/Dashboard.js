import React, { useEffect, useState } from 'react'
import { ThemeMain } from '../components/common/Theme'
import OnlyHeader from '../components/Headers/OnlyHeader'
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

import UserIcon from '../assets/common/dashboard/UserIcon.png'
import CheckIcon from '../assets/common/dashboard/CheckIcon.png'
import BackIcon from '../assets/common/dashboard/BackIcon.png'
import BucketIcon from '../assets/common/dashboard/BucketIcon.png'
import EmojiEventsOutlinedIcon from '@mui/icons-material/EmojiEventsOutlined'

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

// Image load
import DashboardStatisticItem from './common/DashboardStatisticItem'
import StatisticChart from './common/StatisticChart'
import DonutChart from './common/DonutChart'
import SidebarDonut from './common/SidebarDonut'

// Chart load
import BarChartForm from '../components/Charts/BarChart'
import { getAllMenus } from '../store/actions/statisticAction'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'

import {
  sortItemByConversionRate,
  sortItemByPurchase,
  sortItemByRevenue,
  sortItemByView
} from '../Statistical/generalStatistics'

export default function Dashboard () {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const {
    allMenus,
    viewSortItems,
    purchaseSortItems,
    conversionRateSortItems,
    revenueSortItems,
    totalRevenue
  } = useSelector(state => state.statistic)

  let topRevenue = 0

  useEffect(() => {
    dispatch(getAllMenus(user.restaurantID))
  }, [])

  useEffect(() => {
    dispatch(sortItemByView(allMenus))
    dispatch(sortItemByPurchase(allMenus))
    dispatch(sortItemByConversionRate(allMenus))
    dispatch(sortItemByRevenue(allMenus))
  }, [allMenus])

  let revenueByItems = {
    labels: revenueSortItems
      .slice()
      .reverse()
      .slice(0, 5)
      ?.map(item => {
        return item.name
      }),
    colors: ['#7ABAF2', '#16BFD6', '#A155B9', '#5E72E4', '#7C8DB5', '#63B955'],
    options: {
      chart: { type: 'donut' },
      legend: { show: false },
      dataLabels: { enabled: false },
      tooltip: { enabled: false },
      fill: {
        colors: [
          '#7ABAF2',
          '#16BFD6',
          '#A155B9',
          '#5E72E4',
          '#7C8DB5',
          '#63B955'
        ]
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
                  let totals = w.globals.seriesTotals
                  const result = totals.reduce((a, b) => a + b, 0)
                  return '$' + result
                }
              }
            }
          }
        }
      }
    },
    series: revenueSortItems
      .slice()
      .reverse()
      .slice(0, 5)
      ?.map(item => {
        let revenue =
          (Number(item.price) - Number(item.totalPrice)) * Number(item.purchase)
        topRevenue += revenue
        return revenue
      })
  }

  let mostClickItems = {
    chart: {
      type: 'bar',
      stacked: true
    },
    xaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
          fontFamily: 'Poppins',
          fontSize: '12px'
        }
      },
      categories: viewSortItems
        .slice()
        .reverse()
        .slice(0, 5)
        ?.map(item => {
          return item?.name
        })
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
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
              color: '#FF9920' // Blue shade
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
      offsetY: -55,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  }

  let mostClickItemsSeries = [
    {
      name: 'Clicked',
      data: viewSortItems
        .slice()
        .reverse()
        .slice(0, 5)
        ?.map(item => {
          return item?.views
        })
    }
  ]

  let leastClickItems = {
    chart: {
      type: 'bar',
      stacked: true
    },
    xaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
          fontFamily: 'Poppins',
          fontSize: '12px'
        }
      },
      categories: viewSortItems.slice(0, 5)?.map(item => {
        return item?.name
      })
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
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
              color: '#7239EA' // Blue shade
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
      offsetY: -55,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  }

  let leastClickItemsSeries = [
    {
      name: 'Clicked',
      data: viewSortItems.slice(0, 5)?.map(item => {
        return item?.views
      })
    }
  ]

  let bestSellerItems = {
    chart: {
      type: 'bar',
      stacked: true
    },
    xaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
          fontFamily: 'Poppins',
          fontSize: '12px'
        }
      },
      categories: purchaseSortItems
        .slice()
        .reverse()
        .slice(0, 5)
        ?.map(item => {
          return item?.name
        })
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
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
      offsetY: -55,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  }

  let bestSellerItemsSeries = [
    {
      name: 'Clicked',
      data: purchaseSortItems
        .slice()
        .reverse()
        .slice(0, 5)
        ?.map(item => {
          return item?.purchase
        })
    }
  ]

  let worstSellerItems = {
    chart: {
      type: 'bar',
      stacked: true
    },
    xaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
          fontFamily: 'Poppins',
          fontSize: '12px'
        }
      },
      categories: purchaseSortItems.slice(0, 5)?.map(item => {
        return item?.name
      })
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
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
              color: '#FF5959' // Blue shade
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
      offsetY: -55,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  }

  let worstSellerItemsSeries = [
    {
      name: 'Clicked',
      data: purchaseSortItems.slice(0, 5)?.map(item => {
        return item?.purchase
      })
    }
  ]

  let topCoversionRate = {
    chart: {
      type: 'bar',
      stacked: true
    },
    xaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
          fontFamily: 'Poppins',
          fontSize: '12px'
        }
      },
      categories: conversionRateSortItems.slice(0, 5)?.map(item => {
        return item?.name
      })
    },
    yaxis: {
      labels: {
        style: {
          colors: '#6E6B7B',
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
      offsetY: -55,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  }

  let topConversionRateSeries = [
    {
      name: 'Clicked',
      data: conversionRateSortItems.slice(0, 5)?.map(item => {
        let number = Number(item?.purchase) / Number(item?.views)
        return new Intl.NumberFormat('en-IN', {
          maximumSignificantDigits: 2
        }).format(number)
      })
    }
  ]

  let data = [
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
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
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
                      revenueComponent={UserIcon}
                    />
                  </Grid>
                  <Grid item spacing={2} xs={12} md={2}>
                    <DashboardStatisticItem
                      title={'Total Customers'}
                      value={'1234'}
                      stat={'7.2%'}
                      color='#09BD3B'
                      id={'chart2'}
                      revenueComponent={BucketIcon}
                    />
                  </Grid>
                  <Grid item spacing={2} xs={12} md={2}>
                    <DashboardStatisticItem
                      title={'Total Customers'}
                      value={'1234'}
                      stat={'7.2%'}
                      color='#FF8A00'
                      id={'chart3'}
                      revenueComponent={CheckIcon}
                    />
                  </Grid>
                  <Grid item spacing={2} xs={12} md={2}>
                    <DashboardStatisticItem
                      title={'Total Customers'}
                      value={'1234'}
                      stat={'7.2%'}
                      color='#FF0000'
                      id={'chart4'}
                      revenueComponent={BackIcon}
                    />
                  </Grid>
                  <Grid item spacing={2} xs={12} md={2}>
                    <DashboardStatisticItem
                      title={'Customers'}
                      value={'1234'}
                      stat={'7.2%'}
                      color={'#7534FF'}
                      id={'chart5'}
                      revenueComponent={UserIcon}
                    />
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <Card
                  sx={{ boxShadow: 'none', marginTop: '20px', height: '100%' }}
                >
                  <CardContent>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Typography
                        marginLeft={2}
                        fontWeight={'bold'}
                        fontSize={'20px'}
                      >
                        Visits
                      </Typography>
                      <Box display={'flex'} alignItems={'center'}>
                        <Typography marginRight={4}>
                          Average daily visits: 440
                        </Typography>
                      </Box>
                    </Box>
                    <StatisticChart color={'#0074D9'} />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={4}>
                <Card
                  sx={{ boxShadow: 'none', marginTop: '20px', height: '100%' }}
                >
                  <CardContent
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      flexDirection: 'column'
                    }}
                  >
                    <Typography fontWeight={'bold'} fontSize={'20px'}>
                      Top Revenue Items
                    </Typography>
                    <Typography fontWeight={'bold'}>
                      ${topRevenue}/${totalRevenue}
                    </Typography>
                    <Box sx={{ width: '100%' }}>
                      <DonutChart
                        options={revenueByItems.options}
                        series={revenueByItems.series}
                      />
                    </Box>
                    <Box marginLeft={5}>
                      <SidebarDonut
                        options={revenueByItems.labels}
                        series={revenueByItems.series}
                        colors={revenueByItems.colors}
                        totalRevenue={topRevenue}
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <Grid container spacing={2} marginTop={3}>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 'none' }}>
                  <CardContent>
                    <Typography
                      marginLeft={2}
                      fontWeight={'bold'}
                      textAlign={'left'}
                      fontSize={'20px'}
                    >
                      Most Viewed Items
                    </Typography>
                    <BarChartForm
                      options={mostClickItems}
                      series={mostClickItemsSeries}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 'none' }}>
                  <CardContent>
                    <Typography
                      marginLeft={2}
                      fontWeight={'bold'}
                      textAlign={'left'}
                      fontSize={'20px'}
                    >
                      Least Viewed Items
                    </Typography>
                    <BarChartForm
                      options={leastClickItems}
                      series={leastClickItemsSeries}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 'none' }}>
                  <CardContent>
                    <Typography
                      marginLeft={2}
                      fontWeight={'bold'}
                      textAlign={'left'}
                      fontSize={'20px'}
                    >
                      Best Sellers
                    </Typography>
                    <BarChartForm
                      options={bestSellerItems}
                      series={bestSellerItemsSeries}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 'none' }}>
                  <CardContent>
                    <Typography
                      marginLeft={2}
                      fontWeight={'bold'}
                      textAlign={'left'}
                      fontSize={'20px'}
                    >
                      Worst Sellers
                    </Typography>
                    <BarChartForm
                      options={worstSellerItems}
                      series={worstSellerItemsSeries}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 'none', height: '100%' }}>
                  <CardContent>
                    <Typography
                      marginLeft={2}
                      fontWeight={'bold'}
                      textAlign={'left'}
                      fontSize={'20px'}
                    >
                      Top Performing Items - Conversion Rate
                    </Typography>
                    <BarChartForm
                      options={topCoversionRate}
                      series={topConversionRateSeries}
                    />
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={6}>
                <Card sx={{ boxShadow: 'none', height: '100%' }}>
                  <CardContent>
                    <Box
                      display={'flex'}
                      justifyContent={'space-between'}
                      alignItems={'center'}
                    >
                      <Typography
                        marginLeft={2}
                        fontWeight={'bold'}
                        textAlign={'left'}
                        fontSize={'20px'}
                      >
                        Customers
                      </Typography>
                      <Box width={'200px'}>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                        >
                          <Paper
                            sx={{
                              backgroundColor: '#0074D9',
                              borderRadius: '50%',
                              width: '15px',
                              height: '15px'
                            }}
                          ></Paper>
                          <Typography>Returning Customers</Typography>
                        </Box>
                        <Box
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                        >
                          <Paper
                            sx={{
                              backgroundColor: '#FF9920',
                              borderRadius: '50%',
                              width: '15px',
                              height: '15px'
                            }}
                          ></Paper>
                          <Typography>Total Customers</Typography>
                        </Box>
                      </Box>
                    </Box>
                    <Box width={'100%'} height={'100%'}>
                      <ResponsiveContainer width='100%' height={450}>
                        <BarChart
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
                          <Bar dataKey='pv' fill='#0074D9' />
                          <Bar dataKey='uv' fill='#FF9920' />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
