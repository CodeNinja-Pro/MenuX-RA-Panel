import { toast } from 'react-toastify'
import firebase from '../../config/firebase'
import { enqueueSnackbar } from 'notistack'

// Store Restaurant Image Actions

// export const addRestaurantImages =
//   (id, imagesArr, onSuccess) => async (dispatch) => {
//     dispatch(Loader(true));
//     let tempArr = [];
//     for (let singleFile of imagesArr) {
//       let imgURL;
//       let customImgKey2 = firebase.firestore().collection("users").doc();
//       var imgName = singleFile.image.name;
//       let ext3 = imgName.slice(imgName.lastIndexOf("."));
//       var imgLets = await firebase
//         .storage()
//         .ref("restaurant_images/" + customImgKey2.id + ext3.toLowerCase())
//         .put(singleFile.image);
//       imgURL = await imgLets.ref.getDownloadURL();
//       tempArr.push({
//         url: imgURL,
//       });
//     }
//     const userRef = firebase.firestore().collection("users").doc(id);
//     for (let singleObj of tempArr) {
//       await userRef
//         .set(
//           {
//             restaurantImages:
//               firebase.firestore.FieldValue.arrayUnion(singleObj),
//           },
//           { merge: true }
//         )
//         .then(() => {
//           dispatch(Loader(false));
//           toast.success("Images Added Successfully");
//           onSuccess();
//         })
//         .catch((err) => {
//           enqueueSnackbar(err);
//           dispatch(Loader(false));
//         });
//     }
//   };

