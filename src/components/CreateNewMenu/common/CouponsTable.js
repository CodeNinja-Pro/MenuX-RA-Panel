import { useState, useRef, useEffect } from 'react'
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
  Switch,
  Grid,
  TextField,
  InputAdornment
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { useDispatch, useSelector } from 'react-redux'
import {
  deleteCoupon,
  getCoupons,
  updateStatus
} from '../../../store/actions/MenuManagmentActions'
import { Spinner } from 'reactstrap'
import { toast } from 'react-toastify'

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

const CouponsTable = () => {
  const dispatch = useDispatch()
  // user definition
  const { user } = useSelector(state => state.auth)
  const { couponLoader } = useSelector(state => state.menu)
  let { coupons } = useSelector(state => state.menu)
  const [allCoupons, setAllCoupons] = useState([])
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    dispatch(getCoupons(user.restaurantID))
  }, [])

  useEffect(() => {
    setAllCoupons(coupons)
  }, [coupons])

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleDeleteCoupon = () => {
    dispatch(
      deleteCoupon(user.restaurantID, selectedItem, () => {
        // coupons = coupons.filter(coupon => coupon.id !== selectedItem)
        // setAllCoupons(coupons)
        toast.success('You deleted this coupon successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'COUPON_LOADER',
          payload: false
        })
      })
    )
  }

  const handleChecked = (id, status) => {
    dispatch(
      updateStatus(user.restaurantID, id, status, () => {
        // let newArray = [...coupons]
        // const indexToUpdate = coupons.findIndex(coupon => coupon.id === id)
        // if (indexToUpdate !== -1) {
        //   const updatedObject = { ...newArray[indexToUpdate] }
        //   updatedObject.status = !status
        //   newArray[indexToUpdate] = updatedObject
        //   setAllCoupons(newArray)
        // }
      })
    )
  }

  // Table definition
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)
  const [filters, setFilters] = useState({
    status: null
  })

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = event => {
    setLimit(parseInt(event.target.value))
  }

  const filteredTableItems = applyFilters(allCoupons, filters)
  const paginatedTableData = applyPagination(filteredTableItems, page, limit)

  return (
    <>
      {couponLoader ? (
        <Spinner size={'lg'} color='primary' className='mr-2'></Spinner>
      ) : (
        <Card sx={{ boxShadow: 'none' }}>
          <Grid
            item
            xs={12}
            display={'flex'}
            justifyContent={'start'}
            marginTop={'20px'}
            marginBottom={2}
          >
            <TextField
              id='outlined-start-adornment'
              placeholder='Search'
              InputProps={{
                startAdornment: (
                  <InputAdornment position='start'>
                    <SearchOutlinedIcon />
                  </InputAdornment>
                )
              }}
            />
          </Grid>
          <Divider />
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell align='center'>Coupons Name</TableCell>
                  <TableCell align='center'>Discount%</TableCell>
                  {/* <TableCell align='center'>Discount#</TableCell> */}
                  <TableCell align='center'>Valid Date</TableCell>
                  <TableCell align='center'>Max Discount</TableCell>
                  <TableCell align='center'>Maximum Uses</TableCell>
                  <TableCell align='center'>Uses</TableCell>
                  <TableCell align='center'>Status</TableCell>
                  <TableCell align='center'>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedTableData &&
                  paginatedTableData.map((tableItem, index) => {
                    return (
                      <>
                        <TableRow key={index} hover>
                          <TableCell align='center'>
                            <Typography
                              color='text.primary'
                              alignItems={'center'}
                            >
                              {tableItem.couponName}
                            </Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography color='text.primary'>
                              {tableItem.discountPercentage}
                            </Typography>
                          </TableCell>
                          {/* <TableCell align='center'>
                            <Typography color='text.primary'>
                              {tableItem.discountSharp}
                            </Typography>
                          </TableCell> */}
                          <TableCell align='center'>
                            <Typography color='text.primary'>
                              {tableItem.validTill.toDate().toDateString()}
                            </Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography color='text.primary'>
                              {tableItem.maximumDiscount}
                            </Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography color='text.primary'>
                              {tableItem.maximumUses}
                            </Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography color='text.primary'>
                              {tableItem.uses}
                            </Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography color='text.primary'>
                              {/* {tableItem.status} */}
                              <Switch
                                checked={tableItem.status}
                                onChange={() =>
                                  handleChecked(tableItem.id, tableItem.status)
                                }
                              />
                            </Typography>
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
                        </TableRow>
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
                                {/* <MenuItem
                              onClick={() => {
                                handleClose()
                                handleEditCoupon(tableItem.id)
                              }}
                              key={'edit'}
                            >
                              <EditOutlinedIcon />
                              Edit
                            </MenuItem> */}
                                {/* <Divider /> */}
                                <MenuItem
                                  onClick={() => {
                                    handleClose()
                                    handleDeleteCoupon()
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
                      </>
                    )
                  })}
              </TableBody>
            </Table>
          </TableContainer>
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
      )}
    </>
  )
}

CouponsTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

CouponsTable.defaultProps = {
  tableItems: []
}

export default CouponsTable
