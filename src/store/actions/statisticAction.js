import firebase from '../../config/firebase'
import { toast } from 'react-toastify'

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
        name: doc.data().item,
        categoryID: doc.data().categoriesID,
        views: doc.data().views,
        viewTime: doc.data().viewTime,
        orderCount: doc.data().orderCount,
        purchase: doc.data().purchase,
        price: doc.data().price,
        totalPrice: doc.data().totalPrice,
        conversionRate: doc.data().purchase / doc.data().views,
        profitMarginSharp: doc.data().price - doc.data().totalPrice,
        profitMarginPercent:
          ((doc.data().price - doc.data().totalPrice) / doc.data().price) * 100
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

export const getAllCategories = userId => async dispatch => {
  try {
    let allCategories = []

    const snapShot = await firebase
      .firestore()
      .collection('categories')
      .where('restaurantID', '==', userId)
      .get()

    snapShot.forEach(doc => {
      allCategories.push({
        id: doc.id,
        name: doc.data().categoryName,
        menuID: doc.data().menuID,
        views: doc.data().views,
        purchase: doc.data().purchase
      })
    })

    dispatch({
      type: 'ALL_CATEGORIES',
      payload: allCategories
    })
  } catch (error) {
    toast.error(error.message)
  }
}

export const getTotalRevenueByCategory = id => async dispatch => {
  try {
    let totalRevenueByCategory = 0
    let categoryID = ''

    await firebase
      .firestore()
      .collection('menus')
      .doc(id)
      .get()
      .then(doc => {
        categoryID = doc.data().categoriesID
      })

    const snapShot = await firebase
      .firestore()
      .collection('menus')
      .where('categoriesID', '==', categoryID)
      .get()

    snapShot.forEach(item => {
      totalRevenueByCategory +=
        (item.data().price - item.data().totalPrice) * item.data().purchase
    })
    dispatch({
      type: 'GET_TOTAL_REVENUE_CATEGORY',
      payload: totalRevenueByCategory
    })
  } catch (error) {
    toast.error(error.message)
  }
}

export const getItemDetail = id => async dispatch => {
  try {
    dispatch({
      type: 'LOADING_TRUE'
    })

    const menu = await firebase.firestore().collection('menus').doc(id).get()
    let categoryID = menu.data().categoriesID
    const category = await firebase
      .firestore()
      .collection('categories')
      .doc(categoryID)
      .get()

    const snapShot = await firebase
      .firestore()
      .collection('menus')
      .where('categoriesID', '==', category.id)
      .get()

    let totalRevenueByCateogry = 0
    snapShot.forEach(item => {
      totalRevenueByCateogry +=
        (item.data().price - item.data().totalPrice) * item.data().purchase
    })

    const menuDetail = {
      menuName: menu.data().item,
      categoryName: category.data().categoryName,
      price: menu.data().price,
      cost: menu.data().totalPrice,
      viewTime: menu.data().viewTime,
      purchase: menu.data().purchase,
      views: menu.data().views,
      totalRevenueByCategory: totalRevenueByCateogry,
      // profitMargin: menu.data().price - menu.data().totalPrice,
      // profitMarginPercent:
      //   ((menu.data().price - menu.data().totalPrice) / menu.data().price) *
      //   100,
      createdAt: menu.data().createdAt
    }

    dispatch({
      type: 'ITEM_DETAIL',
      payload: menuDetail
    })

    dispatch({
      type: 'LOADING_FALSE'
    })
  } catch (error) {
    toast.error(error.message)

    dispatch({
      type: 'LOADING_FALSE'
    })
  }
}

export const getCompareItemDetail = (totalRevenue, id) => async dispatch => {
  try {
    dispatch({
      type: 'LOADING_TRUE'
    })
    const menu = await firebase.firestore().collection('menus').doc(id).get()
    let categoryID = menu.data().categoriesID
    const category = await firebase
      .firestore()
      .collection('categories')
      .doc(categoryID)
      .get()

    const snapShot = await firebase
      .firestore()
      .collection('menus')
      .where('categoriesID', '==', category.id)
      .get()

    let totalRevenueByCateogry = 0
    snapShot.forEach(item => {
      totalRevenueByCateogry +=
        (item.data().price - item.data().totalPrice) * item.data().purchase
    })

    const detail = {
      itemID: id,
      menuName: menu.data().item,
      categoryName: category.data().categoryName,
      price: menu.data().price,
      cost: menu.data().totalPrice,
      profitMargin: menu.data().price - menu.data().totalPrice,
      profitMarginPercent: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(
        ((menu.data().price - menu.data().totalPrice) / menu.data().price) * 100
      ),
      averageClickPerDay: menu.data().views,
      averageViewTime: menu.data().viewTime,
      conversionRate: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(menu.data().purchase / menu.data().views),
      revenueGenerated:
        (menu.data().price - menu.data().totalPrice) * menu.data().purchase,
      averagePurchasePerDay: menu.data().purchase,
      revenueOfMenu: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(
        ((menu.data().price - menu.data().totalPrice) *
          menu.data().purchase *
          100) /
          totalRevenue
      ),
      revenueOfCategory: new Intl.NumberFormat('en-IN', {
        maximumSignificantDigits: 3
      }).format(
        ((menu.data().price - menu.data().totalPrice) *
          menu.data().purchase *
          100) /
          totalRevenueByCateogry
      ),
      peakOrderTime: '12 PM - 2 PM',
      createdAt: menu.data().createdAt
    }

    dispatch({
      type: 'COMPARE_ITEM_ADD',
      payload: detail
    })

    dispatch({
      type: 'LOADING_FALSE'
    })
  } catch (error) {
    toast.error(error.message)
    dispatch({
      type: 'LOADING_FALSE'
    })
  }
}
