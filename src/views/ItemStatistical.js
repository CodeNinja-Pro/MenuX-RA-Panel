import React, { useState } from 'react'
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

export default function ItemStatistical () {
  const [tabFlag, setTabFlag] = useState('Table')

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
                    style={{ display: 'flex', justifyContent: 'space-between' }}
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
                </CardContent>
              </Card>
            ) : (
              <StatisticsChart />
            )}
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
