const initState = {
  peakHours: {},
  totalCustomers: {},
  totalPaymentMethods: {},
  restaurantStats: {},
  order_frequency: {},
  topMerchants: [],
  topProducts: [],
  orderAnalysis: [],
  peakLoading: false,
  customerLoading: false,
  frequencyLoading: false,
  productLoading: false,
  productsData: [],
  customerDemographics: {},
  currentRestaurantStats: {},
  currentTopViewedProducts: [],
  currentLeastViewedProducts: [],
  currentRestaurantBestSellers: [],
  currentRestaurantWorstSellers: [],
  restaurantRevenue: {},
  revenueLoader: false,
  restaurantOrderAnalysis: [],
  restaurantAnalysisLoader: false,
  restaurantVisits: {},
  visitsLoader: false,
};
const statsReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_PEAK_HOURS":
      return {
        ...state,
        peakHours: action.payload,
      };
    case "GET_CUSTOMERS_DEMOGRAPHICS":
      return {
        ...state,
        customerDemographics: action.payload,
      };
    case "GET_TOTAL_CUSTOMERS":
      return {
        ...state,
        totalCustomers: action.payload,
      };
    case "GET_PAYMENT_METHODS":
      return {
        ...state,
        totalPaymentMethods: action.payload,
      };
    case "GET_ORDER_FREQUENCY":
      return {
        ...state,
        order_frequency: action.payload,
      };
    case "GET_RESTAURANTS_STATS":
      return {
        ...state,
        restaurantStats: action.payload,
      };
    case "GET_TOP_MERCHANTS":
      return {
        ...state,
        topMerchants: action.payload,
      };
    case "GET_TOP_PRODUCTS":
      return {
        ...state,
        topProducts: action.payload,
      };
    case "GET_ORDER_ANALYSIS":
      return {
        ...state,
        orderAnalysis: action.payload,
      };
    case "PRODUCTS_DATA":
      return {
        ...state,
        productsData: action.payload,
      };
    case "RESTAURANT_REVENUE":
      return {
        ...state,
        restaurantRevenue: action.payload,
      };
    case "REVENUE_LOADER":
      return {
        ...state,
        revenueLoader: action.payload,
      };
    case "RESTAURANT_ANALYSIS_LOADER":
      return {
        ...state,
        restaurantAnalysisLoader: action.payload,
      };
    case "RESTAURANT_ORDER_ANALYSIS":
      return {
        ...state,
        restaurantOrderAnalysis: action.payload,
      };
    case "RESTAURANT_VISITS":
      return {
        ...state,
        restaurantVisits: action.payload,
      };
    case "VISITS_LOADER":
      return {
        ...state,
        visitsLoader: action.payload,
      };
    case "STATS_LOADER":
      return {
        ...state,
        loading: action.payload,
      };
    case "Peak_Hours_LOADER":
      return {
        ...state,
        peakLoading: action.payload,
      };
    case "customer_LOADER":
      return {
        ...state,
        customerLoading: action.payload,
      };
    case "frequency_LOADER":
      return {
        ...state,
        frequencyLoading: action.payload,
      };
    case "product_LOADER":
      return {
        ...state,
        productLoading: action.payload,
      };

    // resturant dashboard cards
    case "GET_RESTAURANT_STATS_BY_ID":
      return {
        ...state,
        currentRestaurantStats: action.payload,
      };
    case "GET_MOST_VIEWED_PRODUCTS_BY_ID":
      return {
        ...state,
        currentTopViewedProducts: action.payload,
      };
    case "GET_LEAST_VIEWED_PRODUCTS_BY_ID":
      return {
        ...state,
        currentLeastViewedProducts: action.payload,
      };
    case "GET_BEST_SELLERS_BY_ID":
      return {
        ...state,
        currentRestaurantBestSellers: action.payload,
      };
    case "GET_WORST_SELLERS_BY_ID":
      return {
        ...state,
        currentRestaurantWorstSellers: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default statsReducer;
