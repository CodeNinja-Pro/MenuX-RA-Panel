import * as React from 'react'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import {
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
  Card,
  ThemeProvider,
  Modal,
  Backdrop,
  Fade
} from '@mui/material'

import { Container } from 'reactstrap'
import OnlyHeader from '../../Headers/OnlyHeader'
import { ThemeMain } from '../../common/Theme'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import {
  checkedUpdate,
  deleteNotification,
  getAllNotifications
} from '../../../store/actions/notificationAction'

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
    id: 'title',
    numeric: false,
    label: 'Title'
  },
  {
    id: 'text',
    numeric: false,
    label: 'Text'
  },
  {
    id: 'sender',
    numeric: false,
    label: 'From'
  },
  {
    id: 'destination',
    numeric: false,
    label: 'To'
  },
  {
    id: 'check',
    numeric: false,
    label: 'Check?'
  },
  {
    id: 'createdAt',
    numeric: false,
    label: 'Time'
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
        <TableCell align='center'>No</TableCell>
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

export default function NotificationTable () {
  //User definition
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  let rows = useSelector(state => state.notification.allNotifications)

  // Variable definition
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const [visibleRows, setVisibleRows] = useState([])

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filters, setFilters] = useState({
    status: null
  })

  const [textModal, setTextModal] = useState(false)
  const [text, setText] = useState('')

  useEffect(() => {
    dispatch(getAllNotifications(user.id))
  }, [])

  useEffect(() => {
    setVisibleRows(rows)
  }, [rows])

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    let filteredObject = []
    rows?.map(item => {
      if (
        item.title?.toLocaleLowerCase().includes(searchValue) ||
        item.text?.toLocaleLowerCase().includes(searchValue)
      ) {
        filteredObject.push(item)
      }
    })
    setVisibleRows(filteredObject)
  }, [searchValue])

  const handleDelete = () => {
    dispatch(deleteNotification(selectedItem))
  }

  const handleChecked = id => {
    dispatch(checkedUpdate(id))
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
      <OnlyHeader />
      <Container className='mt--7 mb-5' fluid>
        <Container fluid>
          <ThemeProvider theme={ThemeMain}>
            <Typography
              textAlign={'left'}
              fontWeight={'bold'}
              marginBottom={'20px'}
              fontSize={'23px'}
            >
              Notifications
            </Typography>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'start'}
                margin={2}
              >
                <TextField
                  id='outlined-start-adornment'
                  placeholder='Search by Name, Email and Role.'
                  sx={{ width: '400px' }}
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
              <Grid item xs={12} margin={2}>
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
                              <TableCell align='center'>{index}</TableCell>
                              <TableCell align='center'>{row.title}</TableCell>
                              <TableCell
                                onClick={() => {
                                  handleChecked(row.id)
                                  setText(row.text)
                                  setTextModal(true)
                                }}
                                align='center'
                              >
                                {row.text.length > 30
                                  ? row.text.slice(0, 30) + '...'
                                  : row.text}
                              </TableCell>
                              <TableCell align='center'>{row.sender}</TableCell>
                              <TableCell align='center'>
                                {row.destination}
                              </TableCell>
                              <TableCell align='center' width={'10%'}>
                                {row.check === true ? (
                                  <Typography
                                    sx={{
                                      backgroundColor:
                                        'rgba(40, 199, 111, 0.12)',
                                      borderRadius: '10px'
                                    }}
                                    color={'rgba(40, 199, 111, 1)'}
                                  >
                                    Checked
                                  </Typography>
                                ) : (
                                  <Typography
                                    sx={{
                                      backgroundColor: 'rgba(255, 245, 248, 1)',
                                      borderRadius: '10px'
                                    }}
                                    color={'rgba(241, 65, 108, 1)'}
                                  >
                                    Unchecked
                                  </Typography>
                                )}
                              </TableCell>
                              <TableCell align='center'>
                                {row.createdAt.toDate().toLocaleString()}
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
                        Are you really going to delete this staff information?
                      </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={() => setDeleteModal(false)}>
                        Disagree
                      </Button>
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
                    open={textModal}
                    onClose={() => setTextModal(false)}
                    closeAfterTransition
                    slots={{ backdrop: Backdrop }}
                    slotProps={{
                      backdrop: {
                        timeout: 500
                      }
                    }}
                  >
                    <Fade in={textModal}>
                      <Box sx={style}>
                        <Typography
                          id='transition-modal-title'
                          variant='h6'
                          component='h2'
                        >
                          Notification
                        </Typography>
                        <Typography
                          id='transition-modal-description'
                          sx={{ mt: 2 }}
                        >
                          {text}
                        </Typography>
                      </Box>
                    </Fade>
                  </Modal>
                </Paper>
              </Grid>
            </Card>
          </ThemeProvider>
        </Container>
      </Container>
    </>
  )
}
