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
  Backdrop,
  Fade,
  Modal,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  Button
} from '@mui/material'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
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

const RecommendTable = ({ tableItems = [] }) => {
  // Table setting
  const [page, setPage] = useState(0)
  const [limit, setLimit] = useState(5)
  const [filters, setFilters] = useState({
    status: null
  })
  const [explanationModal, setExplanationModal] = useState(false)

  const [explanation, setExplanation] = useState('')

  const handlePageChange = (event, newPage) => {
    setPage(newPage)
  }

  const handleLimitChange = event => {
    setLimit(parseInt(event.target.value))
  }

  const filteredTableItems = applyFilters(tableItems, filters)
  const paginatedTableData = applyPagination(filteredTableItems, page, limit)

  // Confirm Dialog setting
  const [deleteModal, setDeleteModal] = useState(false)
  const [eidtModal, setEditModal] = useState(false)

  const handleAccept = () => {}

  const handleDelete = () => {}

  return (
    <Card>
      <Card>
        <Divider />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Subject Matter</TableCell>
                <TableCell align='center'>Image</TableCell>
                <TableCell align='center'>Recommendation Title</TableCell>
                <TableCell align='center'>Date Generated</TableCell>
                <TableCell align='center'>Explanation</TableCell>
                <TableCell align='center'>Action</TableCell>
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
                      <TableCell
                        width={'40%'}
                        sx={{ cursor: 'pointer' }}
                        onClick={() => {
                          setExplanationModal(true)
                          setExplanation(tableItem.explanation)
                        }}
                      >
                        <Typography color='text.primary'>
                          {tableItem.explanation.length > 150
                            ? tableItem.explanation.slice(0, 150) + '...'
                            : tableItem.explanation}
                        </Typography>
                      </TableCell>

                      <TableCell align='center' width={'10%'}>
                        <IconButton
                          color='error'
                          sx={{ boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)' }}
                          onClick={() => setDeleteModal(true)}
                        >
                          <CloseOutlinedIcon />
                        </IconButton>
                        <IconButton
                          color='primary'
                          onClick={() => setEditModal(true)}
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
        <Modal
          aria-labelledby='transition-modal-title'
          aria-describedby='transition-modal-description'
          open={explanationModal}
          onClose={() => setExplanationModal(false)}
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500
            }
          }}
        >
          <Fade in={explanationModal}>
            <Box sx={style}>
              <Typography
                id='transition-modal-title'
                variant='h6'
                component='h2'
              >
                Explanation
              </Typography>
              <Typography id='transition-modal-description' sx={{ mt: 2 }}>
                {explanation}
              </Typography>
            </Box>
          </Fade>
        </Modal>
        <Dialog
          open={deleteModal}
          onClose={() => setDeleteModal(false)}
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
            {'Delete Recommendation'}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText
              id='alert-dialog-description'
              style={{ textAlign: 'center' }}
            >
              <Typography fontWeight={'bold'}>
                Are you sure you want to delete this card recommendation?
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
              color='error'
              onClick={() => {
                setDeleteModal(false)
              }}
            >
              Keep Recommendation
            </Button>
            <Button
              fullWidth
              variant='contained'
              color='error'
              style={{ margin: '20px' }}
              onClick={() => {
                setDeleteModal(false)
                handleDelete()
              }}
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={eidtModal}
          onClose={() => setEditModal(false)}
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
            {'Accept Recommendation'}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText
              id='alert-dialog-description'
              style={{ textAlign: 'center' }}
            >
              <Typography fontWeight={'bold'}>
                Are you going to accept this recommendation?
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
                setEditModal(false)
              }}
            >
              Cancel
            </Button>
            <Button
              fullWidth
              variant='contained'
              style={{ margin: '20px' }}
              onClick={() => {
                setEditModal(false)
                handleAccept()
              }}
              autoFocus
            >
              Accept
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Card>
  )
}

RecommendTable.propTypes = {
  tableItems: PropTypes.array.isRequired
}

RecommendTable.defaultProps = {
  tableItems: []
}

export default RecommendTable
