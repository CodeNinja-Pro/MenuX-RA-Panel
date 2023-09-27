import { useState, useRef } from 'react'
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
  Avatar
} from '@mui/material'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined'

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

const StaffTable = ({ tableItems = [] }) => {
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

  const filteredTableItems = applyFilters(tableItems, filters)
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
                        {tableItem.status == true ? (
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
                                <EditOutlinedIcon />
                                Edit
                              </MenuItem>
                              <Divider />
                              <MenuItem onClick={() => {}} key={'status'}>
                                <ManageAccountsOutlinedIcon color='error' />
                                <Typography color={'error'}>
                                  {tableItem.status}
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
