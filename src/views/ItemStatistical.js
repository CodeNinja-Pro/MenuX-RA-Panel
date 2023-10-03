import React, { useState, useEffect } from 'react'
import { ThemeMain } from '../components/common/Theme'
import OnlyHeader from '../components/Headers/OnlyHeader'
import {
  Box,
  Card,
  Tabs,
  Tab,
  ThemeProvider,
  Typography,
  TextField,
  InputAdornment,
  CardContent
} from '@mui/material'
import { Container } from 'reactstrap'
import { addDays } from 'date-fns'
import ItemStatisticData from '../components/ItemStatistics/ItemStatisticData'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import PickDateRange from './auth/PickDateRange'
import StatisticsChart from '../components/ItemStatistics/StatisticsChart'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentRoleDetail } from '../store/actions/staffAction'

export default function ItemStatistical () {
  const [tabFlag, setTabFlag] = useState('Table')
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  // Enable by staff role
  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    const obj = currentRoleDetail.filter(
      obj => obj.permission === 'Item Statistics'
    )
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

  const handleChange = (e, newValue) => {
    setTabFlag(newValue)
  }

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

  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--9 mb-5' fluid>
          <Container fluid>
            <Card sx={{ boxShadow: 'none' }}>
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <Tabs
                  value={tabFlag}
                  onChange={handleChange}
                  aria-label='wrapped label tabs example'
                >
                  <Tab value='Table' label='Table' />
                  <Tab value='Statistics' label='Statistics' />
                </Tabs>
              </Box>
            </Card>
            {tabFlag === 'Table' ? (
              <Card sx={{ marginTop: '15px' }}>
                <CardContent>
                  <Typography
                    fontWeight={'bold'}
                    fontSize={'25px'}
                    textAlign={'left'}
                  >
                    Menu Items
                  </Typography>
                  <Typography marginBottom={'10px'} textAlign={'left'}>
                    Item Performance data
                  </Typography>
                  <Box
                    sx={
                      user.role === 'staff' && disableOnTrue(sectionPermission)
                    }
                  >
                    <Box
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                      }}
                    >
                      <TextField
                        id='outlined-start-adornment'
                        sx={{ marginBottom: '15px', width: '40ch' }}
                        placeholder='Search by ID, name, amount...'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <SearchOutlinedIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                      <PickDateRange
                        setDateState={handleDateChange}
                        datestate={dateState}
                      />
                    </Box>
                    <ItemStatisticData />
                  </Box>
                </CardContent>
              </Card>
            ) : (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <StatisticsChart />
              </Box>
            )}
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
