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
  deleteFeedback,
  deleteRestaurant,
  getAllFeedbacks,
  getAllRestaurants,
  sendNotification,
  sendRespond,
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

const SuperFeedbackTable = () => {
  // User definition
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  let { allFeedbacks } = useSelector(state => state.super)
  let { loader } = useSelector(state => state.super)

  // Variable definition
  const [allFeedbackInfo, setAllFeedbackInfo] = useState([])
  const [notificationModal, setNotificationModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [respond, setRespond] = useState('')
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    dispatch(getAllFeedbacks())
  }, [])

  useEffect(() => {
    setAllFeedbackInfo(allFeedbacks)
  }, [allFeedbacks])

  const handleNotification = () => {
    dispatch(sendRespond(selectedItem, respond))

    setRespond('')
  }

  const handleDelete = () => {
    dispatch(
      deleteFeedback(selectedItem, () => {
        const newArray = allFeedbackInfo.filter(obj => obj.id !== selectedItem)
        setAllFeedbackInfo(newArray)
      })
    )
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

  const filteredTableItems = applyFilters(allFeedbackInfo, filters)
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
              <TableCell align='center'>Type</TableCell>
              <TableCell align='left'>Feedback</TableCell>
              <TableCell align='center'>Score</TableCell>
              <TableCell align='center'>Date</TableCell>
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
                          {tableItem.contactEmail}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color='text.primary'>
                          {tableItem.restaurantType}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color='text.primary'>
                          {tableItem.feedback.length > 30
                            ? tableItem.feedback.slice(0, 30) + '...'
                            : tableItem.feedback}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {tableItem.score}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {tableItem.createdAt.toDate().toDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' width={'10%'}>
                        {tableItem.respond.length !== 0 ? (
                          <Typography
                            sx={{
                              backgroundColor: 'rgba(40, 199, 111, 0.12)',
                              borderRadius: '10px'
                            }}
                            color={'rgba(40, 199, 111, 1)'}
                          >
                            Responded
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              backgroundColor: 'rgba(255, 245, 248, 1)',
                              borderRadius: '10px'
                            }}
                            color={'rgba(241, 65, 108, 1)'}
                          >
                            Unanswered
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
                              <MenuItem
                                onClick={() => {
                                  setNotificationModal(true)
                                }}
                                key={'edit'}
                              >
                                <NotificationsNoneOutlinedIcon />
                                Send the Respond
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
          {'Respond'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl fullWidth sx={{ width: '300px' }} variant='outlined'>
              <FormHelperText
                style={{ fontSize: '18px' }}
                id='outlined-weight-helper-text'
              >
                Respond
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
                value={respond}
                onChange={e => setRespond(e.target.value)}
              />
            </FormControl>
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
            Are you really going to delete this feedback information?
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

SuperFeedbackTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

SuperFeedbackTable.defaultProps = {
  tableItems: []
}

export default SuperFeedbackTable
