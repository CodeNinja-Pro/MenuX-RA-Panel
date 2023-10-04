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

// Label item icon load
import Vegetarian from '../../assets/common/LabelIcons/vegetarian.png'
import Vegetarian_None from '../../assets/common/LabelIcons/vegetarian_none.png'
import Vegan from '../../assets/common/LabelIcons/vegan.png'
import Vegan_None from '../../assets/common/LabelIcons/vegan_none.png'
import Halal from '../../assets/common/LabelIcons/halal.png'
import Halal_None from '../../assets/common/LabelIcons/halal_none.png'
import Customizable from '../../assets/common/LabelIcons/customizable.png'
import Customizable_None from '../../assets/common/LabelIcons/customizable_none.png'
import Kosher from '../../assets/common/LabelIcons/kosher.png'
import Kosher_None from '../../assets/common/LabelIcons/kosher_none.png'
import Keto from '../../assets/common/LabelIcons/keto.png'
import Keto_None from '../../assets/common/LabelIcons/keto_none.png'
import Spicy from '../../assets/common/LabelIcons/spicy.png'
import Spciy_None from '../../assets/common/LabelIcons/spicy_none.png'
import Molluscs from '../../assets/common/LabelIcons/molluscs.png'
import Molluscs_None from '../../assets/common/LabelIcons/molluscs_none.png'
import Organic from '../../assets/common/LabelIcons/organic.png'
import Organic_None from '../../assets/common/LabelIcons/organic_none.png'
import Gmo from '../../assets/common/LabelIcons/gmo.png'
import Gmo_None from '../../assets/common/LabelIcons/gmo_none.png'
import Dairy from '../../assets/common/LabelIcons/dairy.png'
import Dairy_None from '../../assets/common/LabelIcons/dairy_none.png'

import { useDispatch } from 'react-redux'

const labelIcons = {
  Vegetarian,
  Vegetarian_None,
  Vegan,
  Vegan_None,
  Halal,
  Halal_None,
  Customizable,
  Customizable_None,
  Kosher,
  Kosher_None,
  Keto,
  Keto_None,
  Spicy,
  Spciy_None,
  Molluscs,
  Molluscs_None,
  Organic,
  Organic_None,
  Gmo,
  Gmo_None,
  Dairy,
  Dairy_None
}

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
                      <Box display={'flex'} justifyContent={'center'}>
                        <Avatar
                          sx={{ width: '70px', height: '70px' }}
                          src={
                            labelIcons[labelData.labelName] !== undefined
                              ? labelIcons[labelData.labelName]
                              : labelData.labelIcon
                          }
                        />
                      </Box>
                    </TableCell>
                    <TableCell align='center' width={'20%'}>
                      <Box display={'flex'} justifyContent={'space-around'}>
                        <Button
                          variant='contained'
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
                      </Box>
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
