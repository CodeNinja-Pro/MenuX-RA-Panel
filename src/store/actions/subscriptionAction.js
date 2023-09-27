import { toast } from 'react-toastify'
import firebase from '../../config/firebase'
import { RepositoryFactory } from '../../repository/RepositoryFactory'
import { enqueueSnackbar } from 'notistack'

// let User = RepositoryFactory.get('user')

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
