import OnlyHeader from '../components/Headers/OnlyHeader'
import React, { useEffect, useState } from 'react'

import {
  Table,
  Button,
  Row,
  Container,
  Card,
  CardHeader,
  Input,
  Col,
  ButtonGroup,
  Spinner
} from 'reactstrap'
import { useRef } from 'react'
import moment, { weekdays } from 'moment'
import { DateRangePicker } from 'react-date-range'
import PieChart from '../components/Charts/PieChart'
import { addDays } from 'date-fns'
import BarChart from '../components/Charts/BarChart'
import { useDispatch, useSelector } from 'react-redux'
import HeaderCards from '../components/Headers/HeaderCards'
import AddRestaurantModal from '../components/Modals/AddRestaurantModal'
import { getPeakHours } from '../store/actions/statsActions'
import { getTotalCustomers } from '../store/actions/statsActions'

import { getOrderFrequency } from '../store/actions/statsActions'
import { getProducts } from '../store/actions/statsActions'
import { getTotalMethodPercentage } from '../store/actions/statsActions'

function Orders () {
  const dispatch = useDispatch()
  const [modal, setModal] = useState(false)

  const toggle = () => setModal(!modal)
  const [pay, setPay] = useState('')

  const [value, setValue] = useState(null)
  const [isOpen, setIsOpen] = useState(false)
  const { user } = useSelector(state => state.auth)
  const {
    peakHours,
    totalCustomers,
    order_frequency,
    totalPaymentMethods,
    productsData,
    productLoading,
    frequencyLoading,
    peakLoading,
    customerLoading
  } = useSelector(state => state.stats)
  const ref = useRef(null)
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

  // console.log("this is order frequency", { order_frequency });

  const [filterValue, setFilterValue] = useState('month')

  useEffect(() => {
    if (filterValue === 'range') {
      const payload = {
        type: filterValue,
        startDate: moment(datestate[0].startDate).format('DD-MM-YYYY'),
        endDate: moment(datestate[0].endDate).format('DD-MM-YYYY')
      }
      // dispatch(getPeakHours(payload))
      // dispatch(getTotalCustomers(payload))
      // dispatch(getOrderFrequency(payload))
      // dispatch(getTotalMethodPercentage(payload))
    } else {
      // dispatch(getPeakHours(filterValue))
      // dispatch(getTotalCustomers(filterValue))
      // dispatch(getOrderFrequency(filterValue))
      // dispatch(getTotalMethodPercentage(filterValue))
    }
  }, [filterValue])

  useEffect(() => {
    // dispatch(getProducts())
  }, [])

  const chartOptions = {
    colors: ['#16BFD6', '#F765A3'],

    fill: {
      colors: ['#16BFD6', '#F765A3']
    },
    chart: {
      type: 'pie'
    },
    labels: ['Males', 'Females']
  }

  const chartSeries = Object.entries(totalCustomers)
    .map(([key, value]) => {
      return key !== 'total' ? value : null
    })
    .filter(num => num !== null)

  const paymentSeries =
    totalPaymentMethods?.paymentMethods &&
    Object.entries(totalPaymentMethods?.paymentMethods)
      .map(([key, value]) => {
        return key !== 'total' ? value : null
      })
      .filter(num => num !== null)

  const [options, setOptions] = useState({})
  const [weekOptions, setWeekOptions] = useState({})

  const [series, setSeries] = useState([
    {
      name: 'Peak Hours',
      data: []
    }
  ])
  let weekDays = []
  let freqWeekDays = []

  useEffect(async () => {
    if (filterValue == 'week') {
      let week = []
      Object.entries(peakHours).map(([key, value]) => {
        const date = new Date(key)
        const dayOfWeek = date.toLocaleDateString('en-US', {
          weekday: 'short'
        })
        week.push(dayOfWeek)
      })
      weekDays = week
    }
  }, [peakHours])

  useEffect(() => {
    if (Object.keys(peakHours).length > 0) {
      let tempData = Object?.entries(peakHours)?.map(([key, value]) => {
        return value
      })
      setOptions({
        chart: {
          type: 'bar',
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
            'June',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec'
          ]
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'flat',
            columnWidth: '55%',
            barHeight: '70%',
            distributed: false,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 100,
                  color: '#5068EE'
                },
                {
                  from: 100,
                  to: 200,
                  color: '#5068EE'
                },
                {
                  from: 200,
                  to: 300,
                  color: '#16BFD6'
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
            return val + ' users'
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: []
          }
        }
      })
      setSeries([
        {
          name: 'Peak Hours',
          data: tempData
        }
      ])
    }
  }, [peakHours])

  useEffect(() => {
    if (filterValue == 'week') {
      setWeekOptions({
        chart: {
          type: 'bar',
          toolbar: {
            show: false
          }
        },
        xaxis: {
          categories: weekDays
        },
        plotOptions: {
          bar: {
            horizontal: false,
            endingShape: 'flat',
            columnWidth: '55%',
            barHeight: '70%',
            distributed: false,
            colors: {
              ranges: [
                {
                  from: 0,
                  to: 100,
                  color: '#5068EE'
                },
                {
                  from: 100,
                  to: 200,
                  color: '#5068EE'
                },
                {
                  from: 200,
                  to: 300,
                  color: '#16BFD6'
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
            return val + ' users'
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: []
          }
        }
      })
    }
  }, [peakHours])

  const [paymentOptions, setPaymentOptions] = useState({
    chart: {
      type: 'donut'
    },
    colors: ['#F765A3', '#16BFD6', '#19CB98', '#FFAA46'],
    fill: {
      colors: ['#F765A3', '#16BFD6', '#19CB98', '#FFAA46']
    },
    labels: ['Stripe', 'Females'],
    legend: {
      show: false
    },
    dataLabels: {
      enabled: false
    },
    tooltip: {
      enabled: true
    },
    labels:
      totalPaymentMethods?.paymentMethods &&
      Object.entries(totalPaymentMethods?.paymentMethods).map(
        ([key, value]) => {
          return key
        }
      )
  })

  const [orderFrequency, setOrderFrequency] = useState({
    options: {
      chart: {
        type: 'bar',
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
      fill: {
        colors: ['#F765A3']
      },
      dataLabels: {
        enabled: false
      },
      tooltip: {
        enabled: false
      }
    },
    series: [
      {
        name: 'Orders',
        data: Object.entries(order_frequency).map(([key, value]) => {
          return value
        })
      }
    ]
  })
  useEffect(async () => {
    if (filterValue == 'week') {
      let week = []
      Object.entries(order_frequency).map(([key, value]) => {
        const date = new Date(key)
        const dayOfWeek = date.toLocaleDateString('en-US', {
          weekday: 'short'
        })
        week.push(dayOfWeek)
      })
      freqWeekDays = week
    }
  }, [order_frequency])

  useEffect(() => {
    if (Object.keys(order_frequency).length > 0) {
      let tempData = Object?.entries(order_frequency)?.map(([key, value]) => {
        return value
      })
      if (filterValue == 'week') {
        setOrderFrequency({
          series: [
            {
              name: 'Orders',
              data: tempData
            }
          ],
          options: {
            chart: {
              type: 'bar',
              toolbar: {
                show: false
              }
            },

            xaxis: {
              categories: freqWeekDays
            },
            fill: {
              colors: ['#F765A3']
            },
            dataLabels: {
              enabled: false
            },
            tooltip: {
              enabled: false
            }
          }
        })
      } else {
        setOrderFrequency({
          ...orderFrequency,
          series: [
            {
              name: 'Orders',
              data: tempData
            }
          ]
        })
      }
    }
  }, [order_frequency])

  const [datestate, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: 'selection'
    }
  ])

  const dateRangeString =
    datestate.length > 0
      ? `${moment(datestate[0].startDate).format('DD MMM YYYY')} - ${moment(
          datestate[0].endDate
        ).format('DD MMM YYYY')}`
      : `${moment().format('DD MMM YYYY')} - ${moment().format('DD MMM YYYY')}`
  return (
    // <div className='orders pb-8 pt-5 pt-md-7'>
    <>
      <OnlyHeader />
      <Container className='mt--7' fluid>
        <Container fluid>
          <Row className='row my-2'>
            <Col className='d-flex justify-content-between align-items-center'>
              <h2>Orders</h2>

              <Button color='danger'>Export Pdf</Button>
            </Col>
          </Row>
          <Row className='row  my-3'>
            <Col className='d-lg-flex justify-content-between align-items-center'>
              <ButtonGroup>
                {/* <Button>Day</Button> */}
                <Button onClick={() => setFilterValue('week')}>Week</Button>
                <Button onClick={() => setFilterValue('month')}>Month</Button>
              </ButtonGroup>

              <div className='d-lg-flex d-sm-block'>
                <Button
                  color='danger'
                  className='btn btn-danger btn-block my-3 my-lg-0'
                  size='sm'
                >
                  Select Merchant
                </Button>
                <div ref={ref}>
                  <Input
                    value={dateRangeString}
                    className='pointer'
                    onClick={() => setIsOpen(!isOpen)}
                    readOnly
                  />
                  {isOpen && (
                    <DateRangePicker
                      onChange={item => {
                        setDateState([item.selection])
                        setFilterValue('range')
                      }}
                      showSelectionPreview={true}
                      moveRangeOnFirstSelection={false}
                      months={2}
                      ranges={datestate}
                      direction='horizontal'
                      preventSnapRefocus={true}
                      calendarFocus='backwards'
                      className='dateRangerSet'
                    />
                  )}
                </div>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid>
          <HeaderCards />
        </Container>
        <Container fluid>
          <Row className='row  my-3 charts'>
            <Col md={8}>
              <Card className='p-3'>
                <h2 className='py-4 mb-0 px-3'>Peak Hours</h2>
                {peakLoading ? (
                  <div>
                    <Spinner
                      className='d-flex mx-auto'
                      size='sm'
                      color='primary'
                    />
                  </div>
                ) : (
                  <BarChart
                    options={filterValue === 'week' ? weekOptions : options}
                    series={series}
                  />
                )}
              </Card>
            </Col>
            <Col md='4' xl='4' className=' h-100'>
              <Card className='shadow pb-4'>
                <CardHeader className='mb-4'>
                  <div className='d-flex justify-content-between align-items-center'>
                    <div>
                      <div>
                        <span className='fs-14'>Total Customers</span>
                      </div>
                      <h2>{totalCustomers?.total || 0}</h2>
                    </div>
                    {/* <i className="fa-solid fa-info"></i> */}
                  </div>
                </CardHeader>
                {customerLoading ? (
                  <div>
                    <Spinner
                      className='d-flex mx-auto'
                      size='sm'
                      color='primary'
                    />
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

          <Row className='row  my-3 charts'>
            <Col md={8}>
              <Card className='p-3'>
                <h2 className='py-4 px-3 mb-0'>Order Frequency</h2>
                {frequencyLoading ? (
                  <div>
                    <Spinner
                      className='d-flex mx-auto'
                      size='sm'
                      color='primary'
                    />
                  </div>
                ) : (
                  <BarChart
                    options={orderFrequency.options}
                    series={orderFrequency.series}
                  />
                )}
              </Card>
            </Col>
            <Col md='4' xl='4' className=' h-100'>
              <Card className='shadow  p-3'>
                <h2>Payment Method</h2>
                <PieChart
                  chartOptions={paymentOptions}
                  chartSeries={paymentSeries}
                  type='pie'
                />
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='4' cy='4' r='4' fill='#16BFD6' />
                    </svg>
                    <span className='mx-2 fs-12'>Paypal</span>
                  </div>
                  <div className='d-flex  fs-12'>
                    <span className='mx-2'>
                      {totalPaymentMethods?.paymentMethods?.Paypal
                        ? totalPaymentMethods?.paymentMethods?.Paypal
                        : 0}
                    </span>
                    <span>
                      {totalPaymentMethods?.paymentMethods?.Paypal &&
                        (
                          (totalPaymentMethods?.paymentMethods?.Paypal /
                            totalPaymentMethods.total) *
                          100
                        ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>{' '}
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='4' cy='4' r='4' fill='#F765A3' />
                    </svg>

                    <span className='mx-2 fs-12'>Stripe</span>
                  </div>
                  <div className='d-flex  fs-12'>
                    <span className='mx-2'>
                      {totalPaymentMethods?.paymentMethods?.Stripe
                        ? totalPaymentMethods?.paymentMethods?.Stripe
                        : 0}
                    </span>
                    <span>
                      {totalPaymentMethods?.paymentMethods?.Stripe &&
                        (
                          (totalPaymentMethods?.paymentMethods?.Stripe /
                            totalPaymentMethods.total) *
                          100
                        ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>{' '}
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='4' cy='4' r='4' fill='#19CB98' />
                    </svg>

                    <span className='mx-2 fs-12'>Cash</span>
                  </div>
                  <div className='d-flex  fs-12'>
                    <span className='mx-2'>
                      {totalPaymentMethods?.paymentMethods?.cash
                        ? totalPaymentMethods?.paymentMethods?.cash
                        : 0}
                    </span>
                    <span>
                      {totalPaymentMethods?.paymentMethods?.cash &&
                        (
                          (totalPaymentMethods?.paymentMethods?.cash /
                            totalPaymentMethods.total) *
                          100
                        ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>{' '}
                <div className='d-flex justify-content-between align-items-center'>
                  <div>
                    <svg
                      width='8'
                      height='8'
                      viewBox='0 0 8 8'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <circle cx='4' cy='4' r='4' fill='#FFAA46' />
                    </svg>

                    <span className='mx-2 fs-12'>Card</span>
                  </div>
                  <div className='d-flex  fs-12'>
                    <span className='mx-2'>
                      {totalPaymentMethods?.paymentMethods?.card
                        ? totalPaymentMethods?.paymentMethods?.card
                        : 0}
                    </span>
                    <span>
                      {totalPaymentMethods?.paymentMethods?.card &&
                        (
                          (totalPaymentMethods?.paymentMethods?.card /
                            totalPaymentMethods.total) *
                          100
                        ).toFixed(1)}
                      %
                    </span>
                  </div>
                </div>{' '}
              </Card>
            </Col>
          </Row>
          <Row className='justify-content-around mt-5 charts'>
            <Col md={12}>
              <Card className='p-3'>
                {/* <h2>Product Quality</h2>
              <ReactApexChart
                options={chartData.options}
                series={chartData.series}
                type="bar"
                height={400}
              /> */}
                <CardHeader>Orders</CardHeader>
                <Table
                  className='align-items-center table-flush mt-3'
                  responsive
                >
                  <tr>
                    <th scope='col'>
                      Products <i className='fa fa-arrow-down'></i>
                    </th>
                    <th scope='col' className='text-center'>
                      Age Range For Male
                    </th>
                    <th scope='col' className='text-center'>
                      Age Range For Female
                    </th>
                    <th scope='col' className='text-center'>
                      Sold Male
                    </th>
                    <th scope='col' className='text-center'>
                      Sold Female
                    </th>
                    <th scope='col' className='text-center'>
                      Quantity
                    </th>
                  </tr>
                  <tbody>
                    {productLoading ? (
                      <div>
                        <Spinner
                          className='d-flex mx-auto'
                          size='sm'
                          color='primary'
                        />
                      </div>
                    ) : (
                      productsData?.map((product, idx) => {
                        return (
                          <tr key={idx}>
                            <td scope='row'>
                              <div className='d-flex align-items-center'>
                                <img
                                  src={
                                    product?.productImages[0]?.url
                                      ? product?.productImages[0]?.url
                                      : ''
                                  }
                                  className='mx-2'
                                  style={{
                                    borderRadius: '10%',
                                    width: '35px',
                                    height: '25px'
                                  }}
                                  alt=''
                                />
                                <span className='my-2 text-center'>
                                  {product?.productName}
                                </span>
                              </div>
                            </td>
                            <td className='text-center'>
                              {' '}
                              {product?.age_group ? product?.age_group : 0}
                            </td>
                            <td className='text-center'>
                              {product?.age_group_female
                                ? product?.age_group_female
                                : 0}
                            </td>
                            <td className='text-center'>{product?.male}</td>
                            <td className='text-center'>{product?.female}</td>
                            <td className='text-center'>
                              {product?.male + product?.female}
                            </td>
                          </tr>
                        )
                      })
                    )}
                  </tbody>
                </Table>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Orders
