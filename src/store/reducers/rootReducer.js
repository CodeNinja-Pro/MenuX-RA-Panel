import { combineReducers } from 'redux'
import authReducer from './authReducer'
import catalogReducer from './catalogReducer'
import settingReducer from './settingReducer'
import MenuManage from './MenuManagementReducer'
import restaurantReducer from './restaurantReducer'
import subAdminReducer from './subAdminReducer'
import staffReducer from './staffReducer'
import requestReducer from './RequestReducer'
import statsReducer from './statsReducer'
import checkoutQuestionReducer from './checkoutQuestionReducer'
import customerReducer from './customerReducer'
import orderReducer from './orderReducer'
import customizationReducer from './customizationReducer'
import statisticReducer from './statisticReducer'
import paymentReducer from './paymentReducer'
import superReducer from './superReducer'
import notificationReducer from './notificationReducer'

const rootReducer = combineReducers({
  auth: authReducer,
  menu: MenuManage,
  staff: staffReducer,
  customization: customizationReducer,
  statistic: statisticReducer,
  super: superReducer,
  notification: notificationReducer,
  payment: paymentReducer,
  catalog: catalogReducer,
  setting: settingReducer,
  restaurant: restaurantReducer,
  admin: subAdminReducer,
  requests: requestReducer,
  stats: statsReducer,
  checkoutQuestion: checkoutQuestionReducer,
  customer: customerReducer,
  orders: orderReducer
})
export default rootReducer
