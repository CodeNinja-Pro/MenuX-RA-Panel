// import React, { useState } from 'react'
// import PropTypes from 'prop-types'
// import {
//   Divider,
//   Box,
//   Card,
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   TableContainer,
//   Typography,
//   IconButton,
//   Menu,
//   MenuItem
// } from '@mui/material'

// import { Link } from 'react-router-dom'
// import MoreVertIcon from '@mui/icons-material/MoreVert'
// import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
// import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
// import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

// const applyFilters = (tableItems, filters) => {
//   return tableItems.filter(tableItem => {
//     let matches = true

//     if (filters.status && tableItem.status !== filters.status) {
//       matches = false
//     }

//     return matches
//   })
// }

// const applyPagination = (tableItems, page, limit) => {
//   return tableItems && tableItems.slice(page * limit, page * limit + limit)
// }

// const ItemStatisticTable = ({ tableItems = [] }) => {
//   const [page, setPage] = useState(0)
//   const [limit, setLimit] = useState(10)
//   const [filters, setFilters] = useState({
//     status: null
//   })

//   const handlePageChange = (event, newPage) => {
//     setPage(newPage)
//   }

//   const handleLimitChange = event => {
//     setLimit(parseInt(event.target.value))
//   }

//   const filteredTableItems = applyFilters(tableItems, filters)
//   const paginatedTableData = applyPagination(filteredTableItems, page, limit)

//   const [anchorEl, setAnchorEl] = useState(null)
//   const moreActions = Boolean(anchorEl)
//   const handleClick = event => {
//     setAnchorEl(event.currentTarget)
//   }
//   const handleClose = () => {
//     setAnchorEl(null)
//   }

//   return (
//     <Card>
//       <Divider />
//       <TableContainer>
//         <Table>
//           <TableHead>
//             <TableRow>
//               <TableCell align='center'>Product Name</TableCell>
//               <TableCell align='center'>AVG Clicks</TableCell>
//               <TableCell align='center'>Click Index</TableCell>
//               <TableCell align='center'>AVG View Time</TableCell>
//               <TableCell align='center'>Conversion Rate</TableCell>
//               <TableCell align='center'>Amount</TableCell>
//               <TableCell align='center'>Profit Margin#</TableCell>
//               <TableCell align='center'>Profit Margin%</TableCell>
//               <TableCell align='center'>Actions</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {paginatedTableData &&
//               paginatedTableData.map((tableItem, index) => {
//                 return (
//                   <TableRow hover key={index}>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.product}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.AVG}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.index}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.viewTime}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.conversionRate}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.amount}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.profitMarginSharp}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <Link to={`/admin/item-detail/${tableItem.id}`}>
//                         <Typography color='text.primary'>
//                           {tableItem.profitMarginPercent}
//                         </Typography>
//                       </Link>
//                     </TableCell>
//                     <TableCell align='center'>
//                       <IconButton
//                         aria-label='more'
//                         id='long-button'
//                         aria-controls={moreActions ? 'long-menu' : undefined}
//                         aria-expanded={moreActions ? 'true' : undefined}
//                         aria-haspopup='true'
//                         onClick={handleClick}
//                       >
//                         <MoreVertIcon />
//                       </IconButton>
//                       <Menu
//                         id='long-menu'
//                         MenuListProps={{
//                           'aria-labelledby': 'long-button'
//                         }}
//                         anchorEl={anchorEl}
//                         open={moreActions}
//                         onClose={handleClose}
//                       >
//                         <MenuItem key={'view'} onClick={handleClose}>
//                           <VisibilityOutlinedIcon />
//                           {'View'}
//                         </MenuItem>
//                         <Divider />
//                         <MenuItem key={'edit'} onClick={handleClose}>
//                           <BorderColorOutlinedIcon />
//                           {'Edit Item'}
//                         </MenuItem>
//                         <Divider />
//                         <MenuItem key={'delete'} onClick={handleClose}>
//                           <DeleteOutlineOutlinedIcon color='error' />
//                           <Typography color={'#DC3545'}>Delete</Typography>
//                         </MenuItem>
//                       </Menu>
//                     </TableCell>
//                   </TableRow>
//                 )
//               })}
//           </TableBody>
//         </Table>
//       </TableContainer>
//       <Box p={2}>
//         <TablePagination
//           component='div'
//           count={filteredTableItems.length}
//           onPageChange={handlePageChange}
//           onRowsPerPageChange={handleLimitChange}
//           page={page}
//           rowsPerPage={limit}
//           rowsPerPageOptions={[5, 10, 25, 30]}
//         />
//       </Box>
//       {/* <Dialog
//         open={recommendModal}
//         onClose={() => setRecommendModal(false)}
//         aria-labelledby='alert-dialog-title'
//         aria-describedby='alert-dialog-description'
//       >
//         <DialogTitle
//           id='alert-dialog-title'
//           style={{
//             fontSize: '25px',
//             fontWeight: 'bold'
//           }}
//         >
//           {'Recommend for Save'}
//         </DialogTitle>
//         <Divider />
//         <DialogContent>
//           <DialogContentText
//             id='alert-dialog-description'
//             style={{ textAlign: 'center' }}
//           >
//             <Typography fontWeight={'bold'}>
//               Are you going to leave here no without saving the style?
//             </Typography>
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions
//           style={{
//             display: 'flex',
//             justifyContent: 'space-around'
//           }}
//         >
//           <Button
//             variant='outlined'
//             style={{ margin: '20px' }}
//             fullWidth
//             onClick={() => {
//               setConfirmModal(false)
//             }}
//           >
//             Skip
//           </Button>
//           <Button
//             fullWidth
//             variant='contained'
//             style={{ margin: '20px' }}
//             onClick={() => {
//               setConfirmModal(false)
//               onConfirmClick()
//             }}
//             autoFocus
//           >
//             Save
//           </Button>
//         </DialogActions>
//       </Dialog> */}
//     </Card>
//   )
// }

