import Index from './views/Index.js'
// import Profile from './views/Profile.js'
// import Maps from './views/Maps.js'
import Login from './views/auth/Login.js'
// import Icons from './views/Icons.js'
// import Tables from './views/Tables.js'
import Restaurants from './views/Restaurants'
import Menus from './views/Menus'
import KitchenStaff from './views/KitchenStaff'
import Customers from './views/Customers'
import CustomerFeedback from './views/CustomerFeedback'
import ForgetPassword from './views/auth/ForgetPassword'
// import Statistics from './views/Statistics'
// import Catalog from './views/Catolog'
import SubAdmin from './views/SubAdmin'
import Requests from './views/Requests'
// import Reports from './views/Reports'
// import Settings from './views/Settings'
import OrdersRestaurant from './views/OrdersRestaurant'

import dashboard from './assets/common/sidebar/dashboard_black.png'
import dashboardactive from './assets/common/sidebar/dashboard_blue.png'
import menu from './assets/common/sidebar/menu_black.png'
import menuactive from './assets/common/sidebar/menu_blue.png'
import itemStatistics from './assets/common/sidebar/statistical_black.png'
import itemStatisticsactive from './assets/common/sidebar/statistical_blue.png'
import recommendations from './assets/common/sidebar/recommendations_black.png'
import recommendationsactive from './assets/common/sidebar/recommendations_blue.png'
import customerFeedback from './assets/common/sidebar/feedback_black.png'
import customerFeedbackactive from './assets/common/sidebar/feedback_blue.png'
import customization from './assets/common/sidebar/customization_black.png'
import customizationactive from './assets/common/sidebar/customization_blue.png'
import customers from './assets/common/sidebar/customers_black.png'
import customersactive from './assets/common/sidebar/customers_blue.png'
import request from './assets/common/sidebar/requests_black.png'
import requestactive from './assets/common/sidebar/requests_blue.png'
import settings from './assets/common/sidebar/settings_black.png'
import settingsactive from './assets/common/sidebar/settings_blue.png'
import staff from './assets/common/sidebar/staff_black.png'
import staffactive from './assets/common/sidebar/staff_blue.png'
import order from './assets/common/sidebar/orders_black.png'
import orderactive from './assets/common/sidebar/orders_blue.png'
import report from './assets/img/icons/report.svg'
import reportactive from './assets/img/icons/activeIcons/reportactive.svg'

import menuManage from './assets/img/icons/menuManage.svg'
import AdminLogin from './views/auth/AdminLogin'
import SignUp from './views/auth/SignUp'
import Recommendation from './views/Recommendation.js'
import SettingSection from './views/SettingSection.js'
import Customize from './views/Customize'
import CreateNewMenu from './views/CreateNewMenu'
import StaffSection from './views/StaffSection.js'
import ItemStatistical from './views/ItemStatistical.js'
import ItemDetail from './components/ItemStatistics/ItemDetail.js'
import ItemCompare from './components/ItemStatistics/ItemCompare.js'
import CreateRestaurant from './views/auth/Step/CreateRestaurant.js'
import NotificationTable from './components/Navbars/common/NotificationTable.js'
import CreateCoupon from './components/CreateNewMenu/common/CreateCoupon.js'
import CreatePopup from './components/CreateNewMenu/common/CreatePopup.js'

// The section for super admin panel
import SuperDashboard from './views/super/SuperDashboard'
import SuperRestaurant from './views/super/SuperRestaurant'
import SuperFeedback from './views/super/SuperFeedback'
import CreateRole from './components/Staff/CreateRole.js'
import SuperStaff from './views/super/SuperStaff.js'

