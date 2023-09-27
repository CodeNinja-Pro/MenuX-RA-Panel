var _ = require('lodash')

export const sortItemByView = array => {
  let countArray = {}

  for (let i = 0; i < array.length; i++) {
    const value = array[i].itemID + '-' + array[i].itemName

    if (countArray[value]) {
      countArray[value]++
    } else {
      countArray[value] = 1
    }
  }

  const arr = _.toPairs(countArray)
  const sortedArray = _.sortBy(arr, pair => -pair[1])
  const sortedObj = _.fromPairs(sortedArray)

  const clickViewItems = {
    allItemName: Object.keys(sortedObj),
    allItemView: Object.values(sortedObj)
  }
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
