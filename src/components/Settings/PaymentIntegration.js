import {
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  Typography,
  ButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  CardMedia
} from '@mui/material'
import React, { useState, useEffect } from 'react'

import { loadStripe } from '@stripe/stripe-js'

import PaypalImage from '../../assets/common/payment/PaymentGateways/PayPal.png'
import StripeImage from '../../assets/common/payment/PaymentGateways/Stripe.png'
import ApplePayImage from '../../assets/common/payment/PaymentGateways/ApplePay.png'
import GooglePayImage from '../../assets/common/payment/PaymentGateways/GooglePay.png'
import CheckoutImage from '../../assets/common/payment/PaymentGateways/checkout.png'
import pagueloImage from '../../assets/common/payment/PaymentGateways/paguelo.svg'
import TiloPayImage from '../../assets/common/payment/PaymentGateways/tilopay.png'

import AlohaImage from '../../assets/common/payment/POS/Aloha.png'
import InvuImage from '../../assets/common/payment/POS/invu.webp'
import MicrosImage from '../../assets/common/payment/POS/Micros.png'
import PixelPointImage from '../../assets/common/payment/POS/PixelPoint.png'
import SquareImage from '../../assets/common/payment/POS/Square.png'
import XetuxImage from '../../assets/common/payment/POS/Xetux.png'

import DoorDashImage from '../../assets/common/payment/OnlineOrdering/doordash.png'
import GrubHubImage from '../../assets/common/payment/OnlineOrdering/grubhub.png'
import PedidosYaImage from '../../assets/common/payment/OnlineOrdering/PedidosYa.png'
import PostmatesImage from '../../assets/common/payment/OnlineOrdering/Postmates.png'
import UberEatsImage from '../../assets/common/payment/OnlineOrdering/UberEats.png'

import PaymentIntegrationCard from './common/PaymentIntegrationCard'
import GooglePayButtonForm from './actions/GooglePayButtonForm'
// import { onGooglePayLoaded } from './actions/GooglePay'

const stripePromise = loadStripe(
  'pk_test_51Mzkp7ITuIlz575ivol6fzkYduTdDKHgAudxugxaqn8N8AM1h0qcmw95rivH5HWXNeyToz5kEzdcC4ntnPss05yF00bpwqr8mC'
)

