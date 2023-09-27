const initState = {
  loader: false,
  allRestaurants: [],
  allFeedbacks: []
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
    case 'GET_FEEDBACKS':
      return {
        ...state,
        allFeedbacks: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
export default superReducer
