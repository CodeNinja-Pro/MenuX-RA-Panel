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
      {
        name: 'Vegetarian',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fvegetarian.png?alt=media&token=02816ae6-4df3-4f9b-a9ab-65e0e564bb3e&_gl=1*14keip5*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzI0MDA5LjYwLjAuMA..'
      },
      {
        name: 'Not Vegetarian',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fvegetarian_none.png?alt=media&token=56c3eb68-deb5-4a2c-a748-a501d53d40c9&_gl=1*187txt6*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzI0MDEzLjU2LjAuMA..'
      },
      {
        name: 'Vegan',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fvegan.png?alt=media&token=d1df6fba-66b3-4a53-a6e7-7163179af7f3&_gl=1*4elufh*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzOTQyLjUwLjAuMA..'
      },
      {
        name: 'Not Vegan',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fvegan_none.png?alt=media&token=a7c73187-a39a-4a64-9887-5bf3829f4694&_gl=1*1jkmxkn*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzOTQ2LjQ2LjAuMA..'
      },
      {
        name: 'Halal',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fhalal.png?alt=media&token=96b6cb03-ff84-45ce-8f67-924de3c31734&_gl=1*t7fgcv*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzA4LjUzLjAuMA..'
      },
      {
        name: 'Not Halal',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fhalal_none.png?alt=media&token=3b65d5e5-bc86-4cd4-907b-6f192dc88f09&_gl=1*1a80brn*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzExLjUwLjAuMA..'
      },
      {
        name: 'Customizable',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fcustomizable.png?alt=media&token=69073861-4603-4539-a414-696b8c3709f2&_gl=1*11kgqgj*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNTU3LjIwLjAuMA..'
      },
      {
        name: 'Not Customizable',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fcustomizable_none.png?alt=media&token=e4b50b7a-26ac-45b6-9036-bfcb9f3eda7a&_gl=1*1gp03q3*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNjExLjYwLjAuMA..'
      },
      {
        name: 'Kosher',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fkosher.png?alt=media&token=5e392739-e879-4dd9-b392-2725e56ae5c9&_gl=1*12u7jlz*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzY5LjUzLjAuMA..'
      },
      {
        name: 'Not Kosher',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fkosher_none.png?alt=media&token=4fce7655-4eef-434f-8ca0-5f7dd486fbea&_gl=1*a3hir3*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzcyLjUwLjAuMA..'
      },
      {
        name: 'Spicy',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fspicy.png?alt=media&token=b5bdffba-b0d5-47da-8a11-465d0e8e2327&_gl=1*k0tjrz*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzOTI5LjEuMC4w'
      },
      {
        name: 'Not Spciy',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fspicy_none.png?alt=media&token=9f37f515-d2b5-4235-ad2c-1f3ee13d302d&_gl=1*tepuz0*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzOTM3LjU1LjAuMA..'
      },
      {
        name: 'Molluscs',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fmolluscs.png?alt=media&token=260e025e-87b2-4707-9f1a-1c167194112b&_gl=1*q9r5y4*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzODcwLjYwLjAuMA..'
      },
      {
        name: 'Not Molluscs',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fmolluscs_none.png?alt=media&token=073aad40-45a6-4dd6-9584-1a724179b398&_gl=1*pvefd5*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzODgwLjUwLjAuMA..'
      },
      {
        name: 'Organic',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Forganic.png?alt=media&token=11965c91-2f8b-4d51-866a-b95ab9c0295d&_gl=1*1tmrs*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzODg0LjQ2LjAuMA..'
      },
      {
        name: 'Not Organic',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Forganic_none.png?alt=media&token=97f37dba-148b-426f-8372-8b09081deae5&_gl=1*o2fa4i*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzODg5LjQxLjAuMA..'
      },
      {
        name: 'Gmo',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fgmo.png?alt=media&token=97b22b55-b545-4d96-aba8-ba5ba9c049ab&_gl=1*19selfq*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzAxLjYwLjAuMA..'
      },
      {
        name: 'Not Gmo',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fgmo_none.png?alt=media&token=2f74ba22-0990-47a1-b2a0-959427eb992d&_gl=1*1ozf0p1*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzA0LjU3LjAuMA..'
      },
      {
        name: 'Dairy',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fdairy.png?alt=media&token=18b12b91-f93a-4861-8e2c-6de47bd3d5ec&_gl=1*jt0gb7*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNjE3LjU0LjAuMA..'
      },
      {
        name: 'Not Dairy',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fdairy_none.png?alt=media&token=4a6db099-15ac-4d25-98aa-0a807e135f3b&_gl=1*8nioy3*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNjIwLjUxLjAuMA..'
      },
      {
        name: 'Keto',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fketo.png?alt=media&token=1fd5da12-1672-4ef3-88a7-b212866ccaae&_gl=1*13bbfo8*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzYwLjEuMC4w'
      },
      {
        name: 'Not Keto',
        url: 'https://firebasestorage.googleapis.com/v0/b/menu-x-353fd.appspot.com/o/labels%2Fketo_none.png?alt=media&token=75b214e0-f90e-4e4a-82da-e7a34ca4a6c9&_gl=1*fxtebx*_ga*NTg3ODcxOTUzLjE2OTI1NTQ3MDE.*_ga_CW55HF8NVT*MTY5NjcyMzQ1NS4zMTkuMS4xNjk2NzIzNzY1LjU3LjAuMA..'
      }
    ]

    const defaultTags = ['Popular', 'Recommended', 'New']

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
          labelName: label.name,
          labelIcon: label.url,
          type: 'default',
          restaurantID: id
        })
      })

      defaultTags.map(tag => {
        firebase.firestore().collection('tabs').add({
          tabName: tag,
          restaurantID: id,
          createdAt: firebase.firestore.Timestamp.now()
        })
      })

      dispatch({
        type: 'LOGIN_REQUEST_END'
      })
    } catch (error) {
      toast.error(error.message)
      dispatch({
        type: 'LOGIN_REQUEST_END'
      })
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
    dispatch({
      type: 'LOGIN_REQUEST_END'
    })
  }
}
