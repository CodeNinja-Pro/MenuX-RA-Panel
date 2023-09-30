import RestaurantProfileModal from '../Modals/RestaurantProfileModal'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import sidebarIcon from '../../assets/img/icons/sidebarIcon.svg'
import sidebarIcon2 from '../../assets/img/icons/sidebarIcon2.svg'
import MainMark from '../../assets/img/MainMark.svg'

import {
  DropdownMenu,
  DropdownItem,
  UncontrolledDropdown,
  DropdownToggle,
  Navbar,
  Nav,
  Container,
  Media,
  Col,
  Row
} from 'reactstrap'
import { logout } from '../../store/actions/authActions'
import bullets from '../../assets/img/icons/bullets.svg'
import bell from '../../assets/common/sidebar/bell_black.png'
import { getUnreadNotfications } from '../../store/actions/RequestActions'
import { useEffect } from 'react'
import { ThemeProvider, styled } from '@mui/material/styles'
import {
  Avatar,
  Badge,
  Button,
  Box,
  Grid,
  Typography,
  Popover
} from '@mui/material'

import { US, IT, FR, ES, PT } from 'country-flag-icons/react/3x2'

import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import VolumeUpOutlinedIcon from '@mui/icons-material/VolumeUpOutlined'
import GTranslateOutlinedIcon from '@mui/icons-material/GTranslateOutlined'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import ChangeLanguageDialog from './common/ChangeLanguageDialog'
import FeedbackForm from './common/FeedbackForm'
import { Link } from 'react-router-dom'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import SoundSettingModal from './common/SoundSettingModal'
import { ThemeMain } from '../common/Theme'
import { getUnreadNotifications } from '../../store/actions/notificationAction'

const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: 'red',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""'
    }
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0
    }
  }
}))

