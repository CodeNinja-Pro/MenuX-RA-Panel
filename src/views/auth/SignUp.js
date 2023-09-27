// import {
//   CardNumberElement,
//   CardExpiryElement,
//   CardCvcElement
// } from '@stripe/react-stripe-js'
// import { Elements, ElementsConsumer } from '@stripe/react-stripe-js'
// import { loadStripe } from '@stripe/stripe-js'
// import { adminSignUp } from '../../store/actions/authActions'
// import axios from 'axios'
// import { TEST_CLIENT_KEY } from '../../contants/index.js'
// import { FaEyeSlash, FaEye } from 'react-icons/fa'
// import { toast } from 'react-toastify'
// import { enqueueSnackbar } from 'notistack'

// let stripePromise = loadStripe(TEST_CLIENT_KEY)
// const SignUp = () => {
//   const history = useHistory()
//   let stripePromise = loadStripe('pk_test_7wzXL7byFHbRdehCSS5eC04Q00zUcStdHz')
//   const [email, setEmail] = useState('')
//   const [location, setLocation] = useState('')
//   const [password, setPassword] = useState('')
//   const [eye, setEye] = useState(false)
//   const [restaurantName, setRestaurantName] = useState('')
//   const [subscriptionType, setSubscriptionType] = useState('')
//   const { successMsg, setSuccessMsg } = useState('')
//   const [stripeError, setStripeError] = useState(false)
//   const [errorMessage, setErrorMessage] = useState('')
//   const [paymentLoader, setPaymentLoader] = useState(false)
//   let { loading } = useSelector(state => state.auth)
//   const dispatch = useDispatch()
//   const handleStripError = message => {
//     setStripeError(true)
//     setErrorMessage(message)
//     setTimeout(() => {
//       setStripeError(false)
//       setErrorMessage('')
//     }, 3000)
//   }
//   const handleSignUp = async (e, elements, stripe) => {
//     e.preventDefault()

//     dispatch(
//       adminSignUp(obj, password, () => {
//         setRestaurantName('')
//         setEmail('')
//         setPassword('')
//         setSubscriptionType('')
//         setPaymentLoader(false)
//         history.push('/auth/login')
//       })
//     )

// await setPaymentLoader(true)
// const cardElement = await elements.getElement(CardNumberElement)
// const cardElement2 = await elements.getElement(CardExpiryElement)
// const cardElement3 = await elements.getElement(CardCvcElement)

// const { error, paymentMethod } = await stripe.createPaymentMethod({
//   type: 'card',
//   card: cardElement,
//   card: cardElement2,
//   card: cardElement3
// })
// if (!error) {
//   await setPaymentLoader(false)
//   enqueueSnackbar('Card Details not Added')
// } else {
//   const result = await stripe.createToken(cardElement)
//   if (result.error) {
//     enqueueSnackbar(result.error.message)
//     return
//   }

//   let planId = ''

// await axios
//   .get(
//     'https://us-central1-menu-x-353fd.cloudfunctions.net/app/payment/prices'
//   )
//   .then(res => {
//     let { data } = res
//     data?.data?.forEach(record => {
//       let nickName = record?.nickname
//       let subscription = nickName?.split(' ')
//       let selectedSubscription = subscription?.[0].toLowerCase()
//       if (selectedSubscription === subscriptionType) {
//         planId = record?.id
//       }
//     })
//   })
//   .catch(err => {
//     let { data } = err.response
//     console.error(data?.error, 'Error')
//     setPaymentLoader(false)
//   })

// let body = {
//   stripeToken: result.token.id,
//   plan: subscriptionType.toLowerCase(),
//   email: email,
//   priceId: planId
// }

