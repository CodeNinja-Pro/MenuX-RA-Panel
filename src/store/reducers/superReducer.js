const initState = {
  loader: false,
  allRestaurantItems: [],
  allRestaurants: [],
  allFeedbacks: [],
  allStaffs: [],
  viewSortItems: [],
  sellersSort: [],
  conversionRateSortItems: []
}
const superReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADER':
      return {
        ...state,
        loader: action.payload
      }
    case 'GET_RESTAURANTS':
      return {
        ...state,
        allRestaurants: action.payload
      }
    case 'GET_STAFFS':
      return {
        ...state,
        allStaffs: action.payload
      }
    case 'UPDATE_STAFFS':
      return {
        ...state,
        allStaffs: state.allStaffs.map(staff => {
          if (staff.id === action.payload.id) {
            return { ...staff, ...action.payload.updateData }
          }
          return staff
        })
      }
    case 'UPDATE_RESTAURANTS':
      return {
        ...state,
        allRestaurants: state.allRestaurants.map(staff => {
          if (staff.id === action.payload.id) {
            return { ...staff, ...action.payload.updateData }
          }
          return staff
        })
      }
    case 'DELETE_RESTAURANTS':
      return {
        ...state,
        allRestaurants: state.allRestaurants?.filter(
          staff => staff.id !== action.payload
        )
      }
    case 'GET_FEEDBACKS':
      return {
        ...state,
        allFeedbacks: action.payload
      }
    case 'UPDATE_FEEDBACKS': {
      return {
        ...state,
        allFeedbacks: state.allFeedbacks.map(staff => {
          if (staff.id === action.payload.id) {
            return { ...staff, ...action.payload.updateData }
          }
          return staff
        })
      }
    }
    case 'DELETE_FEEDBACKS': {
      return {
        ...state,
        allFeedbacks: state.allFeedbacks?.filter(
          staff => staff.id !== action.payload
        )
      }
    }
    case 'ALL_RESTAURANT_ITEMS': {
      return {
        ...state,
        allRestaurantItems: action.payload
      }
    }
    case 'SUPER_VIEW_SORT_ITEMS': {
      return {
        ...state,
        viewSortItems: action.payload
      }
    }
    case 'SUPER_SELLER_SORT': {
      return {
        ...state,
        sellersSort: action.payload
      }
    }
    case 'SUPER_CONVERSION_RATE_SORT_ITEMS': {
      return {
        ...state,
        conversionRateSortItems: action.payload
      }
    }
    default:
      return {
        ...state
      }
  }
}
export default superReducer