const AdminNavbar = props => {
  const { hide, setHide } = props
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(state => state.auth)

  // console.log("user data", user);
  const [addModal, setAddModal] = useState(false)
  // const [hide, setHide] = useState(false);
  const { unreadNotifications } = useSelector(state => state.notification)
  const [changeLanguageDialog, setChangeLanguageDialog] = useState(false)
  const [feedbackModal, setFeedbackModal] = useState(false)
  const [notificationShowModal, setNotificationShowModal] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  useEffect(() => {
    dispatch(getUnreadNotifications(user.id))
  }, [isDropdownOpen])

  const addToggle = () => {
    setAddModal(!addModal)
  }

  const [soundSettingModal, setSoundSettingModal] = useState(false)

  useEffect(() => {
    if (user?.restaurantID) {
      dispatch(getUnreadNotfications(user?.restaurantID))
    }
  }, [])

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const country = [
    {
      title: 'English',
      code: (
        <US title='United States' style={{ width: '30px', height: '20px' }} />
      )
    },
    {
      title: 'Spanish',
      code: (
        <ES title='United States' style={{ width: '30px', height: '20px' }} />
      )
    },
    {
      title: 'French',
      code: (
        <FR title='United States' style={{ width: '30px', height: '20px' }} />
      )
    },
    {
      title: 'Italian',
      code: (
        <IT title='United States' style={{ width: '30px', height: '20px' }} />
      )
    },
    {
      title: 'Portuguese',
      code: (
        <PT title='United States' style={{ width: '30px', height: '20px' }} />
      )
    }
  ]

  const [currentLanguage, setCurrentLanguage] = useState({
    title: country[0].title,
    code: country[0].code
  })

  const clickLanguage = (title, code) => {
    setCurrentLanguage({
      title: title,
      code: code
    })
  }

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Navbar
          className={`navbar-dark ${hide ? 'navbar-top-hide' : 'navbar-top'}`}
          expand='md'
          id='navbar-main'
        >
          <img
            src={hide ? sidebarIcon2 : sidebarIcon}
            alt=''
            className={hide ? 'sidebar-icon-2' : 'sidebar-icon'}
            onClick={() => setHide(!hide)}
          />
          <Container fluid className='justify-content-end'>
            <Nav className='align-items-center d-none d-md-flex' navbar>
              <div style={{ marginRight: '20px' }}>
                <Button aria-describedby={id} onClick={handleClick}>
                  <Typography marginRight={3}>
                    {currentLanguage.code}
                  </Typography>
                  <Typography
                    fontWeight={'bold'}
                    marginRight={3}
                    fontSize={'18px'}
                  >
                    {currentLanguage.title}
                  </Typography>
                </Button>
                <Popover
                  id={id}
                  open={open}
                  anchorEl={anchorEl}
                  onClose={handleClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left'
                  }}
                >
                  <Typography sx={{ p: 2 }}>
                    <Box sx={{ flexGrow: 1 }}>
                      <Grid container spacing={2}>
                        {country.map(item => (
                          <Grid item xs={6}>
                            <Button
                              onClick={(title, code) => {
                                clickLanguage(item.title, item.code)
                                handleClose()
                              }}
                            >
                              <Typography marginRight={3}>
                                {item.code}
                              </Typography>
                              <Typography
                                fontWeight={'bold'}
                                marginRight={3}
                                fontSize={'18px'}
                              >
                                {item.title}
                              </Typography>
                            </Button>
                          </Grid>
                        ))}
                      </Grid>
                    </Box>
                  </Typography>
                </Popover>
              </div>
              {user?.type === 'restaurant' && (
                <UncontrolledDropdown
                  nav
                  isOpen={isDropdownOpen}
                  toggle={toggleDropdown}
                >
                  <DropdownToggle nav>
                    <StyledBadge
                      overlap='circular'
                      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                      variant={`${
                        unreadNotifications?.length > 0 ? 'dot' : ''
                      }`}
                    >
                      <Avatar
                        alt='Remy Sharp'
                        sx={{ width: '65px' }}
                        src={bell}
                      />
                    </StyledBadge>
                  </DropdownToggle>
                  <DropdownMenu
                    className='dropdown-menu-arrow custom-dropdown-menu p-0'
                    style={{ maxHeight: '400px', overflowY: 'auto' }}
                    right
                  >
                    <div
                      className='dropdown-header d-flex align-items-center justify-content-between'
                      style={{ backgroundColor: '#3A8ACE' }}
                    >
                      <h4 className='mb-0 text-white'>
                        Notifications ({unreadNotifications?.length})
                      </h4>
                      {/* <button className='btn btn-sm text-white' type='button'>
                        Clear All
                      </button> */}
                    </div>
                    {/* Add your notification menu items here */}
                    {/* <Notfications data={unreadNotifications} /> */}
                    {unreadNotifications?.map((item, index) => (
                      <DropdownItem onClick={notificationShowModal}>
                        <Row className='d-flex'>
                          <Col md={2}>
                            <span>
                              <Avatar
                                sx={{ bgcolor: '#0074D9' }}
                                alt='Remy Sharp'
                                src='/broken-image.jpg'
                              >
                                SA
                              </Avatar>
                            </span>
                          </Col>

                          <Col>
                            <span className='text-wrap mb-2 fs-14'>
                              <b>Super Admin</b>
                              <br /> {item.text}
                            </span>
                            <div className='d-flex justify-content-between fs-12 mt-2'>
                              <small>
                                {item.createdAt.toDate().toLocaleString()}
                              </small>
                              {/* <small className='text-primary'>
                                Mark as Read
                              </small> */}
                            </div>
                          </Col>
                        </Row>
                      </DropdownItem>
                    ))}
                    {/* <DropdownItem>
                      <Row className='d-flex'>
                        <Col md={2}>
                          <span>
                            <img
                              className='avatar avatar-sm rounded-circle mt-1'
                              height='42px'
                              width='42px'
                            />
                          </span>
                        </Col>

                        <Col>
                          <span className='text-wrap mb-2 fs-14'>
                            <b>Andrea James</b> Lorem Ipsum is simply dummy text
                            of the printing
                          </span>
                          <div className='d-flex justify-content-between fs-12 mt-2'>
                            <small>Mar 02 4:17pm</small>
                            <small className='text-primary'>Mark as Read</small>
                          </div>
                        </Col>
                      </Row>
                    </DropdownItem> */}
                    <hr className='my-2' />
                    <div
                      className='dropdown-footer d-flex align-items-center justify-content-center'
                      style={{ cursor: 'pointer' }}
                    >
                      <h4
                        onClick={() => {
                          setIsDropdownOpen(false)
                          history.push('/admin/notifications')
                        }}
                      >
                        View All
                      </h4>
                    </div>
                  </DropdownMenu>
                </UncontrolledDropdown>
              )}
              {/* profile dropdown  */}
              <UncontrolledDropdown nav>
                <DropdownToggle className='navbar-top__profile-toggler' nav>
                  <Media className='align-items-center'>
                    <span className='avatar avatar-sm rounded-circle'>
                      <img src={MainMark} />
                    </span>
                    <Media className='ml-2 d-none d-lg-flex flex-column'>
                      <span className='mb-0 text-sm  text-dark font-weight-bold'>
                        {user?.name}
                      </span>
                      <span className='mb-0 text-sm text-dark '>
                        {user?.email}
                      </span>
                    </Media>
                  </Media>

                  <img src={bullets} alt='' />
                </DropdownToggle>
                <DropdownMenu className='dropdown-menu-arrow mt-2' right>
                  <DropdownItem>
                    <Media className='align-items-center'>
                      <span className='avatar avatar-sm rounded-circle'>
                        <img src={MainMark} />
                      </span>
                      <Media className='ml-2 d-none d-lg-flex flex-column'>
                        <span className='mb-0 text-sm  text-dark font-weight-bold'>
                          {user?.name}
                        </span>
                        <span className='mb-0 text-sm text-dark '>
                          {user?.type}
                        </span>
                      </Media>
                    </Media>
                  </DropdownItem>
                  <DropdownItem divider />
                  {user?.type === 'restaurant' && (
                    <Link to='/admin/settings'>
                      <DropdownItem>
                        <PermIdentityOutlinedIcon />
                        <span>Account Settings</span>
                      </DropdownItem>
                    </Link>
                  )}
                  {user?.type === 'restaurant' && (
                    <DropdownItem
                      onClick={() => {
                        history.push('/admin/notifications')
                      }}
                    >
                      <NotificationsNoneOutlinedIcon />
                      <span>Notifications</span>
                    </DropdownItem>
                  )}
                  {
                    <DropdownItem
                      onClick={() => {
                        setSoundSettingModal(true)
                      }}
                    >
                      <VolumeUpOutlinedIcon />
                      <span>Change Sound</span>
                    </DropdownItem>
                  }
                  {
                    <DropdownItem
                      onClick={() => {
                        setChangeLanguageDialog(true)
                      }}
                    >
                      <GTranslateOutlinedIcon />
                      <span>Change Language</span>
                    </DropdownItem>
                  }
                  {user?.type === 'restaurant' && (
                    <DropdownItem
                      onClick={() => {
                        setFeedbackModal(true)
                      }}
                    >
                      <CommentOutlinedIcon />
                      <span>Feedback</span>
                    </DropdownItem>
                  )}

                  <DropdownItem divider />
                  <DropdownItem
                    onClick={() => {
                      dispatch(logout())
                    }}
                  >
                    <LogoutOutlinedIcon color='error' />
                    <span>Sign Out</span>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Container>
        </Navbar>
        <ChangeLanguageDialog
          setChangeLanguageDialog={setChangeLanguageDialog}
          changeLanguageDialog={changeLanguageDialog}
        />
        <FeedbackForm show={feedbackModal} changeShowModal={setFeedbackModal} />
        <SoundSettingModal
          show={soundSettingModal}
          changeShowModal={setSoundSettingModal}
        />
        <RestaurantProfileModal addModal={addModal} addToggle={addToggle} />
      </ThemeProvider>
    </>
  )
}

export default AdminNavbar
