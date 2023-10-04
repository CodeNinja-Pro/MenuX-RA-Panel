import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  Typography,
  ButtonGroup,
  Select,
  MenuItem,
  TextField
} from '@mui/material'
import React, { useState } from 'react'

import ScheduleForm from './common/ScheduleForm'
import SwitchGroupForm from './common/SwitchGroupForm'

const days = [
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
  'Sunday'
]

export default function VenueSetting () {
  const [serviceMode, setServiceMode] = useState('Quick')
  const [tableOrPick, setTableOrPick] = useState(true)
  return (
    <>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display={'flex'} m={1} justifyContent={'space-between'}>
                <Typography
                  marginLeft={'10px'}
                  textAlign={'left'}
                  fontWeight={'bold'}
                  fontSize={'20px'}
                >
                  Schedule
                </Typography>
                <ButtonGroup
                  disableElevation
                  variant='contained'
                  aria-label='Disabled elevation buttons'
                >
                  <Button
                    disabled={tableOrPick}
                    onClick={() => setTableOrPick(true)}
                  >
                    Table Service
                  </Button>
                  <Button
                    disabled={!tableOrPick}
                    onClick={() => setTableOrPick(false)}
                  >
                    Pickup
                  </Button>
                </ButtonGroup>
              </Box>

              {days.map(day => (
                <ScheduleForm key={day} title={day} />
              ))}
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Typography
                marginLeft={'10px'}
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'20px'}
              >
                Menu Language
              </Typography>
              <SwitchGroupForm />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Typography
                marginLeft={'10px'}
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'20px'}
                marginBottom={'20px'}
              >
                Currency
              </Typography>
              <Box
                margin={1}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography textAlign={'left'}>Selected Currency</Typography>
                <Select
                  labelId='demo-simple-select-label'
                  id='demo-simple-select'
                  defaultValue={'USD'}
                >
                  <MenuItem value={'USD'}>USD</MenuItem>
                  <MenuItem value={'EUR'}>EUR</MenuItem>
                  <MenuItem value={'GBP'}>GBP</MenuItem>
                  <MenuItem value={'JPY'}>JPY</MenuItem>
                  <MenuItem value={'CAD'}>CAD</MenuItem>
                  <MenuItem value={'AUD'}>AUD</MenuItem>
                  <MenuItem value={'CHF'}>CHF</MenuItem>
                  <MenuItem value={'CNY'}>CNY</MenuItem>
                  <MenuItem value={'INR'}>INR</MenuItem>
                  <MenuItem value={'BRL'}>BRL</MenuItem>
                </Select>
                <Button>Save</Button>
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} margin={1}>
              <Typography
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'20px'}
              >
                Fees
              </Typography>
            </Grid>
            <Grid item xs={12} lg={6} display={'flex'} alignItems={'center'}>
              <Typography marginRight={1}>{'Fee Name'}</Typography>
              <TextField
                sx={{ marginRight: 1 }}
                placeholder={'$2.50'}
              ></TextField>
              <TextField placeholder={'2.9%'}></TextField>
            </Grid>
            <Grid item xs={12} lg={6} display={'flex'} alignItems={'center'}>
              <Typography marginRight={1}>Max</Typography>
              <TextField
                sx={{ marginRight: 1 }}
                placeholder={'$20'}
              ></TextField>
              <Typography>Mandatory</Typography>
              <Switch inputProps={'aria-label'} defaultChecked></Switch>
            </Grid>
            <Grid item xs={12} lg={4} margin={1}>
              <Button variant='contained' fullWidth>
                Create a new fee
              </Button>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography
                marginLeft={'10px'}
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'20px'}
                marginBottom={'20px'}
              >
                Ordering Modes
              </Typography>
              <Typography
                margin={1}
                textAlign={'left'}
                sx={{
                  padding: '20px',
                  border: 'dashed',
                  borderRadius: '10px',
                  borderWidth: '1px',
                  borderColor: '#0074D9',
                  backgroundColor: '#cfebff'
                }}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Box>
                    <Typography fontWeight={'bold'}>Quick Service</Typography>
                    <Typography>
                      A separate ticket is created in FineDine Dashboard for
                      each new order, even if it comes from the same table. Your
                      guests can place their orders after paying.
                    </Typography>
                  </Box>
                  <Switch
                    checked={serviceMode === 'Quick' ? true : false}
                    onChange={() => {
                      setServiceMode('Quick')
                    }}
                    inputProps={'aria-label'}
                  ></Switch>
                </Box>
              </Typography>
              <Typography
                margin={1}
                textAlign={'left'}
                sx={{
                  padding: '20px',
                  border: 'dashed',
                  borderRadius: '10px',
                  borderWidth: '1px',
                  borderColor: '#0074D9',
                  backgroundColor: '#cfebff'
                }}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Box>
                    <Typography fontWeight={'bold'}>Full Service</Typography>
                    <Typography>
                      Your guests’ ticket remains open until you close it. New
                      orders are collected on the same ticket, and guests can
                      make an online payment when leaving.
                    </Typography>
                  </Box>
                  <Switch
                    checked={serviceMode === 'Full' ? true : false}
                    onChange={() => {
                      setServiceMode('Full')
                    }}
                    inputProps={'aria-label'}
                  ></Switch>
                </Box>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={7}>
              <Typography
                marginLeft={'10px'}
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'20px'}
              >
                Customers Options
              </Typography>
              <Box
                margin={1}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  margin={1}
                >
                  <Typography textAlign={'left'} fontSize={'19px'}>
                    Enable Customer Request
                  </Typography>
                  <Typography textAlign={'left'}>
                    Let the customer request you.
                  </Typography>
                </Box>
                <Switch inputProps={'aria-label'} />
              </Box>
              <Box
                margin={1}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  flexDirection={'column'}
                  alignItems={'flex-start'}
                  margin={1}
                >
                  <Typography textAlign={'left'} fontSize={'19px'}>
                    Enable Customer Feedback
                  </Typography>
                  <Typography textAlign={'left'}>
                    Let the customer send the feedback against your restaurant.
                  </Typography>
                </Box>
                <Switch inputProps={'aria-label'} />
              </Box>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
