const initState = {
  clickSortItems: [],
  clickSortCategories: [],
  boughtSortItems: [],
  peaktimeOrderSortItems: [],
  calcLoader: false
}
const statisticReducer = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'CLICK_SORT_ITEMS':
      return {
        ...state,
        clickSortItems: payload
      }
    case 'CLICK_SORT_CATEGORIES':
      return {
        ...state,
        clickSortCategories: payload
      }
    case 'BOUGHT_SORT_ITEMS': {
      return {
        ...state,
        boughtSortItems: payload
      }
    }
    case 'PEAKTIME_ORDER_SORT': {
      return {
        ...state,
        peaktimeOrderSortItems: payload
      }
    }
    default:
      return {
        ...state
      }
  }
}

export default statisticReducer
