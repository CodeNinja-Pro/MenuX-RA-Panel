import React, { useEffect, useState } from 'react'

import { Container } from 'reactstrap'

import OnlyHeader from '../components/Headers/OnlyHeader.js'

import { useDispatch, useSelector } from 'react-redux'
import { Card, Grid, ThemeProvider, Typography } from '@mui/material'
import CustomerTable from '../components/Customer/CustomerTable.js'
import { ThemeMain } from '../components/common/Theme.js'

const Customers = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <OnlyHeader />
        <Container fluid>
          <Container className='mt--7 mb-5' fluid>
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
                  <Grid item xs={12}>
                    <Typography
                      textAlign={'left'}
                      fontWeight={'bold'}
                      marginTop={'10px'}
                      fontSize={'25px'}
                    >
                      Customers
                    </Typography>
                  </Grid>
                  <CustomerTable />
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Customers
