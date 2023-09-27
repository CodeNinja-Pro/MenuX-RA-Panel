import firebase from '../../config/firebase'
import { toast } from 'react-toastify'
import { v4 as uuidv4 } from 'uuid'
import algoliasearch from 'algoliasearch'
import { createNullCache } from '@algolia/cache-common'
import { enqueueSnackbar } from 'notistack'
import {
  sortCategoryByView,
  sortItemByView,
  boughtSortItems
} from '../../Statistical/generalStatistics'
import { reviews } from '../../Statistical/reviewData'

// const tinyPNG = new TinyPNG('8PNWK2Rs0wbmgyRd0yQ10dN5Vsj92hHl')

const client = algoliasearch('99PJ9S7CN9', '4dd3b464870ca480ed3bbbe36ef739cd', {
  responsesCache: createNullCache()
})

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
