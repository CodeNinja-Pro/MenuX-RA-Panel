import React, { useState } from 'react'
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
  ThemeProvider,
  Chip
} from '@mui/material'

import { Container } from 'reactstrap'

import { useDispatch } from 'react-redux'
import OnlyHeader from '../../Headers/OnlyHeader'
import { ThemeMain } from '../../common/Theme'
import { Check } from '@mui/icons-material'

const applyFilters = (tableItems, filters) => {
  return (
    tableItems &&
    tableItems.filter(tableItem => {
      let matches = true

      if (filters.status && tableItem.status !== filters.status) {
        matches = false
      }

      return matches
    })
  )
}

const applyPagination = (tableItems, page, limit) => {
  return tableItems && tableItems.slice(page * limit, page * limit + limit)
}

function NotificationTable (props) {
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
              <Divider />
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align='center'>No</TableCell>
                      <TableCell align='center'>Notification Title</TableCell>
                      <TableCell align='center'>Notification Content</TableCell>
                      <TableCell align='center'>Created Date</TableCell>
                      <TableCell align='center'>Status</TableCell>
                      <TableCell align='center'>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {paginatedTableData &&
                      paginatedTableData.map((item, index) => {
                        return (
                          <TableRow hover key={index}>
                            <TableCell align='center'>
                              <Typography>{index + 1}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography>{item.title}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography>{item.content}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography>{item.createdDate}</Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Typography>
                                <Chip
                                  color='success'
                                  label={
                                    <span>
                                      <b>Status:</b> Completed
                                    </span>
                                  }
                                  icon={<Check fontSize='small' />}
                                />
                              </Typography>
                            </TableCell>
                            <TableCell align='center'>
                              <Button
                                variant='contained'
                                color='error'
                                onClick={() =>
                                  dispatch(props.deleteLabel(item.id))
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
                  count={filteredTableItems && filteredTableItems.length}
                  onPageChange={handlePageChange}
                  onRowsPerPageChange={handleLimitChange}
                  page={page}
                  rowsPerPage={limit}
                  rowsPerPageOptions={[5, 10, 25, 30]}
                />
              </Box>
            </Card>
          </ThemeProvider>
        </Container>
      </Container>
    </>
  )
}

export default NotificationTable