// await axios
//   .post(
//     'https://us-central1-menu-x-353fd.cloudfunctions.net/app/payment/subscribe',
//     body
//   )
//   .then(res => {
//     let { data } = res
//     let obj = {
//       email,
//       name: restaurantName,
//       location: location
// subscription: {
//   subscriptionID: data?.data?.subscription?.id,
//   customerID: data?.data?.customer?.id,
//   subscriptionPlan: subscriptionType
// }
// }
//   dispatch(
//     adminSignUp(obj, password, () => {
//       elements.getElement(CardNumberElement).clear()
//       elements.getElement(CardExpiryElement).clear()
//       elements.getElement(CardCvcElement).clear()
//       setRestaurantName('')
//       setEmail('')
//       setPassword('')
//       setSubscriptionType('')
//       setPaymentLoader(false)
//       history.push('/auth/login')
//     })
//   )
//   setPaymentLoader(false)
// })
// .catch(err => {
//   let { data } = err.response
//   console.error(data?.error, 'Error')
//   toast.warn(data?.error, {
//     style: {
//       fontFamily: 'Poppins'
//     }
//   })
//   handleStripError(data?.message)
//   setPaymentLoader(false)
// })
// }
//   }
//   return (
//     <Col lg='5' md='7' className='login'>
//       <Card className='bg-secondary shadow border-0    '>
//         <CardBody className='px-lg-5 pt-lg-2 pb-lg-2'>
//           <div className=' d-flex flex-column justify-content-center align-items-center'>
//             <img src={Mdark} alt='' className='mb-1' />
//             <div className='d-flex flex-column justify-content-center align-items-center'>
//               <h3 className='title'>Welcome</h3>
//             </div>
//           </div>

//           <Elements stripe={stripePromise}>
//             <ElementsConsumer>
//               {({ elements, stripe }) => (
//                 <Form
//                   onSubmit={e => {
//                     handleSignUp(e, elements, stripe)
//                   }}
//                 >
//                   <Row>
//                     <Col className='col-6 pr-2'>
//                       {' '}
//                       <FormGroup className='mb-1'>
//                         <Label className='form_label'>Merchant Name</Label>
//                         <Input
//                           placeholder='Restaurant Name'
//                           type='text'
//                           value={restaurantName}
//                           required
//                           onChange={e => setRestaurantName(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className='col-6 pl-2'>
//                       <FormGroup className='mb-1'>
//                         <Label className='form_label'>Merchant Location</Label>
//                         <Input
//                           placeholder='Location'
//                           type='text'
//                           required
//                           value={location}
//                           onChange={e => setLocation(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                   </Row>
//                   <Row className='py-2'>
//                     <Col className='col-6 pr-2'>
//                       <FormGroup className='mb-1'>
//                         <Label className='form_label'>Merchant Email</Label>
//                         <Input
//                           placeholder='example@gmail.com'
//                           type='email'
//                           autoComplete='new-email'
//                           required
//                           value={email}
//                           onChange={e => setEmail(e.target.value)}
//                         />
//                       </FormGroup>
//                     </Col>
//                     <Col className='col-6 pl-2'>
//                       <FormGroup className='mb-1'>
//                         <Label className='form_label'>Password</Label>
//                         <div className='login__password'>
//                           <Input
//                             placeholder='Password'
//                             // type="password"
//                             required
//                             type={eye ? 'text' : 'password'}
//                             autoComplete='new-password'
//                             value={password}
//                             onChange={e => setPassword(e.target.value)}
//                           />
//                           {eye ? (
//                             <FaEyeSlash
//                               className='eye_icon'
//                               onClick={() => setEye(!eye)}
//                             />
//                           ) : (
//                             <FaEye
//                               className='eye_icon'
//                               onClick={() => setEye(!eye)}
//                             />
//                           )}
//                         </div>
//                       </FormGroup>
//                     </Col>
//                     {/* <Col className="col-6 pl-2">

