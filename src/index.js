import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'

import './assets/plugins/nucleo/css/nucleo.css'
// import "@fortawesome/fontawesome-free/css/all.min.css";
import './assets/scss/argon-dashboard-react.scss'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import store from './store/index'
import { Provider } from 'react-redux'
import './index.css'

ReactDOM.render(
  <>
    <Provider store={store}>
      <ToastContainer style={{ fontFamily: 'Poppins' }} />
      <App />
    </Provider>
  </>,
  document.getElementById('root')
)
