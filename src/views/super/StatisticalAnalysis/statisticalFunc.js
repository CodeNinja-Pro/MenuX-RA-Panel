var _ = require('lodash')

export const sortItemByView = array => async dispatch => {
  const sortedArray = _.sortBy(array, [
    o => {
      return o.views
    }
  ])

  dispatch({
    type: 'SUPER_VIEW_SORT_ITEMS',
    payload: sortedArray
  })
}

export const sortItemByConversionRate = array => async dispatch => {
  const sortedArray = _.sortBy(array, [
    o => {
      return Number(o.purchase) / Number(o.views)
    }
  ])

  dispatch({
    type: 'SUPER_CONVERSION_RATE_SORT_ITEMS',
    payload: sortedArray
  })

  return sortedArray
}
