const initState = {
  loading: false,
  currencyLoading: false,
  paymentConnectionLoading: false,
};
const settingReducer = (state = initState, action) => {
  switch (action.type) {
    case "SET_LOADER":
      return {
        ...state,
        loading: action.payload,
      };
    case "PAYMENT_CONNECTION_LOADER":
      return {
        ...state,
        paymentConnectionLoading: action.payload,
      };
    case "SET_CURRENCY_LOADER":
      return {
        ...state,
        currencyLoading: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default settingReducer;
