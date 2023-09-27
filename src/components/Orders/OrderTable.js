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
  IconButton
} from '@mui/material'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'

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

const OrderTable = ({ tableItems = [] }) => {
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

  const filteredTableItems = applyFilters(tableItems, filters)
  const paginatedTableData = applyPagination(filteredTableItems, page, limit)

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>Table No</TableCell>
              <TableCell align='center'>Order ID</TableCell>
              <TableCell align='center'>Name</TableCell>
              <TableCell align='center'>Order</TableCell>
              <TableCell align='center'>Comments</TableCell>
              <TableCell align='center'>Status</TableCell>
              <TableCell align='center'>Payment</TableCell>
              <TableCell align='center'>Amount</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTableData &&
              paginatedTableData.map((tableItem, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell align='center' width={'15%'}>
                      <Typography color='text.primary'>
                        {tableItem.subject}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' width={'5%'}>
                      <Typography color='text.primary'>
                        {tableItem.image}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' width={'20%'}>
                      <Typography color='text.primary'>
                        {tableItem.title}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' width={'10%'}>
                      <Typography color='text.primary'>
                        {tableItem.date}
                      </Typography>
                    </TableCell>
                    <TableCell width={'40%'}>
                      <Typography color='text.primary'>
                        {tableItem.explanation}
                      </Typography>
                    </TableCell>
                    <TableCell align='center' width={'10%'}>
                      <IconButton
                        color='error'
                        sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
                      >
                        <CloseOutlinedIcon />
                      </IconButton>
                      <IconButton
                        color='primary'
                        sx={{
                          marginLeft: '10px',
                          boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)'
                        }}
                      >
                        <DoneOutlinedIcon />
                      </IconButton>
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
    </Card>
  )
}

OrderTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

OrderTable.defaultProps = {
  tableItems: []
}

export default OrderTable
