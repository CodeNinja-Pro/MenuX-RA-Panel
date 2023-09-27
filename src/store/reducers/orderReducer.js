const initState = {
  order: [],
  allOrder: [],
  OrdersRestData: [],
  Loader: false,
};
const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ORDER_BY_ID":
      return {
        ...state,
        order: action.payload,
      };
    case "GET_ALL_ORDERS":
      return {
        ...state,
        allOrder: action.payload,
      };
    case "ORDERS_LOADER":
      return {
        ...state,
        Loader: action.payload,
      };
    case "GET_ALL_REST_ORDERS":
      return {
        ...state,
        OrdersRestData: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default orderReducer;
