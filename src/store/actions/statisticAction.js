import firebase from '../../config/firebase'
import { toast } from 'react-toastify'
import {
  sortCategoryByView,
  sortItemByView,
  boughtSortItems
} from '../../Statistical/generalStatistics'
import { reviews } from '../../Statistical/reviewData'

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

    // let allItems = []
    // const querySnapshot = await firebase
    //   .firestore()
    //   .collection('reviews')
    //   .where('restaurantID', '==', restaurantID)
    //   .where('type', '==', 'view')
    //   .get()
    // querySnapshot.forEach(doc => {
    //   allItems.push({
    //     itemName: doc.itemName,
    //     itemID: doc.itemID
    //   })
    // })
    // const sortedItems = await sortItemByView(allItems)
    // dispatch({
    //   type: 'CLICK_SORT_ITEMS',
    //   payload: sortedItems
    // })
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