//                     </Col> */}
//                   </Row>
//                   <FormGroup className='mb-1'>
//                     <Label className='form_label'>Subscription Type</Label>
//                     <Input
//                       type='select'
//                       required
//                       value={subscriptionType}
//                       onChange={e => setSubscriptionType(e.target.value)}
//                     >
//                       <option value=''>--select--</option>
//                       <option value='monthly'>Monthly</option>
//                       <option value='yearly'>Yearly</option>
//                     </Input>
//                   </FormGroup>
//                   {subscriptionType ? (
//                     <>
//                       {' '}
//                       {subscriptionType === 'monthly' ? (
//                         <h5 className='float-right my-2 text-danger'>
//                           You have to Pay $5 per Month
//                         </h5>
//                       ) : (
//                         <h5 className=' float-right my-2 text-danger'>
//                           You have to Pay $30 per Year
//                         </h5>
//                       )}{' '}
//                       <FormGroup>
//                         <Label className='form_label'>Card number</Label>
//                         <div
//                           className='form-control mt-2 d-flex'
//                           style={{
//                             justifyContent: 'space-between'
//                           }}
//                         >
//                           <i className='fa fa-credit-card'></i>
//                           <div style={{ flexBasis: '90%' }}>
//                             <CardNumberElement
//                               required
//                               options={{
//                                 placeholder: '1234 1234 1234 1234',
//                                 style: {
//                                   base: {
//                                     // backgroundColor: "#232733",
//                                     fontSize: '16px'
//                                   },
//                                   invalid: {
//                                     color: '#9e2146'
//                                   }
//                                 }
//                               }}
//                             />
//                           </div>
//                         </div>
//                       </FormGroup>
//                       <div className='row'>
//                         <div className='col-md-6'>
//                           <FormGroup>
//                             <Label className='form_label'>Expiry Date</Label>
//                             <div
//                               className='form-control mt-2 d-flex'
//                               style={{
//                                 justifyContent: 'space-between'
//                               }}
//                             >
//                               <i className='fa fa-calendar'></i>
//                               <div
//                                 style={{
//                                   flexBasis: '90%'
//                                 }}
//                               >
//                                 <CardExpiryElement
//                                   required
//                                   options={{
//                                     placeholder: 'MM/YY',
//                                     style: {
//                                       base: {
//                                         fontSize: '16px'
//                                       },
//                                       invalid: {
//                                         color: '#9e2146'
//                                       }
//                                     }
//                                   }}
//                                 />
//                               </div>
//                             </div>
//                           </FormGroup>
//                         </div>
//                         <div className='col-md-6'>
//                           <FormGroup>
//                             <Label className='form_label'>CVC/CVV</Label>
//                             <div
//                               className='form-control mt-2 d-flex'
//                               style={{
//                                 justifyContent: 'space-between'
//                               }}
//                             >
//                               <div
//                                 style={{
//                                   flexBasis: '80%'
//                                 }}
//                               >
//                                 <CardCvcElement
//                                   required
//                                   options={{
//                                     placeholder: '...',
//                                     style: {
//                                       base: {
//                                         fontSize: '16px'
//                                       },
//                                       invalid: {
//                                         color: '#9e2146'
//                                       }
//                                     }
//                                   }}
//                                 />
//                               </div>
//                             </div>
//                           </FormGroup>
//                           {stripeError && (
//                             <p className='mb-0 my-1 text-danger'>
//                               {errorMessage}
//                             </p>
//                           )}
//                           {successMsg && (
//                             <p className='mb-0 my-1 text-success'>
//                               {successMsg}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </>
//                   ) : (
//                     ''
//                   )}

//                   <Button
//                     className='mt-1 mb-1 w-100 login__btn'
//                     type='submit'
//                     disabled={
//                       !email ||
//                       !subscriptionType ||
//                       !password ||
//                       !restaurantName
//                     }
//                     dispatch={subscriptionType}
//                   >
//                     {'Sign Up'}
//                     {/* {paymentLoader ? <Spinner size={"sm"} /> : "Sign Up"} */}
//                   </Button>

//                   <Row className='mt-0 mb-2 mx-2 justify-content-end'>
//                     <Link to='/auth/login' className='pointer'>
//                       <small>Already have an account? login</small>
//                     </Link>
//                   </Row>
//                 </Form>
//               )}
//             </ElementsConsumer>
//           </Elements>
//         </CardBody>
//       </Card>
//     </Col>
//   )
// }

// export default SignUp

import React, { useState } from 'react'
import LoginImage from '../../assets/common/login/login.png'
import LoginMark from '../../assets/common/login/LoginMark.png'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { ThemeMain } from '../../components/common/Theme'
import { Spinner } from 'reactstrap'
import GoogleIcon from '@mui/icons-material/Google'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { useHistory } from 'react-router-dom'

import firebase from '../../config/firebase'
import { signupInformation } from '../../store/actions/authActions'

