import { update } from 'lodash'
import firebase from '../../config/firebase'
import { toast } from 'react-toastify'

// Get all restaurant informations
export const getAllNotifications = myID => async dispatch => {
  dispatch({
    type: 'LOADER',
    payload: true
  })

  try {
    let allNotifications = []
    const snapShot = await firebase
      .firestore()
      .collection('notifications')
      // .where('destination', '==', 'all')
      .where('destination', '==', myID)
      .get()

    snapShot.forEach(doc => {
      allNotifications.push({
        id: doc.id,
        title: doc.data().title,
        text: doc.data().text,
        createdAt: doc.data().createdAt,
        destination: doc.data().destination,
        check: doc.data().check,
        sender: doc.data().sender
      })
    })

    dispatch({
      type: 'GET_NOTIFICATIONS',
      payload: allNotifications
    })

    dispatch({
      type: 'LOADER',
      payload: false
    })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'LOADER',
      payload: false
    })
  }
}

export const deleteNotification = uid => async dispatch => {
  try {
    await firebase
      .firestore()
      .collection('notifications')
      .doc(uid)
      .delete()
      .then(() => {
        toast.success('You deleted the notification successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'DELETE_NOTIFICATIONS',
          payload: uid
        })
        dispatch({
          type: 'LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
    dispatch({
      type: 'LOADER',
      payload: false
    })
  }
}

export const checkedUpdate = id => async dispatch => {
  try {
    console.log(id)
    const updateData = {
      check: true
    }
    await firebase
      .firestore()
      .collection('notifications')
      .doc(id)
      .update({
        check: true
      })
      .then(() => {
        dispatch({
          type: 'UPDATE_NOTIFICATIONS',
          payload: {
            id,
            updateData
          }
        })
      })
      .catch(err => {
        toast.error(err.message)
      })
  } catch (error) {
    toast.error(error.message)
  }
}

export const getUnreadNotifications = uid => async dispatch => {
  dispatch({
    type: 'LOADER',
    payload: true
  })
  try {
    let unreadNotifications = []
    const snapShot = await firebase
      .firestore()
      .collection('notifications')
      .where('destination', '==', uid)
      .where('check', '==', false)
      .get()

    snapShot.forEach(doc => {
      unreadNotifications.push({
        ...doc.data()
      })
    })

    dispatch({
      type: 'GET_UNREAD_NOTIFICATIONS',
      payload: unreadNotifications
    })

    dispatch({
      type: 'LOADER',
      payload: false
    })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'LOADER',
      payload: false
    })
  }
}

// export const updateRestaurant =
//   (id, updateData, onSuccess) => async dispatch => {
//     dispatch({
//       type: 'LOADER',
//       payload: true
//     })

//     try {
//       await firebase
//         .firestore()
//         .collection('users')
//         .doc(id)
//         .update({
//           ...updateData
//         })
//         .then(() => {
//           dispatch({
//             type: 'UPDATE_RESTAURANTS',
//             payload: {
//               id: id,
//               updateData: updateData
//             }
//           })
//           onSuccess()
//           toast.success(
//             'You updated the restaurant information successfully.',
//             {
//               style: {
//                 fontFamily: 'Poppins'
//               }
//             }
//           )
//           dispatch({
//             type: 'LOADER',
//             payload: false
//           })
//         })
//         .catch(error => {
//           toast.error(error.message, {
//             style: {
//               fontFamily: 'Poppins'
//             }
//           })
//           dispatch({
//             type: 'LOADER',
//             payload: false
//           })
//         })
//     } catch (error) {
//       toast.error(error.message, {
//         style: {
//           fontFamily: 'Poppins'
//         }
//       })
//       dispatch({
//         type: 'LOADER',
//         payload: false
//       })
//     }
//   }

// export const sendNotification =
//   (senderId, id, notification) => async dispatch => {
//     try {
//       dispatch({
//         type: 'LOADER',
//         payload: true
//       })
//       await firebase
//         .firestore()
//         .collection('notifications')
//         .add({
//           ...notification,
//           destination: id,
//           sender: senderId,
//           check: false,
//           createdAt: firebase.firestore.Timestamp.now()
//         })
//         .then(() => {
//           toast.success('You sent new notification successfully.', {
//             style: {
//               fontFamily: 'Poppins'
//             }
//           })
//           dispatch({
//             type: 'LOADER',
//             payload: false
//           })
//         })
//         .catch(error => {
//           toast.error(error.message, {
//             style: {
//               fontFamily: 'Poppins'
//             }
//           })
//           dispatch({
//             type: 'LOADER',
//             payload: false
//           })
//         })
//     } catch (error) {
//       toast.error(error.message, {
//         style: {
//           fontFamily: 'Poppins'
//         }
//       })
//       dispatch({
//         type: 'LOADER',
//         payload: false
//       })
//     }
//   }
