import * as React from 'react'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import { useEffect } from 'react'
import {
  deleteRestaurant,
  getAllRestaurants,
  sendNotification,
  updateRestaurant
} from '../../../store/actions/superAction'

import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
  Divider,
  Box,
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
  DialogTitle,
  DialogContentText,
  TableSortLabel,
  Switch,
  OutlinedInput,
  FormControlLabel,
  FormControl,
  FormHelperText,
  InputAdornment,
  Grid,
  TextField
} from '@mui/material'

import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

function descendingComparator (a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator (order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort (array, comparator) {
  const stabilizedThis = array?.map((el, index) => [el, index])
  stabilizedThis?.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) {
      return order
    }
    return a[1] - b[1]
  })
  return stabilizedThis?.map(el => el[0])
}

const headCells = [
  {
    id: 'restaurantName',
    numeric: false,
    label: 'Name'
  },
  {
    id: 'restaurantEmail',
    numeric: false,
    label: 'Email'
  },
  {
    id: 'restaurantLocation',
    numeric: false,
    label: 'Location'
  },
  {
    id: 'restaurantType',
    numeric: false,
    label: 'Type'
  },
  {
    id: 'openingYear',
    numeric: true,
    label: 'Opening Year'
  },
  {
    id: 'subscription',
    numeric: false,
    label: 'Subscription'
  },
  {
    id: 'lastActivity',
    numeric: false,
    label: 'Last activity'
  },
  {
    id: 'restaurantStatus',
    numeric: false,
    label: 'Status'
  }
]

function EnhancedTableHead (props) {
  const { order, orderBy, onRequestSort } = props
  const createSortHandler = property => event => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells?.map(headCell => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'center' : 'center'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component='span' sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}

        <TableCell align={'center'}>Actions</TableCell>
      </TableRow>
    </TableHead>
  )
}

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

EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default function SuperRestaurantTable () {
  // User definition
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  let rows = useSelector(state => state.super.allRestaurants)
  let { loader } = useSelector(state => state.super)

  // Variable definition
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
  const [visibleRows, setVisibleRows] = useState([])

  useEffect(() => {
    dispatch(getAllRestaurants())
  }, [])

  useEffect(() => {
    setVisibleRows(rows)
  }, [rows])

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    let filteredObject = []
    rows?.map(item => {
      if (
        item.restaurantName?.toLocaleLowerCase().includes(searchValue) ||
        item.restaurantEmail?.toLocaleLowerCase().includes(searchValue) ||
        item.restaurantLocation?.toLocaleLowerCase().includes(searchValue) ||
        item.restaurantType?.toLocaleLowerCase().includes(searchValue) ||
        item.openingYear?.toString().includes(searchValue)
      ) {
        filteredObject.push(item)
      }
    })
    setVisibleRows(filteredObject)
  }, [searchValue])

  const handleEditRestaurant = () => {
    const data = {
      restaurantEmail: newEmail,
      restaurantPassword: newPassword,
      restaurantEnable: newStatus
    }
    dispatch(
      updateRestaurant(selectedItem, data, () => {
        setVisibleRows(prevObjects => {
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

  // MUI table definition
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filters, setFilters] = useState({
    status: null
  })

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  useEffect(() => {
    setVisibleRows(
      stableSort(rows, getComparator(order, orderBy))?.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
      )
    )
  }, [order, orderBy, page, rowsPerPage])

  const filteredTableItems = applyFilters(visibleRows, filters)
  const paginatedTableData = applyPagination(
    filteredTableItems,
    page,
    rowsPerPage
  )

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

  return (
    <>
      <Grid
        item
        xs={12}
        display={'flex'}
        justifyContent={'start'}
        marginTop={'20px'}
      >
        <TextField
          id='outlined-start-adornment'
          placeholder='Search by Name, Email, Location, Type and Opening year.'
          sx={{ width: '550px' }}
          value={searchValue}
          onChange={e => setSearchValue(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchOutlinedIcon />
              </InputAdornment>
            )
          }}
        />
      </Grid>
      <Grid item xs={12} marginTop={2}>
        <Paper sx={{ width: '100%', mb: 2 }}>
          <TableContainer>
            <Table aria-labelledby='tableTitle'>
              <EnhancedTableHead
                order={order}
                orderBy={orderBy}
                onRequestSort={handleRequestSort}
                rowCount={rows?.length}
              />
              <TableBody>
                {paginatedTableData?.map((tableItem, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <>
                      <TableRow
                        hover
                        tabIndex={-1}
                        key={labelId}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align='center'>
                          <Typography color='text.primary'>
                            {tableItem.restaurantName}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
                          <Typography color='text.primary'>
                            {tableItem.restaurantEmail}
                          </Typography>
                        </TableCell>
                        <TableCell align='center'>
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
                                {/* <MenuItem onClick={() => {}} key={'edit'}>
                                  <RemoveRedEyeOutlinedIcon />
                                  View
                                </MenuItem> */}
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
                                  <Typography color={'error'}>
                                    Delete
                                  </Typography>
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
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component='div'
            className='margin-none'
            count={rows?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

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
        </Paper>
      </Grid>
    </>
  )
}
