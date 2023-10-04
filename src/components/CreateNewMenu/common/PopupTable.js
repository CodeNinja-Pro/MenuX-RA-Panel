import { useState, useEffect } from 'react'
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
  Avatar,
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
  deletePopup,
  getPopups,
  updatePopupStatus
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

const PopupTable = () => {
  const dispatch = useDispatch()
  // user definition
  const { user } = useSelector(state => state.auth)
  let { popupLoader, popups } = useSelector(state => state.menu)

  const [allPopups, setAllPopups] = useState([])
  const [selectedItem, setSelectedItem] = useState('')

  useEffect(() => {
    dispatch(getPopups(user.restaurantID))
  }, [])

  useEffect(() => {
    setAllPopups(popups)
  }, [popups])

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleDeletePopup = () => {
    dispatch(
      deletePopup(user.restaurantID, selectedItem, () => {
        // popups = popups.filter(popup => popup.id !== selectedItem)
        // setAllPopups(popups)
        toast.success('You deleted this popup successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
        })

        dispatch({
          type: 'POPUP_LOADER',
          payload: false
        })
      })
    )
  }

  const handleChecked = (id, status) => {
    dispatch(
      updatePopupStatus(user.restaurantID, id, status, () => {
        // let newArray = [...popups]
        // const indexToUpdate = popups.findIndex(popup => popup.id === id)
        // if (indexToUpdate !== -1) {
        //   const updatedObject = { ...newArray[indexToUpdate] }
        //   updatedObject.status = !status
        //   newArray[indexToUpdate] = updatedObject
        //   setAllPopups(newArray)
        // }
        toast.success('You updated the popup status.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
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

  const filteredTableItems = applyFilters(allPopups, filters)
  const paginatedTableData = applyPagination(filteredTableItems, page, limit)

  return (
    <>
      {popupLoader ? (
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
            marginLeft={3}
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
                  <TableCell align='left'>Heading</TableCell>
                  <TableCell align='left'>Text</TableCell>
                  <TableCell align='center'>Delay</TableCell>
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
                          <TableCell align='left'>
                            <Typography
                              color='text.primary'
                              alignItems={'left'}
                            >
                              <Box display={'flex'} alignItems={'center'}>
                                <Avatar
                                  sx={{
                                    width: '50px',
                                    height: '50px',
                                    border: 'dashed',
                                    borderColor: '#3A8ACE',
                                    borderWidth: '1px'
                                  }}
                                  src={tableItem.bannerImage}
                                ></Avatar>
                                <Typography fontWeight={'bold'} marginLeft={3}>
                                  {tableItem.heading}
                                </Typography>
                              </Box>
                            </Typography>
                          </TableCell>
                          <TableCell align='left'>
                            <Typography color='text.primary'>
                              {tableItem.text}
                            </Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography color='text.primary'>
                              {tableItem.delay}
                            </Typography>
                          </TableCell>
                          <TableCell align='center'>
                            <Typography color='text.primary'>
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
                                    handleDeletePopup()
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

PopupTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

PopupTable.defaultProps = {
  tableItems: []
}

export default PopupTable
