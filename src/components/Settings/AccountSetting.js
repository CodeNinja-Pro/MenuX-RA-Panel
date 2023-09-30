import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Switch,
  Typography,
  IconButton,
  TextField,
  Dialog,
  DialogActions,
  DialogContentText,
  FormControl,
  Divider,
  DialogTitle,
  DialogContent,
  FormHelperText,
  OutlinedInput,
  CardMedia,
  Icon
} from '@mui/material'
import firebase from '../../config/firebase'

import { FormGroup, Label, Spinner } from 'reactstrap'

import React, { useEffect, useState } from 'react'
import TextFieldForm from './common/TextFieldForm'
import TextFieldUpdateForm from './common/TextFieldUpdateForm'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded'
import PaymentCardForm from './common/PaymentCardForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  checkCurrentPassword,
  emailVerification,
  updatePersonalInfo,
  updateTFA
} from '../../store/actions/authActions'
import { toast } from 'react-toastify'

import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Form } from 'reactstrap'
import {
  deletePaymentMethodByUser,
  getCustomerID,
  removePaymentMethodId
} from '../../store/actions/paymentAction'
import {
  attachPaymentMethod,
  getPaymentMethodByUser
} from '../../store/actions/paymentAction'
import VisaCard from '../../assets/common/patmentCard/Payment.png'
import ExpressCard from '../../assets/common/patmentCard/Payment1.png'
import { useHistory, useLocation } from 'react-router-dom'

const publishable_API =
  'pk_test_51Mzkp7ITuIlz575ivol6fzkYduTdDKHgAudxugxaqn8N8AM1h0qcmw95rivH5HWXNeyToz5kEzdcC4ntnPss05yF00bpwqr8mC'

let stripePromise = loadStripe(publishable_API)

const CardImage = {
  visa: VisaCard,
  express: ExpressCard
}

