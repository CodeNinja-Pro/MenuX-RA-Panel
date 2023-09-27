const initialState = {
  restaurantRequests: [],
  restaurantOrders: [],
  unreadNotifications: [],
  allNotifications: [],
  restaurantOrdersRestData: [],
  requestLoader: false,
  orderLoader: false,
};

const requestReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "REQUESTS": {
      return {
        ...state,
        restaurantRequests: payload,
      };
    }
    case "ORDERS": {
      return {
        ...state,
        restaurantOrders: payload,
      };
    }
    case "ORDERS_DETAILS": {
      return {
        ...state,
        restaurantOrdersRestData: payload,
      };
    }
    case "ORDER_LOADER": {
      return {
        ...state,
        orderLoader: payload,
      };
    }
    case "UNREAD_NOTFICATIONS": {
      return {
        ...state,
        unreadNotifications: payload,
      };
    }
    case "ALL_NOTIFICATIONS": {
      return {
        ...state,
        allNotifications: payload,
      };
    }
    case "UPDATE_ORDER_STATUS": {
      const { id, status } = payload;
      const updatedOrders = state.restaurantOrders.map((order) => {
        if (order.id === id) {
          return {
            ...order,
            status: status,
          };
        }
        return order;
      });
      return {
        ...state,
        restaurantOrders: updatedOrders,
      };
    }
    default:
      return {
        ...state,
      };
  }
};

export default requestReducer;
