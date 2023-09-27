import React, { useState } from 'react'
import LoginImage from '../../../assets/common/login/login.png'
import LanguageImage from '../../../assets/common/login/language.png'
import SetupImage from '../../../assets/common/login/setup.png'
import MenuImage from '../../../assets/common/login/menu.png'

import LoginMark from '../../../assets/common/login/LoginMark.png'
import CssBaseline from '@mui/material/CssBaseline'
import { Box, Button, StepLabel, Stepper, Step } from '@mui/material'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { ThemeMain } from '../../../components/common/Theme'
import USImage from '../../../assets/common/login/united-states.png'
import FranceImage from '../../../assets/common/login/france.png'
import SpainImage from '../../../assets/common/login/spain.png'
import PortugalImage from '../../../assets/common/login/portugal.png'
import LanguageForm from './common/LanguageForm'
import TextFieldForm from './common/TextFieldForm'
import SelectForm from './common/SelectForm'
import { Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import {
  adminSignUp,
  login,
  setupRestaurant
} from '../../../store/actions/authActions'

import { Spinner } from 'reactstrap'

const steps = [
  'Select Language',
  'Lets setup your Restaurant',
  'Lets setup Menu for your Restaurant'
]

const languages = [
  {
    id: 'english',
    image: USImage
  },
  {
    id: 'spain',
    image: SpainImage
  },
  {
    id: 'france',
    image: FranceImage
  },
  {
    id: 'portugal',
    image: PortugalImage
  }
]

const businessTypes = ['Fast Food', 'Light Food', 'Drink']
const businessEmails = [
  'MenuX@gmail.com',
  'Emilio@gmail.com',
  'Brian@gmail.com'
]

export default function CreateRestaurant () {
  const history = useHistory()

  const dispatch = useDispatch()

  const userInfo = useSelector(state => state.auth.registerRequest)
  let { loading } = useSelector(state => state.auth)

  // Section for Selecting Language
  const [activeStep, setActiveStep] = useState(0)
  const [skipped, setSkipped] = useState(new Set())

  const isStepOptional = step => {
    return step === 1
  }

  const isStepSkipped = step => {
    return skipped.has(step)
  }
  // Selecting Language Processing
  const [flag, setFlag] = useState('english')

  const [businessName, setBusinessName] = useState('')
  const [businessLocation, setBusinessLocation] = useState('')
  const [businessPassword, setBusinessPassword] = useState('')
  const [businessPasswordOk, setBusinessPasswordOk] = useState('')

  const [businessType, setBusinessType] = useState('')
  const [businessEmail, setBusinessEmail] = useState('')

  const handleNext = () => {
    let newSkipped = skipped
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values())
      newSkipped.delete(activeStep)
    }

    if (activeStep === 1 && businessPassword !== businessPasswordOk) {
      toast.error('Business Password is invalid.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } else {
      setActiveStep(prevActiveStep => prevActiveStep + 1)
      setSkipped(newSkipped)
    }
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      throw new Error("You can't skip a step that isn't optional.")
    }

    setActiveStep(prevActiveStep => prevActiveStep + 1)
    setSkipped(prevSkipped => {
      const newSkipped = new Set(prevSkipped.values())
      newSkipped.add(activeStep)
      return newSkipped
    })
  }

  const handleReset = () => {
    setActiveStep(0)
  }

  const handleGetStarted = () => {
    if (
      businessName &&
      businessEmail &&
      businessType &&
      businessLocation &&
      businessPassword
    ) {
      const id = userInfo.id

      const obj = {
        language: flag,
        restaurantName: businessName,
        restaurantLocation: businessLocation,
        restaurantType: businessType,
        restaurantEmail: businessEmail,
        restaurantPassword: businessPassword,
        active: true
      }

      dispatch(
        setupRestaurant(id, obj, () => {
          history.push('auth/login')
        })
      )
    } else {
      toast.warn('It must not be an empty value.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

  let SelectLanguage = (
    <>
      <Typography textAlign={'left'} fontWeight={'bold'} fontSize={'20px'}>
        Select your Language
      </Typography>
      <Typography marginBottom={1} textAlign={'left'}>
        You can select more later
      </Typography>
      <Grid container spacing={3}>
        {languages.map(language => (
          <LanguageForm
            title={language.id}
            image={language.image}
            setFlag={setFlag}
            flag={flag}
          />
        ))}
      </Grid>
    </>
  )

  let SetupRestaurant = (
    <>
      <Typography textAlign={'left'} fontWeight={'bold'} fontSize={'20px'}>
        Lets setup your Restaurant
      </Typography>
      <Typography textAlign={'left'} marginBottom={2}>
        Your Business Information
      </Typography>
      <TextFieldForm
        type={'text'}
        placeholder={'Business Name'}
        setBusinessInfo={setBusinessName}
        businessInfo={businessName}
      />
      <SelectForm
        businessType={businessType}
        placeholder='Business Type'
        onBusinessInfoChange={setBusinessType}
        items={businessTypes}
      />
      <TextFieldForm
        type={'text'}
        placeholder={'Business Location'}
        setBusinessInfo={setBusinessLocation}
        businessInfo={businessLocation}
      />
      <SelectForm
        businessType={businessEmail}
        placeholder='Business Email'
        onBusinessInfoChange={setBusinessEmail}
        items={businessEmails}
      />
      <TextFieldForm
        type={'password'}
        placeholder={'Business Password'}
        setBusinessInfo={setBusinessPassword}
        businessInfo={businessPassword}
      />
      <TextFieldForm
        type={'password'}
        placeholder={'Business Confirm Password'}
        setBusinessInfo={setBusinessPasswordOk}
        businessInfo={businessPasswordOk}
      />
    </>
  )

  let SetupMenu = (
    <>
      <Typography fontWeight={'bold'} fontSize={'20px'}>
        Your restaurant is ready.
      </Typography>
    </>
  )

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
            <Link to='/auth/sign-up'>
              <img src={LoginMark} style={{ marginBottom: '30px' }} alt='' />
            </Link>
          </Box>
          <Box
            display={'flex'}
            justifyContent={'center'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Box sx={{ width: '60%' }}>
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {}
                  const labelProps = {}
                  if (isStepSkipped(index)) {
                    stepProps.completed = false
                  }
                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}></StepLabel>
                    </Step>
                  )
                })}
              </Stepper>
              {activeStep === steps.length ? (
                <React.Fragment>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-around',
                      marginTop: '20px'
                    }}
                  >
                    <Button onClick={handleReset}>Reset</Button>
                    <Button variant='contained' onClick={handleGetStarted}>
                      {loading ? <Spinner size='md' /> : 'Get Started'}
                    </Button>
                  </Box>
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <Typography sx={{ mt: 2, mb: 1 }}>
                    {activeStep === 0 ? SelectLanguage : ''}
                    {activeStep === 1 ? SetupRestaurant : ''}
                    {activeStep === 2 ? SetupMenu : ''}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                    <Button
                      color='inherit'
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>
                    <Box sx={{ flex: '1 1 auto' }} />
                    {isStepOptional(activeStep) && (
                      <Button
                        color='inherit'
                        onClick={handleSkip}
                        sx={{ mr: 1 }}
                      >
                        Skip
                      </Button>
                    )}

                    <Button onClick={handleNext}>
                      {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                    </Button>
                  </Box>
                </React.Fragment>
              )}
            </Box>
          </Box>
          <Box display={'flex'} marginLeft={'40px'}>
            <Typography>@MenuX, All rights Reserved</Typography>
          </Box>
        </Grid>
        <Grid
          xs={false}
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
          {activeStep === 0 ? (
            <img
              src={LanguageImage}
              style={{ borderRadius: '20px' }}
              className='img-fluid'
              alt='Phone image'
            />
          ) : (
            ''
          )}
          {activeStep === 1 ? (
            <img
              src={SetupImage}
              style={{ borderRadius: '20px' }}
              className='img-fluid'
              alt='Phone image'
            />
          ) : (
            ''
          )}
          {activeStep === 2 || activeStep === 3 ? (
            <img
              src={MenuImage}
              style={{ borderRadius: '20px' }}
              className='img-fluid'
              alt='Phone image'
            />
          ) : (
            ''
          )}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
}
