import { cardSuperAdminData } from '../../helpers/headerCardsData'
import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Card, Col, Row } from 'reactstrap'
import { getRestaurantStatsById } from '../../store/actions/statsActions'
import { getRestaurantStats } from '../../store/actions/statsActions'
import { CardBody, CardTitle, Container } from 'reactstrap'

const HeaderCards = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { restaurantStats, loading, currentRestaurantStats } = useSelector(
    state => state.stats
  )
  const cardSuperAdminData = [
    {
      card_no: restaurantStats?.totalCustomers?.total || 0,
      card_topIcon: 'fa-solid fa-users',
      card_name: 'Total Customers',
      card_percent: '10.2%',
      card_text: '+1.01% this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    },
    {
      card_no: restaurantStats?.totalMerchants || 0,
      card_topIcon: 'fa-solid fa-cart-shopping',
      card_name: 'Total Merchants',
      card_percent: '3.1%',
      card_text: '+0.49% this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    },
    {
      card_no: restaurantStats?.churnRate || 0,
      card_topIcon: 'fa-solid fa-circle-check',
      card_name: 'Churn Rate',
      card_percent: '2.56%',
      card_text: '-0.91 this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    },
    {
      card_no: restaurantStats?.ltv || 0,
      card_topIcon: 'fa-solid fa-dollar-sign',
      card_name: 'LTV',
      card_percent: '7.2',
      card_text: '+1.51% this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    }
  ]
  const cardRestaurantData = [
    {
      card_no: currentRestaurantStats?.customers || 0,
      card_topIcon: 'fas fa-chart-bar',
      card_name: 'Total Customers',
      card_percent: '10.2%',
      card_text: '+1.01% this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    },
    {
      card_no: currentRestaurantStats?.averageOrderCost || 0,
      card_topIcon: 'fa-solid fa-cart-shopping',
      card_name: 'Average Order Cost',
      card_percent: '3.1%',
      card_text: '+0.49% this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    },
    {
      card_no: currentRestaurantStats?.orders || 0,
      card_topIcon: 'fa-solid fa-circle-check',
      card_name: 'Total Orders',
      card_percent: '2.56%',
      card_text: '-0.91 this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    },
    {
      card_no: currentRestaurantStats?.requests || 0,
      card_topIcon: 'fa-solid fa-dollar-sign',
      card_name: 'Requests',
      card_percent: '7.2',
      card_text: '+1.51% this Month',
      cardBottom_icon: 'fas fa-arrow-up '
    }
  ]

  useEffect(() => {
    if (user?.type == 'admin') {
      // dispatch(getRestaurantStats())
    } else if (user?.type === 'restaurant') {
      // dispatch(getRestaurantStatsById(user?.restaurantID))
    }
  }, [])
  return (
    // <Card className='header-cards card mx-3'>
    //   <Row className='row '>
    //     {user?.type === 'restaurant' &&
    //       cardRestaurantData?.map(item => (
    //         <Col lg={3} md={6} xs={12} className='header-cards__col'>
    //           <Card className='p-4 border-0'>
    //             <div className='d-flex justify-content-between align-items-center'>
    //               <h1 className='mb-0'>{item?.card_no ? item?.card_no : 0}</h1>
    //               <div className='shadow-lg'>
    //                 <i className={`text-primary ${item?.card_topIcon}`}></i>
    //               </div>
    //             </div>
    //             <span className='fs-16 mb-2 text-nowrap'>
    //               {item?.card_name}
    //             </span>
    //             <div className='d-flex justify-content-around align-items-center fs-12'>
    //               <span>{item?.card_percent}</span>
    //               <span>{item?.card_text}</span>
    //             </div>
    //           </Card>
    //           <div className='divider'></div>
    //         </Col>
    //       ))}
    //     {user?.type === 'admin' &&
    //       cardSuperAdminData?.map(item => (
    //         <Col lg={3} md={6} xs={12} className='header-cards__col'>
    //           <Card className='p-4 border-0'>
    //             <div className='d-flex justify-content-between align-items-center'>
    //               <h1 className='mb-0'>{item?.card_no ? item?.card_no : 0}</h1>
    //               <div className='shadow-lg'>
    //                 <i className={`text-primary ${item?.card_topIcon}`}></i>
    //               </div>
    //             </div>
    //             <span className='fs-16 mb-2'>{item?.card_name}</span>
    //             <div className='d-flex justify-content-around align-items-center fs-12'>
    //               <i className='fa-solid fa-square-arrow-up-right text-success'></i>
    //               <span>{item?.card_percent}</span>
    //               <span>{item?.card_text}</span>
    //             </div>
    //           </Card>
    //           <div className='divider'></div>
    //         </Col>
    //       ))}
    //   </Row>
    // </Card>
    <Container fluid>
      <div className='header-body'>
        {/* Card stats */}
        <Row>
          <Col lg='6' xl='3'>
            <Card className='card-stats mb-4 mb-xl-0'>
              <CardBody>
                <Row>
                  <div className='col'>
                    <CardTitle
                      tag='h5'
                      className='text-uppercase text-muted mb-0'
                    >
                      Total Customers
                    </CardTitle>
                    <span className='h2 font-weight-bold mb-0'>350,897</span>
                  </div>
                  <Col className='col-auto'>
                    <div className='icon icon-shape text-danger rounded-circle shadow'>
                      <i className='fas fa-chart-bar' />
                    </div>
                  </Col>
                </Row>
                <p className='mt-3 mb-0 text-muted text-sm'>
                  <span className='text-success mr-2'>
                    <i className='fa fa-arrow-up' /> 3.48%
                  </span>{' '}
                  <span className='text-nowrap'>Since last month</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg='6' xl='3'>
            <Card className='card-stats mb-4 mb-xl-0'>
              <CardBody>
                <Row>
                  <div className='col'>
                    <CardTitle
                      tag='h5'
                      className='text-uppercase text-muted mb-0'
                    >
                      Average Order Cost
                    </CardTitle>
                    <span className='h2 font-weight-bold mb-0'>2,356USD</span>
                  </div>
                  <Col className='col-auto'>
                    <div className='icon icon-shape text-warning rounded-circle shadow'>
                      <i className='fas fa-chart-pie' />
                    </div>
                  </Col>
                </Row>
                <p className='mt-3 mb-0 text-muted text-sm'>
                  <span className='text-danger mr-2'>
                    <i className='fas fa-arrow-down' /> 3.48%
                  </span>{' '}
                  <span className='text-nowrap'>Since last week</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg='6' xl='3'>
            <Card className='card-stats mb-4 mb-xl-0'>
              <CardBody>
                <Row>
                  <div className='col'>
                    <CardTitle
                      tag='h5'
                      className='text-uppercase text-muted mb-0'
                    >
                      Total Orders
                    </CardTitle>
                    <span className='h2 font-weight-bold mb-0'>924</span>
                  </div>
                  <Col className='col-auto'>
                    <div className='icon icon-shape text-yellow rounded-circle shadow'>
                      <i className='fas fa-users' />
                    </div>
                  </Col>
                </Row>
                <p className='mt-3 mb-0 text-muted text-sm'>
                  <span className='text-warning mr-2'>
                    <i className='fas fa-arrow-down' /> 1.10%
                  </span>{' '}
                  <span className='text-nowrap'>Since yesterday</span>
                </p>
              </CardBody>
            </Card>
          </Col>
          <Col lg='6' xl='3'>
            <Card className='card-stats mb-4 mb-xl-0'>
              <CardBody>
                <Row>
                  <div className='col'>
                    <CardTitle
                      tag='h5'
                      className='text-uppercase text-muted mb-0'
                    >
                      Requests
                    </CardTitle>
                    <span className='h2 font-weight-bold mb-0'>1404</span>
                  </div>
                  <Col className='col-auto'>
                    <div className='icon icon-shape text-info rounded-circle shadow'>
                      <i className='fas fa-percent' />
                    </div>
                  </Col>
                </Row>
                <p className='mt-3 mb-0 text-muted text-sm'>
                  <span className='text-success mr-2'>
                    <i className='fas fa-arrow-up' /> 12%
                  </span>{' '}
                  <span className='text-nowrap'>Since last month</span>
                </p>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </Container>
  )
}

export default HeaderCards
