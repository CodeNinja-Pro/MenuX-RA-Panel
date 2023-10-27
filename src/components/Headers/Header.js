// reactstrap components
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRef } from 'react'
import { useEffect } from 'react'
import { Card, Container, Col, Row, CardHeader, CardBody } from 'reactstrap'
import { DateRangePicker } from 'react-date-range'
import BarChart from '../Charts/BarChart'
import PieChart from '../Charts/PieChart'
import TotalCustomerChart from '../Charts/TotalCustomerChart'
import LineChart from '../Charts/LineChart'
import HeaderCards from './HeaderCards'
import TopMerchants from '../Charts/TopMerchants'
import PickDateRange from '../../views/auth/PickDateRange'
import { addDays } from 'date-fns'
import { getRestaurantStats } from '../../store/actions/statsActions'
import { getRestaurantStatsById } from '../../store/actions/statsActions'
import { getMostViewedById } from '../../store/actions/statsActions'
import { getMostViewedProductsById } from '../../store/actions/statsActions'
import { getLeastViewedProductsById } from '../../store/actions/statsActions'
import { getBestSellersById } from '../../store/actions/statsActions'
import { getWorstSellersById } from '../../store/actions/statsActions'
import { getResturantRevenue } from '../../store/actions/statsActions'
import { getOrderAnalysisById } from '../../store/actions/statsActions'
import { getRestaurantVisitsById } from '../../store/actions/statsActions'
import { LinearProgress } from '@material-ui/core'

