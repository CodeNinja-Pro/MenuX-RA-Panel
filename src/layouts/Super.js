import React, { useEffect } from 'react'
import { useLocation, Route, Switch, Redirect } from 'react-router-dom'
// reactstrap components
// core components
import AdminNavbar from '../components/Navbars/AdminNavbar.js'
import Sidebar from '../components/Sidebar/Sidebar.js'

import routes from '../routes.js'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantImages } from '../store/actions/restaurantAction'
import EditScratchMenu from '../components/CreateNewMenu/EditScratchMenu'

const Super = props => {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { restaurantMedia } = useSelector(state => state.restaurant)
  const mainContent = React.useRef(null)
  const location = useLocation()
  const [hide, setHide] = useState(false)

  React.useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
    mainContent.current.scrollTop = 0
  }, [location])

  const getRoutes = routes => {
    return routes.map((prop, key) => {
      if (prop.layout === '/super') {
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

  const getBrandText = path => {
    for (let i = 0; i < routes.length; i++) {
      if (
        props.location.pathname.indexOf(routes[i].layout + routes[i].path) !==
        -1
      ) {
        return routes[i].name
      }
    }
    return 'Brand'
  }
  useEffect(() => {
    if (user) {
      dispatch(getRestaurantImages(user?.restaurantID))
    }
  }, [user])

  let logo =
    user?.type == 'restaurant'
      ? user?.restaurantLogo
        ? user?.restaurantLogo
        : require('../assets/img/MainMark.svg').default
      : restaurantMedia?.logo
      ? restaurantMedia?.logo
      : require('../assets/img/MainMark.svg').default

  return (
    <>
      <Sidebar
        {...props}
        routes={routes}
        logo={{
          innerLink: '/super/index',
          imgSrc: logo,
          // imgSrc: user?.restaurantLogo
          //   ? user?.restaurantLogo
          //   : require("../assets/img/Mpink.svg").default,
          imgAlt: '...'
        }}
        hide={hide}
        setHide={setHide}
      />
      <div className='main-content' ref={mainContent}>
        <AdminNavbar
          {...props}
          brandText={getBrandText(props.location.pathname)}
          hide={hide}
          setHide={setHide}
        />
        <Switch>
          <Route path='/admin/checkout-responses/:id' />
          <Route path='/admin/edit-menu/:id' component={EditScratchMenu} />
          {getRoutes(routes)}

          <Redirect from='*' to='/super/dashboard' />
        </Switch>
      </div>
    </>
  )
}

export default Super
