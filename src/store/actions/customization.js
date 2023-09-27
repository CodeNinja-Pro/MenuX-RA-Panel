import { toast } from 'react-toastify'
import firebase, { storage } from '../../config/firebase'
import { enqueueSnackbar } from 'notistack'
import { v4 as uuidv4 } from 'uuid'

export const getCustomization = id => async dispatch => {
  const customization = []
  try {
    const querySnapshot = await firebase
      .firestore()
      .collection('customization')
      .where('restaurantID', '==', id)
      .get()

    querySnapshot.forEach(doc => {
      dispatch({
        type: 'GET_CUSTOMIZATION',
        payload: { ...doc.data(), id: doc.id }
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

export const addCustomization =
  (id, logo, cover, background, theme) => async dispatch => {
    dispatch(Loader(true))
    let logoURL = ''
    let coverURL = ''
    let backgroundURL = ''

    if (logo.length !== 0) {
      const storageRef = firebase.storage().ref()

      const imageFile = storageRef.child('customization_images/' + logo.name)
      const snapshot = await imageFile.put(logo)
      const downloadURL = await snapshot.ref.getDownloadURL()
      logoURL = downloadURL
    }
    if (cover.length !== 0) {
      const storageRef = firebase.storage().ref()

      const imageFile = storageRef.child('customization_images/' + cover.name)
      const snapshot = await imageFile.put(cover)
      const downloadURL = await snapshot.ref.getDownloadURL()
      coverURL = downloadURL
    }
    if (background.length !== 0) {
      const storageRef = firebase.storage().ref()

      const imageFile = storageRef.child(
        'customization_images/' + background.name
      )
      const snapshot = await imageFile.put(background)
      const downloadURL = await snapshot.ref.getDownloadURL()
      backgroundURL = downloadURL
    }
    const customization = {
      ...theme,
      logoImage: logoURL,
      coverImage: coverURL,
      backgroundImage: backgroundURL,
      restaurantID: id
    }

    const existRef = await firebase
      .firestore()
      .collection('customization')
      .where('restaurantID', '==', id)
      .get()

    if (existRef.empty) {
      const docRef = firebase
        .firestore()
        .collection('customization')
        .add(customization)

      const querySnapshot = await firebase
        .firestore()
        .collection('customization')
        .where('restaurantID', '==', id)
        .get()

      const customizations = []

      querySnapshot.forEach(doc => {
        customizations.push({ id: doc.id, ...doc.data() })
      })

      dispatch({
        type: 'GET_CUSTOMIZATION',
        payload: customizations[0]
      })

      dispatch(Loader(false))

      toast.success('You completed the style for customer website.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } else {
      if (
        !theme.logoImage === '' ||
        !theme.coverImage === '' ||
        !theme.backgroundImage === ''
      ) {
        firebase.storage().refFromURL(theme.logoImage).delete()
        firebase.storage().refFromURL(theme.coverImage).delete()
        firebase.storage().refFromURL(theme.backgroundImage).delete()
      }

      firebase
        .firestore()
        .collection('customization')
        .where('restaurantID', '==', id)
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            doc.ref.update({ ...customization })

            const currentData = firebase
              .firestore()
              .collection('customization')
              .doc(doc.id)
              .get()
            // dispatch({
            //   type: 'GET_CUSTOMIZATION',
            //   payload: currentData.data()
            // })
          })

          dispatch(Loader(false))

          toast.success(
            'You modified the style for customer website successfully.',
            {
              style: {
                fontFamily: 'Poppins'
              }
            }
          )
        })
    }
  }

export const removeImage =
  (restaurantID, id, target, url) => async dispatch => {
    dispatch(Loader(true))
    try {
      if (url !== '') {
        await firebase.storage().refFromURL(url).delete()
        if (target === 'logoImage') {
          await firebase
            .firestore()
            .collection('customization')
            .where('restaurantID', '==', restaurantID)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                doc.ref.update({ logoImage: '' })
              })
            })
          toast.success('You are deleted successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        } else if (target === 'coverImage') {
          await firebase
            .firestore()
            .collection('customization')
            .where('restaurantID', '==', restaurantID)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                doc.ref.update({ coverImage: '' })
              })
            })
          toast.success('You are deleted successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        } else {
          await firebase
            .firestore()
            .collection('customization')
            .where('restaurantID', '==', restaurantID)
            .get()
            .then(snapshot => {
              snapshot.forEach(doc => {
                doc.ref.update({ backgroundImage: '' })
              })
            })
          toast.success('You are deleted successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        }

        const querySnapshot = await firebase
          .firestore()
          .collection('customization')
          .where('restaurantID', '==', restaurantID)
          .get()

        const customizations = []

        querySnapshot.forEach(doc => {
          customizations.push({ id: doc.id, ...doc.data() })
        })

        dispatch({
          type: 'GET_CUSTOMIZATION',
          payload: customizations[0]
        })
      }
      dispatch(Loader(false))
    } catch (error) {
      toast.error('There is any image with this name in firebase storage.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      dispatch(Loader(false))
    }
  }

const Loader = flag => async dispatch => {
  dispatch({
    type: 'SET_LOADER',
    payload: flag
  })
}
