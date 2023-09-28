import React, { useEffect } from 'react'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import AdminLayout from './layouts/Admin.js'
import SuperLayout from './layouts/Super.js'
import AuthLayout from './layouts/Auth.js'
import { useDispatch, useSelector } from 'react-redux'
import { reRegisterSnapshot } from './store/actions/authActions'
import { SnackbarProvider } from 'notistack'

import './assets/plugins/nucleo/css/nucleo.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import './assets/scss/argon-dashboard-react.scss'
import './App.css'

function App () {
  const dispatch = useDispatch()
  let { uid, active, user } = useSelector(state => state.auth)

  useEffect(() => {
    if (uid) {
      dispatch(reRegisterSnapshot(uid))
    }
  }, [])

  return (
    <div className='App'>
      <BrowserRouter>
        <SnackbarProvider
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center'
          }}
        >
          {uid && active === true ? (
            <>
              {user.type === 'restaurant' ? (
                <Switch>
                  <Route
                    path='/admin'
                    render={props => <AdminLayout {...props} />}
                  />
                  <Redirect from='/' to='/admin' />
                </Switch>
              ) : (
                <Switch>
                  <Route
                    path='/super'
                    render={props => <SuperLayout {...props} />}
                  />
                  <Redirect from='/' to='/super' />
                </Switch>
              )}
            </>
          ) : (
            <Switch>
              <Route path='/auth' render={props => <AuthLayout {...props} />} />
              <Redirect from='/' to='/auth/login' />
            </Switch>
          )}
        </SnackbarProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
