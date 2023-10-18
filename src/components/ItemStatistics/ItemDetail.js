import React, { useEffect, useState } from 'react'
import OnlyHeader from '../Headers/OnlyHeader'
import { Container } from 'reactstrap'
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  ThemeProvider,
  Button,
  Box,
  CardMedia,
  Typography,
  Paper
} from '@mui/material'
import { Link, useHistory } from 'react-router-dom'
import { ThemeMain } from '../common/Theme'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ProductImage from '../../assets/common/statistic/product.png'
import LineChart from '../Charts/LineChart'
import PickDateRange from '../../views/auth/PickDateRange'
import { addDays } from 'date-fns'
import ItemRankingForm from './ItemRankingForm'
import ItemCompare from './ItemCompare'
import { useDispatch, useSelector } from 'react-redux'
import { getItemDetail } from '../../store/actions/statisticAction'

export default function ItemDetail (props) {
  const history = useHistory()
  const dispatch = useDispatch()

  const { itemDetail, totalRevenue, totalRevenueByCategory } = useSelector(
    state => state.statistic
  )

  const [currentPage, setCurrentPage] = useState('detail')
  const [currentItem, setCurrentItem] = useState({})
  const [itemID, setItemID] = useState('')

  // Defined by smile
  useEffect(() => {
    setItemID(props.match.params.id)
  }, [])

  useEffect(() => {
    if (itemID) dispatch(getItemDetail(itemID))
  }, [itemID])

  useEffect(() => {
    setCurrentItem({
      itemID: props.match.params.id,
      menuName: itemDetail.menuName,
      categoryName: itemDetail.categoryName,
      price: itemDetail.price,
      cost: itemDetail.cost,
      profitMargin: itemDetail.price - itemDetail.cost,
      profitMarginPercent: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(
        ((itemDetail.price - itemDetail.cost) / itemDetail.price) * 100
      ),
      averageClickPerDay: 200,
      averageViewTime: 2000,
      conversionRate: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(itemDetail.purchase / itemDetail.views),
      revenueGenerated:
        (itemDetail.price - itemDetail.cost) * itemDetail.purchase,
      averagePurchasePerDay: 200,
      revenueOfMenu: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(
        ((itemDetail.price - itemDetail.cost) * itemDetail.purchase * 100) /
          totalRevenue
      ),
      revenueOfCategory: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(
        ((itemDetail.price - itemDetail.cost) * itemDetail.purchase * 100) /
          totalRevenueByCategory
      ),
      peakOrderTime: '12 PM - 2 PM'
    })
  }, [itemDetail])

  // Chart definition
  const [dateState, setDateState] = useState([
    {
      startDate: addDays(new Date(), -31),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const handleDateChange = ranges => {
    setDateState(ranges)
  }

  const generateDateRange = (startDate, endDate) => {
    const dates = []
    const currentDate = new Date(startDate)
    while (currentDate <= endDate) {
      dates.push(currentDate.toISOString())
      currentDate.setDate(currentDate.getDate() + 1)
    }
    return dates
  }

  // const [itemDetail, setItemDetail] = useState({
  //   series: [
  //     {
  //       name: 'High - 2013',
  //       data: [28, 29, 63, 36, 12, 32, 33, 83, 87, 56, 56, 67]
  //     }
  //   ],
  //   options: {
  //     // stroke: {
  //     //   curve: 'smooth'
  //     // },
  //     chart: {
  //       type: 'line',
  //       dropShadow: {
  //         enabled: true,
  //         color: '#000',
  //         top: 18,
  //         left: 7,
  //         blur: 10,
  //         opacity: 0.2
  //       },
  //       toolbar: {
  //         show: false
  //       }
  //     },
  //     colors: ['#0074D9'],
  //     dataLabels: {
  //       enabled: false
  //     },
  //     grid: {
  //       borderColor: '#e7e7e7',
  //       row: {
  //         colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
  //         opacity: 0.5
  //       }
  //     },
  //     markers: {
  //       size: 1
  //     },
  //     xaxis: {
  //       type: 'datetime',
  //       categories: generateDateRange(
  //         dateState[0].startDate,
  //         dateState[0].endDate
  //       ),
  //       stroke: {
  //         curve: 'smooth'
  //       },
  //       legend: {
  //         show: false
  //       },

  //       curve: 'smooth'
  //     },
  //     yaxis: {}
  //   }
  // })

  const [viewTimeRanking, setViewTimeRanking] = useState({
    items: ['Pasta', 'Fries', 'Burger', 'Bread', 'Salad', 'Cheese'],
    parentMenus: [
      'Light Food',
      'Light Food',
      'Light Food',
      'Light Food',
      'Meal',
      'Meal'
    ],
    times: ['54', '234', '23', '12', '65', '33']
  })

  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          {/* <IconButton
            color='primary'
            onClick={() => {
              history.goBack()
            }}
            sx={{
              boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
              marginBottom: '15px',
              marginTop: '10px',
              display: 'flex',
              justifyContent: 'left',
              marginLeft: '40px'
            }}
          >
            <ArrowBackIosNewIcon sx={{ marginRight: '3px' }} />
          </IconButton> */}
          <Container fluid>
            {currentPage === 'detail' ? (
              <Grid container>
                <Grid item xs={12}>
                  <Card sx={{ boxShadow: 'none' }}>
                    <CardContent>
                      <Box
                        display={'flex'}
                        justifyContent={'right'}
                        alignItems={'center'}
                      >
                        {/* <Link to={`/admin/item-compare/${itemID}`}> */}
                        <Button
                          variant='contained'
                          sx={{ marginRight: '20px' }}
                          onClick={() => {
                            setCurrentPage('compare')
                          }}
                        >
                          Compare
                        </Button>
                        {/* </Link> */}
                        <Button
                          variant='contained'
                          sx={{ marginRight: '20px' }}
                        >
                          Edit
                        </Button>
                        <Button variant='outlined'>
                          <MoreHorizIcon />
                        </Button>
                      </Box>
                      <Grid container marginTop={'10px'}>
                        <Grid item xs={12} md={4} lg={3}>
                          <CardMedia
                            component='img'
                            image={ProductImage}
                            alt='Product'
                          />
                        </Grid>
                        <Grid item xs={12} md={8} lg={9}>
                          <Typography
                            marginLeft={'30px'}
                            fontWeight={'bold'}
                            fontSize={'25px'}
                            textAlign={'left'}
                          >
                            {currentItem.menuName}
                          </Typography>
                          <Typography
                            fontSize={'18px'}
                            marginTop={'15px'}
                            marginLeft={'30px'}
                            textAlign={'left'}
                          >
                            {currentItem.categoryName}
                          </Typography>
                          <Grid
                            container
                            paddingLeft={4}
                            paddingRight={4}
                            paddingTop={2}
                            paddingBottom={2}
                            spacing={4}
                          >
                            <Grid item xs={12} md={3}>
                              <Paper
                                sx={{
                                  boxShadow: 'none',
                                  padding: '5px'
                                }}
                              >
                                <Typography
                                  fontWeight={'bold'}
                                  fontSize={'20px'}
                                  textAlign={'left'}
                                >
                                  ${currentItem.price}
                                </Typography>
                                <Typography textAlign={'left'}>
                                  Price
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Paper
                                sx={{
                                  boxShadow: 'none',
                                  padding: '5px'
                                }}
                              >
                                <Typography
                                  fontWeight={'bold'}
                                  fontSize={'20px'}
                                  textAlign={'left'}
                                >
                                  ${currentItem.cost}
                                </Typography>
                                <Typography textAlign={'left'}>
                                  Cost of Item
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Paper
                                sx={{
                                  boxShadow: 'none',
                                  padding: '5px'
                                }}
                              >
                                <Typography
                                  fontWeight={'bold'}
                                  fontSize={'20px'}
                                  textAlign={'left'}
                                >
                                  ${currentItem.profitMargin}
                                </Typography>
                                <Typography textAlign={'left'}>
                                  Profit Margin
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} md={3}>
                              <Paper
                                sx={{
                                  boxShadow: 'none',
                                  padding: '5px'
                                }}
                              >
                                <Typography
                                  fontWeight={'bold'}
                                  fontSize={'20px'}
                                  textAlign={'left'}
                                >
                                  {currentItem.profitMarginPercent}%
                                </Typography>
                                <Typography textAlign={'left'}>
                                  Profit Margin %
                                </Typography>
                              </Paper>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>Average Clicks per Day</Typography>
                                <Typography>
                                  {currentItem.averageClickPerDay}
                                </Typography>
                              </Box>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>Average View Time</Typography>
                                <Typography>
                                  {currentItem.averageViewTime}
                                </Typography>
                              </Box>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>Conversion Rate</Typography>
                                <Typography>
                                  {itemDetail.purchase === 0 ||
                                  itemDetail.views === 0
                                    ? 0
                                    : currentItem.conversionRate}
                                </Typography>
                              </Box>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>Revenue Generated</Typography>
                                <Typography>
                                  ${currentItem.revenueGenerated}
                                </Typography>
                              </Box>
                            </Grid>
                            <Grid item xs={12} lg={6}>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>
                                  Average Purchases per Day
                                </Typography>
                                <Typography>
                                  {currentItem.averagePurchasePerDay}
                                </Typography>
                              </Box>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>
                                  Revenue Share of Menu Item
                                </Typography>
                                <Typography>
                                  {currentItem.revenueOfMenu}%
                                </Typography>
                              </Box>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>
                                  Revenue Share of Menu Category
                                </Typography>
                                <Typography>
                                  {currentItem.revenueOfCategory}%
                                </Typography>
                              </Box>
                              <Box
                                marginBottom={2}
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography>Peak Order time </Typography>
                                <Typography>
                                  {currentItem.peakOrderTime}
                                </Typography>
                              </Box>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} marginBottom={2}>
                  <Card sx={{ marginTop: '20px', boxShadow: 'none' }}>
                    <CardContent>
                      <Box>
                        <Box display={'flex'} justifyContent={'space-between'}>
                          <Box>
                            <Typography
                              fontWeight={'bold'}
                              fontSize={'20px'}
                              textAlign={'left'}
                              marginLeft={'30px'}
                            >
                              Views
                            </Typography>
                          </Box>
                          <Box
                            display={'flex'}
                            alignItems={'center'}
                            marginRight={'25px'}
                          >
                            <Typography marginRight={'30px'}>
                              Average Views: 434
                            </Typography>
                            <PickDateRange
                              setDateState={handleDateChange}
                              datestate={dateState}
                            />
                          </Box>
                        </Box>
                        {/* <LineChart
                        options={itemDetail.options}
                        series={itemDetail.series}
                      /> */}
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={6}>
                    <ItemRankingForm
                      title={'View Time Ranking'}
                      items={viewTimeRanking.items}
                      parentMenus={viewTimeRanking.parentMenus}
                      times={viewTimeRanking.times}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ItemRankingForm
                      title={'Conversion Rate Ranking'}
                      items={viewTimeRanking.items}
                      parentMenus={viewTimeRanking.parentMenus}
                      times={viewTimeRanking.times}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ItemRankingForm
                      title={'Order Ranking'}
                      items={viewTimeRanking.items}
                      parentMenus={viewTimeRanking.parentMenus}
                      times={viewTimeRanking.times}
                    />
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <ItemRankingForm
                      title={'Category Order Ranking'}
                      items={viewTimeRanking.items}
                      parentMenus={viewTimeRanking.parentMenus}
                      times={viewTimeRanking.times}
                    />
                  </Grid>
                </Grid>
              </Grid>
            ) : (
              <ItemCompare
                currentItem={currentItem}
                setCurrentPage={setCurrentPage}
              />
            )}
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