const Header = () => {
  const [modal, setModal] = useState(false)
  const [modals, setModals] = useState(false)
  const toggle = () => setModal(!modal)
  const toggles = () => setModals(!modals)
  const { user } = useSelector(state => state.auth)
  const [dateState, setDateState] = useState([
    {
      startDate: addDays(new Date(), -31),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  useEffect(() => {
    console.log(dateState)
  }, [dateState])

  const {
    restaurantStats,
    topMerchants,
    topProducts,
    orderAnalysis,
    loading,
    currentTopViewedProducts,
    currentLeastViewedProducts,
    currentRestaurantBestSellers,
    currentRestaurantWorstSellers,
    restaurantRevenue,
    revenueLoader,
    restaurantOrderAnalysis,
    restaurantAnalysisLoader,
    restaurantVisits,
    visitsLoader
  } = useSelector(state => state.stats)

  const totalRevenue =
    restaurantRevenue?.stripe +
    restaurantRevenue?.cash +
    restaurantRevenue?.paypal

  const [isOpen, setIsOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)

  const toggleDropDown = () => setDropdownOpen(prevState => !prevState)
  const ref = useRef(null)

  const [bestSellers, setBestSellers] = useState({
    chart: {
      type: 'bar',
      stacked: true,
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.25
      }
    },
    xaxis: {
      labels: {
        style: {
          colors: 'blue'
        }
      },
      title: {
        text: 'Product'
      },
      categories:
        currentRestaurantBestSellers.length > 0
          ? currentRestaurantBestSellers?.map(item => {
              return item?.name
            })
          : ['Burger', 'Wings', 'Fries', 'Guacamole', 'Pancake'],
      color: 'red'
    },
    yaxis: {
      labels: {
        style: {
          colors: 'red'
        }
      },
      title: {
        text: 'Amount'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '50%',
        barHeight: '70%',
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 500,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 501,
              to: 2000,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 2001,
              to: 3000,
              color: '#5E72E4' // Blue shade
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
            fontSize: '12px',
            colors: []
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + ' product'
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: []
      }
    }
  })

  const bestSellersSeries = [
    {
      name: 'Orders',
      data:
        currentRestaurantBestSellers?.length > 0
          ? currentRestaurantBestSellers?.map(val => {
              return val?.orders
            })
          : [143, 131, 112, 92, 81]
    }
  ]

  const [worstSeller, setWorstSellers] = useState({
    chart: {
      type: 'bar',
      height: 600,
      stacked: true,
      dropShadow: {
        enabled: true,
        blur: 1,
        opacity: 0.25
      }
    },
    xaxis: {
      labels: {
        style: {
          colors: 'blue'
        }
      },
      title: {
        text: 'Product'
      },
      categories:
        currentRestaurantWorstSellers.length > 0
          ? currentRestaurantWorstSellers?.map(item => {
              return item?.name
            })
          : ['Pizza', 'Salad', 'Sandwich', 'Soda', 'Tacos']
    },
    yaxis: {
      labels: {
        style: {
          colors: 'red'
        }
      },
      title: {
        text: 'Amount'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '50%',
        barHeight: '70%',
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 500,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 501,
              to: 2000,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 2001,
              to: 3000,
              color: '#5E72E4' // Blue shade
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
            fontSize: '12px',
            colors: []
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + ' product'
      },
      offsetY: -20,
      style: {
        fontSize: '12px',
        colors: []
      }
    }
  })
  const worstSellerSeries = [
    {
      name: 'Orders',
      data:
        currentRestaurantWorstSellers?.length > 0
          ? currentRestaurantWorstSellers?.map(val => {
              return val?.orders
            })
          : [3, 3, 10, 15, 16]
    }
  ]

  const mostViewedProducts = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      labels: {
        style: {
          colors: 'blue'
        }
      },
      title: {
        text: 'Product'
      },
      categories: currentTopViewedProducts.map(product => {
        const matchingProduct = topProducts.find(item => item.id === product.id)
        return matchingProduct ? matchingProduct.name : ''
      })
    },
    yaxis: {
      labels: {
        style: {
          colors: 'red'
        }
      },
      title: {
        text: 'Amount'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '50%',
        barHeight: '70%',
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 500,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 501,
              to: 2000,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 2001,
              to: 3000,
              color: '#5E72E4' // Blue shade
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
            fontSize: '12px',
            colors: []
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + ' ORDERS'
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: []
      }
    },
    toolbar: {
      show: false
    }
  }
  const mostViewedSeries = [
    {
      name: 'Views',
      data:
        currentTopViewedProducts.length > 0
          ? currentTopViewedProducts?.map(product => {
              return product?.views
            })
          : []
    }
  ]

  const leastViewedProducts = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      labels: {
        style: {
          colors: 'blue'
        }
      },
      title: {
        text: 'Product'
      },
      categories: currentLeastViewedProducts.map(product => {
        const matchingProduct = topProducts.find(item => item.id === product.id)
        return matchingProduct ? matchingProduct.name : ''
      })
    },
    yaxis: {
      labels: {
        style: {
          colors: 'red'
        }
      },
      title: {
        text: 'Amount'
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '50%',
        barHeight: '70%',
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 500,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 501,
              to: 2000,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 2001,
              to: 3000,
              color: '#5E72E4' // Blue shade
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
            fontSize: '12px',
            colors: []
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + ' ORDERS'
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: []
      }
    },
    toolbar: {
      show: false
    }
  }
  const leastViewedSeries = [
    {
      name: 'Views',
      data:
        currentLeastViewedProducts.length > 0
          ? currentLeastViewedProducts?.map(product => {
              return product?.views
            })
          : []
    }
  ]

  const TopProducts = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      labels: {
        style: {
          colors: 'blue'
        }
      },
      title: {
        text: 'Product'
      },
      categories:
        topProducts?.length > 0
          ? topProducts?.map(val => {
              return val?.name
            })
          : []
    },

    plotOptions: {
      chart: {
        toolbar: {
          show: false
        }
      },

      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '50%',
        barHeight: '70%',
        distributed: false,
        colors: {
          ranges: [
            {
              from: 0,
              to: 500,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 501,
              to: 2000,
              color: '#5E72E4' // Blue shade
            },
            {
              from: 2001,
              to: 3000,
              color: '#5E72E4' // Blue shade
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
            fontSize: '12px',
            colors: []
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + ' ORDERS'
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: []
      }
    },
    toolbar: {
      show: false
    }
  }

  const ProductsSeries = [
    {
      name: 'Orders',
      data:
        topProducts?.length > 0
          ? topProducts?.map(val => {
              return val?.orders
            })
          : []
    }
  ]

  //   pie chart details
  const chartOptions = {
    chart: {
      type: 'pie'
    },

    labels: ['Lost Customers', 'New Customers'],
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true
    }
  }
  let chartSeries
  if (restaurantStats && typeof restaurantStats === 'object') {
    chartSeries =
      Object.keys(restaurantStats)?.length > 0 &&
      Object.keys(restaurantStats?.totalCustomers)?.length > 0
        ? Object?.entries(restaurantStats?.totalCustomers)
            ?.map(([key, value]) => {
              return key !== 'total' ? value : null
            })
            ?.filter(num => num !== null)
        : []
  }

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const topMerchantOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories:
        topMerchants?.length > 0
          ? topMerchants?.map(val => {
              return val?.name
            })
          : []
    },

    plotOptions: {
      chart: {
        toolbar: {
          show: false
        }
      },

      bar: {
        horizontal: false,
        endingShape: 'flat',
        columnWidth: '30%',

        colors: {
          ranges: [
            {
              from: 0,
              to: 500,
              color: '#F765A3'
            }
          ]
        },
        dataLabels: {
          position: 'top',
          offsetY: -10,
          style: {
            fontSize: '12px',
            colors: []
          }
        }
      }
    },
    dataLabels: {
      enabled: false,
      formatter: function (val) {
        return val + ' ORDERS'
      },
      offsetY: -20,
      style: {
        fontSize: '10px',
        colors: []
      }
    },
    toolbar: {
      show: false
    }
  }

  const topMerchantSeries = [
    {
      name: 'Orders',
      data:
        topMerchants?.length > 0
          ? topMerchants?.map(val => {
              return val?.orders
            })
          : []
    }
  ]

  const OrderAnalysisOptions = {
    chart: {
      id: 'basic-line',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
      ]
    },
    stroke: {
      curve: 'smooth'
    },

    legend: {
      show: false
    },

    curve: 'smooth'
  }

  const OrderAnalysisSeries = [
    {
      name: 'Active',
      data:
        orderAnalysis?.length > 0
          ? orderAnalysis?.map(val => {
              return val?.active
            })
          : []
    },
    {
      name: 'Completed',
      data:
        orderAnalysis?.length > 0
          ? orderAnalysis?.map(val => {
              return val?.completed
            })
          : []
    },
    {
      name: 'Pending',
      data:
        orderAnalysis?.length > 0
          ? orderAnalysis?.map(val => {
              return val?.pending
            })
          : []
    }
  ]
  const restaurantAnalysisSeries = [
    {
      name: 'Active',
      data: Object.values(restaurantOrderAnalysis).map(obj => obj.active)
    },
    {
      name: 'Completed',
      data: Object.values(restaurantOrderAnalysis).map(obj => obj.completed)
    },
    {
      name: 'Pending',
      data: Object.values(restaurantOrderAnalysis).map(obj => obj.pending)
    }
  ]

  const generateDateRange = (startDate, endDate) => {
    const dates = []
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString())
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
  }

  const handleDateChange = ranges => {
    setDateState(ranges)
  }

  const visitOptions = {
    chart: {
      id: 'basic-line',
      toolbar: {
        show: false
      }
    },
    xaxis: {
      type: 'datetime',
      categories: generateDateRange(
        dateState[0].startDate,
        dateState[0].endDate
      )
    },
    stroke: {
      curve: 'smooth'
    },
    legend: {
      show: false
    },

    curve: 'smooth'
  }

  const visitSeries = [
    {
      name: 'Visits',
      data:
        Object.keys(restaurantStats ? restaurantStats : {})?.length > 0 &&
        Object.keys(restaurantStats?.visits).length > 0
          ? Object.entries(restaurantStats?.visits).map(([key, value]) => {
              return value
            })
          : []
    }
  ]

  const visitRestaurantSeries = [
    {
      name: 'Visits',
      data:
        Object.keys(restaurantVisits)?.length > 0
          ? Object.entries(restaurantVisits).map(([key, value]) => {
              return value
            })
          : []
    }
  ]
  const dispatch = useDispatch()
  useEffect(() => {
    if (user?.type === 'restaurant') {
      console.log('restaurant')
      // dispatch(getRestaurantStatsById(user?.restaurantID))
      // dispatch(getMostViewedProductsById(user?.restaurantID))
      // dispatch(getLeastViewedProductsById(user?.restaurantID))
      // dispatch(getBestSellersById(user?.restaurantID))
      // dispatch(getWorstSellersById(user?.restaurantID))
      // dispatch(getResturantRevenue(user?.restaurantID))
      // dispatch(getOrderAnalysisById(user?.restaurantID))
      // dispatch(getRestaurantVisitsById(user?.restaurantID))
    }
  }, [])

  const capitalizeKeys = string => {
    return string.charAt(0).toUpperCase() + string.slice(1)
  }

  const revenueOptions = {
    chart: {
      type: 'pie'
    },
    labels:
      restaurantRevenue.length > 0
        ? Object.keys(restaurantRevenue).map(key => capitalizeKeys(key))
        : [
            'Burger',
            'Soda',
            'Fries',
            'Chip',
            'Cheese',
            'Chicken',
            'Bread',
            'Spaghetti',
            'Cheese Burger',
            'Salad'
          ],
    dataLabels: {
      enabled: true
    },
    tooltip: {
      enabled: true
    }
  }
  const revenueSeries =
    restaurantRevenue.length > 0
      ? Object.values(restaurantRevenue)
      : [20, 120, 30, 43, 12, 20, 120, 30, 43, 12]

  const visitValues = Object.values(restaurantVisits)
  const totalVisits = visitValues.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  )

  const averageVisits = Math.floor(totalVisits / 365)

  return (
    <>
      <Container fluid className='header pb-5 pt-5 pt-md-7'>
        <Container fluid>
          <Row className='my-3 mx-2'>
            <Col className='col-lg-4 col-md-4 col-sm-12'></Col>
            <Col className='col-lg-4 col-md-4 col-sm-12'></Col>
            <Col className='col-lg-4 col-md-4 col-sm-12'>
              <PickDateRange
                setDateState={handleDateChange}
                datestate={dateState}
              />
              {/* <DateRangePicker
                onChange={handleDateChange}
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={2}
                ranges={dateState}
                direction="horizontal"
                preventSnapRefocus={true}
                calendarFocus="backwards"
                className="dateRangerSet"
              /> */}
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <HeaderCards />
          <Row>
            <>
              {user?.type === 'admin' ? (
                <>
                  {/* Order analysis and Revenue earned  */}
                  <Col xl={12}>
                    <Row>
                      <Col md='8' xl='8' className='mt-4'>
                        <Card className='shadow mt-3'>
                          <div className='d-lg-flex justify-content-between py-3 px-2'>
                            <h3 className='mt-2 pl-3'>Order Analysis</h3>
                            <div className='d-lg-flex align-items-center'>
                              <div>
                                <span className='mx-2 fs-12'>
                                  <svg
                                    className='mx-2'
                                    width='8'
                                    height='8'
                                    viewBox='0 0 8 8'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <circle
                                      cx='4'
                                      cy='4'
                                      r='4'
                                      fill='#19CB98'
                                    />
                                  </svg>
                                  Active
                                </span>
                                <span className='mx-2 fs-12'>
                                  <svg
                                    className='mx-2'
                                    width='8'
                                    height='8'
                                    viewBox='0 0 8 8'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <circle
                                      cx='4'
                                      cy='4'
                                      r='4'
                                      fill='#19CB98'
                                    />
                                  </svg>
                                  Completed
                                </span>
                                <span className='mx-2 fs-12'>
                                  <svg
                                    className='mx-2'
                                    width='8'
                                    height='8'
                                    viewBox='0 0 8 8'
                                    fill='none'
                                    xmlns='http://www.w3.org/2000/svg'
                                  >
                                    <circle
                                      cx='4'
                                      cy='4'
                                      r='4'
                                      fill='#19CB98'
                                    />
                                  </svg>
                                  Pending
                                </span>
                              </div>
                            </div>
                          </div>
                          <LineChart
                            options={OrderAnalysisOptions}
                            series={OrderAnalysisSeries}
                          />
                        </Card>
                      </Col>
                      <Col md='4' xl='4' className='mt-4 h-100'>
                        <Card className='shadow mt-3 py-2 mb-3'>
                          <CardHeader className='mb-4'>
                            <div className='d-flex justify-content-between align-items-center'>
                              <div>
                                <div>
                                  <span className='fs-14'>Total Customers</span>
                                </div>
                                <h2>
                                  {restaurantStats?.totalCustomers?.total || 0}
                                </h2>
                              </div>
                              {/* <i className="fa-solid fa-info"></i> */}
                            </div>
                          </CardHeader>
                          {loading ? (
                            <div>
                              <LinearProgress />
                            </div>
                          ) : (
                            <PieChart
                              chartOptions={chartOptions}
                              chartSeries={chartSeries}
                              type='pie'
                            />
                          )}
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  {/* Top performing products and top Customers  */}
                  <Col xl={12}>
                    <Row>
                      <Col md='8' xl='8' className='mt-4'>
                        <Card className='shadow mt-3'>
                          <div className='d-lg-flex justify-content-between py-3 px-2'>
                            <h3 className='mt-2 pl-3'>
                              Top Performing Products
                            </h3>
                            {/* <div>
                              <div class="dropdown">
                                <button
                                  class="btn btn-outline  chart-btn dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Download
                                </button>
                                <div
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a class="dropdown-item" href="#">
                                    Day
                                  </a>
                                  <a class="dropdown-item" href="#">
                                    Month
                                  </a>
                                </div>
                              </div>
                            </div> */}
                          </div>
                          <BarChart
                            options={TopProducts}
                            series={ProductsSeries}
                          />
                        </Card>
                      </Col>
                      <Col md='4' xl='4' className='mt-4 h-100'>
                        <Card className='shadow mt-3'>
                          <CardHeader>
                            <div>
                              <span className='fs-14'>Top Merchants</span>
                            </div>
                          </CardHeader>

                          <TopMerchants
                            topMerchantOptions={topMerchantOptions}
                            topMerchantSeries={topMerchantSeries}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  {/* Visit Chart  */}
                  <Col xl={12}>
                    <Card>
                      <div className='d-flex justify-content-between mx-5 mt-4'>
                        <div>
                          <h4 className='mb-0'>Visits</h4>
                          <span className='text-muted fs-12'>By Month</span>
                        </div>
                        <div>
                          <h4 className='mb-0'>14</h4>
                          <span className='text-muted fs-12'>
                            Avg Daily Visits
                          </span>
                        </div>
                      </div>
                      {loading ? (
                        <div>
                          <LinearProgress />
                        </div>
                      ) : (
                        <LineChart
                          options={visitOptions}
                          series={visitSeries}
                        />
                      )}
                    </Card>
                  </Col>
                </>
              ) : (
                <>
                  <Col xl={12} className='px-0'>
                    <Row>
                      <Col md='12' xl='6' className='mt-4'>
                        <Card className='shadow mt-3'>
                          <h3 className='mt-2 pl-3'>Best Sellers</h3>
                          <BarChart
                            options={bestSellers}
                            series={bestSellersSeries}
                          />
                        </Card>
                      </Col>
                      <Col md='12' xl='6' className='mt-4'>
                        <Card className='shadow mt-3 '>
                          <h3 className='mt-2 pl-3'>Worst Sellers</h3>
                          <BarChart
                            options={worstSeller}
                            series={worstSellerSeries}
                          />
                        </Card>
                      </Col>
                      <Col md='12' xl='6' className='mt-4'>
                        <Card className='shadow mt-3 '>
                          <h3 className='mt-2 pl-5'>Most Viewed Items</h3>
                          <BarChart
                            options={mostViewedProducts}
                            series={mostViewedSeries}
                          />
                        </Card>
                      </Col>

                      <Col md='12' xl='6' className='mt-4'>
                        <Card className='shadow mt-3 '>
                          <h3 className='mt-2 pl-3'>Least Viewed Items</h3>
                          <BarChart
                            options={leastViewedProducts}
                            series={leastViewedSeries}
                          />
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  {/* Order analysis and Revenue earned  */}
                  <Col xl={12} className='px-0'>
                    <Row>
                      <Col md='8' xl='8' className='mt-4 h-100'>
                        <Card className='shadow mt-3'>
                          {restaurantAnalysisLoader ? (
                            <CardBody className='d-flex justify-content-center align-items-center'>
                              {' '}
                              <LinearProgress />
                            </CardBody>
                          ) : (
                            <>
                              {' '}
                              {/* <div className='d-lg-flex justify-content-between py-3 px-2'> */}
                              <CardHeader>
                                <h3 className='mt-2 pl-3'>Order Analysis</h3>

                                <div className='d-lg-flex align-items-center'>
                                  <div>
                                    <span className='mx-2 fs-12'>
                                      <svg
                                        className='mx-2'
                                        width='8'
                                        height='8'
                                        viewBox='0 0 8 8'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <circle
                                          cx='4'
                                          cy='4'
                                          r='4'
                                          fill='#19CB98'
                                        />
                                      </svg>
                                      Active
                                    </span>
                                    <span className='mx-2 fs-12'>
                                      <svg
                                        className='mx-2'
                                        width='8'
                                        height='8'
                                        viewBox='0 0 8 8'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <circle
                                          cx='4'
                                          cy='4'
                                          r='4'
                                          fill='#19CB98'
                                        />
                                      </svg>
                                      Completed
                                    </span>
                                    <span className='mx-2 fs-12'>
                                      <svg
                                        className='mx-2'
                                        width='8'
                                        height='8'
                                        viewBox='0 0 8 8'
                                        fill='none'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <circle
                                          cx='4'
                                          cy='4'
                                          r='4'
                                          fill='#19CB98'
                                        />
                                      </svg>
                                      Pending
                                    </span>
                                  </div>

                                  {/* <div class='dropdown'>
                                    <button
                                      class='btn btn-outline  chart-btn dropdown-toggle'
                                      type='button'
                                      id='dropdownMenuButton'
                                      data-toggle='dropdown'
                                      aria-haspopup='true'
                                      aria-expanded='false'
                                    >
                                      Monthly
                                    </button>
                                    <div
                                      class='dropdown-menu'
                                      aria-labelledby='dropdownMenuButton'
                                    >
                                      <a class='dropdown-item' href='#'>
                                        Day
                                      </a>
                                      <a class='dropdown-item' href='#'>
                                        Month
                                      </a>
                                    </div>
                                  </div> */}
                                </div>
                                {/* </div> */}
                              </CardHeader>
                              <LineChart
                                options={OrderAnalysisOptions}
                                series={restaurantAnalysisSeries}
                              />
                            </>
                          )}
                        </Card>
                      </Col>
                      <Col md='4' xl='4' className='mt-4'>
                        <Card
                          className='shadow mt-3'
                          style={{ height: '530px' }}
                        >
                          {revenueLoader ? (
                            <CardBody className='d-flex justify-content-center align-items-center'>
                              <LinearProgress />
                            </CardBody>
                          ) : (
                            <>
                              <CardHeader>
                                <div>
                                  <span className='fs-14'>Revenue Earned</span>
                                </div>
                                <h2>{totalRevenue ? totalRevenue : 0}</h2>
                              </CardHeader>

                              <PieChart
                                chartOptions={revenueOptions}
                                chartSeries={revenueSeries}
                                type='pie'
                              />
                            </>
                          )}
                        </Card>
                      </Col>
                    </Row>
                  </Col>
                  {/* Top performing products and top Customers  */}
                  {/* <Col xl={12}>
                    <Row>
                      <Col md="8" xl="8" className="mt-4">
                        <Card className="shadow mt-3">
                          <div className="d-lg-flex justify-content-between py-3 px-2">
                            <h3 className="mt-2 pl-3">
                              Top Performing Products
                            </h3>
                            <div>
                              <div class="dropdown">
                                <button
                                  class="btn btn-outline  chart-btn dropdown-toggle"
                                  type="button"
                                  id="dropdownMenuButton"
                                  data-toggle="dropdown"
                                  aria-haspopup="true"
                                  aria-expanded="false"
                                >
                                  Download
                                </button>
                                <div
                                  class="dropdown-menu"
                                  aria-labelledby="dropdownMenuButton"
                                >
                                  <a class="dropdown-item" href="#">
                                    Day
                                  </a>
                                  <a class="dropdown-item" href="#">
                                    Month
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <BarChart
                            options={TopProducts}
                            series={ProductsSeries}
                          />
                        </Card>
                      </Col>
                      <Col md="4" xl="4" className="mt-4 h-100">
                        <Card className="shadow mt-3 ">
                          <div className="d-flex justify-content-between align-items-center p-3">
                            <div>
                              <div>
                                <span className="fs-14">Top Customers</span>
                              </div>
                              <h2>5.987,34</h2>
                            </div>

                            <div className="d-flex flex-column">
                              <span className="mx-2 fs-12">
                                <svg
                                  className="mx-2"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="4" cy="4" r="4" fill="#19CB98" />
                                </svg>
                                New Customers
                              </span>
                              <span className="mx-2 fs-12">
                                <svg
                                  className="mx-2"
                                  width="8"
                                  height="8"
                                  viewBox="0 0 8 8"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <circle cx="4" cy="4" r="4" fill="#19CB98" />
                                </svg>
                                Returning Customers
                              </span>
                            </div>
                          </div>

                          <TotalCustomerChart />
                        </Card>
                      </Col>
                    </Row>
                  </Col> */}
                  {/* Visit Chart  */}
                  <Col xl={12} className='px-0 mt-5'>
                    <Card>
                      {visitsLoader ? (
                        <CardBody className='d-flex justify-content-center align-items-center'>
                          <LinearProgress />
                        </CardBody>
                      ) : (
                        <>
                          {' '}
                          <div className='d-flex justify-content-between mx-5 mt-4'>
                            <div>
                              <h4 className='mb-0'>Visits</h4>
                              <span className='text-muted fs-12'>By Month</span>
                            </div>
                            <div>
                              <h4 className='mb-0'>{averageVisits}</h4>
                              <span className='text-muted fs-12'>
                                Avg Daily Visits
                              </span>
                            </div>
                          </div>
                          <LineChart
                            options={visitOptions}
                            series={visitRestaurantSeries}
                          />
                        </>
                      )}
                    </Card>
                  </Col>
                </>
              )}
            </>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Header
