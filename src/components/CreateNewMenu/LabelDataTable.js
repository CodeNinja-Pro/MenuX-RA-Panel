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
  Button,
  Avatar
} from '@mui/material'

import { useDispatch } from 'react-redux'

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

function LabelDataTable (props) {
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

  const filteredTableItems = applyFilters(props.tableItems, filters)
  const paginatedTableData = applyPagination(filteredTableItems, page, limit)

  const dispatch = useDispatch()

  return (
    <Card sx={{ boxShadow: 'none' }}>
      <Divider />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>No</TableCell>
              <TableCell align='center'>Label Name</TableCell>
              <TableCell align='center'>Label Icon</TableCell>
              <TableCell align='center'>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedTableData &&
              paginatedTableData.map((labelData, index) => {
                return (
                  <TableRow hover key={index}>
                    <TableCell align='center'>
                      <Typography>{index + 1}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{labelData.labelName}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Typography>{labelData.labelIcon}</Typography>
                    </TableCell>
                    <TableCell align='center'>
                      <Button
                        variant='contained'
                        sx={{ marginRight: '20px' }}
                        onClick={() => props.edittoggle(labelData)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant='contained'
                        color='error'
                        onClick={() =>
                          dispatch(props.deleteLabel(labelData.id))
                        }
                      >
                        Delete
                      </Button>
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

export default LabelDataTable
