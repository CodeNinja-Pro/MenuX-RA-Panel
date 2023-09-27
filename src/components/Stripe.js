import React from 'react'
import {
  CardNumberElement,
  CardExpiryElement,
  CardCvcElement
} from '@stripe/react-stripe-js'
import { enqueueSnackbar } from 'notistack'
import { Elements, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { TEST_CLIENT_KEY } from '../contants/index.js'
import { useState } from 'react'
import { Button, Form, FormGroup, Label, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
// import { createSubscribe } from "../store/actions/subscriptionAction.js";
let stripePromise = loadStripe(TEST_CLIENT_KEY)

function Stripe ({ subscriptionType, setSubscriptionType, setShowStripe }) {
  const dispatch = useDispatch()
  const { user, uid } = useSelector(state => state.auth)
  const { successMsg, setSuccessMsg } = useState('')
  const [stripeError, setStripeError] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [paymentLoader, setPaymentLoader] = useState(false)
  const handleStripError = message => {
    setStripeError(true)
    setErrorMessage(message)
    setTimeout(() => {
      setStripeError(false)
      setErrorMessage('')
    }, 3000)
  }
  return (
    <Elements stripe={stripePromise}>
      <ElementsConsumer>
        {({ elements, stripe }) => (
          <Form
            onSubmit={async e => {
              e.preventDefault()
              await setPaymentLoader(true)
              const cardElement = await elements.getElement(CardNumberElement)
              const cardElement2 = await elements.getElement(CardExpiryElement)
              const cardElement3 = await elements.getElement(CardCvcElement)

              const { error, paymentMethod } = await stripe.createPaymentMethod(
                {
                  type: 'card',
                  card: cardElement,
                  card: cardElement2,
                  card: cardElement3
                }
              )
              if (error) {
                await setPaymentLoader(false)
                enqueueSnackbar('Card Details not Added')
              } else {
                // console.log("[payment Method]", paymentMethod)
                const result = await stripe.createToken(cardElement)
                // console.log("result", result)
                if (result.error) {
                  enqueueSnackbar(result.error.message)
                  await setPaymentLoader(false)
                  // console.log("error result", result)
                  return
                }

                // console.log(">>", result.token.id);
                // dispatch(
                //   createSubscribe(
                //     {
                //       email: user?.email,
                //       stripeToken: result.token.id,
                //       plan: subscriptionType,
                //     },
                //     uid,
                //     (res) => {
                //       elements.getElement(CardNumberElement).clear();
                //       elements.getElement(CardExpiryElement).clear();
                //       elements.getElement(CardCvcElement).clear();
                //       setSubscriptionType("");
                //       setPaymentLoader(false);
                //       setShowStripe(false);
                //     },
                //     () => {
                //       setPaymentLoader(false);
                //     }
                //   )
                // );
                //   axios
                //     .post(
                //       "https://us-central1-menux1.cloudfunctions.net/app/payment",
                //       body
                //     )
                //     .then((res) => {
                //       let { data } = res;

                //       let obj = {
                //         ...orderData,
                //         customerID: uid,
                //         paymentMethod: "Stripe",
                //         status: "pending",
                //         paymentID: data?.charge?.id,
                //       };

                //       dispatch(
                //         addOrderAction(
                //           obj,
                //           (orderID) => {
                //             elements.getElement(CardNumberElement).clear();
                //             elements.getElement(CardExpiryElement).clear();
                //             elements.getElement(CardCvcElement).clear();

                //             enqueueSnackbar("Order Placed Successfully..!");
                //             // setSuccessMsg(
                //             //     "Amount Deducted successfully..!"
                //             // );
                //             // setTimeout(
                //             //     () => {
                //             //         setSuccessMsg(
                //             //             ""
                //             //         );
                //             //     },
                //             //     3000
                //             // );
                //             history.push(`/tracking/orderID=${orderID}`);
                //             dispatch(clearCartAction());
                //             localStorage.removeItem("cartPath");
                //             setPaymentLoader(false);
                //           },
                //           (res) => {
                //             setErrorMessage(res);
                //             setPaymentLoader(false);
                //           }
                //         )
                //       );
                //     })
                //     .catch((err) => {
                //       let { data } = err.response;
                //       console.error(data?.message, "Error");
                //       handleStripError(data?.message);
                //       setPaymentLoader(false);
                //     });
              }
            }}
          >
            <FormGroup>
              <Label className='form_label'>Card number</Label>
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
                  <Label className='form_label'>Expiry Date</Label>
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
                  <Label className='form_label'>CVC/CVV</Label>
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
                {stripeError && (
                  <p className='mb-0 my-1 text-danger'>{errorMessage}</p>
                )}
                {successMsg && (
                  <p className='mb-0 my-1 text-success'>{successMsg}</p>
                )}
              </div>
            </div>{' '}
            <Button
              className='auth-button mt-2 py-3 btn btn-lg btn-block border border-none'
              type='submit'
              style={{ backgroundColor: '#f2ba36' }}
              disabled={paymentLoader}
            >
              {paymentLoader ? (
                <Spinner size='sm' />
              ) : (
                <h4 className='mb-0'>Subscribe</h4>
              )}
            </Button>
          </Form>
        )}
      </ElementsConsumer>
    </Elements>
  )
}

export default Stripe
