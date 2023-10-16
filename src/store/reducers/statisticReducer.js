const initState = {
  allMenus: [],
  allCategories: [],
  viewSortItems: [],
  purchaseSortItems: [],
  viewSortCategories: [],
  purchaseSortCategories: [],
  conversionRateSortItems: [],
  revenueSortItems: [],
  revenueSortCategories: [],
  totalViews: '',
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
    case 'ALL_CATEGORIES':
      return {
        ...state,
        allCategories: payload
      }
    case 'VIEW_SORT_ITEMS':
      return {
        ...state,
        viewSortItems: payload.sortedArray,
        totalViews: payload.totalViews
      }
    case 'PURCHASE_SORT_ITEMS':
      return {
        ...state,
        purchaseSortItems: payload
      }
    case 'VIEW_SORT_CATEGORIES':
      return {
        ...state,
        viewSortCategories: payload
      }
    case 'PURCHASE_SORT_CATEGORIES':
      return {
        ...state,
        purchaseSortCategories: payload
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
    case 'REVENUE_SORT_CATEGORIES':
      return {
        ...state,
        revenueSortCategories: payload
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
