import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import {
  Grid,
  Card,
  Tabs,
  Tab,
  ThemeProvider,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Slider
} from '@mui/material'
import OnlyHeader from '../components/Headers/OnlyHeader'
import { ThemeMain } from '../components/common/Theme'
import { addDays } from 'date-fns'
import PickDateRange from './auth/PickDateRange'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import OrderTable from '../components/Orders/OrderTable'
import { toast } from 'react-toastify'
import { getCurrentRoleDetail } from '../store/actions/staffAction'
import { useDispatch, useSelector } from 'react-redux'

export default function OrdersRestaurant () {
  const dispatch = useDispatch()
  const [tabFlag, setTabFlag] = useState('All')
  const { user } = useSelector(state => state.auth)

  const handleChange = (e, newValue) => {
    setTabFlag(newValue)
  }

  // Slider Control
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(100)
  const [value1, setValue1] = React.useState([min, max])

  const minDistance = 10

  // Status of this section as staff role
  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    const obj = currentRoleDetail.filter(obj => obj.permission === 'Orders')
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

  // User setting up
  useEffect(() => {
    if (max > 100 || min < 0) {
      toast.error('You should be between 0 and 100.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
    setValue1([min, max])
  }, [min, max])

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]])
      setMin(Math.min(newValue[0], value1[1] - minDistance))
      setMax(value1[1])
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)])
      setMin(value1[0])
      setMax(Math.max(newValue[1], value1[0] + minDistance))
    }
  }

  // Date PickRange
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
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography
                    fontWeight={'bold'}
                    marginTop={'10px'}
                    fontSize={'25px'}
                  >
                    Orders
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Box sx={{ width: '100%', typography: 'body1' }}>
                    <Tabs
                      value={tabFlag}
                      onChange={handleChange}
                      aria-label='wrapped label tabs example'
                    >
                      <Tab value='All' label='All' />
                      <Tab value='New' label='New' />
                      <Tab value='Processing' label='Processing' />
                      <Tab value='Ready' label='Ready' />
                      <Tab value='Completed' label='Completed' />
                    </Tabs>
                  </Box>
                </Grid>
              </Grid>
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <Grid
                  marginTop={'20px'}
                  container
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Grid
                    item
                    xs={4}
                    display={'flex'}
                    justifyContent={'center'}
                    alignItems={'center'}
                  >
                    <TextField
                      sx={{ width: '90%' }}
                      id='outlined-start-adornment'
                      placeholder='Search by ID, name, amount...'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={5}
                    display={'flex'}
                    justifyContent={'space-around'}
                    alignItems={'center'}
                    width={'90%'}
                  >
                    <Box>
                      <TextField
                        sx={{ width: '80px' }}
                        value={min}
                        type='number'
                        onChange={e => setMin(e.target.value)}
                      ></TextField>
                    </Box>
                    <Box sx={{ width: '100%' }} margin={2}>
                      <Slider
                        getAriaLabel={() => 'Minimum distance'}
                        value={value1}
                        onChange={handleChange1}
                        valueLabelDisplay='auto'
                        disableSwap
                      />
                    </Box>
                    <Box>
                      <TextField
                        type='number'
                        sx={{ width: '80px', marginRight: '30px' }}
                        value={max}
                        onChange={e => setMax(e.target.value)}
                      ></TextField>
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Box width={'90%'}>
                      <PickDateRange
                        setDateState={handleDateChange}
                        datestate={dateState}
                      />
                    </Box>
                  </Grid>
                </Grid>
                <Grid item xs={12} marginTop={2}>
                  <OrderTable />
                </Grid>
              </Box>
            </Card>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={8}>
                {tabFlag === 'All' && ''}
                {tabFlag === 'New' && ''}
                {tabFlag === 'Processing' && ''}
                {tabFlag === 'Ready' && ''}
                {tabFlag === 'Completed' && ''}
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
