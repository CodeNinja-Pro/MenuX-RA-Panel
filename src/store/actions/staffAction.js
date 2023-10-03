import firebase from '../../config/firebase'
import algoliasearch from 'algoliasearch'
import { createNullCache } from '@algolia/cache-common'
import { toast } from 'react-toastify'

const client = algoliasearch('99PJ9S7CN9', '4dd3b464870ca480ed3bbbe36ef739cd', {
  responsesCache: createNullCache()
})

export const getCurrentRoleDetail = id => async dispatch => {
  try {
    await firebase
      .firestore()
      .collection('roles')
      .doc(id)
      .get()
      .then(doc => {
        console.log(doc.data())
        dispatch({
          type: 'GET_CURRENT_ROLE_DETAIL',
          payload: doc.data().role
        })
      })
  } catch (err) {
    toast.error(err.message)
  }
}

export const getStaffs = id => async dispatch => {
  dispatch({
    type: 'STAFF_LOADER',
    payload: true
  })

  try {
    let allStaffs = []
    const snapShot = await firebase
      .firestore()
      .collection('roles')
      .where('restaurantID', '==', id)
      .get()

    snapShot.forEach(doc => {
      allStaffs.push({
        id: doc.id,
        ...doc.data()
      })
    })

    dispatch({
      type: 'GET_ALL_STAFF',
      payload: allStaffs
    })

    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  }
}

export const addNewRole = (userId, newRole, onSuccess) => async dispatch => {
  dispatch({
    type: 'STAFF_LOADER',
    payload: true
  })
  try {
    const snapShot = await firebase
      .firestore()
      .collection('roles')
      .add({
        restaurantID: userId,
        ...newRole,
        createdAt: firebase.firestore.Timestamp.now()
      })

    snapShot.get().then(doc => {
      onSuccess()
      dispatch({
        type: 'STAFF_ADDED',
        payload: doc.data()
      })
      dispatch({
        type: 'STAFF_LOADER',
        payload: false
      })
    })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  }
}

export const deleteStaffRole = id => async dispatch => {
  dispatch({
    type: 'STAFF_LOADER',
    payload: true
  })

  try {
    await firebase
      .firestore()
      .collection('roles')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: 'STAFF_DELETED',
          payload: id
        })
        toast.success('You deleted current role successfully.')
        dispatch({
          type: 'STAFF_LOADER',
          payload: false
        })
      })
      .catch(err => {
        toast.error(err.message)
        dispatch({
          type: 'STAFF_LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  }
}

export const sendNewStaffRequest =
  (id, staffInfo, onSuccess) => async dispatch => {
    dispatch({
      type: 'STAFF_LOADER',
      payload: true
    })
    try {
      const findStaff = await firebase
        .firestore()
        .collection('staffs')
        .where('restaurantID', '==', id)
        .get()

      let flag = false
      findStaff.forEach(doc => {
        if (doc.data().email === staffInfo.email) {
          flag = true
        }
      })

      if (flag) {
        toast.error('This email address is already exist.')
        dispatch({
          type: 'STAFF_LOADER',
          payload: false
        })
      } else {
        const addData = {
          restaurantID: id,
          ...staffInfo,
          status: false,
          enable: false,
          createdAt: firebase.firestore.Timestamp.now()
        }
        const snapShot = firebase
          .firestore()
          .collection('staffs')
          .add({ ...addData })
          .then(doc => {
            onSuccess()
            dispatch({
              type: 'NEW_STAFF_ADDED',
              payload: {
                id: doc.id,
                ...addData
              }
            })
            dispatch({
              type: 'STAFF_LOADER',
              payload: false
            })
          })
      }
    } catch (error) {
      toast.error(error.message)
      dispatch({
        type: 'STAFF_LOADER',
        payload: false
      })
    }
  }

export const getAllStaffInfo = id => async dispatch => {
  dispatch({
    type: 'STAFF_LOADER',
    payload: true
  })

  try {
    let allStaffInfo = []
    const snapShot = await firebase
      .firestore()
      .collection('staffs')
      .where('restaurantID', '==', id)
      .get()

    snapShot.forEach(doc => {
      allStaffInfo.push({
        id: doc.id,
        ...doc.data()
      })
    })

    dispatch({
      type: 'GET_STAFFS',
      payload: allStaffInfo
    })

    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  }
}

export const deleteStaff = id => async dispatch => {
  dispatch({
    type: 'STAFF_LOADER',
    payload: true
  })

  try {
    await firebase
      .firestore()
      .collection('staffs')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({
          type: 'CURRENT_STAFF_DELETED',
          payload: id
        })

        toast.success('You deleted the staff information successfully.')

        dispatch({
          type: 'STAFF_LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  }
}

export const updateStaffStatus = (id, newStatus) => async dispatch => {
  dispatch({
    type: 'STAFF_LOADER',
    payload: true
  })
  console.log(newStatus)
  try {
    await firebase
      .firestore()
      .collection('staffs')
      .doc(id)
      .update({
        status: newStatus
      })
      .then(() => {
        dispatch({
          type: 'CURRENT_STAFF_UPDATED',
          payload: {
            id: id,
            status: newStatus
          }
        })

        toast.success('You updated the staff status successfully.')

        dispatch({
          type: 'STAFF_LOADER',
          payload: false
        })
      })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'STAFF_LOADER',
      payload: false
    })
  }
}

export const updateStaffInfo =
  (id, updateData, onSuccess) => async dispatch => {
    dispatch({
      type: 'STAFF_LOADER',
      payload: true
    })

    try {
      await firebase
        .firestore()
        .collection('staffs')
        .doc(id)
        .update({
          ...updateData
        })
        .then(() => {
          dispatch({
            type: 'STAFF_UPDATED',
            payload: {
              id,
              updateData
            }
          })
          onSuccess()
          toast.success('You updated the staff status successfully.')

          dispatch({
            type: 'STAFF_LOADER',
            payload: false
          })
        })
    } catch (error) {
      toast.error(error.message)
      dispatch({
        type: 'STAFF_LOADER',
        payload: false
      })
    }
  }
