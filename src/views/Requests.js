import React, { useEffect, useState } from 'react'

import { Container } from 'reactstrap'

import OnlyHeader from '../components/Headers/OnlyHeader.js'

import { useDispatch, useSelector } from 'react-redux'
import { Card, Grid, ThemeProvider, Typography, Box } from '@mui/material'
import RequestsTable from '../components/Requests/RequestsTable.js'
import { ThemeMain } from '../components/common/Theme.js'
import { getCurrentRoleDetail } from '../store/actions/staffAction.js'

const Requests = () => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    const obj = currentRoleDetail.filter(obj => obj.permission === 'Requests')
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
                      Requests
                    </Typography>
                  </Grid>
                  <Box
                    sx={
                      user.role === 'staff' && disableOnTrue(sectionPermission)
                    }
                  >
                    <RequestsTable />
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

export default Requests
