import React, { useState } from 'react'
import { NavLink as NavLinkRRD, Link, useLocation } from 'react-router-dom'
import { PropTypes } from 'prop-types'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import { BasicColor } from '../common/Color'

import {
  Collapse,
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Media,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Button
} from 'reactstrap'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/authActions'
import arrowLeft from '../../assets/img/icons/arrowLeft.svg'
import { Box } from '@mui/material'

const Sidebar = props => {
  const mainColor = BasicColor.mainAdminColor
  const secondaryColor = BasicColor.secondaryAdminColor

  const dispatch = useDispatch()
  const location = useLocation()
  const { hide, setHide } = props
  const [collapseOpen, setCollapseOpen] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [isActive, setIsActive] = useState(0)
  const toggle1 = () => setIsOpen(!isOpen)

  // toggles collapse between opened and closed (true/false)
  const toggleCollapse = () => {
    setCollapseOpen(data => !data)
  }
  // closes the collapse
  const closeCollapse = value => {
    setCollapseOpen(false)
    setIsActive(value)
  }
  const { user, userPermissions } = useSelector(state => state.auth)

  const onPreviewClick = () => {
    console.log('Preview OK')
  }

  const createLinks = routes => {
    if (user && user?.type == 'restaurant') {
      return routes.map((prop, key1) => {
        if (prop.isMenu !== false) {
          if (prop.name === 'Dashboard' || user?.type == prop.type) {
            if (
              prop.path == '/menus' ||
              prop.path == '/payment-connection' ||
              prop.path == '/store-timings' ||
              prop.path == '/pickup-or-delivery' ||
              prop.path == '/category' ||
              prop.path == '/holidays' ||
              prop.path == '/labels' ||
              prop.path == '/client-settings' ||
              prop.path == '/accout-settings' ||
              prop.path == '/venue-settings'
            ) {
              return <></>
            } else {
              return (
                <NavItem key={key1}>
                  {user?.subScriptionStatus == 'unsubscribe' ? (
                    prop.name == 'Settings' ? (
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between'
                        }}
                      >
                        <Box>
                          <NavLink
                            to={prop.layout + prop.path}
                            tag={NavLinkRRD}
                            // activeClassName="active"
                            onClick={() => closeCollapse(key1)}
                            style={
                              location.pathname === prop.layout + prop.path
                                ? {
                                    backgroundColor: `${secondaryColor}`,
                                    color: `${mainColor}`
                                  }
                                : {}
                            }
                            className={
                              location.pathname == prop.layout + prop.path
                                ? 'nav-link__active'
                                : ''
                            }
                          >
                            <img
                              src={
                                location.pathname == prop.layout + prop.path
                                  ? prop.activeIcon
                                  : prop.icon
                              }
                              alt=''
                              className='mx-2'
                            />
                            <p style={{ color: `${mainColor}` }}>
                              {!hide && prop.name}
                            </p>
                          </NavLink>
                        </Box>
                      </Box>
                    ) : (
                      ''
                    )
                  ) : (
                    // Sidebar for Restaurant Admin Panel

                    <NavLink
                      to={prop.layout + prop.path}
                      tag={NavLinkRRD}
                      onClick={() => closeCollapse(key1)}
                      style={
                        location.pathname === prop.layout + prop.path
                          ? {
                              backgroundColor: `${secondaryColor}`,
                              color: `${mainColor}`
                            }
                          : {}
                      }
                      className={
                        location.pathname == prop.layout + prop.path
                          ? 'nav-link__active'
                          : ''
                      }
                    >
                      <img
                        src={
                          location.pathname == prop.layout + prop.path
                            ? prop.activeIcon
                            : prop.icon
                        }
                        style={{ width: '40px', height: '40px' }}
                        alt=''
                      />
                      <span
                        style={
                          location.pathname === prop.layout + prop.path
                            ? { color: `${mainColor}` }
                            : { color: 'black' }
                        }
                      >
                        {!hide && prop.name}
                      </span>
                    </NavLink>
                  )}
                </NavItem>
              )
            }
          }
        }
      })
    } else if (user && user?.type == 'super') {
      return routes.map((prop, key1) => {
        if (prop.isMenu !== false) {
          if (user?.type == prop.type) {
            return (
              <NavItem key={key1}>
                <NavLink
                  to={prop.layout + prop.path}
                  tag={NavLinkRRD}
                  onClick={() => closeCollapse(key1)}
                  style={
                    location.pathname === prop.layout + prop.path
                      ? {
                          backgroundColor: `${secondaryColor}`,
                          color: `${mainColor}`
                        }
                      : {}
                  }
                  className={
                    location.pathname == prop.layout + prop.path
                      ? 'nav-link__active'
                      : ''
                  }
                >
                  <img
                    src={
                      location.pathname == prop.layout + prop.path
                        ? prop.activeIcon
                        : prop.icon
                    }
                    style={{ width: '40px', height: '40px' }}
                    alt=''
                  />
                  <span
                    style={
                      location.pathname === prop.layout + prop.path
                        ? { color: `${mainColor}` }
                        : { color: 'black' }
                    }
                  >
                    {!hide && prop.name}
                  </span>
                </NavLink>
              </NavItem>
            )
          }
        }
      })
    } else if (user && user?.type == 'kitchen-admin') {
      return routes.map((prop, key2) => {
        if (prop.isMenu !== false) {
          if (prop.name == 'Dashboard') {
            return (
              <NavItem key={key2}>
                <NavLink
                  to={prop.layout + prop.path}
                  tag={NavLinkRRD}
                  // activeClassName="active"
                  onClick={() => closeCollapse(key2)}
                  style={
                    location.pathname === prop.layout + prop.path
                      ? {
                          backgroundColor: `${secondaryColor}`,
                          color: `${mainColor}`
                        }
                      : {}
                  }
                  className={
                    location.pathname == prop.layout + prop.path
                      ? 'nav-link__active'
                      : ''
                  }
                >
                  <img
                    src={
                      location.pathname == prop.layout + prop.path
                        ? prop.activeIcon
                        : prop.icon
                    }
                    alt=''
                    className='mx-2'
                  />

                  {!hide && prop.name}
                </NavLink>
              </NavItem>
            )
          } else if (user && userPermissions) {
            for (const perm in userPermissions) {
              const old_path = prop.path
              const path = old_path.split('/')[1]
              if (perm == path) {
                if (
                  prop.path == '/menus' ||
                  prop.path == '/category' ||
                  prop.path == '/labels'
                ) {
                  return (
                    <>
                      {prop.path == '/menus' && (
                        <>
                          <UncontrolledDropdown nav inNavbar className=''>
                            <DropdownToggle
                              nav
                              caret
                              onClick={toggle1}
                              className='dropdown-togglenavbar'
                            >
                              <img src={prop.icon} alt='' className='mx-2' />
                              {!hide && prop.name}
                            </DropdownToggle>

                            <Collapse
                              isOpen={isOpen}
                              // className={`${hide ? '' : 'sidebar-collapse'}`}
                            >
                              {userPermissions?.menus && (
                                <NavItem>
                                  <NavLink
                                    to={'/admin' + '/menus'}
                                    tag={NavLinkRRD}
                                    onClick={() => closeCollapse('menus')}
                                    // activeClassName="active "
                                    style={
                                      location.pathname == '/admin/menus'
                                        ? {
                                            backgroundColor: `${secondaryColor}`,
                                            color: `${mainColor}`
                                          }
                                        : {}
                                    }
                                    className={`${
                                      location.pathname == '/admin/menus'
                                        ? 'nav-link__active'
                                        : ''
                                    } d-flex justify-content-between align-items-center links`}
                                  >
                                    Menu
                                    <img
                                      src={arrowLeft}
                                      alt=''
                                      className={`${
                                        !hide &&
                                        location.pathname == '/admin/menus'
                                          ? ''
                                          : 'd-none'
                                      }`}
                                    />
                                  </NavLink>
                                </NavItem>
                              )}
                              {userPermissions?.category && (
                                <NavItem>
                                  <NavLink
                                    to={'/admin' + '/category'}
                                    tag={NavLinkRRD}
                                    onClick={() => closeCollapse('category')}
                                    style={
                                      location.pathname == '/admin/category'
                                        ? {
                                            backgroundColor: `${secondaryColor}`,
                                            color: `${mainColor}`
                                          }
                                        : {}
                                    }
                                    className={`${
                                      location.pathname == '/admin/category'
                                        ? 'nav-link__active'
                                        : ''
                                    } d-flex justify-content-between align-items-center links`}
                                  >
                                    Category
                                    <img
                                      src={arrowLeft}
                                      alt=''
                                      className={`${
                                        !hide &&
                                        location.pathname == '/admin/category'
                                          ? ''
                                          : 'd-none'
                                      }`}
                                    />
                                  </NavLink>
                                </NavItem>
                              )}
                              {userPermissions?.labels && (
                                <NavItem>
                                  <NavLink
                                    to={'/admin' + '/labels'}
                                    tag={NavLinkRRD}
                                    onClick={() => closeCollapse('labels')}
                                    style={
                                      location.pathname == '/admin/labels'
                                        ? {
                                            backgroundColor: `${secondaryColor}`,
                                            color: `${mainColor}`
                                          }
                                        : {}
                                    }
                                    className={`${
                                      location.pathname == '/admin/labels'
                                        ? 'nav-link__active'
                                        : ''
                                    } d-flex justify-content-between align-items-center links`}
                                  >
                                    Label
                                    <img
                                      src={arrowLeft}
                                      alt=''
                                      className={`${
                                        !hide &&
                                        location.pathname == '/admin/labels'
                                          ? ''
                                          : 'd-none'
                                      }`}
                                    />
                                  </NavLink>
                                </NavItem>
                              )}
                            </Collapse>
                          </UncontrolledDropdown>
                        </>
                      )}
                    </>
                  )
                }
                return (
                  <NavItem key={key2}>
                    <NavLink
                      to={prop.layout + prop.path}
                      tag={NavLinkRRD}
                      // activeClassName="active"
                      onClick={() => closeCollapse(key2)}
                      style={
                        location.pathname == prop.layout + prop.path
                          ? {
                              backgroundColor: `${secondaryColor}`,
                              color: `${mainColor}`
                            }
                          : {}
                      }
                      className={
                        location.pathname == prop.layout + prop.path
                          ? 'nav-link__active'
                          : ''
                      }
                    >
                      <img
                        src={
                          location.pathname == prop.layout + prop.path
                            ? prop.activeIcon
                            : prop.icon
                        }
                        alt=''
                        className='mx-2'
                      />
                      <p style={{ color: `${mainColor}` }}>
                        {!hide && prop.name}
                      </p>
                    </NavLink>
                  </NavItem>
                )
              }
            }
          }
        }
      })
    } else if (user && user?.type == 'kitchen-cook') {
      return routes.map((prop, key3) => {
        if (prop.isMenu !== false) {
          if (prop.name == 'Dashboard') {
            return (
              <NavItem key={key3}>
                <NavLink
                  to={prop.layout + prop.path}
                  tag={NavLinkRRD}
                  // activeClassName="active"
                  onClick={() => closeCollapse(key3)}
                  style={
                    location.pathname == prop.layout + prop.path
                      ? {
                          backgroundColor: `${secondaryColor}`,
                          color: `${mainColor}`
                        }
                      : {}
                  }
                  className={
                    location.pathname == prop.layout + prop.path
                      ? 'nav-link__active'
                      : ''
                  }
                >
                  <img
                    src={
                      location.pathname == prop.layout + prop.path
                        ? prop.activeIcon
                        : prop.icon
                    }
                    alt=''
                    className='mx-2'
                  />
                  <p style={{ color: `${mainColor}` }}>{!hide && prop.name}</p>
                </NavLink>
              </NavItem>
            )
          } else if (user && userPermissions) {
            for (const perm in userPermissions) {
              const old_path = prop.path
              const path = old_path.split('/')[1]
              if (perm == path) {
                return (
                  <NavItem key={key3}>
                    <NavLink
                      to={prop.layout + prop.path}
                      tag={NavLinkRRD}
                      // activeClassName="active"
                      onClick={() => closeCollapse(key3)}
                      style={
                        location.pathname == prop.layout + prop.path
                          ? {
                              backgroundColor: `${secondaryColor}`,
                              color: `${mainColor}`
                            }
                          : {}
                      }
                      className={
                        location.pathname == prop.layout + prop.path
                          ? 'nav-link__active'
                          : ''
                      }
                    >
                      <img
                        src={
                          location.pathname == prop.layout + prop.path
                            ? prop.activeIcon
                            : prop.icon
                        }
                        alt=''
                        className='mx-2'
                      />
                      <p style={{ color: `${mainColor}` }}>
                        {!hide && prop.name}
                      </p>
                    </NavLink>
                  </NavItem>
                )
              }
            }
          }
        }
      })
    } else {
      return routes.map((prop, key4) => {
        if (prop.isMenu !== false) {
          if (prop.name === 'Dashboard' || user?.type == prop.type) {
            if (
              prop.path == '/menus' ||
              prop.path == '/payment-connection' ||
              prop.path == '/store-timings' ||
              prop.path == '/pickup-or-delivery' ||
              prop.path == '/category' ||
              prop.path == '/holidays' ||
              prop.path == '/labels' ||
              prop.path == '/client-settings' ||
              prop.path == '/accout-settings' ||
              prop.path == '/venue-settings'
              // prop.path == '/customization'
            ) {
              return (
                <>
                  {prop.path == '/menus' && (
                    <>
                      <UncontrolledDropdown nav inNavbar className=''>
                        <DropdownToggle
                          nav
                          caret
                          onClick={toggle1}
                          className='dropdown-togglenavbar'
                        >
                          <img src={prop.icon} alt='' className='mx-2' />
                          {!hide && prop.name}
                        </DropdownToggle>

                        <Collapse
                          isOpen={isOpen}
                          className={`${hide ? '' : 'sidebar-collapse'}`}
                        >
                          <NavItem>
                            <NavLink
                              to={'/admin' + '/menus'}
                              tag={NavLinkRRD}
                              onClick={() => closeCollapse('menus')}
                              // activeClassName="active"
                              style={
                                location.pathname == '/admin/menus'
                                  ? {
                                      backgroundColor: `${secondaryColor}`,
                                      color: `${mainColor}`
                                    }
                                  : {}
                              }
                              className={`${
                                location.pathname == '/admin/menus'
                                  ? 'nav-link__active'
                                  : ''
                              } d-flex justify-content-between align-items-center links`}
                            >
                              Menu
                              <img
                                src={arrowLeft}
                                alt=''
                                className={`${
                                  !hide && location.pathname == '/admin/menus'
                                    ? ''
                                    : 'd-none'
                                }`}
                              />
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              to={'/admin' + '/category'}
                              tag={NavLinkRRD}
                              onClick={() => closeCollapse('category')}
                              style={
                                location.pathname == '/admin/category'
                                  ? {
                                      backgroundColor: `${secondaryColor}`,
                                      color: `${mainColor}`
                                    }
                                  : {}
                              }
                              className={`${
                                location.pathname == '/admin/category'
                                  ? 'nav-link__active'
                                  : ''
                              } d-flex justify-content-between align-items-center links`}
                            >
                              Category
                              <img
                                src={arrowLeft}
                                alt=''
                                className={`${
                                  !hide &&
                                  location.pathname == '/admin/category'
                                    ? ''
                                    : 'd-none'
                                }`}
                              />
                            </NavLink>
                          </NavItem>
                          <NavItem>
                            <NavLink
                              to={'/admin' + '/labels'}
                              tag={NavLinkRRD}
                              onClick={() => closeCollapse('labels')}
                              style={
                                location.pathname == '/admin/labels'
                                  ? {
                                      backgroundColor: `${secondaryColor}`,
                                      color: `${mainColor}`
                                    }
                                  : {}
                              }
                              className={`${
                                location.pathname == '/admin/labels'
                                  ? 'nav-link__active'
                                  : ''
                              } d-flex justify-content-between align-items-center links`}
                            >
                              Label
                              <img
                                src={arrowLeft}
                                alt=''
                                className={`${
                                  !hide && location.pathname == '/admin/labels'
                                    ? ''
                                    : 'd-none'
                                }`}
                              />
                            </NavLink>
                          </NavItem>
                        </Collapse>
                      </UncontrolledDropdown>
                    </>
                  )}
                </>
              )
            } else {
              return (
                <>
                  <NavItem key={key4}>
                    <NavLink
                      to={prop.layout + prop.path}
                      tag={NavLinkRRD}
                      // activeClassName="active"
                      onClick={() => closeCollapse(key4)}
                      style={
                        location.pathname == prop.layout + prop.path
                          ? {
                              backgroundColor: `${secondaryColor}`,
                              color: `${mainColor}`
                            }
                          : {}
                      }
                      className={
                        location.pathname == prop.layout + prop.path
                          ? 'nav-link__active'
                          : ''
                      }
                    >
                      <img
                        src={
                          location.pathname == prop.layout + prop.path
                            ? prop.activeIcon
                            : prop.icon
                        }
                        alt=''
                        className='mx-2'
                      />

                      {!hide && prop.name}
                    </NavLink>
                  </NavItem>
                </>
              )
            }
          }
        }
      })
    }
  }

  const { routes, logo } = props
  let navbarBrandProps
  if (logo && logo.innerLink) {
    navbarBrandProps = {
      to: logo.innerLink,
      tag: Link
    }
  } else if (logo && logo.outterLink) {
    navbarBrandProps = {
      href: logo.outterLink,
      target: '_blank'
    }
  }

  return (
    <>
      <Navbar
        className={`navbar-vertical fixed-left navbar-light bg-white  ${
          hide ? 'hidden' : ''
        }`}
        style={{ transition: '0.2s' }}
        expand='md'
        id='sidenav-main'
      >
        <Container fluid>
          <button
            className='navbar-toggler'
            type='button'
            onClick={toggleCollapse}
          >
            <span className='navbar-toggler-icon' />
          </button>
          <div className='brand'>
            {logo ? (
              <NavbarBrand className='pt-2 pb-0' {...navbarBrandProps}>
                <img
                  alt={logo.imgAlt}
                  className='navbar-brand-img'
                  src={logo.imgSrc}
                />
              </NavbarBrand>
            ) : null}
          </div>
          <Nav className='align-items-center d-md-none'>
            <UncontrolledDropdown nav>
              <DropdownMenu
                aria-labelledby='navbar-default_dropdown_1'
                className='dropdown-menu-arrow'
                right
              >
                <DropdownItem>Action</DropdownItem>
                <DropdownItem>Another action</DropdownItem>
                <DropdownItem divider />
                <DropdownItem>Something else here</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            <UncontrolledDropdown nav>
              <DropdownToggle nav>
                <Media className='align-items-center'>
                  <span className='avatar avatar-sm rounded-circle'>
                    <img
                      className='img-fluid'
                      alt='...'
                      src={
                        user?.restaurantLogo ||
                        require('../../assets/img/MainMark.svg').default
                      }
                    />
                  </span>
                </Media>
              </DropdownToggle>
              <DropdownMenu className='dropdown-menu-arrow ' right>
                <DropdownItem
                  onClick={() => {
                    dispatch(logout())
                  }}
                >
                  <i className='ni ni-user-run' />
                  <span>Logout</span>
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <Collapse navbar isOpen={collapseOpen}>
            <Box
              sx={{
                height: '85vh',
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column'
              }}
            >
              <Box>
                <Nav navbar>{createLinks(routes)}</Nav>
              </Box>
              {user.type === 'super' ? (
                ''
              ) : (
                <Box>
                  {hide ? (
                    ''
                  ) : (
                    <Button
                      onClick={() => onPreviewClick}
                      style={{
                        marginLeft: '-10px',
                        backgroundColor: '#2D66EE',
                        color: `${mainColor}`,
                        borderWidth: '5px',
                        borderColor: '#E0EAFF'
                      }}
                      className={'nav-link__active'}
                    >
                      {'Preview Menu'}
                    </Button>
                  )}
                </Box>
              )}
            </Box>
          </Collapse>
        </Container>
      </Navbar>
    </>
  )
}

Sidebar.defaultProps = {
  routes: [{}]
}

Sidebar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
  logo: PropTypes.shape({
    innerLink: PropTypes.string,
    outterLink: PropTypes.string,
    imgSrc: PropTypes.string.isRequired,
    imgAlt: PropTypes.string.isRequired
  })
}

export default Sidebar
