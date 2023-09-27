const asyncHandler = require('../middlewares/asyncHandler')
// const paypal = require("paypal-rest-sdk");
// const axios = require("axios");
const admin = require('firebase-admin')

const stripe = require('stripe')(
  'sk_test_51Mzkp7ITuIlz575iIYMRdrxNI7oAiGnaj5vhy5eQN3uSNJZdHRdmo2cXoZ4yVZULIx13A4Yf4EvNFpGFDu2lqvFM00Q7Fb0T1P'
)

exports.attachPaymentMethod = asyncHandler(async (req, res) => {
  const { paymentMethodId, customerId } = req.body

  try {
    // Attach the payment method to the customer
    const paymentMethod = await stripe.paymentMethods.attach(paymentMethodId, {
      customer: customerId
    })
    // Set the payment method as the default for the customer
    const result = await stripe.customers.update(customerId, {
      invoice_settings: {
        default_payment_method: paymentMethod.id
      }
    })
    res.json({ success: true, result: result })
  } catch (error) {
    res.json({ success: false })
  }
})

exports.getPaymentMethodByUser = asyncHandler(async (req, res) => {
  const cards = req.body.cards
  let all_paymentMethods = []
  try {
    for (let i = 0; i < cards.length; i++) {
      const paymentMethod = await stripe.paymentMethods.retrieve(cards[i])
      all_paymentMethods.push(paymentMethod)
    }

    res.json({ cards: all_paymentMethods })
  } catch (error) {
    res.json({ success: false })
  }
})

exports.deletePaymentMethodByUser = asyncHandler(async (req, res) => {
  const paymentMethodId = req.body.paymentMethodId

  try {
    // Detach the payment method from the customer
    const paymentMethod = await stripe.paymentMethods.detach(paymentMethodId)

    res.status(200).json({ success: true, result: paymentMethod })
  } catch (error) {
    res.status(404).json({ success: false })
  }
})

// const stripe = require('stripe')(
//   'sk_test_51Mzkp7ITuIlz575iIYMRdrxNI7oAiGnaj5vhy5eQN3uSNJZdHRdmo2cXoZ4yVZULIx13A4Yf4EvNFpGFDu2lqvFM00Q7Fb0T1P'
// )
// const CC = require('currency-converter-lt')

// exports.payment = asyncHandler(async (req, res) => {
//   const {
//     stripeToken,
//     amount,
//     email,
//     customerID,
//     cardID,
//     restaurantID,
//     currency
//   } = req?.body

//   try {
//     let usdAmount
//     let currencyConverter = new CC({
//       from: currency,
//       to: 'USD',
//       amount: amount
//     })
//     await currencyConverter.convert().then(exchangeRate => {
//       usdAmount = exchangeRate
//     })
//     const amountInCents = Math.round(usdAmount * 100)
//     let userRef = await admin
//       .firestore()
//       .collection('users')
//       .doc(restaurantID)
//       .get()
//     if (!userRef?.data()?.stripeSecretKey) {
//       return res.status(200).json({
//         success: false,
//         message: 'Stripe Secret Not Found'
//       })
//     }
//     let charge
//     let customer
//     if (userRef?.data()?.paymentConnections?.stripe) {
//       // console.log(userRef?.data()?.stripeSecretKey);
//       const stripe = require('stripe')(userRef?.data()?.stripeSecretKey)
//       if (!customerID) {
//         customer = await stripe.customers.create({
//           email,
//           source: stripeToken
//         })
//       }
//       if (cardID && customerID) {
//         charge = await stripe.charges.create({
//           customer: customerID, // The ID of the customer to charge
//           card: cardID,
//           amount: Number(amountInCents),
//           currency: 'USD',
//           description: `Charge for ${email}`
//         })
//       } else if (customerID && !cardID && stripeToken) {
//         // console.log("true customer id without  card id");
//         const token = stripeToken
//         const customer = await stripe.customers.createSource(customerID, {
//           source: token
//         })
//         charge = await stripe.charges.create({
//           amount: Number(amountInCents),
//           currency: 'USD',
//           customer: customerID,
//           source: customer.id, //card id
//           description: `Charge for ${email}`
//         })
//       } else if (customerID && !stripeToken) {
//         charge = await stripe.charges.create({
//           amount: Number(amountInCents),
//           currency: 'USD',
//           customer: customerID,
//           description: `Charge for ${email}`
//         })
//       } else {
//         charge = await stripe.charges.create({
//           amount: Number(amountInCents),
//           currency: 'USD',
//           customer: customer?.id,
//           description: `Charge for ${email}`
//         })
//       }
//       return res.status(200).json({
//         success: true,
//         chargeId: charge?.id,
//         charge: charge,
//         customer: customer?.id
//       })
//     } else if (
//       userRef?.data()?.paymentConnections?.stripe === false &&
//       userRef?.data()?.paymentConnections?.paypal === false
//     ) {
//       return res.status(200).json({
//         success: false,
//         message: 'No Payment method defined'
//       })
//     }
//   } catch (err) {
//     // console.log(err);
//     return res.status(400).json({ success: false, message: err?.message })
//   }
// })

// //Create Subscription
// exports.createSubscription = asyncHandler(async (req, res) => {
//   try {
//     const customer = await stripe.customers.create({
//       email: req.body?.email,
//       source: req.body?.stripeToken
//     })

//     let planId = ''
//     if (req.body?.plan === 'monthly') {
//       planId = req.body?.priceId
//     } else if (req.body?.plan === 'yearly') {
//       planId = req.body?.priceId
//     }

//     // get the price

//     // const price = await stripe.prices.retrieve(req?.body?.planId);

//     // Create the subscription
//     let obj = {
//       customer: customer.id,
//       items: [
//         {
//           price: planId
//         }
//       ]
//     }

//     // console.log("PlanId", planId, obj);

//     await stripe.subscriptions
//       .create(obj)
//       .then(subscription => {
//         res.status(200).json({
//           success: true,
//           data: { customer, subscription }
//         })
//       })
//       .catch(error => {
//         res.status(400).json({
//           success: false,
//           error: error.message
//         })
//       })
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message })
//   }
// })

// exports.getAllPrices = asyncHandler(async (req, res) => {
//   try {
//     const prices = await stripe.prices.list({
//       limit: 100
//     })
//     res.status(200).json({
//       success: true,
//       data: prices?.data
//     })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })

// exports.getSubscription = asyncHandler(async (req, res) => {
//   try {
//     await stripe.subscriptions
//       .retrieve(req?.params?.id)
//       .then(subscription => {
//         res.status(200).json({
//           success: true,
//           data: { subscription }
//         })
//       })
//       .catch(error => {
//         res.status(400).json({
//           success: false,
//           error: error.message
//         })
//       })
//   } catch (err) {
//     res.status(400).json({ success: false, error: err.message })
//   }
// })
