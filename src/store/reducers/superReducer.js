const initState = {
  loader: false,
  allRestaurants: [],
  allFeedbacks: [],
  allStaffs: []
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
    default:
      return {
        ...state
      }
  }
}
export default superReducer
