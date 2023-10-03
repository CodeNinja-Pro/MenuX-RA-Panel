import React, { useEffect, useState } from 'react'

import { Container } from 'reactstrap'

import OnlyHeader from '../components/Headers/OnlyHeader.js'

import { useDispatch, useSelector } from 'react-redux'
import { Card, Grid, ThemeProvider, Typography, Box } from '@mui/material'
import CustomerTable from '../components/Customer/CustomerTable.js'
import { ThemeMain } from '../components/common/Theme.js'
import { getCurrentRoleDetail } from '../store/actions/staffAction.js'

const Customers = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  // Status of this section as staff role
  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    const obj = currentRoleDetail.filter(obj => obj.permission === 'Customers')
    if (obj[0]?.allow === 'ViewEdit') {
      setSectionPermission(true)
    } else {
      setSectionPermission(false)
    }
  }, [currentRoleDetail])

  const disableOnTrue = flag => {
    return {
      opacity: flag ? 1 : 0.8,
      pointerEvents: flag ? 'initial' : 'none'
    }
  }

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
                  <Box
                    sx={
                      user.role === 'staff' && disableOnTrue(sectionPermission)
                    }
                  >
                    <CustomerTable />
                  </Box>
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
