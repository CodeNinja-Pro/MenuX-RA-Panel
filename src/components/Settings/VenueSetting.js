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
  TextField,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Dialog,
  DialogActions,
  DialogContentText,
  DialogContent,
  DialogTitle,
  Divider,
  InputAdornment,
  IconButton
} from '@mui/material'
import React, { useState } from 'react'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'

import ScheduleForm from './common/ScheduleForm'
import SwitchGroupForm from './common/SwitchGroupForm'

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

export default function VenueSetting () {
  // const [serviceMode, setServiceMode] = useState('Quick')
  const [quickService, setQuickService] = useState(false)
  const [fullService, setFullService] = useState(false)

  const [tableOrPick, setTableOrPick] = useState(true)

  const [feeModal, setFeeModal] = useState(false)

  const [feeName, setFeeName] = useState('')
  const [amount, setAmount] = useState('')
  const [percentage, setPercentage] = useState('')
  const [maximumAmount, setMaximumAmount] = useState('')

  const [allFee, setAllFee] = useState([])

  const handleAddFee = () => {
    setAllFee([
      ...allFee,
      {
        feeName,
        amount,
        percentage,
        maximumAmount
      }
    ])
  }

  const handleRemove = name => {
    const filtered = allFee.filter(item => item.feeName !== name)

    setAllFee(filtered)
  }

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
            <Grid item xs={12}>
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
                <Grid container alignItems={'center'} spacing={2}>
                  <Grid item xs={12} lg={3}>
                    <Typography textAlign={'left'}>
                      Selected Currency
                    </Typography>
                  </Grid>
                  <Grid item xs={12} lg={6}>
                    <Select
                      labelId='demo-simple-select-label'
                      id='demo-simple-select'
                      defaultValue={'USD'}
                    >
                      <MenuItem value={'USD'}>
                        United States Dollar (USD) - United States
                      </MenuItem>
                      <MenuItem value={'CAD'}>
                        Canadian Dollar (CAD) - Canada
                      </MenuItem>
                      <MenuItem value={'MXN'}>
                        Mexican Peso (MXN) - Mexico
                      </MenuItem>
                      <MenuItem value={'BRL'}>
                        Brazilian Real (BRL) - Brazil
                      </MenuItem>
                      <MenuItem value={'COP'}>
                        Colombian Peso (COP) - Colombia
                      </MenuItem>
                      <MenuItem value={'ARS'}>
                        Argentine Peso (ARS) - Argentina
                      </MenuItem>
                      <MenuItem value={'CLP'}>
                        Chilean Peso (CLP) - Chile
                      </MenuItem>
                      <MenuItem value={'PEN'}>
                        Peruvian Sol (PEN) - Peru
                      </MenuItem>
                      <MenuItem value={'VES'}>
                        Venezuelan Bolívar (VES) - Venezuela
                      </MenuItem>
                      <MenuItem value={'UYU'}>
                        Uruguayan Peso (UYU) - Uruguay
                      </MenuItem>
                      <MenuItem value={'CRC'}>
                        Costa Rican Colón (CRC) - Costa Rica
                      </MenuItem>
                      <MenuItem value={'PAB'}>
                        Panamanian Balboa (PAB) - Panama
                      </MenuItem>
                      <MenuItem value={'GTQ'}>
                        Guatemalan Quetzal (GTQ) - Guatemala
                      </MenuItem>
                      <MenuItem value={'HNL'}>
                        Honduran Lempira (HNL) - Honduras
                      </MenuItem>
                      <MenuItem value={'NIO'}>
                        Nicaraguan Córdoba (NIO) - Nicaragua
                      </MenuItem>
                      <MenuItem value={'SVC'}>
                        Salvadoran Colón (SVC) - El Salvador
                      </MenuItem>
                      <MenuItem value={'BZD'}>
                        Belize Dollar (BZD) - Belize
                      </MenuItem>
                      <MenuItem value={'BSD'}>
                        Bahamian Dollar (BSD) - The Bahamas
                      </MenuItem>
                      <MenuItem value={'XCD'}>
                        East Caribbean Dollar (XCD) - Eastern Caribbean
                        countries (e.g., Saint Lucia, Antigua and Barbuda)
                      </MenuItem>
                      <MenuItem value={'BBD'}>
                        Barbados Dollar (BBD) - Barbados
                      </MenuItem>
                      <MenuItem value={'TTD'}>
                        Trinidad and Tobago Dollar (TTD) - Trinidad and Tobago
                      </MenuItem>
                      <MenuItem value={'JMD'}>
                        Jamaican Dollar (JMD) - Jamaica
                      </MenuItem>
                      <MenuItem value={'HTG'}>
                        Haitian Gourde (HTG) - Haiti
                      </MenuItem>
                      <MenuItem value={'DOP'}>
                        Dominican Peso (DOP) - Dominican Republic
                      </MenuItem>
                      <MenuItem value={'CUP'}>Cuban Peso (CUP) - Cuba</MenuItem>
                      <MenuItem value={'SRD'}>
                        Surinamese Dollar (SRD) - Suriname
                      </MenuItem>
                      <MenuItem value={'GYD'}>
                        Guyanese Dollar (GYD) - Guyana
                      </MenuItem>
                      <MenuItem value={'PYG'}>
                        Paraguayan Guaraní (PYG) - Paraguay
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <Button>Save</Button>
                  </Grid>
                </Grid>
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
            {allFee.map((item, index) => (
              <>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Typography marginRight={1}>{item.feeName}</Typography>
                  <TextField
                    sx={{ marginRight: 1 }}
                    placeholder={'$2.50'}
                    value={item.amount}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>$</InputAdornment>
                      )
                    }}
                  ></TextField>
                  <TextField
                    placeholder={'2.9%'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>%</InputAdornment>
                      )
                    }}
                    value={item.percentage}
                  ></TextField>
                </Grid>
                <Grid
                  item
                  xs={12}
                  lg={6}
                  display={'flex'}
                  alignItems={'center'}
                >
                  <Typography marginRight={1}>Max</Typography>
                  <TextField
                    sx={{ marginRight: 1 }}
                    placeholder={'$20'}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>$</InputAdornment>
                      )
                    }}
                    value={item.maximumAmount}
                  ></TextField>
                  <Typography>Mandatory</Typography>
                  <Switch inputProps={'aria-label'} defaultChecked></Switch>
                  <IconButton onClick={() => handleRemove(item.feeName)}>
                    <RemoveCircleOutlineOutlinedIcon color='error' />
                  </IconButton>
                </Grid>
              </>
            ))}
            <Grid item xs={12} lg={4} margin={1}>
              <Button
                variant='contained'
                onClick={() => setFeeModal(true)}
                fullWidth
              >
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
                    checked={quickService}
                    onChange={() => {
                      setQuickService(!quickService & !fullService)
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
                    checked={fullService}
                    onChange={() => {
                      setFullService(!fullService & !quickService)
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

      <Dialog
        open={feeModal}
        onClose={() => setFeeModal(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          id='alert-dialog-title'
          style={{
            fontSize: '25px',
            fontWeight: 'bold'
          }}
        >
          {'Fees'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl fullWidth variant='outlined'>
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Fee Name
              </FormHelperText>
              <OutlinedInput
                placeholder='smile@gmail.com'
                value={feeName}
                onChange={e => setFeeName(e.target.value)}
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
              />
            </FormControl>
            <FormControl fullWidth variant='outlined'>
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Amount
              </FormHelperText>
              <OutlinedInput
                placeholder='20'
                value={amount}
                onChange={e => setAmount(e.target.value)}
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                type='number'
              />
            </FormControl>
            <FormControl fullWidth variant='outlined'>
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Percentage
              </FormHelperText>
              <TextField
                placeholder='20'
                value={percentage}
                onChange={e => setPercentage(e.target.value)}
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>%</InputAdornment>
                  )
                }}
                type='number'
              />
            </FormControl>
            <FormControl fullWidth variant='outlined'>
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Maximum Amount
              </FormHelperText>
              <OutlinedInput
                placeholder='20'
                value={maximumAmount}
                onChange={e => setMaximumAmount(e.target.value)}
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                type='number'
              />
            </FormControl>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Button
            variant='outlined'
            style={{ margin: '20px' }}
            fullWidth
            onClick={() => {
              setFeeModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant='contained'
            style={{ margin: '20px' }}
            onClick={() => {
              setFeeModal(false)
              handleAddFee()
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