var routes = [
  {
    path: '/index',
    name: 'Dashboard',
    icon: dashboard,
    activeIcon: dashboardactive,
    component: Index,
    type: 'admin',
    layout: '/admin'
  },
  {
    path: '/merchants',
    name: 'Merchants',
    icon: order,
    activeIcon: orderactive,
    component: Restaurants,
    type: 'admin',
    layout: '/admin'
  },
  {
    path: '/sub-admin',
    name: 'Sub-Admin',
    icon: staff,
    activeIcon: staffactive,
    component: SubAdmin,
    type: 'admin',
    layout: '/admin'
  },
  {
    path: '/new-menu',
    name: 'Menu',
    icon: menu,
    activeIcon: menuactive,
    component: CreateNewMenu,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/order',
    name: 'Orders',
    icon: order,
    activeIcon: orderactive,
    component: OrdersRestaurant,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/requests',
    name: 'Requests',
    icon: request,
    activeIcon: requestactive,
    component: Requests,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/item-statistics',
    name: 'Item Statistics',
    icon: itemStatistics,
    activeIcon: itemStatisticsactive,
    component: ItemStatistical,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/recommendations',
    name: 'Recommendations',
    icon: recommendations,
    activeIcon: recommendationsactive,
    component: Recommendation,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/customer-feedback',
    name: 'Customer Feedback',
    icon: customerFeedback,
    activeIcon: customerFeedbackactive,
    component: CustomerFeedback,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/customers',
    name: 'Customers',
    icon: customers,
    activeIcon: customersactive,
    component: Customers,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/staff',
    name: 'Staff',
    icon: staff,
    activeIcon: staffactive,
    component: StaffSection,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    name: 'Customization',
    path: '/customization',
    activeIcon: customizationactive,
    icon: customization,
    component: Customize,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: settings,
    activeIcon: settingsactive,
    component: SettingSection,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/menus',
    name: 'Menu Management',
    icon: menuManage,
    activeIcon: menuManage,
    component: Menus,
    type: 'restaurant',
    layout: '/admin'
  },
  {
    path: '/login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: Login,
    layout: '/auth',
    isMenu: false
  },

  {
    path: '/sign-up',
    name: 'Sign Up',
    icon: 'ni ni-key-25 text-info',
    component: SignUp,
    layout: '/auth',
    isMenu: false
  },
  {
    path: '/create-restaurant',
    name: 'Create Restaurant',
    icon: 'ni ni-key-25 text-info',
    component: CreateRestaurant,
    layout: '/auth',
    isMenu: false
  },
  {
    path: '/admin-login',
    name: 'Login',
    icon: 'ni ni-key-25 text-info',
    component: AdminLogin,
    layout: '/auth',

    isMenu: false
  },
  {
    path: '/forget-password',
    name: 'Forget Password',
    icon: 'ni ni-circle-08 text-pink',
    component: ForgetPassword,
    layout: '/auth',
    isMenu: false
  },
  {
    path: '/item-detail/:id',
    name: 'Item Details',
    component: ItemDetail,
    type: 'restaurant',
    layout: '/admin',
    isMenu: false
  },
  {
    path: '/item-compare/:id',
    name: 'Item Compare',
    component: ItemCompare,
    type: 'restaurant',
    layout: '/admin',
    isMenu: false
  },
  {
    path: '/create-coupon',
    name: 'Creaate Coupons',
    component: CreateCoupon,
    type: 'restaurant',
    layout: '/admin',
    isMenu: false
  },
  {
    path: '/create-popup',
    name: 'Creaate Popup',
    component: CreatePopup,
    type: 'restaurant',
    layout: '/admin',
    isMenu: false
  },
  {
    path: '/notifications',
    name: 'Notifications',
    component: NotificationTable,
    type: 'restaurant',
    layout: '/admin',
    isMenu: false
  },
  {
    path: '/dashboard',
    name: 'Super Dashboard',
    icon: dashboard,
    activeIcon: dashboardactive,
    component: SuperDashboard,
    type: 'super',
    layout: '/super'
  },
  {
    path: '/restaurant',
    name: 'Restaurant',
    icon: customers,
    activeIcon: customersactive,
    component: SuperRestaurant,
    type: 'super',
    layout: '/super'
  },
  {
    path: '/staff',
    name: 'Staff',
    icon: staff,
    activeIcon: staffactive,
    component: SuperStaff,
    type: 'super',
    layout: '/super'
  },
  {
    path: '/feedback',
    name: 'Feedback',
    icon: customerFeedback,
    activeIcon: customerFeedbackactive,
    component: SuperFeedback,
    type: 'super',
    layout: '/super'
  }
]
export default routes
