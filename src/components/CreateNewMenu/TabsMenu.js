import React, { useState } from 'react'
import { Row } from 'reactstrap'

import {
  Button,
  Typography,
  Card,
  CardContent,
  Box,
  TextField,
  InputAdornment,
  OutlinedInput,
  Dialog,
  DialogActions,
  FormControl,
  FormHelperText,
  DialogContent,
  DialogTitle,
  Divider,
  DialogContentText,
  Grid,
  LinearProgress
} from '@mui/material'

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { useDispatch, useSelector } from 'react-redux'
import {
  addTabs,
  deleteTab,
  editTabs,
  getTabs
} from '../../store/actions/MenuManagmentActions'
import { useEffect } from 'react'
import TabDataTable from './TabDataTable'

const TabsMenu = () => {
  const dispatch = useDispatch()
  const { user, userPermissions } = useSelector(state => state.auth)
  const { tabsData, addTabLoader, editTabLoader } = useSelector(
    state => state.menu
  )
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)

  const [tabName, setTabName] = useState('')
  const [tabID, setTabID] = useState('')
  const [searchField, setSearchField] = useState('')

  const tabPermissions = userPermissions?.tabs

  const addtoggle = () => {
    setAddModal(!addModal)
  }
  const edittoggle = item => {
    setEditModal(!editModal)
    setTabName(item.tabName)
    setTabID(item.id)
  }

  useEffect(() => {
    dispatch(getTabs(user?.restaurantID))
  }, [searchField])

  const addTab = () => {
    dispatch(
      addTabs(
        {
          tabName,
          restaurantID: user?.restaurantID
        },
        () => {
          setTabName('')
          setAddModal(false)
        }
      )
    )
  }

  const editTab = () => {
    dispatch(
      editTabs(tabID, tabName, () => {
        setTabName('')
        setTabID('')
        setEditModal(false)
      })
    )
  }

  return (
    <>
      <Row className='mt-2 '>
        <div className='col px-0'>
          <Card className='shadow '>
            <CardContent>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Grid container>
                  <Grid item xs={9} lg={7}>
                    <Typography
                      textAlign={'left'}
                      marginLeft={1}
                      fontWeight={'bold'}
                      fontSize={'22px'}
                    >
                      Tags
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={3}
                    lg={2}
                    display={'flex'}
                    alignItems={'center'}
                  >
                    <Button
                      variant='contained'
                      onClick={addtoggle}
                      sx={{ marginBottom: '15px' }}
                    >
                      Add Tag
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      fullWidth
                      value={searchField}
                      onChange={e => setSearchField(e.target.value)}
                      id='outlined-start-adornment'
                      sx={{ marginBottom: '15px' }}
                      placeholder='Search by tab name.'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
              {user?.type === 'kitchen-admin' ? (
                <>
                  {tabPermissions?.get ? (
                    <></>
                  ) : (
                    <Row className='py-4 justify-content-center align-items-center'>
                      You don't have the permission to access the page
                    </Row>
                  )}
                </>
              ) : (
                <TabDataTable
                  tableItems={tabsData}
                  edittoggle={edittoggle}
                  deleteTab={deleteTab}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </Row>
      {/* Modal for add restaurant */}
      <Dialog
        open={addModal}
        onClose={() => setAddModal(false)}
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
          {'Add New Tag'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl fullWidth variant='outlined'>
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Tag Name
              </FormHelperText>
              <OutlinedInput
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                required
                value={tabName}
                onChange={e => setTabName(e.target.value)}
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
              setAddModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            disabled={!tabName}
            variant='contained'
            style={{ margin: '20px' }}
            onClick={addTab}
            autoFocus
          >
            {addTabLoader ? <LinearProgress /> : 'Save'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        open={editModal}
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
          {'Edit Tab Details'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl fullWidth variant='outlined'>
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Tab Name
              </FormHelperText>
              <OutlinedInput
                value={tabName}
                required
                onChange={e => setTabName(e.target.value)}
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
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
              setEditModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            disabled={!tabName}
            variant='contained'
            style={{ margin: '20px' }}
            onClick={editTab}
            autoFocus
          >
            {editTabLoader ? <LinearProgress /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default TabsMenu
