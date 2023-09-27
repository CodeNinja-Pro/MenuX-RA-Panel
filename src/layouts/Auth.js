import React from 'react'
import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
// reactstrap components
import './auth.scss'

// core components

import routes from '../routes.js'

const Auth = props => {
  const mainContent = React.useRef(null)
  const location = useLocation()

  // React.useEffect(() => {
  //   document.body.classList.add("bg-default");
  //   return () => {
  //     document.body.classList.remove("bg-default");
  //   };
  // }, []);
  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContent.current.scrollTop = 0
  }, [location])

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/auth') {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        )
      } else {
        return null
      }
    })
  }

  return (
    <>
      <div
        className={
          location.pathname !== '/auth/admin-login'
            ? 'main-content-auth'
            : 'admin-login'
        }
        ref={mainContent}
      >
        <div className='header content py-3 py-lg-5'>
          <Switch>
            {getRoutes(routes)}
            <Redirect from='*' to='/auth/login' />
          </Switch>
          {/* <Container>
            <Row
              className={`justify-content-center py-3  ${
                location.pathname === '/auth/admin-login'
                  ? 'shadow admin-login__row'
                  : ''
              }`}
            >
              {location.pathname === '/auth/admin-login' && (
                <Col lg='6' md='7'>
                  <img src={adminLogin} alt='' className='login_img' />
                </Col>
              )}
              <Switch>
                {getRoutes(routes)}
                <Redirect from='*' to='/auth/login' />
              </Switch>
            </Row>
          </Container> */}
        </div>
      </div>
    </>
  )
}

export default Auth
