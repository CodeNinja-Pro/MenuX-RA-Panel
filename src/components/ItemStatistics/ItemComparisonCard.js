import React from 'react'
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

export default function ItemComparisonCard () {
  return (
    <>
      <Card>
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
                  Creamy Pasta
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
              <Typography fontSize={'20px'}>Pasta</Typography>
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
                  $45.00
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
                  $45.00
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
                  $45.00
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
                  4.90%
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
                <Typography>200</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Average View Time</Typography>
                <Typography>20 mins</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Conversion Rate</Typography>
                <Typography>20 %</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Revenue Generated</Typography>
                <Typography>$1000</Typography>
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
                <Typography>19</Typography>
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
                <Typography>5%</Typography>
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
                <Typography>50%</Typography>
              </Grid>
              <Grid
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
                marginBottom={'10px'}
              >
                <Typography fontWeight={'bold'}>Peak Order time</Typography>
                <Typography>12:30PM-1:30PM</Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
