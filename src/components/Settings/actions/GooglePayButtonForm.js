import React, { useEffect } from 'react'
import GooglePayButton from '@google-pay/button-react'

export default function GooglePayButtonForm () {
  useEffect(() => {
    // Create script element
    const script = document.createElement('script')

    // Set script attributes
    script.src = 'https://pay.google.com/gp/p/js/pay.js'
    script.async = true

    // Define onload function
    script.onload = () => {
      console.log('Google Pay script loaded')
      // TODO: add your onload function here
      // window.googlePayClient = new google.payments.api.PaymentsClient({
      //   environment: 'TEST'
      // })
    }

    // Add script to document
    document.body.appendChild(script)

    // Remove script from document on component unmount
    return () => {
      document.body.removeChild(script)
    }
  }, []) // Empty dependency array ensures this runs once on mount and cleanup on unmount

  return (
    <>
      <GooglePayButton
        environment='TEST'
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA']
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'adyen',
                  gatewayMerchantId: 'TestMerchantAccount'
                }
              }
            }
          ],
          merchantInfo: {
            merchantId: 'TestMerchantAccount',
            merchantName: 'Demo'
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: '10.00',
            currencyCode: 'USD',
            countryCode: 'NL'
          }
        }}
        onLoadPaymentData={paymentRequest => {
          var token = paymentRequest.paymentMethodData.tokenizationData.token
          this.addPaymentRequest('10.00', 'USD', token)
        }}
        onCancel={() => console.log('action canceled by shopper')}
      />
    </>
  )
}
