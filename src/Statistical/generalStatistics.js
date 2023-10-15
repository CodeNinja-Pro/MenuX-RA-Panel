var _ = require('lodash')

export const sortItemByView = array => async dispatch => {
  const sortedArray = _.sortBy(array, [
    o => {
      return o.views
    }
  ])

  dispatch({
    type: 'VIEW_SORT_ITEMS',
    payload: sortedArray
  })

  return sortedArray
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

  return sortedArray
}

export const sortCategoryByView = array => {
  let countArray = {}

  for (let i = 0; i < array.length; i++) {
    const value = array[i].categoryID + '-' + array[i].categoryName

    if (countArray[value]) {
      countArray[value]++
    } else {
      countArray[value] = 1
    }
  }

  const arr = _.toPairs(countArray)
  const sortedArray = _.sortBy(arr, pair => -pair[1])
  const sortedObj = _.fromPairs(sortedArray)

  const clickViewCategory = {
    allItemName: Object.keys(sortedObj),
    allItemView: Object.values(sortedObj)
  }

  // console.log('All category names', clickViewCategory)
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
