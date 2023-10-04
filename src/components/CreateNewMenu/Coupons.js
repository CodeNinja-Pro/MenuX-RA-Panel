import React, { useState } from 'react'
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
import CouponsTable from './common/CouponsTable'
import CreateCoupon from './common/CreateCoupon'
import { Link } from 'react-router-dom'

export default function Coupons () {
  const [addCP, setAddCP] = useState(false)

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Row className='mt-2 '>
          <div className='col px-0'>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
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
                      marginLeft={3}
                    >
                      Coupons
                    </Typography>
                    <Box marginRight={3} marginTop={1}>
                      {!addCP && (
                        <Button
                          onClick={() => setAddCP(true)}
                          variant='contained'
                        >
                          Add Coupon
                        </Button>
                      )}
                      {addCP && (
                        <Button
                          variant='outlined'
                          onClick={() => setAddCP(false)}
                        >
                          Back
                        </Button>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} marginTop={2}>
                    {addCP && <CreateCoupon />}
                    {!addCP && <CouponsTable />}
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
