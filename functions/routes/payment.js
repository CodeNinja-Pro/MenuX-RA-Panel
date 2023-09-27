const express = require('express')
// const { payment } = require('../controllers/payment')
const {
  attachPaymentMethod,
  getPaymentMethodByUser,
  deletePaymentMethodByUser
} = require('../controllers/payment')
const router = express.Router()

router.route('/attach-payment-method').post(attachPaymentMethod)
router.route('/get-payment-method').post(getPaymentMethodByUser)
router.route('/delete-payment-method').post(deletePaymentMethodByUser)

// router.route('/').post(payment)
// router.route('/subscribe').post(createSubscription)
// router.route('/prices').get(getAllPrices)
// router.route('/getSubscription/:id').get(getSubscription)

module.exports = router
