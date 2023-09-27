const initState = {
  isLoading: false,
  customerData: [],
  customerRestData: null
}
const customerReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_CUSTOMER':
      return {
        ...state,
        customerData: action.payload
      }
    case 'CUSTOMER_DETAILS':
      return {
        ...state,
        customerRestData: action.payload
      }
    case 'CUSTOMER_LOADER':
      return {
        ...state,
        isLoading: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
export default customerReducer
