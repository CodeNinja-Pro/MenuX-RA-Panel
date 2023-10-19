const initState = {
  allMenus: [],
  allCategories: [],
  viewSortItems: [],
  viewTimeSortItems: [],
  orderSortItems: [],
  orderSortCategories: [],
  purchaseSortItems: [],
  viewSortCategories: [],
  conversionRateSortItems: [],
  revenueSortItems: [],
  revenueSortCategories: [],
  totalViews: '',
  totalRevenue: '',
  totalRevenueByCategory: '',
  peaktimeOrderSortItems: [],
  itemDetail: {},
  compareItems: [],
  loading: false
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
    case 'VIEWTIME_SORT_ITEMS':
      return {
        ...state,
        viewTimeSortItems: payload
      }
    case 'ORDER_SORT_ITEMS':
      return {
        ...state,
        orderSortItems: payload
      }
    case 'ORDER_SORT_CATEGORIES':
      return {
        ...state,
        orderSortCategories: payload
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
    case 'GET_TOTAL_REVENUE':
      return {
        ...state,
        totalRevenue: payload
      }
    case 'GET_TOTAL_REVENUE_CATEGORY':
      return {
        ...state,
        totalRevenueByCategory: payload
      }
    case 'REVENUE_SORT_CATEGORIES':
      return {
        ...state,
        revenueSortCategories: payload
      }
    case 'PEAKTIME_ORDER_SORT': {
      return {
        ...state,
        peaktimeOrderSortItems: payload
      }
    }
    case 'ITEM_DETAIL': {
      return {
        ...state,
        itemDetail: payload
      }
    }
    case 'COMPARE_ITEM_ADD': {
      return {
        ...state,
        compareItems: [...state.compareItems, payload]
      }
    }
    case 'COMPARE_ITEM_REMOVE': {
      return {
        ...state,
        compareItems: state.compareItems.filter(item => item.itemID !== payload)
      }
    }
    case 'LOADING_TRUE':
      return {
        ...state,
        loading: true
      }
    case 'LOADING_FALSE':
      return {
        ...state,
        loading: false
      }
    default:
      return {
        ...state
      }
  }
}

export default statisticReducer
