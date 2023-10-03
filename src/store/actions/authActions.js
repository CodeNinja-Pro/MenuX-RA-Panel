import { toast } from 'react-toastify'
import firebase from '../../config/firebase'
import { RepositoryFactory } from '../../repository/RepositoryFactory'
import { enqueueSnackbar } from 'notistack'

// let User = RepositoryFactory.get('user')

// Setting Sound for notification and order
export const updateSoundSetting = (id, sound) => async dispatch => {
  try {
    await firebase
      .firestore()
      .collection('users')
      .doc(id)
      .update({
        sound: sound
      })
      .then(() => {
        toast.success('You updated the sound for notification and ordering.')
      })
  } catch (error) {
    toast.error(error.message)
  }
}

// Setting information save
export const updateSocialAccount =
  (id, previousInfo, payload) => async dispatch => {
    await firebase
      .firestore()
      .collection('users')
      .doc(id)
      .update({
        socialAccount: { ...previousInfo, ...payload }
      })
      .then(
        toast.success('You updated the social account.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      )
  }

export const updatePersonalInfo =
  (id, payload, onSuccess = () => {}) =>
  async dispatch => {
    await firebase
      .firestore()
      .collection('users')
      .doc(id)
      .update({ ...payload })
      .then(() => {
        onSuccess()
      })
  }

export const updateTFA = (id, TFA) => async dispatch => {
  try {
    await firebase.firestore().collection('users').doc(id).update({
      TFA
    })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
  }
}

export const emailVerification = () => async dispatch => {
  try {
    await firebase
      .auth()
      .currentUser.sendEmailVerification()
      .then(() => {
        toast.success('You sent the verfication code to your email.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      })
      .catch(error => {
        toast.error(error.message, {
          style: {
            fontFamily: 'Poppins'
          }
        })
      })
  } catch (error) {
    toast.error(error.message, {
      style: {
        fontFamily: 'Poppins'
      }
    })
  }
}

export const checkCurrentPassword =
  (currentPassword, newPassword) => async dispatch => {
    try {
      const user = await firebase.auth().currentUser
      const credential = await firebase.auth.EmailAuthProvider.credential(
        user.email,
        currentPassword
      )
      user
        .reauthenticateWithCredential(credential)
        .then(() => {
          user
            .updatePassword(newPassword)
            .then(() => {
              toast.success('Password updated successfully.')
            })
            .catch(error => {
              toast.error(error.message, {
                style: {
                  fontFamily: 'Poppins'
                }
              })
            })
        })
        .catch(error => {
          toast.error(error.message, {
            style: {
              fontFamily: 'Poppins'
            }
          })
        })
    } catch (error) {
      toast.error(error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

export const saveFeedback =
  (userId, email, name, type, feedback, score) => async dispatch => {
    try {
      const feedbackInfo = {
        restaurantID: userId,
        feedback,
        score,
        contactEmail: email,
        restaurantType: type,
        restaurantName: name,
        respond: [],
        createdAt: firebase.firestore.Timestamp.now()
      }
      await firebase.firestore().collection('feedback').add(feedbackInfo)

      toast.success('You sent the feedback', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } catch (error) {
      toast.error(error.message, {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

// export const addNewUser =
//   (payload, permissions, onSuccess = () => {}) =>
//   async dispatch => {
//     try {
//       dispatch(Loader(true))
//       const { data } = await User.add(payload)
//       if (data.success) {
//         if (Object.keys(permissions).length > 0) {
//           await firebase
//             .firestore()
//             .collection('permissions')
//             .add({
//               userID: data.data.id,
//               ...permissions
//             })
//         }
//         onSuccess()
//         dispatch({
//           type: 'STAFF_ADDED',
//           payload: data.data
//         })

//         dispatch(Loader(false))
//       } else {
//         console.log('errr', data)
//         enqueueSnackbar(data.message)
//         dispatch(Loader(false))
//       }
//     } catch (error) {
//       // console.log("error", error);
//       enqueueSnackbar(error?.response?.data?.message)
//       dispatch(Loader(false)) // Set loading state to false
//     }
//   }

export const logout = () => {
  return dispatch => {
    firebase
      .auth()
      .signOut()
      .then(data => {
        dispatch({
          type: 'LOGOUT_SUCCESS',
          uid: '',
          user: '',
          error: ''
        })
      })
      .catch(error => {
        dispatch({
          type: 'LOGOUT_FAIL',
          uid: '',
          error: error
        })
      })
  }
}

export const forgetPassword =
  (email, onSuccess = () => {}) =>
  async dispatch => {
    dispatch(forgetLoader(true))
    try {
      await firebase
        .auth()
        .sendPasswordResetEmail(email)
        .then(res => {
          dispatch(forgetLoader(false))
          enqueueSnackbar('Please check your email and reset the password')
          onSuccess()
        })
        .catch(err => {
          dispatch(forgetLoader(false))
          enqueueSnackbar(err.message)
        })
    } catch (error) {
      dispatch(forgetLoader(false))
      enqueueSnackbar(error.message)
    }
  }

export const reRegisterSnapshot = id => async dispatch => {
  firebase
    .firestore()
    .collection('users')
    .doc(id)
    .onSnapshot(async doc => {
      // let user = doc.data()
      // if (user?.type === 'kitchen-cook' || user?.type === 'kitchen-admin') {
      //   dispatch(doc.id)
      // }
      // if (user?.type === 'restaurant') {
      //   if (user?.subscription?.subscriptionID) {
      //     await User.getSubscriptionStatus(user?.subscription?.subscriptionID)
      //       .then(res => {})
      //       .catch(ex => {})
      //   }
      // }
      if (doc.data().role === 'staff') {
        firebase
          .firestore()
          .collection('staffs')
          .where('email', '==', doc.data().email)
          .limit(1)
          .get()
          .then(item => {
            if (!item.empty) {
              const documentSnapshot = item.docs[0]
              const result = documentSnapshot.data()

              dispatch({
                type: 'LOGIN_SUCCESS',
                user: {
                  id: doc.id,
                  active: doc.data().active,
                  staffRole: result.role,
                  ...doc.data()
                },
                error: ''
              })
            }
          })
      } else {
        dispatch({
          type: 'LOGIN_SUCCESS',
          user: { id: doc.id, ...doc.data() },
          error: ''
        })
      }

      dispatch({
        type: 'LOGIN_REQUEST_END'
      })
    })
}

export const getPermissions = id => async dispatach => {
  let permissionsData = {}
  firebase
    .firestore()
    .collection('permissions')
    .where('userID', '==', id)
    .limit(1)
    .get()
    .then(async querySnapshot => {
      querySnapshot.forEach(doc => {
        permissionsData = { id: doc.id, ...doc.data() }
      })
      await dispatach({
        type: 'PERMISSIONS',
        payload: permissionsData
      })
    })
    .catch(error => {
      console.error('Error getting documents: ', error)
    })
}

export const updateColors = (id, payload) => async dispatch => {
  await firebase
    .firestore()
    .collection('users')
    .doc(id)
    .update({ ...payload })
    .then(toast.success('Restaurant colors updated'), {
      style: {
        fontFamily: 'Poppins'
      }
    })
}

const Loader = data => async dispatch => {
  dispatch({
    type: 'CATALOG_LOADER',
    payload: data
  })
}

const forgetLoader = data => async dispatch => {
  dispatch({
    type: 'FORGET_LOADER',
    payload: data
  })
}

// User sign in and sign up

// export const dobuleEmailCheck = (email, onSuccess) => async dispatch => {
//   dispatch({
//     type: 'LOGIN_REQUEST'
//   })
//   try {
//     const doubleEmail = await firebase
//       .firestore()
//       .collection('users')
//       .where('email', '==', email)
//       .get()

//     if (doubleEmail.empty) {
//       onSuccess()
//     } else {
//       toast.error('Email is already exsited.', {
//         style: {
//           fontFamily: 'Poppins'
//         }
//       })
//     }
//     dispatch({
//       type: 'LOGIN_REQUEST_END'
//     })
//   } catch (error) {
//     toast.error(error.message, {
//       style: {
//         fontFamily: 'Poppins'
//       }
//     })
//   }
// }

export const signupInformation =
  (id, name, email, type, restaurantID, onSuccess) => async dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST'
    })

    let personalInfo

    if (type === 'staff') {
      personalInfo = {
        restaurantID: restaurantID,
        role: 'staff',
        name: name,
        email: email,
        active: true
      }
    } else {
      personalInfo = {
        restaurantID: id,
        role: 'admin',
        name: name,
        email: email,
        active: false
      }
    }
    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .set({
        ...personalInfo,
        type: 'restaurant',
        createdAt: firebase.firestore.Timestamp.now()
      })
      .then(res => {
        toast.success('Account Registered successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'LOGIN_REQUEST_END'
        })

        onSuccess()
      })
      .catch(err => {
        dispatch({
          type: 'LOGIN_REQUEST_END'
        })
        toast.error(err.message, 'danger')
      })
  }

export const setupRestaurant =
  (id, restaurantInfo, onSuccess) => async dispatch => {
    dispatch({
      type: 'LOGIN_REQUEST'
    })
    const defaultLabel = [
      'Vegetarian',
      'Vegetarian_None',
      'Vegan',
      'Vegan_None',
      'Halal',
      'Halal_None',
      'Customizable',
      'Customizable_None',
      'Kosher',
      'Kosher_None',
      'Keto',
      'Keto_None',
      'Spicy',
      'Spciy_None',
      'Molluscs',
      'Molluscs_None',
      'Organic',
      'Organic_None',
      'Gmo',
      'Gmo_None',
      'Dairy',
      'Dairy_None'
    ]

    try {
      await firebase
        .firestore()
        .collection('users')
        .doc(id)
        .update({
          ...restaurantInfo,
          restaurantEnable: true,
          subscription: false,
          createdAt: firebase.firestore.Timestamp.now()
        })
        .then(() => {
          toast.success('Your restaurant is created successfully', {
            style: {
              fontFamily: 'Poppins'
            }
          })

          dispatch({
            type: 'LOGIN_REQUEST_END'
          })

          onSuccess()
        })

      defaultLabel.map(label => {
        firebase.firestore().collection('labels').add({
          labelName: label,
          labelIcon: label,
          restaurantID: id
        })
      })
    } catch (error) {
      toast.error(error.message)
    }
  }

export const checkUserActive = (id, onSuccess) => async dispatch => {
  dispatch({
    type: 'LOGIN_REQUEST'
  })

  try {
    firebase
      .firestore()
      .collection('users')
      .doc(id)
      .onSnapshot(async doc => {
        if (doc.data().active === false) {
          onSuccess()
          toast.warn(
            'You should have your restaurant information. You can click Restaurant Information Button and set up.',
            {
              style: {
                fontFamily: 'Poppins'
              }
            }
          )
        } else {
          let staffInfo = ''
          if (doc.data().role === 'staff') {
            firebase
              .firestore()
              .collection('staffs')
              .where('email', '==', doc.data().email)
              .limit(1)
              .get()
              .then(item => {
                if (!item.empty) {
                  const documentSnapshot = item.docs[0]
                  const result = documentSnapshot.data()

                  dispatch({
                    type: 'LOGIN_SUCCESS',
                    user: {
                      id: doc.id,
                      active: doc.data().active,
                      staffRole: result.role,
                      ...doc.data()
                    },
                    error: ''
                  })
                }
              })
          } else {
            dispatch({
              type: 'LOGIN_SUCCESS',
              user: {
                id: doc.id,
                active: doc.data().active,
                ...doc.data()
              },
              error: ''
            })
          }
          dispatch({
            type: 'REGISTER_REQUEST',
            payload: {
              id: id
            }
          })
          toast.success('You logged in successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        }
        dispatch({
          type: 'LOGIN_REQUEST_END'
        })
      })
  } catch (error) {
    toast.error(error.message)
  }
}
