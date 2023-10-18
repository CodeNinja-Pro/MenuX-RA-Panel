import React, { useEffect, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Paper
} from '@mui/material'
import ProductImage from '../../assets/common/statistic/product.png'
import {
  getAllMenus,
  getTotalRevenueByCategory
} from '../../store/actions/statisticAction'
import { useDispatch, useSelector } from 'react-redux'
import { getTotalRevenue } from '../../Statistical/generalStatistics'

export default function ItemComparisonCard (props) {
  const [itemID, setItemID] = useState('')
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { allMenus } = useSelector(state => state.statistic)

  useEffect(() => {
    setItemID(props.itemID)
    dispatch(getAllMenus(user.restaurantID))
    dispatch(getTotalRevenueByCategory(props.currentItem.itemID))
  }, [])

  useEffect(() => {
    dispatch(getTotalRevenue(allMenus))
  }, [allMenus])

  return (
    <>
      <Card sx={{ boxShadow: 'none' }}>
        <CardContent>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <CardMedia
                sx={{ width: '100%' }}
                component={'img'}
                image={ProductImage}
                alt='Product Image'
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                display={'flex'}
                justifyContent={'center'}
                alignItems={'center'}
              >
                <Typography fontWeight={'bold'} fontSize={'25px'}>
                  {props.currentItem.menuName}
                </Typography>
                <Box
                  margin={'10px'}
                  padding={'5px'}
                  sx={{
                    backgroundColor: '#c7f7d4',
                    borderRadius: '5px'
                  }}
                >
                  <Typography color={'#28C76F'}>100/230</Typography>
                </Box>
              </Box>
              <Typography fontSize={'20px'}>
                {props.currentItem.categoryName}
              </Typography>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  border: 'dashed',
                  borderWidth: '2px',
                  borderColor: '#E1E3EA',
                  boxShadow: 'none',
                  padding: '5px'
                }}
              >
                <Typography
                  fontWeight={'bold'}
                  fontSize={'20px'}
                  textAlign={'left'}
                >
                  ${props.currentItem.price}
                </Typography>
                <Typography textAlign={'left'}>Price</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  border: 'dashed',
                  borderWidth: '2px',
                  borderColor: '#E1E3EA',
                  boxShadow: 'none',
                  padding: '5px'
                }}
              >
                <Typography
                  fontWeight={'bold'}
                  fontSize={'20px'}
                  textAlign={'left'}
                >
                  ${props.currentItem.cost}
                </Typography>
                <Typography textAlign={'left'}>Cost of Item</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  border: 'dashed',
                  borderWidth: '2px',
                  borderColor: '#E1E3EA',
                  boxShadow: 'none',
                  padding: '5px'
                }}
              >
                <Typography
                  fontWeight={'bold'}
                  fontSize={'20px'}
                  textAlign={'left'}
                >
                  ${props.currentItem.profitMargin}
                </Typography>
                <Typography textAlign={'left'}>Profit Margin</Typography>
              </Paper>
            </Grid>
            <Grid item xs={6}>
              <Paper
                sx={{
                  border: 'dashed',
                  borderWidth: '2px',
                  borderColor: '#E1E3EA',
                  boxShadow: 'none',
                  padding: '5px'
                }}
              >
                <Typography
                  fontWeight={'bold'}
                  fontSize={'20px'}
                  textAlign={'left'}
                >
                  {props.currentItem.profitMarginPercent}%
                </Typography>
                <Typography textAlign={'left'}>Profit Margin %</Typography>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>
                  Average Click per Day
                </Typography>
                <Typography>{props.currentItem.averageClickPerDay}</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Average View Time</Typography>
                <Typography>{props.currentItem.averageViewTime}</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Conversion Rate</Typography>
                <Typography>{props.currentItem.conversionRate}</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Revenue Generated</Typography>
                <Typography>${props.currentItem.revenueGenerated}</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>
                  Average Purchase per Day
                </Typography>
                <Typography>
                  {props.currentItem.averagePurchasePerDay}
                </Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>
                  Revenue Share of Menu Item
                </Typography>
                <Typography>{props.currentItem.revenueOfMenu}%</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>
                  Revenue Share of Menu Category
                </Typography>
                <Typography>{props.currentItem.revenueOfCategory}%</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Peak Order time</Typography>
                <Typography>{props.currentItem.peakOrderTime}</Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
