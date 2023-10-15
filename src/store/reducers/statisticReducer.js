const initState = {
  allMenus: [],
  viewSortItems: [],
  purchaseSortItems: [],
  conversionRateSortItems: [],
  revenueSortItems: [],
  totalRevenue: '',
  clickSortCategories: [],
  boughtSortItems: [],
  peaktimeOrderSortItems: [],
  calcLoader: false
}
const statisticReducer = (state = initState, action) => {
  const { type, payload } = action
  switch (type) {
    case 'ALL_MENUS':
      return {
        ...state,
        allMenus: payload
      }
    case 'VIEW_SORT_ITEMS':
      return {
        ...state,
        viewSortItems: payload
      }
    case 'PURCHASE_SORT_ITEMS':
      return {
        ...state,
        purchaseSortItems: payload
      }
    case 'CONVERSION_SORT_ITEMS':
      return {
        ...state,
        conversionRateSortItems: payload
      }
    case 'REVENUE_SORT_ITEMS':
      return {
        ...state,
        revenueSortItems: payload.sortedArray,
        totalRevenue: payload.totalRevenue
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
