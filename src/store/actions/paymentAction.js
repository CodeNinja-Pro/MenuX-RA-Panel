import { toast } from 'react-toastify'
import firebase from '../../config/firebase'
import { RepositoryFactory } from '../../repository/RepositoryFactory'
import axios from 'axios'

let Payment = RepositoryFactory.get('payment')

export const getCustomerID = id => async dispatch => {
  try {
    const customer = await firebase
      .firestore()
      .collection('customers')
      .doc(id)
      .get()

    dispatch({
      type: 'GET_CUSTOMER',
      payload: customer.data()
    })
  } catch (error) {
    toast.error(error.message)
  }
}

export const attachPaymentMethod =
  (userId, body, onSuccess) => async dispatch => {
    dispatch({
      type: 'CARD_LOADER',
      payload: true
    })
    await axios
      .post(
        'https://us-central1-menu-x-353fd.cloudfunctions.net/app/payment/attach-payment-method',
        body
      )
      .then(res => {
        console.log(res)
        savePaymentMethod(userId, body.paymentMethodId)
        onSuccess()
        dispatch({
          type: 'CARD_LOADER',
          payload: false
        })
      })
      .catch(err => {
        dispatch({
          type: 'CARD_LOADER',
          payload: false
        })

        toast.error(err.message)
      })
  }

const savePaymentMethod = async (userId, id) => {
  const previous = await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .get()

  let previousId = []
  if (previous.data().cards) {
    previousId = previous.data().cards
  }
  previousId.push(id)
  await firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .update({
      cards: previousId
    })
    .then(
      toast.success('You added new payment method.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    )
    .catch(err => {
      toast.error(err.message)
    })
}

export const getPaymentMethodByUser = cards => async dispatch => {
  const body = {
    cards: cards
  }
  await axios
    .post(
      'https://us-central1-menu-x-353fd.cloudfunctions.net/app/payment/get-payment-method',
      body
    )
    .then(res => {
      console.log(res.data)
      dispatch({
        type: 'GET_ALL_CARD',
        payload: res.data.cards
      })
    })
    .catch(err => {
      toast.error(err.message)
    })
}

export const editPaymentMethodByUser = (userId, id, body) => async dispatch => {
  try {
    await axios.post(
      'https://us-central1-menu-x-353fd.cloudfunctions.net/app/payment/get-payment-method',
      body
    )
  } catch (error) {
    toast.error(error.message)
  }
}

export const deletePaymentMethodByUser =
  (paymentMethodId, onSuccess) => async dispatch => {
    dispatch({
      type: 'CARD_LOADER',
      payload: true
    })
    const body = {
      paymentMethodId: paymentMethodId
    }
    await axios
      .post(
        'https://us-central1-menu-x-353fd.cloudfunctions.net/app/payment/delete-payment-method',
        body
      )
      .then(res => {
        onSuccess()
        dispatch({
          type: 'CARD_LOADER',
          payload: false
        })
      })
      .catch(err => {
        dispatch({
          type: 'CARD_LOADER',
          payload: false
        })

        toast.error(err.message)
      })
  }

export const removePaymentMethodId = (userId, id) => async dispatch => {
  dispatch({
    type: 'CARD_LOADER',
    payload: true
  })

  try {
    const removed = await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .get()

    let newCards = []
    if (removed.data().cards) {
      newCards = removed.data().cards.filter(card => card !== id)
    }

    await firebase
      .firestore()
      .collection('users')
      .doc(userId)
      .update({
        cards: newCards
      })
      .then(() => {
        dispatch({
          type: 'CARD_LOADER',
          payload: false
        })

        toast.success('You deleted current card successfully.')
      })
  } catch (error) {
    dispatch({
      type: 'CARD_LOADER',
      payload: false
    })

    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
  }
}

// export const unsubscribe =
//   (sub_id, uid, onSuccess, onError) => async dispatch => {
//     await User.unSubscribe(sub_id)
//       .then(async response => {
//         await firebase
//           .firestore()
//           .collection('users')
//           .doc(uid)
//           .update({ subScriptionStatus: 'unsubscribe' })
//           .then(
//             onSuccess(),
//             toast.success('Subscription Cancelled Successfuly.!', {
//               style: {
//                 fontFamily: 'Poppins'
//               }
//             })
//           )
//       })
//       .catch(ex => {
//         //   enqueueSnackbar(ex);
//         toast.error(ex, {
//           style: {
//             fontFamily: 'Poppins'
//           }
//         })
//         onError()
//       })
//   }

// export const createSubscribe =
//   (obj, uid, onSuccess, onError) => async dispatch => {
//     await User.createSubscription(obj)
//       .then(async response => {
//         let payload = {
//           customerID: response.data.data.customer.id,
//           subscriptionID: response.data.data.subscription.id,
//           subscriptionPlan: obj.plan
//         }

//         await firebase
//           .firestore()
//           .collection('users')
//           .doc(uid)
//           .update({ subscription: payload, subScriptionStatus: 'subscribe' })
//           .then(
//             onSuccess(),
//             toast.success('Re-Subscribe Successfuly.!', {
//               style: {
//                 fontFamily: 'Poppins'
//               }
//             })
//           )
//       })
//       .catch(ex => {
//         enqueueSnackbar(ex)
//         onError()
//       })
//   }
