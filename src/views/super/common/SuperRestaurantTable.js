import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Divider,
  Box,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  TableContainer,
  Typography,
  IconButton,
  Popover,
  Paper,
  ClickAwayListener,
  MenuList,
  MenuItem,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  FormControl,
  FormHelperText,
  OutlinedInput,
  DialogTitle,
  DialogContentText,
  InputAdornment,
  Select,
  Switch,
  FormControlLabel
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

import { useDispatch, useSelector } from 'react-redux'
import {
  deleteRestaurant,
  getAllRestaurants,
  sendNotification,
  updateRestaurant
} from '../../../store/actions/superAction'

const applyFilters = (tableItems, filters) => {
  return tableItems?.filter(tableItem => {
    let matches = true

    if (filters.status && tableItem.status !== filters.status) {
      matches = false
    }

    return matches
  })
}

const applyPagination = (tableItems, page, limit) => {
  return tableItems && tableItems.slice(page * limit, page * limit + limit)
}

const SuperRestaurantTable = () => {
  // User definition
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  let { allRestaurants } = useSelector(state => state.super)
  let { loader } = useSelector(state => state.super)

  // Variable definition
  const [restaurantInfo, setRestaurantInfo] = useState([])
  const [selectedItem, setSelectedItem] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [newStatus, setNewStatus] = useState(false)
  const [title, setTitle] = useState('')
  const [text, setText] = useState('')
  const [sendAll, setSendAll] = useState(false)
  const [editRestaurantModal, setEditRestaurantModal] = useState(false)
  const [notificationModal, setNotificationModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  useEffect(() => {
    dispatch(getAllRestaurants())
  }, [])

  useEffect(() => {
    setRestaurantInfo(allRestaurants)
  }, [allRestaurants])

  const handleEditRestaurant = () => {
    const data = {
      restaurantEmail: newEmail,
      restaurantPassword: newPassword,
      restaurantEnable: newStatus
    }
    dispatch(
      updateRestaurant(selectedItem, data, () => {
        setRestaurantInfo(prevObjects => {
          return prevObjects.map(obj => {
            if (obj.id === selectedItem) {
              return {
                ...obj,
                restaurantEmail: data.restaurantEmail,
                restaurantPassword: data.restaurantPassword,
                restaurantEnable: data.restaurantEnable
              }
            }
            return obj
          })
        })
        dispatch({
          type: 'LOADER',
          payload: false
        })
      })
    )
  }

  const handleNotification = () => {
    const data = {
      title,
      text
    }
    if (sendAll) {
      dispatch(sendNotification(user.id, 'all', data))
    } else {
      dispatch(sendNotification(user.id, selectedItem, data))
    }
    setText('')
    setTitle('')
    setSendAll(false)
  }

  const handleDelete = () => {
    dispatch(deleteRestaurant(selectedItem))
  }

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword(show => !show)

  const handleMouseDownPassword = event => {
    event.preventDefault()
  }

  // Table setting section
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(10)
  const [filters, setFilters] = useState({
    status: null
  })

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = event => {
    setLimit(parseInt(event.target.value))
  }

  const filteredTableItems = applyFilters(restaurantInfo, filters)
  const paginatedTableData = applyPagination(filteredTableItems, page, limit)

  // user definition
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const status = ['Active', 'Deactive']

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Email</TableCell>
              <TableCell align='left'>Location</TableCell>
              <TableCell align='center'>Type</TableCell>
              <TableCell align='center'>Opening year</TableCell>
              <TableCell align='center'>Subscription</TableCell>
              <TableCell align='center'>Last activity</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTableData &&
              paginatedTableData.map((tableItem, index) => {
                return (
                  <>
                    <TableRow hover key={index}>
                      <TableCell align='left'>
                        <Typography color='text.primary'>
                          {tableItem.restaurantName}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color='text.primary'>
                          {tableItem.restaurantEmail}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color='text.primary'>
                          {tableItem.restaurantLocation}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {tableItem.restaurantType}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {tableItem.openingYear}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {tableItem.subscription}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {tableItem.lastActivity}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' width={'10%'}>
                        {tableItem.restaurantStatus == true ? (
                          <Typography
                            sx={{
                              backgroundColor: 'rgba(40, 199, 111, 0.12)',
                              borderRadius: '10px'
                            }}
                            color={'rgba(40, 199, 111, 1)'}
                          >
                            Active
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              backgroundColor: 'rgba(255, 245, 248, 1)',
                              borderRadius: '10px'
                            }}
                            color={'rgba(241, 65, 108, 1)'}
                          >
                            Inactive
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell align='center' width={'10%'}>
                        <IconButton
                          aria-describedby={id}
                          color='inherit'
                          size='small'
                          onClick={event => {
                            handleClick(event)
                            setSelectedItem(tableItem.id)
                            setNewStatus(tableItem.restaurantEnable)
                            setNewEmail(tableItem.restaurantEmail)
                            setNewPassword(tableItem.restaurantPassword)
                          }}
                        >
                          <MoreVertIcon style={{ marginTop: '5px' }} />
                        </IconButton>
                      </TableCell>
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
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList id='split-button-menu'>
                              <MenuItem onClick={() => {}} key={'edit'}>
                                <RemoveRedEyeOutlinedIcon />
                                View
                              </MenuItem>
                              <MenuItem
                                onClick={() => setEditRestaurantModal(true)}
                                key={'edit'}
                              >
                                <EditOutlinedIcon />
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  setNotificationModal(true)
                                }}
                                key={'edit'}
                              >
                                <NotificationsNoneOutlinedIcon />
                                Send Notification
                              </MenuItem>
                              <Divider />
                              <MenuItem
                                onClick={() => {
                                  setDeleteModal(true)
                                }}
                                key={'status'}
                              >
                                <DeleteOutlineOutlinedIcon color='error' />
                                <Typography color={'error'}>Delete</Typography>
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Popover>
                    </TableRow>
                  </>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog
        open={editRestaurantModal}
        onClose={() => setEditRestaurantModal(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          id='alert-dialog-title'
          style={{
            fontSize: '25px',
            fontWeight: 'bold'
          }}
        >
          {'Edit'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl fullWidth variant='outlined'>
              <FormHelperText
                style={{ fontSize: '18px' }}
                id='outlined-weight-helper-text'
              >
                Email
              </FormHelperText>
              <OutlinedInput
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                type='email'
                placeholder='MenuX@gmail.com'
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ marginTop: 2 }} variant='outlined'>
              <FormHelperText
                style={{ fontSize: '18px' }}
                id='outlined-adornment-password'
              >
                Password
              </FormHelperText>
              <OutlinedInput
                fullWidth
                id='outlined-adornment-password'
                type={showPassword ? 'text' : 'password'}
                value={newPassword}
                onChange={e => setNewPassword(e.target.value)}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge='end'
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
            <Box display={'flex'} justifyContent={'start'} marginTop={2}>
              <FormControlLabel
                control={
                  <Switch
                    checked={newStatus}
                    onChange={() => setNewStatus(!newStatus)}
                  />
                }
                label='Status'
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Button
            variant='outlined'
            style={{ margin: '20px' }}
            fullWidth
            onClick={() => {
              setEditRestaurantModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            disabled={loader}
            variant='contained'
            style={{ margin: '20px' }}
            onClick={() => {
              setEditRestaurantModal(false)
              handleEditRestaurant()
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={notificationModal}
        onClose={() => setNotificationModal(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle
          id='alert-dialog-title'
          style={{
            fontSize: '25px',
            fontWeight: 'bold'
          }}
        >
          {'Notification'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
              <FormHelperText
                style={{ fontSize: '18px' }}
                id='outlined-weight-helper-text'
              >
                Title
              </FormHelperText>
              <OutlinedInput
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                placeholder='Notification Title'
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </FormControl>
            <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
              <FormHelperText
                style={{ fontSize: '18px' }}
                id='outlined-weight-helper-text'
              >
                Text
              </FormHelperText>
              <OutlinedInput
                multiline
                rows={6}
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                placeholder='Notification Text'
                value={text}
                onChange={e => setText(e.target.value)}
              />
            </FormControl>
            <Box
              display={'flex'}
              justifyContent={'start'}
              marginLeft={2}
              marginTop={2}
            >
              <FormControlLabel
                control={
                  <Switch
                    checked={sendAll}
                    onChange={() => setSendAll(!sendAll)}
                  />
                }
                label='Send to All Merchants'
              />
            </Box>
          </DialogContentText>
        </DialogContent>
        <DialogActions
          style={{
            display: 'flex',
            justifyContent: 'space-around'
          }}
        >
          <Button
            variant='outlined'
            style={{ margin: '20px' }}
            fullWidth
            onClick={() => {
              setNotificationModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            disabled={loader}
            variant='contained'
            style={{ margin: '20px' }}
            onClick={() => {
              setNotificationModal(false)
              handleNotification()
            }}
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={deleteModal}
        onClose={() => setDeleteModal(false)}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {'You pay attention here'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Are you really going to delete this restaurant information?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModal(false)}>Disagree</Button>
          <Button
            onClick={() => {
              setDeleteModal(false)
              handleDelete()
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <Box p={2}>
        <TablePagination
          component='div'
          count={filteredTableItems?.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25, 30]}
        />
      </Box>
    </Card>
  )
}

SuperRestaurantTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

SuperRestaurantTable.defaultProps = {
  tableItems: []
}

export default SuperRestaurantTable