export const addRestaurantImages =
  (id, imagesArr, onSuccess) => async dispatch => {
    dispatch(Loader(true))

    // Get the current restaurant images
    const userRef = firebase.firestore().collection('users').doc(id)
    const snapshot = await userRef.get()
    const currentImages = snapshot.get('restaurantImages') || []

    const totalImages = currentImages.length + imagesArr.length
    if (totalImages > 5) {
      dispatch(Loader(false))
      toast.error(
        'A restaurant can have a maximum of 5 images at a time, please remove the existing images to add new imaegs',
        {
          style: {
            fontFamily: 'Poppins'
          }
        }
      )
      return
    }

    let tempArr = []
    for (let singleFile of imagesArr) {
      let imgURL
      let customImgKey2 = firebase.firestore().collection('users').doc()
      var imgName = singleFile.image.name
      let ext3 = imgName.slice(imgName.lastIndexOf('.'))
      var imgLets = await firebase
        .storage()
        .ref('restaurant_images/' + customImgKey2.id + ext3.toLowerCase())
        .put(singleFile.image)
      imgURL = await imgLets.ref.getDownloadURL()
      tempArr.push({
        url: imgURL
      })
    }

    for (let singleObj of tempArr) {
      currentImages.push(singleObj.url)
    }

    await userRef
      .set(
        {
          restaurantImages: currentImages
        },
        { merge: true }
      )
      .then(() => {
        dispatch(Loader(false))
        toast.success('Images Added Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        enqueueSnackbar(err)
        dispatch(Loader(false))
      })
  }

export const updateRestaurantImage =
  (id, index, image, fileUrlData, onSuccess) => async dispatch => {
    dispatch(Loader(true))
    let imgURL
    if (image) {
      let customImgKey2 = firebase.firestore().collection('users').doc()
      var imgName = image.name
      let ext3 = imgName.slice(imgName.lastIndexOf('.'))
      var imgLets = await firebase
        .storage()
        .ref('restaurant_images/' + customImgKey2.id + ext3.toLowerCase())
        .put(image)
      imgURL = await imgLets.ref.getDownloadURL()
    }
    let updatedObj = {
      url: imgURL
    }
    const userRef = firebase.firestore().collection('users').doc(id)
    const userDoc = await userRef.get()
    const restaurantImgArray = userDoc.get('restaurantImages')
    restaurantImgArray[index] = updatedObj?.url
    await userRef
      .update({ restaurantImages: restaurantImgArray })
      .then(() => {
        firebase.storage().refFromURL(fileUrlData).delete()
        dispatch(Loader(false))
        toast.success('Image Updated Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        enqueueSnackbar(err)
        dispatch(Loader(false))
      })
  }

export const removeRestaurantImage = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .update({
      restaurantImages: firebase.firestore.FieldValue.arrayRemove(obj)
    })
    .then(() => {
      firebase.storage().refFromURL(obj).delete()
      dispatch(Loader(false))
      toast.success('Image Removed Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

// Store Forward Fees Action

export const addForwardFees = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .set(
      {
        forwardFees: firebase.firestore.FieldValue.arrayUnion(obj)
      },
      { merge: true }
    )
    .then(() => {
      dispatch(Loader(false))
      toast.success('Forward Fees Added Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      toast.error(err.message)
      dispatch(Loader(false))
    })
}

export const updateForwardFees =
  (id, index, obj, onSuccess) => async dispatch => {
    dispatch(Loader(true))
    const userRef = firebase.firestore().collection('users').doc(id)
    const userDoc = await userRef.get()
    const forwardFeesArray = userDoc.get('forwardFees')
    forwardFeesArray[index] = obj
    await userRef
      .update({ forwardFees: forwardFeesArray })
      .then(() => {
        dispatch(Loader(false))
        toast.success('Forward Fees Updated Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        enqueueSnackbar(err)
        dispatch(Loader(false))
      })
  }

// ===================
// Add Payment Methods

export const addPaymentConnections =
  (id, paymentMethod, onSuccess) => async dispatch => {
    dispatch(paymentConnectionLoader(true))
    const userRef = firebase.firestore().collection('users').doc(id)
    const userDoc = await userRef.get()
    let paymentConnections = userDoc.get('paymentConnections')
    if (!paymentConnections) {
      paymentConnections = {}
    }

    if (paymentConnections[paymentMethod]) {
      // Payment method exists, so Change its status
      paymentConnections[paymentMethod] = !paymentConnections[paymentMethod]
    } else {
      // Payment method does not exist, so add it
      paymentConnections[paymentMethod] = true
    }

    await userRef
      .set(
        {
          paymentConnections: paymentConnections
        },
        { merge: true }
      )
      .then(() => {
        dispatch(paymentConnectionLoader(false))
        toast.success('Payment Method Updated Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        // console.log("There was an error in updating payment connections");
        dispatch(paymentConnectionLoader(false))
      })
  }

export const addPaymentMethodDetails =
  (id, data, paymentMethod, onSuccess) => async dispatch => {
    dispatch(paymentConnectionLoader(true))
    const userRef = firebase.firestore().collection('users').doc(id)
    const userDoc = await userRef.get()

    let methodClientKey = userDoc.get(`${paymentMethod}ClientKey`)
    let methodSecretKey = userDoc.get(`${paymentMethod}SecretKey`)

    if (!methodClientKey) {
      methodClientKey = data[`${paymentMethod}ClientKey`]
    }
    if (methodClientKey) {
      // exists, so Change its value
      methodClientKey = data[`${paymentMethod}ClientKey`]
    }

    if (!methodSecretKey) {
      methodSecretKey = data[`${paymentMethod}SecretKey`]
    }
    if (methodSecretKey) {
      // exists, so Change its value
      methodSecretKey = data[`${paymentMethod}SecretKey`]
    }

    await userRef
      .set(
        {
          [`${paymentMethod}ClientKey`]: methodClientKey,
          [`${paymentMethod}SecretKey`]: methodSecretKey
        },
        { merge: true }
      )
      .then(() => {
        dispatch(paymentConnectionLoader(false))
        toast.success('Payment Method Details Added Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        // console.log("There was an error");
        dispatch(paymentConnectionLoader(false))
      })
  }

// ===============

// Store Social Profile Actions

export const addSocialProfile = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .set(
      {
        socialProfiles: firebase.firestore.FieldValue.arrayUnion(obj)
      },
      { merge: true }
    )
    .then(() => {
      dispatch(Loader(false))
      toast.success('Social Profile Added Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

export const updateSocialProfile =
  (id, index, obj, onSuccess) => async dispatch => {
    dispatch(Loader(true))
    const userRef = firebase.firestore().collection('users').doc(id)
    const userDoc = await userRef.get()
    const socialProfilessArray = userDoc.get('socialProfiles')
    socialProfilessArray[index] = obj
    await userRef
      .update({ socialProfiles: socialProfilessArray })
      .then(() => {
        dispatch(Loader(false))
        toast.success('Social Profile Updated Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        enqueueSnackbar(err)
        dispatch(Loader(false))
      })
  }

export const removeSocialProfile = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .update({
      socialProfiles: firebase.firestore.FieldValue.arrayRemove(obj)
    })
    .then(() => {
      dispatch(Loader(false))
      toast.success('Social Profile Removed Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

// Store Tips Actions

export const addTips = (id, value, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  let arr = []
  arr.push(value)
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .set(
      {
        tipPercentages: firebase.firestore.FieldValue.arrayUnion(arr[0])
      },
      { merge: true }
    )
    .then(() => {
      dispatch(Loader(false))
      toast.success('Tip Added Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

export const updateTips = (id, index, value, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  let arr = []
  arr.push(value)
  const userRef = firebase.firestore().collection('users').doc(id)
  const userDoc = await userRef.get()
  const tipPercentagesArray = userDoc.get('tipPercentages')
  tipPercentagesArray[index] = arr[0]
  await userRef
    .update({ tipPercentages: tipPercentagesArray })
    .then(() => {
      dispatch(Loader(false))
      toast.success('Tip Updated Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

export const removeTip = (id, value, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  let arr = []
  arr.push(value)
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .update({
      tipPercentages: firebase.firestore.FieldValue.arrayRemove(arr[0])
    })
    .then(() => {
      dispatch(Loader(false))
      toast.success('Tip Removed Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

// Store Holidays Actions

export const addHolidays = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .set(
      {
        holidays: firebase.firestore.FieldValue.arrayUnion(obj)
      },
      { merge: true }
    )
    .then(() => {
      dispatch(Loader(false))
      toast.success('Holiday Added Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

export const updateHoliday =
  (id, index, updatedObj, onSuccess) => async dispatch => {
    dispatch(Loader(true))
    const userRef = firebase.firestore().collection('users').doc(id)
    const userDoc = await userRef.get()
    const holidaysArray = userDoc.get('holidays')
    holidaysArray[index] = updatedObj
    await userRef
      .update({ holidays: holidaysArray })
      .then(() => {
        dispatch(Loader(false))
        toast.success('Holiday Updated Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        enqueueSnackbar(err)
        dispatch(Loader(false))
      })
  }

export const removeHoliday = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .update({
      holidays: firebase.firestore.FieldValue.arrayRemove(obj)
    })
    .then(() => {
      dispatch(Loader(false))
      toast.success('Holiday Removed Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

// Store Timing Actions

export const addStoreTiming = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .set(
      {
        storeTiming: firebase.firestore.FieldValue.arrayUnion(obj)
      },
      { merge: true }
    )
    .then(() => {
      dispatch(Loader(false))
      toast.success('Store Timeing Added Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

export const updateStoreTiming =
  (id, index, updatedObj, onSuccess) => async dispatch => {
    dispatch(Loader(true))
    const userRef = firebase.firestore().collection('users').doc(id)
    const userDoc = await userRef.get()
    const storeTimingArray = userDoc.get('storeTiming')
    storeTimingArray[index] = updatedObj
    await userRef
      .update({ storeTiming: storeTimingArray })
      .then(() => {
        dispatch(Loader(false))
        toast.success('Store Timing Updated Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        onSuccess()
      })
      .catch(err => {
        enqueueSnackbar(err)
        dispatch(Loader(false))
      })
  }

export const removeStoreTiming = (id, obj, onSuccess) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .update({
      storeTiming: firebase.firestore.FieldValue.arrayRemove(obj)
    })
    .then(() => {
      dispatch(Loader(false))
      toast.success('Store Timing Removed Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(Loader(false))
    })
}

export const addPickUpDays = (id, days, timeObj) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  const pickUpDays = days.map(day => ({
    day: day,
    endTime: timeObj?.endTime,
    startTime: timeObj?.startTime
  }))
  try {
    await userRef.set(
      {
        pickupDays: pickUpDays
      },
      { merge: true }
    )
    dispatch(Loader(false))
    toast.success('PickUp Days Added Successfully', {
      style: {
        fontFamily: 'Poppins'
      }
    })
  } catch (err) {
    enqueueSnackbar(err)
    dispatch(Loader(false))
  }
}

export const updatePickUpDays = (id, days, timeObj) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  const newPickupDays = days.map(day => ({
    day: day,
    endTime: timeObj?.endTime,
    startTime: timeObj?.startTime
  }))
  try {
    await userRef.set(
      {
        pickupDays: newPickupDays
      },
      { merge: true }
    )
    dispatch(Loader(false))
    toast.success('PickUp Days Updates Successfully', {
      style: {
        fontFamily: 'Poppins'
      }
    })
  } catch (err) {
    enqueueSnackbar(err)
    dispatch(Loader(false))
  }
}

export const addDeliveryDays = (id, days, timeObj) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  const newDeliveryDays = days.map(day => ({
    day: day,
    endTime: timeObj?.endTime,
    startTime: timeObj?.startTime
  }))
  try {
    await userRef.set(
      {
        deliveryDays: newDeliveryDays
      },
      { merge: true }
    )
    dispatch(Loader(false))
    toast.success('Delivery Days Added Successfully', {
      style: {
        fontFamily: 'Poppins'
      }
    })
  } catch (err) {
    enqueueSnackbar(err)
    dispatch(Loader(false))
  }
}

export const updateDeliveryDays = (id, days, timeObj) => async dispatch => {
  dispatch(Loader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  const newDeliveryDays = days.map(day => ({
    day: day,
    endTime: timeObj?.endTime,
    startTime: timeObj?.startTime
  }))
  try {
    await userRef.set(
      {
        deliveryDays: newDeliveryDays
      },
      { merge: true }
    )
    dispatch(Loader(false))
    toast.success('Delivery Days Updated Successfully', {
      style: {
        fontFamily: 'Poppins'
      }
    })
  } catch (err) {
    enqueueSnackbar(err)
    dispatch(Loader(false))
  }
}

// export const updateRestaurantProfile = (id, obj) => async dispatch => {
// 	dispatch(profileLoader(true));
// 	const userRef = firebase.firestore().collection('users').doc(id);
// 	await userRef
// 		.update(obj)
// 		.then(() => {
// 			dispatch(profileLoader(false));
// 			toast.success('Update Profile Successfully');
// 		})
// 		.catch(err => {
// 			dispatch(profileLoader(false));
// 			toast.warn(err);
// 		});
// };

export const updateRestaurantProfile = (id, obj) => async dispatch => {
  dispatch(profileLoader(true))
  const userRef = firebase.firestore().collection('users').doc(id)
  await userRef
    .get()
    .then(doc => {
      const updatedData = {
        ...doc.data(),
        ...obj
      }
      return userRef.update(updatedData)
    })
    .then(() => {
      dispatch(profileLoader(false))
      toast.success('Update Profile Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    })
    .catch(err => {
      dispatch(profileLoader(false))
      toast.warn(err, {
        style: {
          fontFamily: 'Poppins'
        }
      })
    })
}

export const updateLanguages = (id, languages) => async dispatch => {
  dispatch(profileLoader(true))
  const db = await firebase.firestore()
  const docRef = await db.collection('users').doc(id)
  await docRef
    .update({ languages: languages }, { merge: true })
    .then(() => {
      dispatch(profileLoader(false))
    })
    .catch(err => {
      dispatch(profileLoader(false))
    })
}

export const updateMenuLanguage = (id, menuLang) => async dispatch => {
  dispatch(profileLoader(true))
  const db = await firebase.firestore()
  const docRef = await db.collection('users').doc(id)
  await docRef
    .update({ menuLang: menuLang }, { merge: true })
    .then(() => {
      dispatch(profileLoader(false))
    })
    .catch(err => {
      dispatch(profileLoader(false))
    })
}

export const updateRestaurantCurrency = (id, currency) => async dispatch => {
  dispatch({
    type: 'LOGIN_REQUEST'
  })

  const db = firebase.firestore()
  const docRef = db.collection('users').doc(id)
  docRef
    .update({ currency: currency }, { merge: true })
    .then(() => {
      dispatch({
        type: 'LOGIN_REQUEST_END'
      })

      toast.success('Currency Update Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    })
    .catch(err => {
      dispatch({
        type: 'LOGIN_REQUEST_END'
      })
      toast.warn(err, {
        style: {
          fontFamily: 'Poppins'
        }
      })
    })
}

export const updateProfilePicture = item => async dispatch => {
  dispatch(profileLoader(true))

  if (item.img.name) {
    try {
      const docRef = await firebase
        .firestore()
        .collection('users')
        .where('restaurantID', '==', item.id)
        .where('type', '==', 'restaurant')
        .get()

      const docData = docRef.docs[0].data()

      try {
        if (docData && docData.restaurantLogo !== '') {
          await firebase.storage().refFromURL(docData.restaurantLogo).delete()
        }
      } catch (err) {
        console.log('Error:', err.message)
      }

      const fileName = item.img.name
      const fileName1 = fileName.slice(fileName.lastIndexOf('.'))
      const fileName2 = item.id + fileName1.toLowerCase()

      const storageRef = firebase
        .storage()
        .ref('restaurant_logo/')
        .child(fileName2)
      await storageRef.put(item.img)
      const urlFeatured = await storageRef.getDownloadURL()

      await firebase.firestore().collection('users').doc(item.id).update({
        restaurantLogo: urlFeatured
      })

      dispatch(profileLoader(false))
      toast.success('Update Logo Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } catch (err) {
      dispatch(profileLoader(false))
      toast.warn(err, {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }
}

const Loader = data => async dispatch => {
  dispatch({
    type: 'CATALOG_LOADER',
    payload: data
  })
}
const paymentConnectionLoader = data => async dispatch => {
  dispatch({
    type: 'PAYMENT_CONNECTION_LOADER',
    payload: data
  })
}

const profileLoader = data => async dispatch => {
  dispatch({
    type: 'SET_LOADER',
    payload: data
  })
}

const currencyLoader = data => async dispatch => {
  dispatch({
    type: 'SET_CURRENCY_LOADER',
    payload: data
  })
}