export default function SignUp () {
  const dispatch = useDispatch()
  const history = useHistory()

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordOk, setPasswordOk] = useState('')
  let { loading } = useSelector(state => state.auth)

  const onRegisterClick = async () => {
    if (password === passwordOk) {
      await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(data => {
          console.log(data)
          dispatch(
            signupInformation(
              data.user?.uid,
              data.user?.displayName,
              data.user?.email,
              () => {
                history.push('/auth/create-restaurant')
                dispatch({
                  type: 'REGISTER_REQUEST',
                  payload: {
                    id: data.user?.uid
                  }
                })
              }
            )
          )
        })
        .catch(error => {
          toast.error(error.message)
        })
    } else {
      toast.error('Confirm password is inValid.')
    }
  }

  const signupWithGoogle = async () => {
    try {
      await firebase
        .auth()
        .signInWithPopup(new firebase.auth.GoogleAuthProvider())
        .then(data => {
          dispatch(
            signupInformation(
              data.user?.uid,
              data.user?.displayName,
              data.user?.email,
              () => {
                history.push('/auth/create-restaurant')

                dispatch({
                  type: 'REGISTER_REQUEST',
                  payload: {
                    id: data.user?.uid
                  }
                })
              }
            )
          )
        })
    } catch (error) {
      toast.error(error.message)
    }
  }

  return (
    <ThemeProvider theme={ThemeMain}>
      <Grid
        display={'flex'}
        component='main'
        margin={'1'}
        sx={{ height: '95vh', width: '100vw' }}
      >
        <CssBaseline />
        <Grid
          xs={12}
          sm={8}
          md={6}
          width={'100%'}
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'space-between'}
        >
          <Box display={'flex'} marginLeft={'40px'}>
            <img src={LoginMark} style={{ marginBottom: '30px' }} alt='' />
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Typography
              fontSize={'25px'}
              fontWeight={'bold'}
              marginBottom={'10px'}
              textAlign={'left'}
            >
              Register
            </Typography>
            <Box component='form' noValidate sx={{ mt: 1 }} width={'50%'}>
              <TextField
                margin='normal'
                fullWidth
                label='Full Name'
                name='fullName'
                autoFocus
                value={fullName}
                required
                onChange={e => setFullName(e.target.value)}
              />
              <TextField
                margin='normal'
                fullWidth
                name='email'
                label='Email'
                type='email'
                value={email}
                required
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
                value={password}
                required
                onChange={e => setPassword(e.target.value)}
              />
              <TextField
                margin='normal'
                fullWidth
                name='passwordOk'
                label='Confirm Password'
                type='password'
                required
                value={passwordOk}
                onChange={e => setPasswordOk(e.target.value)}
              />
              <Button
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                style={{ height: '50px' }}
                onClick={onRegisterClick}
                disabled={!email || !fullName || !passwordOk || !password}
              >
                {loading ? <Spinner size='md' /> : 'Register'}
              </Button>
              <Divider textAlign='center' sx={{ marginBottom: '30px' }}>
                OR
              </Divider>
              <Box width={'100%'}>
                <Button
                  onClick={signupWithGoogle}
                  variant='outlined'
                  sx={{
                    width: '45%',
                    height: '60px',
                    borderColor: '#e0e0e0'
                  }}
                >
                  <GoogleIcon />
                </Button>
              </Box>
              <Typography textAlign={'center'} marginTop={'20px'}>
                Already have an account? <Link href='/auth/login'>Login</Link>
              </Typography>
            </Box>
          </Box>
          <Box display={'flex'} marginLeft={'40px'}>
            <Typography>@MenuX, All rights Reserved</Typography>
          </Box>
        </Grid>
        <Grid
          xs={false}
          sm={4}
          md={6}
          sx={{
            marginRight: '20px',
            backgroundColor: '#F3F4F6',
            borderRadius: '20px',
            width: '100%'
          }}
          display={'flex'}
          justifyContent={'center'}
          flexDirection={'column'}
        >
          <Grid container>
            <Grid item xs={12}>
              <Typography
                fontSize={'30px'}
                fontWeight={'bold'}
                marginBottom={'30px'}
              >
                Create an account and get started!
              </Typography>
              <Typography marginBottom={'30px'}>
                Manage your restaurant much better and faster with all the
                statistics and information in one place.
              </Typography>
              <img src={LoginImage} className='img-fluid' alt='Phone image' />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
