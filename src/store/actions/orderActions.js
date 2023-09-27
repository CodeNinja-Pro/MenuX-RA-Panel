import { toast } from 'react-toastify'
import firebase from '../../config/firebase'
import { RepositoryFactory } from '../../repository/RepositoryFactory'
import algoliasearch from 'algoliasearch'
import { createNullCache } from '@algolia/cache-common'
import { enqueueSnackbar } from 'notistack'

const client = algoliasearch('99PJ9S7CN9', '4dd3b464870ca480ed3bbbe36ef739cd', {
  responsesCache: createNullCache()
})
// let User = RepositoryFactory.get('user')

export const orderLoader = val => async dispatch => {
  dispatch({
    type: 'ORDERS_LOADER',
    payload: val
  })
}

export const getOrderById = id => async dispatch => {
  try {
    const orderSnapshot = await firebase
      .firestore()
      .collection('orders')
      .doc(id)
      .get()
    if (orderSnapshot.exists) {
      const order = orderSnapshot.data()
      dispatch({ type: 'GET_ORDER_BY_ID', payload: order })
    }
  } catch (error) {
    console.error('Error getting order:', error)
  }
}
export const getfilterOrdersAction =
  (search, hitsPerPage, currentPage, startDate, endDate) => async dispatch => {
    try {
      dispatch(orderLoader(true))
      const index = client.initIndex('orders')
      index
        .search(search, {
          filters: `restaurantID:${search} AND (createdAt._seconds > ${startDate} AND createdAt._seconds < ${endDate})`,
          hitsPerPage: hitsPerPage,
          page: currentPage
        })
        .then(response => {
          console.log('response', response)
          let { hits, ...rest } = response
          dispatch({
            type: 'GET_ALL_ORDERS',
            payload: hits
          })
          console.log('rest', rest)
          dispatch({ type: 'GET_ALL_REST_ORDERS', payload: rest })
          dispatch(orderLoader(false))
        })
    } catch (err) {
      enqueueSnackbar(err.message)
      dispatch(orderLoader(false))
    }
  }
export const getAllOrdersAction = () => async dispatch => {
  try {
    firebase
      .firestore()
      .collection('orders')
      .onSnapshot(async query => {
        let temp = []
        if (!query.empty) {
          for (let doc of query.docs) {
            temp.push({ id: doc.id, ...doc.data() })
          }
        }
        dispatch({ type: 'GET_ALL_ORDERS', payload: temp })
      })
  } catch (err) {
    enqueueSnackbar(err.message)
  }
}

export const orderPaymentRefund = payload => async dispatch => {
  // try {
  //   await User.paymentRefund(payload)
  //     .then(async () => {
  //       await firebase
  //         .firestore()
  //         .collection("orders")
  //         .doc(payload.id)
  //         .update({
  //           status: "refunded",
  //         })
  //         .then((response) => toast.success("Order Refunded Successfully"))
  //         .catch((err) => toast.error(err.response.data.message));
  //     })
  //     .catch((err) => toast.error(err.response.data.message));
  // } catch (error) {
  //   // console.log(error);
  // }
  try {
    await firebase
      .firestore()
      .collection('orders')
      .doc(payload.id)
      .update({
        status: 'refunded'
      })
      .then(response =>
        toast.success('Order Refunded Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      )
      .catch(err =>
        toast.error(err.response.data.message, {
          style: {
            fontFamily: 'Poppins'
          }
        })
      )
  } catch (error) {
    // console.log(error);
  }
}
