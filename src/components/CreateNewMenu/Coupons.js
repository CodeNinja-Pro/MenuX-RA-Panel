import React from 'react'
import { Row } from 'reactstrap'
import {
  Grid,
  Card,
  ThemeProvider,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button
} from '@mui/material'
import { ThemeMain } from '../common/Theme'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import CouponsTable from './common/CouponsTable'
import { Link } from 'react-router-dom'

export default function Coupons () {
  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Row className='mt-2 '>
          <div className='col px-0'>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  marginTop={2}
                  marginLeft={2}
                  marginRight={2}
                  marginBottom={2}
                >
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography
                      fontWeight={'bold'}
                      marginTop={'10px'}
                      fontSize={'25px'}
                    >
                      Coupons
                    </Typography>
                    <Link to='/admin/create-coupon'>
                      <Button variant='contained'>Add Coupon</Button>
                    </Link>
                  </Grid>
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'start'}
                    marginTop={'20px'}
                  >
                    <TextField
                      id='outlined-start-adornment'
                      placeholder='Search'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} marginTop={2}>
                    <CouponsTable />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Row>
      </ThemeProvider>
    </>
  )
}
