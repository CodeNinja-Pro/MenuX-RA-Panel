import * as React from 'react'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import { useEffect } from 'react'
import {
  deleteFeedback,
  getAllFeedbacks,
  sendRespond
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
  Grid,
  TextField,
  InputAdornment,
  FormHelperText,
  OutlinedInput,
  FormControl,
  Backdrop,
  Fade,
  Modal
} from '@mui/material'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

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
    id: 'contactEmail',
    numeric: false,
    label: 'Email'
  },
  {
    id: 'restaurantType',
    numeric: false,
    label: 'Type'
  },
  {
    id: 'feedback',
    numeric: false,
    label: 'Feedback'
  },
  {
    id: 'score',
    numeric: true,
    label: 'Score'
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Date'
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
        <TableCell align='center'>Status</TableCell>
        <TableCell align='center'>Actions</TableCell>
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

export default function SuperStaffTable () {
  //User definition
  const dispatch = useDispatch()
  let rows = useSelector(state => state.super.allFeedbacks)
  let { loader } = useSelector(state => state.super)

  // Variable definition
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')
  const [notificationModal, setNotificationModal] = useState(false)
  const [respond, setRespond] = useState('')

  const [visibleRows, setVisibleRows] = useState([])

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filters, setFilters] = useState({
    status: null
  })

  const [feedbackModal, setFeedbackModal] = useState(false)
  const [feedback, setFeedback] = useState('')

  useEffect(() => {
    dispatch(getAllFeedbacks())
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
        item.contactEmail?.toLocaleLowerCase().includes(searchValue) ||
        item.restaurantType?.toLocaleLowerCase().includes(searchValue) ||
        item.feedback?.toLocaleLowerCase().includes(searchValue) ||
        item.socre?.toString().includes(searchValue)
      ) {
        filteredObject.push(item)
      }
    })
    setVisibleRows(filteredObject)
  }, [searchValue])

  const handleNotification = () => {
    dispatch(sendRespond(selectedItem, respond))

    setRespond('')
  }

  const handleDelete = () => {
    dispatch(
      deleteFeedback(selectedItem, () => {
        const newArray = visibleRows.filter(obj => obj.id !== selectedItem)
        setVisibleRows(newArray)
      })
    )
  }

  // MUI table definition
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
          sx={{ width: '400px' }}
          id='outlined-start-adornment'
          placeholder='Search by Name, Email, Type, Score and Feedback.'
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
                {paginatedTableData?.map((row, index) => {
                  const labelId = `enhanced-table-checkbox-${index}`

                  return (
                    <TableRow
                      hover
                      tabIndex={-1}
                      key={labelId}
                      sx={{ cursor: 'pointer' }}
                    >
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {row.restaurantName}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {row.contactEmail}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {row.restaurantType}
                        </Typography>
                      </TableCell>
                      <TableCell
                        onClick={() => {
                          setFeedback(row.feedback)
                          setFeedbackModal(true)
                        }}
                        align='left'
                      >
                        <Typography color='text.primary'>
                          {row.feedback.length > 30
                            ? row.feedback.slice(0, 30) + '...'
                            : row.feedback}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {row.score}
                        </Typography>
                      </TableCell>
                      <TableCell align='center'>
                        <Typography color='text.primary'>
                          {row.createdAt.toDate().toDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' width={'10%'}>
                        {row.respond.length !== 0 ? (
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
                            setSelectedItem(row.id)
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
                <FormControl
                  fullWidth
                  sx={{ width: '300px' }}
                  variant='outlined'
                >
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

          <Modal
            aria-labelledby='transition-modal-title'
            aria-describedby='transition-modal-description'
            open={feedbackModal}
            onClose={() => setFeedbackModal(false)}
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
            slotProps={{
              backdrop: {
                timeout: 500
              }
            }}
          >
            <Fade in={feedbackModal}>
              <Box sx={style}>
                <Typography
                  id='transition-modal-title'
                  variant='h6'
                  component='h2'
                >
                  Feedback
                </Typography>
                <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                  {feedback}
                </Typography>
              </Box>
            </Fade>
          </Modal>
        </Paper>
      </Grid>
    </>
  )
}
