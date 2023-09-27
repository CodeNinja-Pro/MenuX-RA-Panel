const initState = {
  isLoading: false,
  cardInfo: [],
  customer: null
}
const paymentReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_ALL_CARD':
      return {
        ...state,
        cardInfo: action.payload
      }
    case 'CARD_LOADER':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'GET_CUSTOMER':
      return {
        ...state,
        customer: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
export default paymentReducer
