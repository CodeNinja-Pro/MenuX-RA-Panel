import firebase from '../../config/firebase'
import { toast } from 'react-toastify'

// Get all restaurant informations
export const getAllRestaurants = () => async dispatch => {
  dispatch({
    type: 'LOADER',
    payload: true
  })

  try {
    let allRestaurants = []
    const snapShot = await firebase.firestore().collection('users').get()

    snapShot.forEach(doc => {
      allRestaurants.push({
        id: doc.id,
        restaurantName: doc.data().restaurantName,
        restaurantLocation: doc.data().restaurantLocation,
        restaurantEmail: doc.data().restaurantEmail,
        restaurantPassword: doc.data().restaurantPassword,
        restaurantType: doc.data().restaurantType,
        openingYear: doc.data().createdAt.toDate().getFullYear(),
        subscription: 'basic',
        lastActivity: '2 days ago',
        restaurantStatus: doc.data().restaurantEnable
      })
    })

    dispatch({
      type: 'GET_RESTAURANTS',
      payload: allRestaurants
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

export const updateRestaurant =
  (id, updateData, onSuccess) => async dispatch => {
    dispatch({
      type: 'LOADER',
      payload: true
    })
    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .update({
          ...updateData
        })
        .then(() => {
          //   dispatch(getCoupons(userId))
          onSuccess()
          toast.success(
            'You updated the restaurant information successfully.',
            {
              style: {
                fontFamily: 'Poppins'
              }
            }
          )
          dispatch({
            type: 'LOADER',
            payload: false
          })
        })
        .catch(error => {
          toast.error(error.message, {
            style: {
              fontFamily: 'Poppins'
            }
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

export const sendNotification =
  (senderId, id, notification) => async dispatch => {
    try {
      dispatch({
        type: 'LOADER',
        payload: true
      })
      await firebase
        .firestore()
        .collection('notifications')
        .add({
          ...notification,
          destination: id,
          sender: senderId,
          check: false,
          createdAt: firebase.firestore.Timestamp.now()
        })
        .then(() => {
          toast.success('You sent new notification successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
          dispatch({
            type: 'LOADER',
            payload: false
          })
        })
        .catch(error => {
          toast.error(error.message, {
            style: {
              fontFamily: 'Poppins'
            }
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

export const deleteRestaurant = uid => async dispatch => {
  try {
    console.log(uid)
    await firebase
      .auth()
      .deleteUser(uid)
      .then(() => {
        console.log('success')
      })
    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .delete()
      .then(() => {
        toast.success('You sent new notification successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
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

export const getAllFeedbacks = id => async dispatch => {
  dispatch({
    type: 'LOADER',
    payload: true
  })

  try {
    let allFeedbacks = []
    const snapShot = await firebase.firestore().collection('feedback').get()

    snapShot.forEach(doc => {
      allFeedbacks.push({
        id: doc.id,
        ...doc.data()
      })
    })

    dispatch({
      type: 'GET_FEEDBACKS',
      payload: allFeedbacks
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

export const sendRespond = (id, obj) => async dispatch => {
  try {
    dispatch({
      type: 'LOADER',
      payload: true
    })
    const snapShot = await firebase.firestore().collection('feedback').doc(id)

    snapShot
      .get()
      .then(doc => {
        if (doc.exists) {
          const data = doc.data().respond
          const updateDoc = [
            ...data,
            {
              content: obj,
              createdAt: firebase.firestore.Timestamp.now()
            }
          ]
          snapShot.update({
            respond: updateDoc
          })
          toast.success('You sent new respond successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
          dispatch({
            type: 'LOADER',
            payload: false
          })
        } else {
          toast.error('This feedback is not exist.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
          dispatch({
            type: 'LOADER',
            payload: false
          })
        }
      })
      .catch(error => {
        toast.error(error.message, {
          style: {
            fontFamily: 'Poppins'
          }
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

export const deleteFeedback = (uid, onSuccess) => async dispatch => {
  try {
    await firebase
      .firestore()
      .collection('feedback')
      .doc(uid)
      .delete()
      .then(() => {
        onSuccess()
        toast.success('You deleted current feedback successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
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

export const getAllStaffs = id => async dispatch => {
  dispatch({
    type: 'LOADER',
    payload: true
  })

  try {
    let allStaffs = []
    const snapShot = await firebase.firestore().collection('staffs').get()

    snapShot.forEach(doc => {
      allStaffs.push({
        id: doc.id,
        ...doc.data()
      })
    })

    dispatch({
      type: 'GET_STAFFS',
      payload: allStaffs
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

export const deleteStaff = (uid, onSuccess) => async dispatch => {
  try {
    await firebase
      .firestore()
      .collection('staffs')
      .doc(uid)
      .delete()
      .then(() => {
        onSuccess()
        toast.success('You deleted current staff successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
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

// export const updateStatus =
//   (userId, id, couponStatus, onSuccess) => async dispatch => {
//     try {
//       await firebase
//         .firestore()
//         .collection('coupons')
//         .doc(id)
//         .update({
//           status: !couponStatus
//         })
//         .then(() => {
//           dispatch(getCoupons(userId))
//           onSuccess()
//           toast.success('You updated the coupon status.', {
//             style: {
//               fontFamily: 'Poppins'
//             }
//           })
//         })
//         .catch(error => {
//           toast.error(error.message, {
//             style: {
//               fontFamily: 'Poppins'
//             }
//           })
//         })
//     } catch (error) {
//       toast.error(error.message, {
//         style: {
//           fontFamily: 'Poppins'
//         }
//       })
//     }
//   }

// export const deleteCoupon = (userId, id, onSuccess) => async dispatch => {
//   dispatch({
//     type: 'COUPON_LOADER',
//     payload: true
//   })

//   try {
//     await firebase
//       .firestore()
//       .collection('coupons')
//       .doc(id)
//       .delete()
//       .then(() => {
//         dispatch(getCoupons(userId))
//         onSuccess()
//       })
//       .catch(error => {
//         toast.error(error.message, {
//           style: {
//             fontFamily: 'Poppins'
//           }
//         })
//         dispatch({
//           type: 'COUPON_LOADER',
//           payload: false
//         })
//       })
//   } catch (error) {
//     toast.error(error.message, {
//       style: {
//         fontFamily: 'Poppins'
//       }
//     })
//     dispatch({
//       type: 'COUPON_LOADER',
//       payload: false
//     })
//   }
// }

// export const addPopup =
//   (id, newPopup, bannerFile, onSuccess) => async dispatch => {
//     dispatch({
//       type: 'POPUP_LOADER',
//       payload: true
//     })
//     try {
//       const storageRef = firebase.storage().ref()

//       const imageFile = storageRef.child('popup_images/' + bannerFile.name)
//       const snapShot = await imageFile.put(bannerFile)
//       const downloadURL = await snapShot.ref.getDownloadURL()

//       const popupData = {
//         ...newPopup,
//         bannerImage: downloadURL,
//         status: false,
//         restaurantID: id,
//         createdAt: firebase.firestore.Timestamp.now()
//       }

//       await firebase
//         .firestore()
//         .collection('popups')
//         .add(popupData)
//         .then(() => {
//           onSuccess()
//           dispatch({
//             type: 'POPUP_LOADER',
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
//         type: 'POPUP_LOADER',
//         payload: false
//       })
//     }
//   }

// export const getPopups = id => async dispatch => {
//   dispatch({
//     type: 'POPUP_LOADER',
//     payload: true
//   })
//   try {
//     const snapShot = await firebase
//       .firestore()
//       .collection('popups')
//       .where('restaurantID', '==', id)
//       .get()

//     let allPopups = []

//     snapShot.forEach(doc => {
//       allPopups.push({ id: doc.id, ...doc.data() })
//     })

//     dispatch({
//       type: 'GET_POPUPS',
//       payload: allPopups
//     })

//     dispatch({
//       type: 'POPUP_LOADER',
//       payload: false
//     })
//   } catch (error) {
//     toast.error(error.message, {
//       style: {
//         fontFamily: 'Poppins'
//       }
//     })
//     dispatch({
//       type: 'POPUP_LOADER',
//       payload: false
//     })
//   }
// }

// export const updatePopupStatus =
//   (userId, id, popupStatus, onSuccess) => async dispatch => {
//     try {
//       await firebase
//         .firestore()
//         .collection('popups')
//         .doc(id)
//         .update({
//           status: !popupStatus
//         })
//         .then(() => {
//           dispatch(getPopups(userId))
//           onSuccess()
//           toast.success('You updated the popup status.', {
//             style: {
//               fontFamily: 'Poppins'
//             }
//           })
//         })
//         .catch(error => {
//           toast.error(error.message, {
//             style: {
//               fontFamily: 'Poppins'
//             }
//           })
//         })
//     } catch (error) {
//       toast.error(error.message, {
//         style: {
//           fontFamily: 'Poppins'
//         }
//       })
//     }
//   }

// export const deletePopup = (userId, id, onSuccess) => async dispatch => {
//   dispatch({
//     type: 'POPUP_LOADER',
//     payload: true
//   })

//   try {
//     const seletedPopup = await firebase
//       .firestore()
//       .collection('popups')
//       .doc(id)
//       .get()

//     const url = seletedPopup.data().bannerImage
//     await firebase.storage().refFromURL(url).delete()

//     await seletedPopup.ref
//       .delete()
//       .then(() => {
//         dispatch(getPopups(userId))
//         onSuccess()
//       })
//       .catch(error => {
//         toast.error(error.message, {
//           style: {
//             fontFamily: 'Poppins'
//           }
//         })
//         dispatch({
//           type: 'POPUP_LOADER',
//           payload: false
//         })
//       })
//   } catch (error) {
//     toast.error(error.message, {
//       style: {
//         fontFamily: 'Poppins'
//       }
//     })
//     dispatch({
//       type: 'POPUP_LOADER',
//       payload: false
//     })
//   }
// }
