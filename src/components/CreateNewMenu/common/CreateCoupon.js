import React, { useEffect, useState } from 'react'
import OnlyHeader from '../../Headers/OnlyHeader'
import {
  CardContent,
  Card,
  ThemeProvider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  OutlinedInput,
  IconButton,
  Box,
  Button,
  TextField,
  InputAdornment
} from '@mui/material'
import { ThemeMain } from '../../common/Theme'
import { Container } from 'reactstrap'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useHistory } from 'react-router-dom'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useDispatch, useSelector } from 'react-redux'
import dayjs from 'dayjs'
// import { v4 as uuidv4 } from 'uuid'
import { customAlphabet } from 'nanoid'
import { addNewCoupon } from '../../../store/actions/MenuManagmentActions'

export default function CreateCoupon () {
  const history = useHistory()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  const [flag, setFlag] = useState(false)

  const [couponName, setCouponName] = useState('')
  const [discountPercentage, setDiscountPercentage] = useState('')
  const [maximumDiscount, setMaximumDiscount] = useState('')
  const [maximumUses, setMaximumUses] = useState('')
  const [validTill, setValidTill] = useState(dayjs('2024-02-20'))

  useEffect(() => {
    const nanoid = customAlphabet('1234567890ABCDEFGHIJKLMNOPQRSTUVWXYZ', 10)
    const random = nanoid()
    // setCouponName(random)
  }, [])

  const handleNewCoupon = () => {
    const newCoupon = {
      couponName,
      discountPercentage,
      maximumDiscount,
      maximumUses,
      validTill: validTill.$d
    }
    dispatch(
      addNewCoupon(user.restaurantID, newCoupon, () => {
        setFlag(false)
      })
    )
  }

  return (
    <>
      {/* <OnlyHeader /> */}
      <ThemeProvider theme={ThemeMain}>
        <Container fluid>
          <Card sx={{ boxShadow: 'none' }}>
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  item
                  marginRight={2}
                  display={'flex'}
                  flexDirection={'column'}
                  xs={12}
                  md={5}
                >
                  <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                    <FormHelperText
                      style={{ fontSize: '18px' }}
                      id='outlined-weight-helper-text'
                    >
                      Coupon Name
                    </FormHelperText>
                    <OutlinedInput
                      id='outlined-adornment-weight'
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      value={couponName}
                      onChange={e => setCouponName(e.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                    <FormHelperText
                      style={{ fontSize: '18px' }}
                      id='outlined-weight-helper-text'
                    >
                      <Typography>Discount Percentage/Amount</Typography>
                      <Typography fontSize={'13px'}>
                        Add % at the end of the value to add discount as the
                        percent.
                      </Typography>
                    </FormHelperText>
                    <TextField
                      id='outlined-start-adornment'
                      type='number'
                      placeholder='30'
                      value={discountPercentage}
                      onChange={e => setDiscountPercentage(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>%</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                    <FormHelperText
                      style={{ fontSize: '18px' }}
                      id='outlined-weight-helper-text'
                    >
                      Maximum Discount
                    </FormHelperText>
                    <TextField
                      id='outlined-start-adornment'
                      type='number'
                      placeholder='500'
                      value={maximumDiscount}
                      onChange={e => setMaximumDiscount(e.target.value)}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <Typography>$</Typography>
                          </InputAdornment>
                        )
                      }}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                    <FormHelperText
                      style={{ fontSize: '18px' }}
                      id='outlined-weight-helper-text'
                    >
                      Maximum Uses
                    </FormHelperText>
                    <OutlinedInput
                      type='number'
                      id='outlined-adornment-weight'
                      aria-describedby='outlined-weight-helper-text'
                      inputProps={{
                        'aria-label': 'weight'
                      }}
                      placeholder='100'
                      value={maximumUses}
                      onChange={e => setMaximumUses(e.target.value)}
                    />
                  </FormControl>
                  <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                    <FormHelperText
                      style={{ fontSize: '18px' }}
                      id='outlined-weight-helper-text'
                    >
                      Valid Till
                    </FormHelperText>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DemoContainer components={['DatePicker']}>
                        <DatePicker
                          value={dayjs(validTill)}
                          onChange={newValue => setValidTill(newValue)}
                          sx={{ width: '100%' }}
                        />
                      </DemoContainer>
                    </LocalizationProvider>
                  </FormControl>
                  <Box
                    display={'flex'}
                    marginTop={3}
                    justifyContent={'space-around'}
                  >
                    <Button
                      variant='outlined'
                      onClick={() => {
                        history.goBack()
                      }}
                    >
                      Discard
                    </Button>
                    <Button
                      disabled={
                        !discountPercentage ||
                        !maximumDiscount ||
                        !maximumUses ||
                        !validTill ||
                        flag
                      }
                      variant='contained'
                      onClick={() => {
                        setFlag(true)
                        handleNewCoupon()
                      }}
                    >
                      Add Coupon
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </ThemeProvider>
    </>
  )
}
