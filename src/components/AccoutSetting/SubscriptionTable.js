import Stripe from '../Stripe'
import React from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, Card, FormGroup, Input, Label, Spinner } from 'reactstrap'
// import { unsubscribe } from '../../store/actions/subscriptionAction'

const SubscriptionTable = () => {
  const { user, uid } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [showStripe, setShowStripe] = useState(false)
  const [loader, setLoader] = useState(false)
  const [subscriptionType, setSubscriptionType] = useState('')
  return (
    <Card className='shadow px-4 py-3 mb-3'>
      {/* <h3 className='pt-2'>Subscription</h3>
      {user ? (
        <>
          {user?.subScriptionStatus == 'unsubscribe' ? (
            <Button
              className='subscriptionBtn btn btn-success text-dark mt-3'
              disabled={showStripe}
              onClick={() => {
                setShowStripe(true)
              }}
            >
              Re-Subscribe
            </Button>
          ) : (
            <>
              <h1 className='mt-3'>
                You are currently subscribed to{' '}
                {user?.subscription?.subscriptionPlan == 'monthly'
                  ? 'Monthly Plan ($5)'
                  : 'Yearly Plan ($30)'}
              </h1>
              <Button
                className='subscriptionBtn btn btn-danger text-white  mt-3'
                onClick={() => {
                  // console.log(user?.subscription);
                  setLoader(true)
                  dispatch(
                    unsubscribe(
                      user?.subscription?.subscriptionID,
                      uid,
                      () => {
                        setLoader(false)
                      },
                      () => {
                        setLoader(false)
                      }
                    )
                  )
                }}
              >
                {loader ? <Spinner size={'sm'}></Spinner> : 'Unsubscribe'}
              </Button>
            </>
          )}

          {showStripe && (
            <div className='my-3'>
              <FormGroup className='mb-0'>
                <Label className='form-label'>Subscription Type</Label>
                <Input
                  className='form-control'
                  type='select'
                  value={subscriptionType}
                  onChange={e => setSubscriptionType(e.target.value)}
                >
                  <option value=''>--select--</option>
                  <option value='monthly'>Monthly</option>
                  <option value='yearly'>Yearly</option>
                </Input>
              </FormGroup>
              <div className='mt-3'>
                <Stripe
                  subscriptionType={subscriptionType}
                  setSubscriptionType={setSubscriptionType}
                  setShowStripe={setShowStripe}
                />
              </div>
            </div>
          )}
        </>
      ) : (
        <Spinner></Spinner>
      )} */}
    </Card>
  )
}

export default SubscriptionTable
