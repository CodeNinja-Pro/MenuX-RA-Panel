import firebase from '../../config/firebase'
import { RepositoryFactory } from '../../repository/RepositoryFactory'
import { enqueueSnackbar } from 'notistack'

// let Stats = RepositoryFactory.get('stats')

// export const getPeakHours = payload => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const { data } = await Stats.getPeakHours(payload)
//     if (data.success) {
//       dispatch({
//         type: 'GET_PEAK_HOURS',
//         payload: data?.data
//       })
//       dispatch(Loader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(Loader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }

// export const getTotalCustomers = payload => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const { data } = await Stats.getTotalCustomers(payload)
//     if (data.success) {
//       dispatch({
//         type: 'GET_TOTAL_CUSTOMERS',
//         payload: data?.data
//       })
//       dispatch(Loader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(Loader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }
// export const getTotalMethodPercentage = payload => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const { data } = await Stats.getPaymentMethodPercentage(payload)

//     if (data.success) {
//       dispatch({
//         type: 'GET_PAYMENT_METHODS',
//         payload: data?.data
//       })
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(Loader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }

// export const getCustomersDemographics = payload => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const { data } = await Stats.getRestaurantCustomerDemographics(payload)

//     if (data.success) {
//       dispatch({
//         type: 'GET_CUSTOMERS_DEMOGRAPHICS',
//         payload: data
//       })
//       dispatch(Loader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(Loader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }
// export const getOrderFrequency = payload => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const { data } = await Stats.getOrderFrequency(payload)
//     if (data.success) {
//       dispatch({
//         type: 'GET_ORDER_FREQUENCY',
//         payload: data?.data
//       })
//       dispatch(Loader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(Loader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }

// export const getRestaurantStats = () => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .get()
//       .then(data => {
//         dispatch({
//           type: 'GET_RESTAURANTS_STATS',
//           payload: data?.data()
//         })
//         dispatch(Loader(false))
//       })
//       .catch(err => {
//         enqueueSnackbar(err.message)
//         dispatch(Loader(false))
//       })
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }

// export const getRestaurantStatsById = id => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .collection('restaurantStats')
//       .doc(id)
//       .get()
//       .then(data => {
//         dispatch({
//           type: 'GET_RESTAURANT_STATS_BY_ID',
//           payload: data?.data()
//         })
//         dispatch(Loader(false))
//       })
//       .catch(err => {
//         enqueueSnackbar(err.message)
//         dispatch(Loader(false))
//       })
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }
// export const getMostViewedProductsById = id => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const data = []
//     const snapshot = await firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .collection('mostViewedProducts')
//       .where('restaurantID', '==', id)
//       .orderBy('views', 'desc')
//       .get()
//     snapshot.docs.map(doc => data.push(doc.data()))

//     dispatch({
//       type: 'GET_MOST_VIEWED_PRODUCTS_BY_ID',
//       payload: data
//     })
//     dispatch(Loader(false))
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     // console.log(error);

//     dispatch(Loader(false))
//   }
// }
// export const getLeastViewedProductsById = id => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const data = []
//     const snapshot = await firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .collection('mostViewedProducts')
//       .where('restaurantID', '==', id)
//       .orderBy('views', 'asc')
//       .get()
//     snapshot.docs.map(doc => data.push(doc.data()))
//     dispatch({
//       type: 'GET_LEAST_VIEWED_PRODUCTS_BY_ID',
//       payload: data
//     })
//     dispatch(Loader(false))
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     // console.log(error);

//     dispatch(Loader(false))
//   }
// }
// export const getBestSellersById = id => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const data = []
//     const snapshot = await firebase
//       .firestore()
//       .collection('stats')
//       .doc('zXEqYQ3pOfNO9X8or8W9')
//       .collection('topPerformingProducts')
//       .where('restaurantID', '==', id)
//       .orderBy('orders', 'asc')
//       .get()
//     snapshot.docs.map(doc => data.push(doc.data()))
//     dispatch({
//       type: 'GET_BEST_SELLERS_BY_ID',
//       payload: data
//     })
//     dispatch(Loader(false))
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     // console.log(error);

//     dispatch(Loader(false))
//   }
// }
// export const getWorstSellersById = id => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     const data = []
//     const snapshot = await firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .collection('topPerformingProducts')
//       .where('restaurantID', '==', id)
//       .orderBy('orders', 'desc')
//       .get()
//     snapshot.docs.map(doc => data.push(doc.data()))
//     dispatch({
//       type: 'GET_WORST_SELLERS_BY_ID',
//       payload: data
//     })
//     dispatch(Loader(false))
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     // console.log(error);

//     dispatch(Loader(false))
//   }
// }

