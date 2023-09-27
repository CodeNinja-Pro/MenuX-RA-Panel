const initState = {
  isLoading: false,
  restaurantsData: [],
  restaurantsRestData: null,
  restaurantMedia: {},
  merchantData: [],
};
const restaurantReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_RESTAURANT":
      return {
        ...state,
        restaurantsData: action.payload,
      };
    case "GET_ALL_MERCHANT":
      return {
        ...state,
        merchantData: action.payload,
      };
    case "RESTAURANT_DETAILS":
      return {
        ...state,
        restaurantsRestData: action.payload,
      };
    case "RESTAURANT_LOADER":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "Restaurant_Media":
      return {
        ...state,
        restaurantMedia: action.payload,
      };

    case "DELETE_RESTAURANT":
      // Remove the restaurant with the specified id from the state array
      return {
        ...state,
        restaurantsData: state.restaurantsData.filter(
          (restaurant) => restaurant.id !== action.payload
        ),
      };
    case "UPDATE_RESTAURANT":
      // Update the restaurant with the specified id in the state array
      return {
        ...state,
        restaurantsData: state.restaurantsData.map((restaurant) =>
          restaurant.id === action.payload.id ? action.payload : restaurant
        ),
      };
    default:
      return {
        ...state,
      };
  }
};
export default restaurantReducer;
