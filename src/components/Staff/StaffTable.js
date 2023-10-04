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
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormHelperText,
  OutlinedInput,
  DialogContentText,
  Select,
  Grid,
  TextField,
  InputAdornment
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { useDispatch, useSelector } from 'react-redux'
import {
  deleteStaff,
  getAllStaffInfo,
  getStaffs,
  updateStaffInfo,
  updateStaffStatus
} from '../../store/actions/staffAction'

const applyFilters = (tableItems, filters) => {
  return tableItems.filter(tableItem => {
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

const StaffTable = () => {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { staffData, staffs } = useSelector(state => state.staff)
  const [allStaffInfo, setAllStaffInfo] = useState([])

  const [deleteModal, setDeleteModal] = useState(false)

  const [tableData, setTableData] = useState([])

  useEffect(() => {
    dispatch(getStaffs(user.restaurantID))
    dispatch(getAllStaffInfo(user.restaurantID))
  }, [])
  useEffect(() => {
    setTableData(staffs)
  }, [staffs])

  useEffect(() => {
    setAllStaffInfo(staffData)
  }, [staffData])

  const [selectedItem, setSelectedItem] = useState('')

  const [roleName, setRoleName] = useState('')
  const [staffEmail, setStaffEmail] = useState('')
  const [staffName, setStaffName] = useState('')
  const [modalFlag, setModalFlag] = useState(false)
  const [currentState, setCurrentState] = useState(false)

  const editStaffInfo = () => {
    const updateData = {
      role: roleName,
      email: staffEmail,
      name: staffName
    }

    dispatch(
      updateStaffInfo(selectedItem, updateData, () => {
        setRoleName('')
        setStaffEmail('')
        setStaffName('')
      })
    )
  }

  const deleteStaffInfo = () => {
    dispatch(deleteStaff(selectedItem))
  }

  const handleStatusChange = () => {
    dispatch(updateStaffStatus(selectedItem, !currentState))
  }

  // Table definition section
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

  const filteredTableItems = applyFilters(tableData, filters)
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

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <Grid
        item
        xs={12}
        display={'flex'}
        justifyContent={'start'}
        marginBottom={2}
        marginLeft={2}
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
        <Table aria-labelledby='tableTitle'>
          <TableHead>
            <TableRow>
              <TableCell align='left'>Name</TableCell>
              <TableCell align='left'>Role</TableCell>
              <TableCell align='left'>Email</TableCell>
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
                        <Typography
                          color='text.primary'
                          display={'flex'}
                          justifyContent={'inherit'}
                          alignItems={'center'}
                        >
                          <Avatar
                            alt='image'
                            src={tableItem.avatar}
                            sx={{ marginRight: '20px' }}
                          />
                          {tableItem.name}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color='text.primary'>
                          {tableItem.role}
                        </Typography>
                      </TableCell>
                      <TableCell align='left'>
                        <Typography color='text.primary'>
                          {tableItem.email}
                        </Typography>
                      </TableCell>
                      <TableCell align='center' width={'10%'}>
                        {tableItem.status === true ? (
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
                            Deactive
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
                            setCurrentState(tableItem.status)
                            setSelectedItem(tableItem.id)
                            setRoleName(tableItem.role)
                            setStaffEmail(tableItem.email)
                            setStaffName(tableItem.name)
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
                                  setModalFlag(true)
                                }}
                                key={'edit'}
                              >
                                <EditOutlinedIcon />
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => {
                                  handleStatusChange()
                                }}
                                key={'status'}
                              >
                                <ManageAccountsOutlinedIcon color='success' />
                                <Typography color={'#2e7d32'}>
                                  <Typography>Revert Status</Typography>
                                </Typography>
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
                    </TableRow>
                  </>
                )
              })}
          </TableBody>
        </Table>
      </TableContainer>
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
              deleteStaffInfo()
            }}
            autoFocus
          >
            Agree
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        open={modalFlag}
        onClose={() => setModalFlag(false)}
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
          {'Edit Staff Information'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl fullWidth>
              <FormHelperText style={{ fontSize: '18px' }}>
                Role Name
              </FormHelperText>
              <Select
                fullWidth
                value={roleName}
                onChange={e => setRoleName(e.target.value)}
              >
                {allStaffInfo?.map((staffInfo, index) => (
                  <MenuItem key={index} value={staffInfo.id}>
                    {staffInfo.roleName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ marginTop: 2 }} fullWidth>
              <FormHelperText style={{ fontSize: '18px' }}>
                Email
              </FormHelperText>
              <OutlinedInput
                type='email'
                placeholder='menuxdigital@gmail.com'
                value={staffEmail}
                onChange={e => setStaffEmail(e.target.value)}
              />
            </FormControl>
            <FormControl sx={{ marginTop: 2 }} fullWidth>
              <FormHelperText style={{ fontSize: '18px' }}>
                Full Name
              </FormHelperText>
              <OutlinedInput
                type='email'
                placeholder='John Doe'
                value={staffName}
                onChange={e => setStaffName(e.target.value)}
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
              setModalFlag(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            disabled={!staffEmail || !staffName || !roleName}
            variant='contained'
            style={{ margin: '20px' }}
            onClick={() => {
              setModalFlag(false)
              editStaffInfo()
            }}
            autoFocus
          >
            Send Email
          </Button>
        </DialogActions>
      </Dialog>
      <Box p={2}>
        <TablePagination
          component='div'
          count={filteredTableItems.length}
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

StaffTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

StaffTable.defaultProps = {
  tableItems: []
}

export default StaffTable