export default function PaymentIntegration () {
  const [flag, setFlag] = useState(true)

  const [integrationModal, setIntegrationModal] = useState(false)

  const handlePayment = async () => {
    // Use the Google Pay API to tokenize the payment information
    // and send it to your server
  }

  return (
    <>
      <Card sx={{ marginTop: '15px' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box display={'flex'} justifyContent={'space-between'}>
                <Typography fontWeight={'bold'} fontSize={'20px'}>
                  Payment Methods
                </Typography>
                <ButtonGroup>
                  <Button
                    variant='contained'
                    onClick={() => setFlag(true)}
                    disabled={flag}
                  >
                    My Integrations
                  </Button>
                  <Button
                    variant='contained'
                    onClick={() => setFlag(false)}
                    disabled={!flag}
                  >
                    All Integrations
                  </Button>
                </ButtonGroup>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard
                handleChange={setIntegrationModal}
                image={PaypalImage}
                title={'Paypal'}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={12} display={'flex'}>
                    <CardMedia
                      component={'img'}
                      image={CheckoutImage}
                      alt={'Payment Image'}
                      sx={{ width: '100px', margin: '10px' }}
                    />
                    <CardContent>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'start'}
                        flexDirection={'column'}
                      >
                        <Typography>Stripe</Typography>
                        <Typography>Payment System</Typography>
                        <Button>Free</Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={12} display={'flex'}>
                    <CardMedia
                      component={'img'}
                      image={CheckoutImage}
                      alt={'Payment Image'}
                      sx={{ width: '100px', margin: '10px' }}
                    />
                    <CardContent>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'start'}
                        flexDirection={'column'}
                      >
                        <Typography>Checkout.com</Typography>
                        <Typography>Payment System</Typography>
                        <Button>Free</Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={TiloPayImage} title={'TiloPay'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard
                image={pagueloImage}
                title={'PagueloFacil'}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={12} display={'flex'}>
                    <CardMedia
                      component={'img'}
                      image={CheckoutImage}
                      alt={'Payment Image'}
                      sx={{ width: '100px', margin: '10px' }}
                    />
                    <CardContent>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'start'}
                        flexDirection={'column'}
                      >
                        <Typography>Apple Pay</Typography>
                        <Typography>Payment System</Typography>
                        <Button>Free</Button>
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <Card>
                <Grid container spacing={2}>
                  <Grid item xs={12} display={'flex'}>
                    <CardMedia
                      component={'img'}
                      image={CheckoutImage}
                      alt={'Payment Image'}
                      sx={{ width: '100px', margin: '10px' }}
                    />
                    <CardContent>
                      <Box
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'start'}
                        flexDirection={'column'}
                      >
                        <Typography>Google Pay</Typography>
                        <Typography>Payment System</Typography>
                        <GooglePayButtonForm />
                        {/* <Button onClick={() => setIntegrationModal(true)}>
                          Free
                        </Button> */}
                      </Box>
                    </CardContent>
                  </Grid>
                </Grid>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Typography
                marginTop={2}
                fontWeight={'bold'}
                textAlign={'left'}
                fontSize={'20px'}
              >
                Point of sale systems
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={AlohaImage} title={'Aloha'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'Micros'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard
                image={PaypalImage}
                title={'Pixel Point'}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'Xetux'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'Invu'} />
            </Grid>
            <Grid item xs={12}>
              <Typography
                marginTop={2}
                fontWeight={'bold'}
                textAlign={'left'}
                fontSize={'20px'}
              >
                Online Ordering
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'Uber Eats'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'PedidosYa'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'DoorDash'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'GrubHub'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard image={PaypalImage} title={'PostMats'} />
            </Grid>
            <Grid item xs={12} md={6} lg={4} xl={3}>
              <PaymentIntegrationCard
                image={PaypalImage}
                title={'CornerShop'}
              />
            </Grid>
          </Grid>
          <Dialog
            open={integrationModal}
            onClose={() => setIntegrationModal(false)}
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
              {'Payment Integration'}
            </DialogTitle>
            <Divider />
            <DialogContent>
              <DialogContentText
                id='alert-dialog-description'
                style={{ textAlign: 'center' }}
              >
                <Typography
                  marginBottom={'10px'}
                  fontWeight={'bold'}
                  textAlign={'left'}
                  fontSize={'19px'}
                >
                  The easiest way to accept online payment and control your
                  platform with Stripe!
                </Typography>
                <Typography textAlign={'left'}>
                  With Stripe, you can offer payments online on your FineDine
                  Menu with these payment methods: Credit and debit cards, ACH,
                  Alipay, Apple Pay, Bacs Direct Debit, BECS Direct Debit, FPX,
                  OXXO, SEPA Direct Debit, WeChat Pay...Also, Stripe helps keep
                  full records of all transactions so that you can easily track
                  and reconcile payments.
                </Typography>
                <Typography
                  fontWeight={'bold'}
                  textAlign={'left'}
                  fontSize={'19px'}
                  margin={'10px'}
                >
                  Pricing
                </Typography>
                <Typography textAlign={'left'}>
                  2.25% + 0,30 for European cards
                </Typography>
                <Typography textAlign={'left'}>
                  3.75% + 0,30 for non-European cards
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
                style={{ margin: '20px' }}
                fullWidth
                onClick={() => {
                  setIntegrationModal(false)
                }}
              >
                Cancel
              </Button>
              <Button
                fullWidth
                variant='contained'
                style={{ margin: '20px' }}
                onClick={() => {
                  // onGooglePayLoaded()
                  setIntegrationModal(false)
                }}
                autoFocus
              >
                Connect
              </Button>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    </>
  )
}
