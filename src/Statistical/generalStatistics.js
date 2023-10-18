var _ = require('lodash')

export const sortItemByView = array => async dispatch => {
  const sortedArray = _.sortBy(array, [
    o => {
      return o.views
    }
  ])

  let totalViews = 0
  array.map(item => {
    totalViews += item.views
  })

  dispatch({
    type: 'VIEW_SORT_ITEMS',
    payload: {
      sortedArray,
      totalViews
    }
  })
}

export const sortCategoryByView = (menus, categories) => async dispatch => {
  let countArray = {}

  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < menus.length; j++) {
      if (categories[i].id === menus[j].categoryID) {
        if (countArray[categories[i].id]) {
          countArray[categories[i].id] += menus[j].views
        } else {
          countArray[categories[i].id] = menus[j].views
        }
      }
    }
  }

  let sortedArray = []
  const arr = _.toPairs(countArray)
  const sorted = _.sortBy(arr, pair => -pair[1])

  sorted.map(item => {
    let filteredCategory = categories.filter(
      category => category.id === item[0]
    )
    sortedArray.push({
      id: filteredCategory[0].id,
      name: filteredCategory[0].name,
      views: item[1]
    })
  })

  dispatch({
    type: 'VIEW_SORT_CATEGORIES',
    payload: sortedArray.reverse()
  })
}

export const sortItemByPurchase = array => async dispatch => {
  const sortedArray = _.sortBy(array, [
    o => {
      return o.purchase
    }
  ])

  dispatch({
    type: 'PURCHASE_SORT_ITEMS',
    payload: sortedArray
  })

  return sortedArray
}

// export const sortCategoryByPurchase = array => async dispatch => {
//   const sortedArray = _.sortBy(array, [
//     o => {
//       return o.purchase
//     }
//   ])

//   dispatch({
//     type: 'PURCHASE_SORT_CATEGORIES',
//     payload: sortedArray
//   })

//   return sortedArray
// }

export const sortItemByConversionRate = array => async dispatch => {
  const sortedArray = _.sortBy(array, [
    o => {
      return Number(o.purchase) / Number(o.views)
    }
  ])

  dispatch({
    type: 'CONVERSION_SORT_ITEMS',
    payload: sortedArray
  })

  return sortedArray
}

export const sortItemByRevenue = array => async dispatch => {
  const sortedArray = _.sortBy(array, [
    o => {
      return (Number(o.price) - Number(o.totalPrice)) * Number(o.purchase)
    }
  ])

  let totalRevenue = 0
  array.map(item => {
    totalRevenue +=
      (Number(item.price) - Number(item.totalPrice)) * Number(item.purchase)
  })

  dispatch({
    type: 'REVENUE_SORT_ITEMS',
    payload: {
      sortedArray,
      totalRevenue
    }
  })
}

export const getTotalRevenue = array => async dispatch => {
  let totalRevenue = 0
  array.map(item => {
    totalRevenue +=
      (Number(item.price) - Number(item.totalPrice)) * Number(item.purchase)
  })

  dispatch({
    type: 'GET_TOTAL_REVENUE',
    payload: totalRevenue
  })
}

export const sortCategoryByRevenue = (menus, categories) => async dispatch => {
  let countArray = {}

  for (let i = 0; i < categories.length; i++) {
    for (let j = 0; j < menus.length; j++) {
      if (categories[i].id === menus[j].categoryID) {
        if (countArray[categories[i].id]) {
          countArray[categories[i].id] +=
            (menus[j].price - menus[j].totalPrice) * menus[j].purchase
        } else {
          countArray[categories[i].id] =
            (menus[j].price - menus[j].totalPrice) * menus[j].purchase
        }
      }
    }
  }

  let sortedArray = []
  const arr = _.toPairs(countArray)
  const sorted = _.sortBy(arr, pair => -pair[1])

  sorted.map(item => {
    let filteredCategory = categories.filter(
      category => category.id === item[0]
    )
    sortedArray.push({
      name: filteredCategory[0].name,
      revenue: item[1]
    })
  })

  dispatch({
    type: 'REVENUE_SORT_CATEGORIES',
    payload: sortedArray
  })
}

export const boughtSortItems = array => {
  const allBoughtItems = findDocumentsWithSpecificValue(array, 'purchase')
}

const findDocumentsWithSpecificValue = (objectArray, specificValue) => {
  const matchingDocuments = []

  for (let i = 0; i < objectArray.length; i++) {
    const document = objectArray[i]

    // Check if the specific value exists in the current document
    if (document.hasOwnProperty('type') && document.type === specificValue) {
      matchingDocuments.push(document)
    }
  }

  return matchingDocuments
}
