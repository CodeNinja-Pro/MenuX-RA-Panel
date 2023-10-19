import firebase from '../../config/firebase'
import { toast } from 'react-toastify'
import { RepositoryFactory } from '../../repository/RepositoryFactory'
let Staff = RepositoryFactory.get('staff')

// Get All menu item of all restaurants
export const getAllMenuItems = () => async dispatch => {
  try {
    dispatch({
      type: 'LOADER',
      payload: true
    })

    let allMenuItems = []
    const snapShot = await firebase.firestore().collection('menus').get()

    snapShot.forEach(doc => {
      allMenuItems.push({
        id: doc.id,
        name: doc.data().name,
        restaurantID: doc.data().restaurantID,
        views: doc.data().views,
        purchase: doc.data().purchase,
        price: doc.data().price,
        cost: doc.data().totalPrice
      })
    })

    dispatch({
      type: 'ALL_RESTAURANT_ITEMS',
      payload: allMenuItems
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

// Get all restaurant informations
export const getAllRestaurants = () => async dispatch => {
  dispatch({
    type: 'LOADER',
    payload: true
  })

  try {
    let allRestaurants = []
    const snapShot = await firebase
      .firestore()
      .collection('users')
      .where('type', '==', 'restaurant')
      .where('role', '==', 'admin')
      .where('active', '==', true)
      .get()

    snapShot.forEach(doc => {
      allRestaurants.push({
        id: doc.id,
        email: doc.data().email,
        restaurantName: doc.data().restaurantName,
        restaurantLocation: doc.data().restaurantLocation,
        restaurantEmail: doc.data().restaurantEmail,
        restaurantPassword: doc.data().restaurantPassword,
        restaurantType: doc.data().restaurantType,
        openingYear: doc.data().createdAt.toDate().getFullYear(),
        subscription: 'basic',
        lastActivity: '2 days ago',
        restaurantEnable: doc.data().restaurantEnable
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
          dispatch({
            type: 'UPDATE_RESTAURANTS',
            payload: {
              id: id,
              updateData: updateData
            }
          })
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
    const updateData = {
      active: false,
      restaurantEmail: '',
      restaurantName: '',
      restaurantLocation: '',
      restaurantPassword: '',
      restaurantType: '',
      restaurantEnable: false
    }
    await firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .update({
        ...updateData
      })
      .then(() => {
        toast.success('You deleted the restaurant information successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'DELETE_RESTAURANTS',
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

export const sendInvitation = (uid, email) => async dispatch => {
  dispatch({
    type: 'LOADER',
    payload: true
  })

  const updateData = {
    enable: true
  }

  // const buttonStyles = {
  //   display: 'inline-block',
  //   padding: '10px 20px',
  //   backgroundColor: '#3f51b5',
  //   color: '#fff',
  //   borderRadius: '3px',
  //   textDecoration: 'none',
  //   fontWeight: 'bold'
  // }

  try {
    await firebase
      .firestore()
      .collection('staffs')
      .doc(uid)
      .update({
        enable: true
      })
      .then(() => {
        Staff.sendEmailInvitation({
          email: email
        })

        dispatch({
          type: 'UPDATE_STAFFS',
          payload: {
            id: uid,
            updateData
          }
        })

        toast.success(`You sent the invitation to ${email} for staff role.`)

        dispatch({
          type: 'LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message)
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
