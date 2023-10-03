import React, { useState, useEffect } from 'react'
import { ThemeMain } from '../components/common/Theme'
import OnlyHeader from '../components/Headers/OnlyHeader'
import { Box, Card, Tabs, Tab, ThemeProvider, Grid } from '@mui/material'
import { Container } from 'reactstrap'
import AccountSetting from '../components/Settings/AccountSetting'
import PaymentIntegration from '../components/Settings/PaymentIntegration'
import VenueSetting from '../components/Settings/VenueSetting'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentRoleDetail } from '../store/actions/staffAction'

export default function SettingSection () {
  const [tabFlag, setTabFlag] = useState('Account Settings')

  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleChange = (e, newValue) => {
    setTabFlag(newValue)
  }

  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    if (user.role === 'staff') {
      const obj = currentRoleDetail.filter(obj => obj.permission === 'Menu')
      if (obj[0]?.allow === 'ViewEdit') {
        setSectionPermission(true)
      } else {
        setSectionPermission(false)
      }
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
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--9 mb-5' fluid>
          <Container fluid>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                <Card sx={{ boxShadow: 'none' }}>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Tabs
                      value={tabFlag}
                      onChange={handleChange}
                      aria-label='wrapped label tabs example'
                    >
                      <Tab
                        sx={{ width: '33%' }}
                        value='Account Settings'
                        label='Account Settings'
                      />
                      <Tab
                        sx={{ width: '33%' }}
                        value='Payment and Integration'
                        label='Payment and Integration'
                      />
                      <Tab
                        value='Venue Settings'
                        sx={{ width: '33%' }}
                        label='Venue Settings'
                      />
                    </Tabs>
                  </Box>
                </Card>
                {tabFlag === 'Account Settings' && <AccountSetting />}
                {tabFlag === 'Venue Settings' && (
                  <Box
                    sx={
                      user.role === 'staff' && disableOnTrue(sectionPermission)
                    }
                  >
                    <VenueSetting />
                  </Box>
                )}
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {tabFlag === 'Payment and Integration' && (
                  <Box
                    sx={
                      user.role === 'staff' && disableOnTrue(sectionPermission)
                    }
                  >
                    <PaymentIntegration />
                  </Box>
                )}
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
