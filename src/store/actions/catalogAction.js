import { toast } from 'react-toastify'
import firebase from '../../config/firebase'
import { enqueueSnackbar } from 'notistack'

export const addCatalog = (obj, onSuccess) => async dispatch => {
  dispatch(catalogLoader(true))
  firebase
    .firestore()
    .collection('catalogs')
    .add(obj)
    .then(() => {
      dispatch(catalogLoader(false))
      toast.success('Catalog Added Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(catalogLoader(false))
    })
}

export const getCatalogsByID = ID => async dispatch => {
  dispatch(catalogLoader(true))
  firebase
    .firestore()
    .collection('catalogs')
    .where('restaurantID', '==', ID)
    .onSnapshot(query => {
      let temp = []
      query.docs.forEach(doc => {
        temp.push({
          id: doc.id,
          ...doc.data()
        })
      })
      dispatch({ type: 'GET_CATALOGS', payload: temp })
      dispatch(catalogLoader(false))
    })
}
export const updateCatalog = (id, obj, onSuccess) => async dispatch => {
  dispatch(catalogLoader(true))
  const docRef = firebase.firestore().collection('catalogs').doc(id)
  docRef
    .set(obj)
    .then(() => {
      dispatch(catalogLoader(false))
      toast.success('Catalog Updated Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(catalogLoader(false))
    })
}
export const deleteCatalogsByID = (ID, onSuccess) => async dispatch => {
  dispatch(catalogLoader(true))
  firebase
    .firestore()
    .collection('catalogs')
    .doc(ID)
    .delete()
    .then(() => {
      dispatch(catalogLoader(false))
      toast.success('Catalog Deleted Successfully', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      onSuccess()
    })
    .catch(err => {
      enqueueSnackbar(err)
      dispatch(catalogLoader(false))
    })
}

const catalogLoader = data => async dispatch => {
  dispatch({
    type: 'CATALOG_LOADER',
    payload: data
  })
}
