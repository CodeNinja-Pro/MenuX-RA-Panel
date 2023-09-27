const initState = {
  loading: false,
  customization: []
}
const customizationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'SET_LOADER':
      return {
        ...state,
        loading: action.payload
      }
    case 'GET_CUSTOMIZATION':
      return {
        ...state,
        customization: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
export default customizationReducer
