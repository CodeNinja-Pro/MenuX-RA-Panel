import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Grid,
  ThemeProvider,
  Typography,
  Box,
  ButtonGroup,
  Button,
  LinearProgress
} from '@mui/material'
import RankingForm from './RankingForm'
import BarChart from '../Charts/BarChart'
import DonutChart from '../Charts/DonutChart'
import { ThemeMain } from '../common/Theme'
import SidebarForDonutChart from './SidebarForDonutChart'
import {
  getClickSortItems,
  getClickSortCategories,
  getBoughtSortItems
} from '../../store/actions/statisticAction'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'

export default function StatisticsChart () {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getClickSortItems(user.restaurantID))
    dispatch(getClickSortCategories(user.restaurantID))
    dispatch(getBoughtSortItems(user.restaurantID))
  }, [])

  const items = [
    {
      name: 'Cheesy burger',
      rate: 80.6
    },
    {
      name: 'Cheesy Bread',
      rate: 76.5
    },
    {
      name: 'Thin Crust Pizza',
      rate: 68.4
    },
    {
      name: 'Crunch Pasta',
      rate: 56.3
    },
    {
      name: 'House Special',
      rate: 45.3
    },
    {
      name: 'Creamy Cheesy Pasta',
      rate: 36.2
    }
  ]

  const chartData = [
    {
      name: 'Cheesy burger',
      rate: 80.6
    },
    {
      name: 'Cheesy Bread',
      rate: 76.5
    },
    {
      name: 'Thin Crust Pizza',
      rate: 68.4
    },
    {
      name: 'Crunch Pasta',
      rate: 56.3
    },
    {
      name: 'House Special',
      rate: 45.3
    },
    {
      name: 'Creamy Cheesy Pasta',
      rate: 36.2
    },
    {
      name: 'burger',
      rate: 80.6
    },
    {
      name: 'Bread',
      rate: 76.5
    },
    {
      name: 'Crust Pizza',
      rate: 68.4
    },
    {
      name: 'Pasta',
      rate: 56.3
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
          colors: '#6E6B7B',
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

  const [mostBoughtItems, setMostBoughtItems] = useState({
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
      categories: chartData?.map(item => {
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
      offsetY: -25,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  })

  const mostBoughtItemsSeries = [
    {
      name: 'Bought',
      data: chartData?.map(item => {
        return item?.rate
      })
    }
  ]

  const [orderPeakTime, setOrderPeakTime] = useState({
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
      categories: chartData?.map(item => {
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
      offsetY: -25,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  })

  const orderPeakTimeSeries = [
    {
      name: 'Clicked',
      data: chartData?.map(item => {
        return item?.rate
      })
    }
  ]

  const revenueByItems = {
    labels: ['Pizza', 'Burger', 'Bread', 'Cheese', 'Fries', 'Chicken'],
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
    series: [44, 55, 41, 17, 15, 32]
  }

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Grid container marginTop={'10px'}>
          <Grid item xs={12} md={6}>
            <RankingForm
              title='Top Menu Items Clicks'
              description='Menu Items customers visit more often.'
              items={items}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <RankingForm
              title='Top Categories Clicks'
              description='Categories customers visit more often.'
              items={items}
            />
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ margin: '5px' }}>
              <CardContent>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Box>
                    <Typography
                      fontWeight={'bold'}
                      fontSize={'20px'}
                      textAlign={'left'}
                    >
                      Items
                    </Typography>
                    <Typography>Most Clicked Items</Typography>
                  </Box>
                  <Box>
                    <ButtonGroup
                      disableElevation
                      variant='contained'
                      aria-label='Disabled elevation buttons'
                    >
                      <Button>Most</Button>
                      <Button>Least</Button>
                    </ButtonGroup>
                    <ButtonGroup
                      sx={{ marginLeft: '50px' }}
                      disableElevation
                      variant='contained'
                      aria-label='Disabled elevation buttons'
                    >
                      <Button>Clicks</Button>
                      <Button>Views</Button>
                    </ButtonGroup>
                  </Box>
                </Box>
                <BarChart
                  options={mostClickItems}
                  series={mostClickItemsSeries}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ margin: '5px' }}>
              <CardContent>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Box>
                    <Typography
                      fontWeight={'bold'}
                      fontSize={'20px'}
                      textAlign={'left'}
                    >
                      Items Bought
                    </Typography>
                    <Typography>Most Bought Items</Typography>
                  </Box>
                  <Box>
                    <ButtonGroup
                      disableElevation
                      variant='contained'
                      aria-label='Disabled elevation buttons'
                    >
                      <Button>Most</Button>
                      <Button>Least</Button>
                    </ButtonGroup>
                  </Box>
                </Box>
                <BarChart
                  options={mostBoughtItems}
                  series={mostBoughtItemsSeries}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ margin: '5px' }}>
              <CardContent>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Box>
                    <Typography
                      fontWeight={'bold'}
                      fontSize={'20px'}
                      textAlign={'left'}
                    >
                      Peak Hours
                    </Typography>
                    <Typography>Check the order peak time</Typography>
                  </Box>
                  <Box>
                    <Typography fontWeight={'bold'} marginRight={'50px'}>
                      Best Peak Hour: 12PM-1PM
                    </Typography>
                  </Box>
                </Box>
                <BarChart
                  options={orderPeakTime}
                  series={orderPeakTimeSeries}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ margin: '5px' }}>
              <CardContent>
                <Typography fontWeight={'bold'} fontSize={'20px'}>
                  Revenue Share by Menu Items
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <DonutChart
                    options={revenueByItems.options}
                    series={revenueByItems.series}
                  />
                  <SidebarForDonutChart
                    options={revenueByItems.labels}
                    series={revenueByItems.series}
                    colors={revenueByItems.colors}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ margin: '5px' }}>
              <CardContent>
                <Typography fontWeight={'bold'} fontSize={'20px'}>
                  Revenue Share by Categories
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <DonutChart
                    options={revenueByItems.options}
                    series={revenueByItems.series}
                  />
                  <SidebarForDonutChart
                    options={revenueByItems.labels}
                    series={revenueByItems.series}
                    colors={revenueByItems.colors}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ margin: '5px' }}>
              <CardContent>
                <Typography fontWeight={'bold'} fontSize={'20px'}>
                  Click Share by Menu Items
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <DonutChart
                    options={revenueByItems.options}
                    series={revenueByItems.series}
                  />
                  <SidebarForDonutChart
                    options={revenueByItems.labels}
                    series={revenueByItems.series}
                    colors={revenueByItems.colors}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Card sx={{ margin: '5px' }}>
              <CardContent>
                <Typography fontWeight={'bold'} fontSize={'20px'}>
                  Click Share by Categories
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  <DonutChart
                    options={revenueByItems.options}
                    series={revenueByItems.series}
                  />
                  <SidebarForDonutChart
                    options={revenueByItems.labels}
                    series={revenueByItems.series}
                    colors={revenueByItems.colors}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}