export default function AccountSetting () {
  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  // Loading information from redux store.
  const { user } = useSelector(state => state.auth)
  const { customer } = useSelector(state => state.payment)
  const { cardInfo } = useSelector(state => state.payment)
  const { isLoading } = useSelector(state => state.payment)

  // Initialize the personal information
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')

  // Modal setting for new payment
  const [paymentCardModal, setPaymentCardModal] = useState(false)
  const [editPaymentCard, setEditPaymentCard] = useState(false)
  const [deleteModalFlag, setDeleteModalFlag] = useState(false)

  // For deleting ID saving
  const [toDeleteId, setToDeleteId] = useState('')

  // Initialize the social account
  const [socialAccount, setSocialAccount] = useState({
    myWebsite: '',
    googleBusiness: '',
    facebook: '',
    instagram: '',
    twitter: '',
    pinterest: '',
    tiktok: '',
    yelp: '',
    tripadvisor: '',
    linkedin: '',
    snapchat: '',
    zomato: '',
    whatsapp: '',
    linktree: ''
  })
  const [editOrAdd, setEditOrAdd] = useState(false)
  const [TFA, setTFA] = useState(false)

  // Card information
  const [cardNumber, setCardNumber] = useState('')

  const handleOnChange = e => {
    const { complete, elementType } = e
    setCardNumber(e)
  }

  useEffect(() => {
    console.log(cardNumber)
  }, [cardNumber])

  useEffect(() => {
    dispatch(getCustomerID(user.id))
  }, [])

  useEffect(() => {
    dispatch(getPaymentMethodByUser(user.cards))
  }, [user])

  const handleCardInfo = async (e, elements, stripe) => {
    e.preventDefault()
    const cardElement = await elements.getElement(CardNumberElement)
    const cardElement2 = await elements.getElement(CardExpiryElement)
    const cardElement3 = await elements.getElement(CardCvcElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
      card: cardElement2,
      card: cardElement3
    })
    console.log('cardElement', cardElement)
    console.log('cardnumberElement', CardNumberElement)
    console.log('cardElement2', cardElement2)
    console.log('cardElement3', cardElement3)
    if (error) {
      toast.warn('Card Details not Added')
    } else {
      let body = {
        paymentMethodId: paymentMethod.id,
        customerId: customer.stripeId
      }
      if (editOrAdd) {
        // Todo
      } else {
        if (user?.cards?.length > 2) {
          toast.warn('You can not add more.')
        } else {
          dispatch(
            attachPaymentMethod(user.id, body, res => {
              console.log('added result', res)
            })
          )
        }
      }
    }
  }

  const handlePaymentMethodDelete = () => {
    console.log('delete event')
    dispatch(
      deletePaymentMethodByUser(toDeleteId, () => {
        dispatch(removePaymentMethodId(user?.id, toDeleteId))
      })
    )
  }

  // Social account setting
  const onChangeSocialAccount = e => {
    setSocialAccount({
      ...socialAccount,
      [e.target.name]: e.target.value
    })
  }

  useEffect(() => {
    setSocialAccount({
      ...user.socialAccount
    })
  }, [user.socialAccount])

  const onChangeName = e => {
    setName(e.target.value)
  }

  const onChangePhone = e => {
    setPhone(e.target.value)
  }

  useEffect(() => {
    setName(user.name)
    setEmail(user.email)
    setPhone(user.phone)
    setTFA(user.TFA)
  }, [user])

  const handlePersonalInfo = e => {
    e.preventDefault()
    const id = user.id
    const personalInfo = {
      name,
      phone
    }
    dispatch(
      updatePersonalInfo(id, personalInfo, () => {
        toast.success('Your personal information is updated.')
      })
    )
  }

  // Change the password
  const [changePasswordModal, setChangePasswordModal] = useState(false)
  const [currentPassword, setCurrentPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')

  const [verificationCode, setVerificationCode] = useState('')

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search)
    setVerificationCode(searchParams.get('oobCode'))
    console.log('first')
  }, [location.search])

  useEffect(() => {
    console.log('second')
    if (verificationCode) {
      firebase
        .auth()
        .applyActionCode(verificationCode)
        .then(() => {
          toast.success('Email verification seccessful.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
          history.push('/admin/settings')
          setChangePasswordModal(true)
        })
        .catch(error => {
          toast.error(error.message, {
            style: {
              fontFamily: 'Poppins'
            }
          })
          toast.error(error.message, {
            style: {
              fontFamily: 'Poppins'
            }
          })
          history.push('/admin/settings')
        })
    }
  }, [verificationCode])

  const handleChangePassword = () => {
    dispatch(checkCurrentPassword(currentPassword, newPassword))
  }

  const sendVerificationCode = () => {
    dispatch(emailVerification())
  }

  return (
    <>
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
                Personal Information
              </Typography>
              <TextFieldForm
                personalInfo={name}
                setPersonalInfo={onChangeName}
                title={'Full Name'}
              />
              <TextFieldForm
                personalInfo={email}
                setPersonalInfo={setEmail}
                title={'Email'}
              />
              <TextFieldForm
                personalInfo={phone}
                setPersonalInfo={onChangePhone}
                title={'Phone'}
              />
              <Button
                variant='contained'
                sx={{ m: 1, height: '40px' }}
                fullWidth
                disabled={!name || !phone}
                onClick={handlePersonalInfo}
              >
                Save
              </Button>
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
                Restaurant Location
              </Typography>
              <TextFieldForm title={'Apartment/Suite'} />
              <TextFieldForm title={'Street'} />
              <TextFieldForm title={'City'} />
              <TextFieldForm title={'Country'} />
              <Button
                variant='contained'
                sx={{ m: 1, height: '40px' }}
                fullWidth
              >
                Save
              </Button>
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
                Privacy and Security
              </Typography>
              <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                <FormHelperText
                  style={{ fontSize: '15px' }}
                  id='outlined-weight-helper-text'
                >
                  New Password
                </FormHelperText>
                <OutlinedInput
                  type='password'
                  value={newPassword}
                  onChange={e => setNewPassword(e.target.value)}
                  id='outlined-adornment-weight'
                  aria-describedby='outlined-weight-helper-text'
                  inputProps={{
                    'aria-label': 'weight'
                  }}
                />
              </FormControl>
              <Button
                onClick={() => {
                  // handleChangePassword()
                  if (!TFA) {
                    setChangePasswordModal(true)
                  } else {
                    sendVerificationCode()
                  }
                }}
                sx={{ m: 1, height: '40px' }}
                fullWidth
              >
                Change Password
              </Button>
              <Box
                margin={1}
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography fontSize={'18px'}>
                  Enable 2 Factor Authentication
                </Typography>
                <Switch
                  checked={TFA}
                  onChange={e => {
                    setTFA(!TFA)
                    dispatch(updateTFA(user.id, !TFA))
                  }}
                  inputProps={'aria-label'}
                ></Switch>
              </Box>
              <Typography textAlign={'left'} margin={1}>
                Use verification codes generated by your Authenticator app at
                sign-in.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={11}>
              <Typography
                marginLeft={'10px'}
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'20px'}
              >
                Social Accounts
              </Typography>
              <TextFieldUpdateForm
                socialName='myWebsite'
                socialInfo={socialAccount.myWebsite}
                setSocialInfo={onChangeSocialAccount}
                title={'Your Website'}
              />
              <TextFieldUpdateForm
                socialName={'googleBusiness'}
                socialInfo={socialAccount.googleBusiness}
                setSocialInfo={onChangeSocialAccount}
                title={'Google My Business'}
              />
              <TextFieldUpdateForm
                socialName={'facebook'}
                socialInfo={socialAccount.facebook}
                setSocialInfo={onChangeSocialAccount}
                title={'Facebook'}
              />
              <TextFieldUpdateForm
                socialName={'instagram'}
                socialInfo={socialAccount.instagram}
                setSocialInfo={onChangeSocialAccount}
                title={'Instagram'}
              />
              <TextFieldUpdateForm
                socialName={'twitter'}
                socialInfo={socialAccount.twitter}
                setSocialInfo={onChangeSocialAccount}
                title={'Twitter'}
              />
              <TextFieldUpdateForm
                socialName={'pinterest'}
                socialInfo={socialAccount.pinterest}
                setSocialInfo={onChangeSocialAccount}
                title={'Pinterest'}
              />
              <TextFieldUpdateForm
                socialName={'tiktok'}
                socialInfo={socialAccount.tiktok}
                setSocialInfo={onChangeSocialAccount}
                title={'Tiktok'}
              />
              <TextFieldUpdateForm
                socialName={'yelp'}
                socialInfo={socialAccount.yelp}
                setSocialInfo={onChangeSocialAccount}
                title={'Yelp'}
              />
              <TextFieldUpdateForm
                socialName={'tripadvisor'}
                socialInfo={socialAccount.tripadvisor}
                setSocialInfo={onChangeSocialAccount}
                title={'TripAdvisor'}
              />
              <TextFieldUpdateForm
                socialName={'linkedin'}
                socialInfo={socialAccount.linkedin}
                setSocialInfo={onChangeSocialAccount}
                title={'Linkedin'}
              />
              <TextFieldUpdateForm
                socialName={'snapchat'}
                socialInfo={socialAccount.snapchat}
                setSocialInfo={onChangeSocialAccount}
                title={'Snapchat'}
              />
              <TextFieldUpdateForm
                socialName={'zomato'}
                socialInfo={socialAccount.zomato}
                setSocialInfo={onChangeSocialAccount}
                title={'Zomato'}
              />
              <TextFieldUpdateForm
                socialName={'whatsapp'}
                socialInfo={socialAccount.whatsapp}
                setSocialInfo={onChangeSocialAccount}
                title={'Whatsapp'}
              />
              <TextFieldUpdateForm
                socialName={'linktree'}
                socialInfo={socialAccount.linktree}
                setSocialInfo={onChangeSocialAccount}
                title={'LinkTree'}
              />
              <Button
                variant='contained'
                sx={{ m: 1, height: '40px' }}
                fullWidth
              >
                Save
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
              >
                Subscriptions
              </Typography>
              <Typography
                margin={1}
                textAlign={'left'}
                sx={{
                  border: 'dashed',
                  borderRadius: '10px',
                  borderWidth: '1px',
                  borderColor: '#F6C000',
                  backgroundColor: '#FFF8DD'
                }}
              >
                <Grid container>
                  <Grid
                    style={{
                      display: 'flex',
                      width: '70px',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <IconButton
                      sx={{
                        width: '40px',
                        height: '40px',
                        backgroundColor: '#F6C000',
                        opacity: '0.27'
                      }}
                    >
                      <PriorityHighRoundedIcon sx={{ color: '#000000' }} />
                    </IconButton>
                  </Grid>
                  <Grid xs={11}>
                    <Typography
                      padding={'5px'}
                      sx={{
                        borderRadius: '20px,'
                      }}
                    >
                      <Typography fontWeight={'bold'}>
                        We need your attention!
                      </Typography>
                      Your payment was declined. To start using tools, please
                      Add Payment Method.
                    </Typography>
                  </Grid>
                </Grid>
              </Typography>
            </Grid>
            <Grid
              item
              xs={12}
              margin={1}
              display={'flex'}
              alignItems={'start'}
              flexDirection={'column'}
            >
              <Typography fontWeight={'bold'}>
                Active until Dec 09, 2023
              </Typography>
              <Typography>
                We will send you a notification upon Subscription expiration
              </Typography>
              <Button color='error'>Cancel Subscription</Button>
              <Typography marginTop={'30px'} display={'flex'}>
                <Typography fontWeight={'bold'} marginRight={'10px'}>
                  $24.99
                </Typography>
                Per Month
              </Typography>
              <Typography>Extended Pro Package. Expires 21/12/2023</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={11}>
              <Typography
                marginLeft={'10px'}
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'20px'}
              >
                Payment Methods
              </Typography>
              <Typography
                margin={3}
                textAlign={'left'}
                fontWeight={'bold'}
                fontSize={'18px'}
              >
                My Cards
              </Typography>
              {cardInfo?.map((cardItem, index) => (
                <>
                  <Card key={index} sx={{ boxShadow: 'none' }}>
                    <CardContent>
                      <Grid container spacing={2}>
                        <Grid
                          item
                          xs={12}
                          display={'flex'}
                          justifyContent={'space-between'}
                          alignItems={'center'}
                        >
                          <Box>
                            {/* <Typography textAlign={'left'} fontWeight={'bold'}>
                            {'Card'}
                          </Typography> */}
                            <Box display={'flex'} marginTop={'10px'}>
                              <Box>
                                <CardMedia
                                  width={'150px'}
                                  component={'img'}
                                  image={CardImage[cardItem.card.brand]}
                                  alt='Visa Card'
                                />
                              </Box>
                              <Box marginLeft={'10px'}>
                                <Typography>
                                  {cardItem.card.brand +
                                    '****' +
                                    cardItem.card.last4}
                                </Typography>
                                <Typography>
                                  Card expires at{' '}
                                  {cardItem.card.exp_month +
                                    '/' +
                                    cardItem.card.exp_year}
                                </Typography>
                              </Box>
                            </Box>
                          </Box>
                          <Box display={'flex'}>
                            <Button
                              sx={{
                                backgroundColor: '#F1F1F2',
                                color: '#7E8299'
                              }}
                              onClick={() => {
                                setToDeleteId(cardItem.id)
                                setDeleteModalFlag(true)
                              }}
                            >
                              Delete
                            </Button>
                            <Button
                              sx={{
                                marginLeft: '20px',
                                backgroundColor: '#F1F1F2',
                                color: '#7E8299'
                              }}
                              onClick={() => {
                                setEditOrAdd(true)
                                setToDeleteId(cardItem.id)
                                setPaymentCardModal(true)
                              }}
                            >
                              Edit
                            </Button>
                          </Box>
                        </Grid>
                      </Grid>
                      <Dialog
                        open={deleteModalFlag}
                        onClose={() => setDeleteModalFlag(false)}
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
                          {'Delete Card Info'}
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                          <DialogContentText
                            id='alert-dialog-description'
                            style={{ textAlign: 'center' }}
                          >
                            <Icon
                              sx={{
                                width: '100px',
                                height: '100px',
                                backgroundColor: '#FF9999',
                                borderRadius: '50%'
                              }}
                            >
                              <PriorityHighRoundedIcon
                                sx={{
                                  width: '100%',
                                  height: '100%',
                                  color: '#F60000'
                                }}
                              />
                            </Icon>
                            <Typography fontSize={'18px'}>
                              Are you sure you want to delete this card
                              information?
                            </Typography>
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
                            color='error'
                            style={{ margin: '20px' }}
                            fullWidth
                            onClick={() => {
                              setDeleteModalFlag(false)
                            }}
                          >
                            Keep Card
                          </Button>
                          <Button
                            fullWidth
                            variant='contained'
                            color='error'
                            style={{ margin: '20px' }}
                            onClick={() => {
                              handlePaymentMethodDelete()
                              setDeleteModalFlag(false)
                            }}
                            autoFocus
                          >
                            {isLoading === true ? (
                              <Spinner size={'md'}></Spinner>
                            ) : (
                              'Delete'
                            )}
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </CardContent>
                  </Card>
                </>
              ))}
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
                    <Typography fontWeight={'bold'}>Important Note!</Typography>
                    <Typography>
                      Add your Card for the payment purpose
                    </Typography>
                  </Box>
                  <Button
                    onClick={() => {
                      setPaymentCardModal(true)
                      setEditOrAdd(false)
                    }}
                    variant='contained'
                  >
                    {isLoading === true ? (
                      <Spinner size={'md'}></Spinner>
                    ) : (
                      'Add Card'
                    )}
                  </Button>
                </Box>
              </Typography>
              <Dialog
                open={changePasswordModal}
                onClose={() => setChangePasswordModal(false)}
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
                  {'Update Password'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText
                    id='alert-dialog-description'
                    style={{ textAlign: 'center' }}
                  >
                    <TextField
                      placeholder='Current Password'
                      type='password'
                      value={currentPassword}
                      onChange={e => setCurrentPassword(e.target.value)}
                      fullWidth
                      sx={{ width: '400px' }}
                    ></TextField>
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
                      setChangePasswordModal(false)
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    variant='contained'
                    style={{ margin: '20px' }}
                    onClick={() => {
                      setChangePasswordModal(false)
                      handleChangePassword()
                    }}
                    autoFocus
                  >
                    Update
                  </Button>
                </DialogActions>
              </Dialog>

              <Dialog
                open={paymentCardModal}
                onClose={() => setPaymentCardModal(false)}
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
                  {'Add New Card'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText
                    id='alert-dialog-description'
                    style={{ textAlign: 'center' }}
                  >
                    <Box width={500}>
                      <Elements stripe={stripePromise}>
                        <ElementsConsumer>
                          {({ elements, stripe }) => (
                            <Form
                              onSubmit={e => {
                                setPaymentCardModal(false)
                                handleCardInfo(e, elements, stripe)
                              }}
                            >
                              <FormGroup>
                                <Label className='form_label'>
                                  Card number
                                </Label>
                                <div
                                  className='form-control mt-2 d-flex'
                                  style={{
                                    justifyContent: 'space-between'
                                  }}
                                >
                                  <i className='fa fa-credit-card'></i>
                                  <div style={{ flexBasis: '90%' }}>
                                    <CardNumberElement
                                      required
                                      onChange={handleOnChange}
                                      options={{
                                        placeholder: '1234 1234 1234 1234',
                                        style: {
                                          base: {
                                            // backgroundColor: "#232733",
                                            fontSize: '16px'
                                          },
                                          invalid: {
                                            color: '#9e2146'
                                          }
                                        }
                                      }}
                                    />
                                  </div>
                                </div>
                              </FormGroup>
                              <div className='row'>
                                <div className='col-md-6'>
                                  <FormGroup>
                                    <Label className='form_label'>
                                      Expiry Date
                                    </Label>
                                    <div
                                      className='form-control mt-2 d-flex'
                                      style={{
                                        justifyContent: 'space-between'
                                      }}
                                    >
                                      <i className='fa fa-calendar'></i>
                                      <div
                                        style={{
                                          flexBasis: '90%'
                                        }}
                                      >
                                        <CardExpiryElement
                                          required
                                          options={{
                                            placeholder: 'MM/YY',
                                            style: {
                                              base: {
                                                fontSize: '16px'
                                              },
                                              invalid: {
                                                color: '#9e2146'
                                              }
                                            }
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </div>
                                <div className='col-md-6'>
                                  <FormGroup>
                                    <Label className='form_label'>
                                      CVC/CVV
                                    </Label>
                                    <div
                                      className='form-control mt-2 d-flex'
                                      style={{
                                        justifyContent: 'space-between'
                                      }}
                                    >
                                      <div
                                        style={{
                                          flexBasis: '80%'
                                        }}
                                      >
                                        <CardCvcElement
                                          required
                                          options={{
                                            placeholder: '...',
                                            style: {
                                              base: {
                                                fontSize: '16px'
                                              },
                                              invalid: {
                                                color: '#9e2146'
                                              }
                                            }
                                          }}
                                        />
                                      </div>
                                    </div>
                                  </FormGroup>
                                </div>
                              </div>
                              <Button
                                fullWidth
                                variant='contained'
                                type='submit'
                              >
                                Add
                              </Button>
                            </Form>
                          )}
                        </ElementsConsumer>
                      </Elements>
                    </Box>
                  </DialogContentText>
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
