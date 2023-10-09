import firebase from '../../config/firebase'
import { toast } from 'react-toastify'
import {
  sortCategoryByView,
  sortItemByView,
  boughtSortItems
} from '../../Statistical/generalStatistics'
import { reviews } from '../../Statistical/reviewData'

export const getAllMenus = userId => async dispatch => {
  try {
    let allMenus = []

    const snapShot = await firebase
      .firestore()
      .collection('menus')
      .where('restaurantID', '==', userId)
      .get()

    snapShot.forEach(doc => {
      allMenus.push({
        id: doc.id,
        ...doc.data()
      })
    })

    dispatch({
      type: 'ALL_MENUS',
      payload: allMenus
    })
  } catch (error) {
    toast.error(error.message)
  }
}

export const getActiveMerchants = () => async dispatch => {
  try {
    let allUsers = []
    const snapShot = await firebase.firestore().collection('users').get()

    snapShot.forEach(doc => {
      allUsers.push(doc.data())
    })
  } catch (error) {
    toast.error(error.message)
  }
}

export const getClickSortItems = restaurantID => async dispatch => {
  try {
    const allActivity = reviews
    const sortedItems = await sortItemByView(allActivity)
  } catch (error) {
    toast.error(error.message)
  }
}

export const getClickSortCategories = restaurantID => async dispatch => {
  try {
    const allActivity = reviews
    const sortedItems = await sortCategoryByView(allActivity)
  } catch (error) {
    toast.error(error.message)
  }
}

export const getBoughtSortItems = restaurantID => async dispatch => {
  try {
    const allActivity = reviews
    const sortedItems = await boughtSortItems(allActivity)
  } catch (error) {
    toast.error(error.message)
  }
}

export const getPeaktimeOrderSortItems = restaurantID => async dispatch => {
  console.log('first')
}
