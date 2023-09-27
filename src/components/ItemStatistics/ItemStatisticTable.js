import React, { useState } from 'react'
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
  Menu,
  MenuItem
} from '@mui/material'

import { Link } from 'react-router-dom'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

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

const ItemStatisticTable = ({ tableItems = [] }) => {
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

  const [anchorEl, setAnchorEl] = useState(null)
  const moreActions = Boolean(anchorEl)
  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Card>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Product Name</TableCell>
              <TableCell align='center'>AVG Clicks</TableCell>
              <TableCell align='center'>Click Index</TableCell>
              <TableCell align='center'>AVG View Time</TableCell>
              <TableCell align='center'>Conversion Rate</TableCell>
              <TableCell align='center'>Amount</TableCell>
              <TableCell align='center'>Profit Margin#</TableCell>
              <TableCell align='center'>Profit Margin%</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTableData &&
              paginatedTableData.map((tableItem, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.product}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.AVG}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.index}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.viewTime}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.conversionRate}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.amount}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.profitMarginSharp}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <Link to={`/admin/item-detail/${tableItem.id}`}>
                        <Typography color='text.primary'>
                          {tableItem.profitMarginPercent}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell align='center'>
                      <IconButton
                        aria-label='more'
                        id='long-button'
                        aria-controls={moreActions ? 'long-menu' : undefined}
                        aria-expanded={moreActions ? 'true' : undefined}
                        aria-haspopup='true'
                        onClick={handleClick}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        id='long-menu'
                        MenuListProps={{
                          'aria-labelledby': 'long-button'
                        }}
                        anchorEl={anchorEl}
                        open={moreActions}
                        onClose={handleClose}
                      >
                        <MenuItem key={'view'} onClick={handleClose}>
                          <VisibilityOutlinedIcon />
                          {'View'}
                        </MenuItem>
                        <Divider />
                        <MenuItem key={'edit'} onClick={handleClose}>
                          <BorderColorOutlinedIcon />
                          {'Edit Item'}
                        </MenuItem>
                        <Divider />
                        <MenuItem key={'delete'} onClick={handleClose}>
                          <DeleteOutlineOutlinedIcon color='error' />
                          <Typography color={'#DC3545'}>Delete</Typography>
                        </MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
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
      {/* <Dialog
        open={recommendModal}
        onClose={() => setRecommendModal(false)}
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
          {'Recommend for Save'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <Typography fontWeight={'bold'}>
              Are you going to leave here no without saving the style?
            </Typography>
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
              setConfirmModal(false)
            }}
          >
            Skip
          </Button>
          <Button
            fullWidth
            variant='contained'
            style={{ margin: '20px' }}
            onClick={() => {
              setConfirmModal(false)
              onConfirmClick()
            }}
            autoFocus
          >
            Save
          </Button>
        </DialogActions>
      </Dialog> */}
    </Card>
  )
}

ItemStatisticTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

ItemStatisticTable.defaultProps = {
  tableItems: []
}

export default ItemStatisticTable
