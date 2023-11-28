import React, { useState } from 'react'
import LoginImage from '../../assets/common/login/login.png'
import LoginMark from '../../assets/common/login/LoginMark.png'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import Link from '@mui/material/Link'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { useMediaQuery } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import { ThemeMain } from '../../components/common/Theme'
import { Spinner } from 'reactstrap'
import GoogleIcon from '@mui/icons-material/Google'

import firebase from '../../config/firebase'

import { checkUserActive, login } from '../../store/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { provider } from '../../config/firebase'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'

export default function Login () {
  const { active } = useSelector(state => state.auth)
  const history = useHistory()

  const handleSubmit = event => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    console.log({
      email: data.get('email'),
      password: data.get('password')
    })
  }

  const dispatch = useDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  let { loading } = useSelector(state => state.auth)

  const onLoginClick = async () => {
    await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(data => {
        dispatch(
          checkUserActive(data.user?.uid, () => {
            history.push('/auth/create-restaurant')
          })
        )
      })
      .catch(err => {
        toast.error(err.message)
        dispatch({
          type: 'LOGIN_REQUEST_END'
        })
      })
  }

  const onLoginWithGoogle = async () => {
    await firebase
      .auth()
      .signInWithPopup(provider)
      .then(data => {
        dispatch(
          checkUserActive(data.user?.uid, () => {
            history.push('/auth/create-restaurant')
          })
        )
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_REQUEST_END'
        })

        toast.error(err.message)
      })
  }

  const theme = useTheme()
  const matchDownSM = useMediaQuery(theme.breakpoints.down('md'))

  return (
    <ThemeProvider theme={ThemeMain}>
      <Box
        display={'flex'}
        margin={'1'}
        sx={{ height: '95vh', width: '100vw', overflow: 'auto' }}
      >
        <Box
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
              Welcome Back!
            </Typography>
            <Typography textAlign={'left'} marginBottom={'10px'}>
              Manage your restaurant Faster and Better
            </Typography>
            <Box
              component='form'
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin='normal'
                fullWidth
                id='email'
                label='Email Address'
                name='email'
                autoFocus
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
              <TextField
                margin='normal'
                fullWidth
                name='password'
                label='Password'
                type='password'
                id='password'
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
              <Typography textAlign={'right'}>
                <Link href='/auth/forget-password' variant='body2'>
                  Forgot password?
                </Link>
              </Typography>
              <Button
                type='submit'
                fullWidth
                variant='contained'
                sx={{ mt: 3, mb: 2 }}
                style={{ height: '50px' }}
                onClick={onLoginClick}
                disabled={!email || !password}
              >
                {loading ? <Spinner size='md' /> : 'Login'}
              </Button>
              <Divider textAlign='center' sx={{ marginBottom: '30px' }}>
                OR
              </Divider>
              <Box width={'100%'}>
                <Button
                  onClick={onLoginWithGoogle}
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
              {active === false ? (
                <Box
                  marginTop={'10px'}
                  sx={{
                    padding: '10px',
                    border: 'dashed',
                    borderWidth: '1px',
                    borderColor: '#1976d2',
                    borderRadius: '10px'
                  }}
                >
                  <Typography textAlign={'center'} alignItems={'center'}>
                    You should have your{' '}
                    <Link href='/auth/create-restaurant'>
                      restaurant information
                    </Link>
                  </Typography>
                </Box>
              ) : (
                ''
              )}
              <Typography textAlign={'center'} marginTop={'20px'}>
                Don't you have an account?{' '}
                <Link href='/auth/sign-up'>Sign Up</Link>
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography>@MenuX, All rights Reserved</Typography>
          </Box>
        </Box>
        {!matchDownSM && (
          <Box
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
                  Manage Your Restaurants
                </Typography>
                <Typography marginBottom={'30px'}>
                  Manage your restaurant much better and faster with all the
                  statistics and information in one place.
                </Typography>
                <img src={LoginImage} className='img-fluid' alt='Phone image' />
              </Grid>
            </Grid>
          </Box>
        )}
      </Box>
    </ThemeProvider>
  )
}
