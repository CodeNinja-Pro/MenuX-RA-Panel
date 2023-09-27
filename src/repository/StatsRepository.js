import Repository from './repository'
const peakHours = '/stats/peak-hours'
const totalCustomers = '/stats/total-customers'
const orderFrequency = '/stats/order-frequency'
const customerDemographics = '/stats/gender-percentage'
const products = '/stats/product-sales'
const payMethod = '/stats/pay-method-percentage'
const restaurant = '/stats/restaurant-revenue-earned'
const analysis = '/stats/restaurant-order-anaylsis'
const visits = '/stats/restaurant-visits'

// // eslint-disable-next-line import/no-anonymous-default-export
// export default {
//   getPeakHours(payload) {
//     const { type, startDate, endDate } = payload;
//     const queryParams =
//       type === "range"
//         ? `?type=${type}&startDate=${startDate}&endDate=${endDate}`
//         : `?type=${payload}`;
//     return Repository.get(`${peakHours}${queryParams}`);
//   },
//   getTotalCustomers(payload) {
//     const { type, startDate, endDate } = payload;
//     const queryParams =
//       type === "range"
//         ? `?type=${type}&startDate=${startDate}&endDate=${endDate}`
//         : `?type=${payload}`;
//     return Repository.get(`${totalCustomers}${queryParams}`);
//   },
//   getOrderFrequency(payload) {
//     const { type, startDate, endDate } = payload;
//     const queryParams =
//       type === "range"
//         ? `?type=${type}&startDate=${startDate}&endDate=${endDate}`
//         : `?type=${payload}`;
//     return Repository.get(`${orderFrequency}${queryParams}`);
//   },
//   getOrderFrequency(payload) {
//     const { type, startDate, endDate } = payload;
//     const queryParams =
//       type === "range"
//         ? `?type=${type}&startDate=${startDate}&endDate=${endDate}`
//         : `?type=${payload}`;
//     return Repository.get(`${orderFrequency}${queryParams}`);
//   },
//   getPaymentMethodPercentage(payload) {
//     const { type, startDate, endDate } = payload;
//     const queryParams =
//       type === "range"
//         ? `?type=${type}&startDate=${startDate}&endDate=${endDate}`
//         : `?type=${payload}`;
//     return Repository.get(`${payMethod}${queryParams}`);
//   },

//   getRestaurantCustomerDemographics(payload) {
//     return Repository.get(`${customerDemographics}?restaurant_id=${payload}`);
//   },
//   getProducts() {
//     return Repository.get(`${products}`);
//   },
//   getRevenue(payload) {
//     return Repository.get(`${restaurant}?restaurantID=${payload}`);
//   },
//   getAnalysisByID(payload) {
//     return Repository.get(`${analysis}?restaurantID=${payload}`);
//   },
//   getRestaurantVisits(payload) {
//     return Repository.get(`${visits}?restaurantID=${payload}`);
//   },
// };
