import * as React from 'react'
import PropTypes from 'prop-types'
import { visuallyHidden } from '@mui/utils'
import { useEffect } from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { addDays } from 'date-fns'

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
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import PickDateRange from '../../views/auth/PickDateRange'
import { getAllMenus } from '../../store/actions/statisticAction'
import { useHistory } from 'react-router-dom'
import { getTotalRevenue } from '../../Statistical/generalStatistics'

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
    id: 'views',
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
    id: 'price',
    numeric: true,
    label: 'Price'
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

        {/* <TableCell align={'center'}>Actions</TableCell> */}
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

export default function ItemStatisticTable (props) {
  //User definition
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(state => state.auth)
  let rows = useSelector(state => state.statistic.allMenus)

  // Variable definition
  const [deleteModal, setDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState('')

  const [visibleRows, setVisibleRows] = useState([])

  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [filters, setFilters] = useState({
    status: null
  })

  const [dateState, setDateState] = useState([
    {
      startDate: addDays(new Date(), -31),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const handleItemClick = id => {
    // history.push(`/admin/item-detail/${id}`)
    props.setSelectedItem(id)
    props.setStatisticOrDetail('detail')
  }

  const handleItemDelete = () => {}

  const handleDateChange = ranges => {
    setDateState(ranges)
  }

  let totalViews = 0
  const [sum, setSum] = useState(0)

  useEffect(() => {
    dispatch(getTotalRevenue(rows))

    setVisibleRows(rows)
    for (let i = 0; i < rows.length; i++) {
      totalViews += rows[i].views
    }
    setSum(totalViews)
  }, [rows])

  const [searchValue, setSearchValue] = useState('')

  useEffect(() => {
    let filteredObject = []
    rows?.map(item => {
      if (item.name?.toLocaleLowerCase().includes(searchValue)) {
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
    setVisibleRows(stableSort(rows, getComparator(order, orderBy)))
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
        <Box
          width={'100%'}
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
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
          <Box width={300}>
            <PickDateRange
              setDateState={handleDateChange}
              datestate={dateState}
            />
          </Box>
        </Box>
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
                    <>
                      <TableRow
                        hover
                        onClick={() => handleItemClick(row.id)}
                        tabIndex={-1}
                        key={labelId}
                        sx={{ cursor: 'pointer' }}
                      >
                        <TableCell align='center'>{row.name}</TableCell>
                        <TableCell align='center'>{row.avgClicks}</TableCell>
                        <TableCell align='center'>
                          {row.views}/{sum}
                        </TableCell>
                        <TableCell align='center'>
                          {/* {row.createdAt.toDate().toLocaleString()} */}
                        </TableCell>
                        <TableCell align='center'>
                          {row.purchase === 0 || row.views === 0
                            ? 0
                            : new Intl.NumberFormat('en-IN', {
                                maximumSignificantDigits: 2
                              }).format(row.conversionRate)}
                        </TableCell>
                        <TableCell align='center'>${row.price}</TableCell>
                        <TableCell align='center'>
                          {row.profitMarginSharp}
                        </TableCell>
                        <TableCell align='center'>
                          {new Intl.NumberFormat('en-IN', {
                            maximumSignificantDigits: 3
                          }).format(row.profitMarginPercent)}
                        </TableCell>
                        {/* <TableCell align='center' width={'10%'}>
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
                        </TableCell> */}
                      </TableRow>
                    </>
                  )
                })}
              </TableBody>
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
                      <MenuItem onClick={() => {}} key={'view'}>
                        <VisibilityOutlinedIcon />
                        View
                      </MenuItem>
                      <Divider />
                      <MenuItem
                        onClick={() => {
                          setDeleteModal(true)
                        }}
                        key={'delete'}
                      >
                        <DeleteOutlineOutlinedIcon color='error' />
                        <Typography color={'error'}>Delete</Typography>
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Popover>
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
                  handleItemDelete()
                  setDeleteModal(false)
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