// export const getTopMerchants = () => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .collection('topMerchants')
//       .orderBy('orders')
//       .get()
//       .then(data => {
//         let temp = []
//         for (let i = 0; i < data?.docs?.length && i < 5; i++) {
//           temp.push({
//             id: data?.docs[i]?.id,
//             ...data?.docs[i]?.data()
//           })
//         }
//         dispatch({
//           type: 'GET_TOP_MERCHANTS',
//           payload: temp
//         })
//         dispatch(Loader(false))
//       })
//       .catch(err => {
//         enqueueSnackbar(err.message)
//         dispatch(Loader(false))
//       })
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }

// export const getTopProducts = () => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .collection('topPerformingProducts')
//       .orderBy('orders')
//       .get()
//       .then(data => {
//         let temp = []
//         for (let i = 0; i < data?.docs?.length && i < 5; i++) {
//           temp.push({
//             id: data?.docs[i]?.id,
//             ...data?.docs[i]?.data()
//           })
//         }
//         dispatch({
//           type: 'GET_TOP_PRODUCTS',
//           payload: temp
//         })
//         dispatch(Loader(false))
//       })
//       .catch(err => {
//         enqueueSnackbar(err.message)
//         dispatch(Loader(false))
//       })
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }

// export const getOrderAnalysis = () => async dispatch => {
//   dispatch(Loader(true))
//   try {
//     firebase
//       .firestore()
//       .collection('stats')
//       .doc('V2c3nbW2GstL7zYV9SYS')
//       .collection('orderAnalysis')
//       .get()
//       .then(data => {
//         let temp = []
//         for (let i = 0; i < data?.docs?.length; i++) {
//           temp.push({
//             id: data?.docs[i]?.id,
//             ...data?.docs[i]?.data()
//           })
//         }
//         dispatch({
//           type: 'GET_ORDER_ANALYSIS',
//           payload: temp
//         })
//         dispatch(Loader(false))
//       })
//       .catch(err => {
//         enqueueSnackbar(err.message)
//         dispatch(Loader(false))
//       })
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(Loader(false))
//   }
// }

// export const getProducts = () => async dispatch => {
//   dispatch(productLoader(true))
//   try {
//     const { data } = await Stats.getProducts()
//     if (data.success) {
//       dispatch({
//         type: 'PRODUCTS_DATA',
//         payload: data?.data
//       })
//       dispatch(productLoader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(productLoader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(productLoader(false))
//   }
// }

// export const getResturantRevenue = id => async dispatch => {
//   dispatch(reveueLoader(true))
//   try {
//     const { data } = await Stats.getRevenue(id)
//     if (data.success) {
//       dispatch({
//         type: 'RESTAURANT_REVENUE',
//         payload: data?.data
//       })
//       dispatch(reveueLoader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(reveueLoader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(reveueLoader(false))
//   }
// }

// export const getOrderAnalysisById = id => async dispatch => {
//   dispatch(restaurantAnalysisLoader(true))
//   try {
//     const { data } = await Stats.getAnalysisByID(id)
//     if (data.success) {
//       dispatch({
//         type: 'RESTAURANT_ORDER_ANALYSIS',
//         payload: data?.data
//       })
//       dispatch(restaurantAnalysisLoader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(restaurantAnalysisLoader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(restaurantAnalysisLoader(false))
//   }
// }

// export const getRestaurantVisitsById = id => async dispatch => {
//   dispatch(visitsLoader(true))
//   try {
//     const { data } = await Stats.getRestaurantVisits(id)
//     if (data.success) {
//       // console.log(data.data, "dataaaaaaaa");
//       dispatch({
//         type: 'RESTAURANT_VISITS',
//         payload: data?.data
//       })
//       dispatch(visitsLoader(false))
//     } else {
//       enqueueSnackbar(data.message)
//       dispatch(visitsLoader(false))
//     }
//   } catch (error) {
//     enqueueSnackbar(error.message)
//     dispatch(visitsLoader(false))
//   }
// }
// const peakHoursLoader = data => async dispatch => {
//   dispatch({
//     type: 'Peak_Hours_LOADER',
//     payload: data
//   })
// }
// const restaurantAnalysisLoader = data => async dispatch => {
//   dispatch({
//     type: 'RESTAURANT_ANALYSIS_LOADER',
//     payload: data
//   })
// }
// const reveueLoader = data => async dispatch => {
//   dispatch({
//     type: 'REVENUE_LOADER',
//     payload: data
//   })
// }
// const visitsLoader = data => async dispatch => {
//   dispatch({
//     type: 'VISITS_LOADER',
//     payload: data
//   })
// }
// const customerLoader = data => async dispatch => {
//   dispatch({
//     type: 'customer_LOADER',
//     payload: data
//   })
// }
// const frequencyLoader = data => async dispatch => {
//   dispatch({
//     type: 'frequency_LOADER',
//     payload: data
//   })
// }
// const productLoader = data => async dispatch => {
//   dispatch({
//     type: 'product_LOADER',
//     payload: data
//   })
// }
// const Loader = data => async dispatch => {
//   dispatch({
//     type: 'STATS_LOADER',
//     payload: data
//   })
// }