// ItemStatisticTable.propTypes = {
//   tableItems: PropTypes.array.isRequired
// }

// ItemStatisticTable.defaultProps = {
//   tableItems: []
// }

// export default ItemStatisticTable

import * as React from 'react'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import { useEffect } from 'react'
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
  InputAdornment
} from '@mui/material'

import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
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
    id: 'name',
    numeric: false,
    label: 'Product Name'
  },
  {
    id: 'avgClicks',
    numeric: true,
    label: 'AVG Clicks'
  },
  {
    id: 'clickIndex',
    numeric: true,
    label: 'Click Index'
  },
  {
    id: 'avgViewTime',
    numeric: true,
    label: 'AVG View Time'
  },
  {
    id: 'conversionRate',
    numeric: true,
    label: 'Conversion Rate'
  },
  {
    id: 'amount',
    numeric: true,
    label: 'Amount'
  },
  {
    id: 'profitMarginSharp',
    numeric: true,
    label: 'Profit Margin#'
  },
  {
    id: 'profitMarginPercent',
    numeric: true,
    label: 'Profit Margin%'
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

export default function SuperStaffTable () {
  //User definition
  const dispatch = useDispatch()
  let rows = useSelector(state => state.super.allStaffs)

  // Variable definition
  const [deleteModal, setDeleteModal] = useState(false)
  const [invitationModal, setInvitationModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const [visibleRows, setVisibleRows] = useState([])

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(10)
  const [filters, setFilters] = useState({
    status: null
  })

  const [emailForInvite, setEmailForInvite] = useState('')

  useEffect(() => {
    setVisibleRows(rows)
  }, [rows])

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    let filteredObject = []
    rows?.map(item => {
      if (
        item.name?.toLocaleLowerCase().includes(searchValue) ||
        item.email?.toLocaleLowerCase().includes(searchValue) ||
        item.role?.toLocaleLowerCase().includes(searchValue)
      ) {
        filteredObject.push(item)
      }
    })
    setVisibleRows(filteredObject)
  }, [searchValue])

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
                      <TableCell align='center'>{row.name}</TableCell>
                      <TableCell align='center'>{row.email}</TableCell>
                      <TableCell align='center'>{row.role}</TableCell>
                      <TableCell align='center'>
                        {row.createdAt.toDate().toLocaleString()}
                      </TableCell>
                      <TableCell align='center' width={'10%'}>
                        {row.enable === true ? (
                          <Typography
                            sx={{
                              backgroundColor: 'rgba(40, 199, 111, 0.12)',
                              borderRadius: '10px'
                            }}
                            color={'rgba(40, 199, 111, 1)'}
                          >
                            Enabled
                          </Typography>
                        ) : (
                          <Typography
                            sx={{
                              backgroundColor: 'rgba(255, 245, 248, 1)',
                              borderRadius: '10px'
                            }}
                            color={'rgba(241, 65, 108, 1)'}
                          >
                            Disabled
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
                            setEmailForInvite(row.email)
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
                                  setInvitationModal(true)
                                }}
                                key={'edit'}
                              >
                                <NotificationsNoneOutlinedIcon />
                                Send the Invitation
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
              <Button onClick={() => setDeleteModal(false)}>Disagree</Button>
              <Button
                onClick={() => {
                  setDeleteModal(false)
                }}
                autoFocus
              >
                Agree
              </Button>
            </DialogActions>
          </Dialog>

          <Dialog
            open={invitationModal}
            onClose={() => setInvitationModal(false)}
            aria-labelledby='alert-dialog-title'
            aria-describedby='alert-dialog-description'
          >
            <DialogTitle id='alert-dialog-title'>
              {'You pay attention here'}
            </DialogTitle>
            <DialogContent>
              <DialogContentText id='alert-dialog-description'>
                Are you really going to send the invitation?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setInvitationModal(false)}>
                Disagree
              </Button>
              <Button
                onClick={() => {
                  setInvitationModal(false)
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
