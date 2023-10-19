import React, { useState, useEffect } from 'react'
import {
  Card,
  CardContent,
  Grid,
  ThemeProvider,
  Typography,
  Box,
  ButtonGroup,
  Button
} from '@mui/material'
import RankingForm from './RankingForm'
import BarChart from '../Charts/BarChart'
import DonutChart from '../Charts/DonutChart'
import { ThemeMain } from '../common/Theme'
import SidebarForDonutChart from './SidebarForDonutChart'
import {
  getAllMenus,
  getAllCategories
} from '../../store/actions/statisticAction'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  sortCategoryByRevenue,
  sortCategoryByView,
  sortItemByPurchase,
  sortItemByRevenue,
  sortItemByView
} from '../../Statistical/generalStatistics'

export default function StatisticsChart (props) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const {
    allMenus,
    allCategories,
    viewSortItems,
    viewSortCategories,
    purchaseSortItems,
    revenueSortItems,
    revenueSortCategories,
    totalRevenue,
    totalViews
  } = useSelector(state => state.statistic)

  let sortedItemByView = []

  useEffect(() => {}, [])

  useEffect(() => {
    dispatch(sortItemByView(allMenus))
    dispatch(sortCategoryByView(allMenus, allCategories))
    dispatch(sortItemByPurchase(allMenus))
    dispatch(sortItemByRevenue(allMenus))
    dispatch(sortCategoryByRevenue(allMenus, allCategories))
    // sortCategoryByView(allMenus)
  }, [allMenus, allCategories])

  useEffect(() => {
    viewSortItems.map(item => {
      sortedItemByView.push({
        name: item.name,
        rate: item.views
      })
    })
  }, [viewSortItems])

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
      rate: 20.1
    },
    {
      name: 'Bread',
      rate: 19.3
    },
    {
      name: 'Crust Pizza',
      rate: 13
    },
    {
      name: 'Pasta',
      rate: 10
    }
  ]

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
        .slice(0, 10)
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
      offsetY: -25,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  }

  const mostClickItemsSeries = [
    {
      name: 'Clicked',
      data: viewSortItems
        .slice()
        .reverse()
        .slice(0, 10)
        ?.map(item => {
          return item?.views
        })
    }
  ]

  let mostBoughtItems = {
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
        .slice(0, 10)
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
      offsetY: -25,
      style: {
        fontSize: '18px',
        fontFamily: 'Poppins',
        colors: []
      }
    }
  }

  const mostBoughtItemsSeries = [
    {
      name: 'Bought',
      data: purchaseSortItems
        .slice()
        .reverse()
        .slice(0, 10)
        ?.map(item => {
          return item?.purchase
        })
    }
  ]

  let orderPeakTime = {
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
  }

  let orderPeakTimeSeries = [
    {
      name: 'Clicked',
      data: chartData?.map(item => {
        return item?.rate
      })
    }
  ]

  let topItemViews = 0

  let viewsByItems = {
    labels: viewSortItems
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
    series: viewSortItems
      .slice()
      .reverse()
      .slice(0, 5)
      ?.map(item => {
        topItemViews += item.views
        return item.views
      })
  }

  let topCategoryViews = 0

  let viewsByCategory = {
    labels: viewSortCategories
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
    series: viewSortCategories
      .slice()
      .reverse()
      .slice(0, 5)
      ?.map(item => {
        topCategoryViews += item.views
        return item.views
      })
  }

  let topItemRevenue = 0

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
                  const totals = w.globals.seriesTotals
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
        topItemRevenue += revenue
        return revenue
      })
  }

  let topCategoryRevenue = 0

  let revenueByCategories = {
    labels: revenueSortCategories
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
                  const totals = w.globals.seriesTotals
                  const result = totals.reduce((a, b) => a + b, 0)
                  return '$' + result
                }
              }
            }
          }
        }
      }
    },
    series: revenueSortCategories
      .slice()
      .reverse()
      .slice(0, 5)
      ?.map(item => {
        topCategoryRevenue += item.revenue
        return item.revenue
      })
  }

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Grid container marginTop={'10px'}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={6}>
              <RankingForm
                type={'menu'}
                setSelectedItem={props.setSelectedItem}
                setStatisticOrDetail={props.setStatisticOrDetail}
                title='Top Menu Items Clicks'
                description='Menu Items customers visit more often.'
                items={viewSortItems}
                totalViews={totalViews}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <RankingForm
                type={'category'}
                title='Top Categories Clicks'
                description='Categories customers visit more often.'
                items={viewSortCategories}
                totalViews={totalViews}
              />
            </Grid>
          </Grid>
          <Grid container spacing={1} marginTop={1}>
            <Grid item xs={12}>
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
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
                      {/* <ButtonGroup
                      sx={{ marginLeft: '50px' }}
                      disableElevation
                      variant='contained'
                      aria-label='Disabled elevation buttons'
                    >
                      <Button>Clicks</Button>
                      <Button>Views</Button>
                    </ButtonGroup> */}
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
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
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
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
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
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
                <CardContent>
                  <Typography fontWeight={'bold'} fontSize={'20px'}>
                    Revenue Share by Top Menu Items
                  </Typography>
                  <Typography fontWeight={'bold'} marginTop={1}>
                    Total : ${totalRevenue}
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
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
                <CardContent>
                  <Typography fontWeight={'bold'} fontSize={'20px'}>
                    Revenue Share by Top Categories
                  </Typography>
                  <Typography fontWeight={'bold'} marginTop={1}>
                    Total : ${totalRevenue}
                  </Typography>
                  <Box
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                  >
                    <DonutChart
                      options={revenueByCategories.options}
                      series={revenueByCategories.series}
                    />
                    <SidebarForDonutChart
                      options={revenueByCategories.labels}
                      series={revenueByCategories.series}
                      colors={revenueByCategories.colors}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
                <CardContent>
                  <Typography fontWeight={'bold'} fontSize={'20px'}>
                    Click Share by Top Menu Items
                  </Typography>
                  <Typography marginTop={1} fontWeight={'bold'}>
                    Total Clicks : {totalViews}
                  </Typography>
                  <Box
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                  >
                    <DonutChart
                      options={viewsByItems.options}
                      series={viewsByItems.series}
                    />
                    <SidebarForDonutChart
                      options={viewsByItems.labels}
                      series={viewsByItems.series}
                      colors={viewsByItems.colors}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={6}>
              <Card sx={{ height: '100%', boxShadow: 'none' }}>
                <CardContent>
                  <Typography fontWeight={'bold'} fontSize={'20px'}>
                    Click Share by Top Categories
                  </Typography>
                  <Typography marginTop={1} fontWeight={'bold'}>
                    Total Clicks : {totalViews}
                  </Typography>
                  <Box
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                  >
                    <DonutChart
                      options={viewsByCategory.options}
                      series={viewsByCategory.series}
                    />
                    <SidebarForDonutChart
                      options={viewsByCategory.labels}
                      series={viewsByCategory.series}
                      colors={viewsByCategory.colors}
                    />
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}
