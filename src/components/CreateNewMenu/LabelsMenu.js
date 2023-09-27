import React, { useState } from 'react'
import { Row, Spinner } from 'reactstrap'

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
  Avatar,
  Stack
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

import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'

import { useDispatch, useSelector } from 'react-redux'
import { addlabel } from '../../store/actions/MenuManagmentActions'
import { getLabels } from '../../store/actions/MenuManagmentActions'
import { useEffect } from 'react'
import { editlabel } from '../../store/actions/MenuManagmentActions'
import { deleteLabel } from '../../store/actions/MenuManagmentActions'
import LabelDataTable from './LabelDataTable'
import { toast } from 'react-toastify'

const LabelsMenu = () => {
  const dispatch = useDispatch()
  const { user, userPermissions } = useSelector(state => state.auth)
  const { labelsData, labelsRestData, addLabelLoader, editLabelLoader } =
    useSelector(state => state.menu)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [labelName, setlabelName] = useState('')
  const [labelID, setlabelID] = useState('')
  const [searchField, setSearchField] = useState('')

  const [selectedIcon, setSelectedIcon] = useState('')

  const handleIconClick = selected => {
    setSelectedIcon(selected)
  }

  const labelIcons = [
    {
      name: 'Vegetarian',
      icon: Vegetarian
    },
    {
      name: 'Vegetarian_None',
      icon: Vegetarian_None
    },
    {
      name: 'Vegan',
      icon: Vegan
    },
    {
      name: 'Vegan_None',
      icon: Vegan_None
    },
    {
      name: 'Halal',
      icon: Halal
    },
    {
      name: 'Halal_None',
      icon: Halal_None
    },
    {
      name: 'Customizable',
      icon: Customizable
    },
    {
      name: 'Customizable_None',
      icon: Customizable_None
    },
    {
      name: 'Kosher',
      icon: Kosher
    },
    {
      name: 'Kosher_None',
      icon: Kosher_None
    },
    {
      name: 'Keto',
      icon: Keto
    },
    {
      name: 'Keto_None',
      icon: Keto_None
    },
    {
      name: 'Spicy',
      icon: Spicy
    },
    {
      name: 'Spciy_None',
      icon: Spciy_None
    },
    {
      name: 'Molluscs',
      icon: Molluscs
    },
    {
      name: 'Molluscs_None',
      icon: Molluscs_None
    },
    {
      name: 'Organic',
      icon: Organic
    },
    {
      name: 'Organic_None',
      icon: Organic_None
    },
    {
      name: 'Gmo',
      icon: Gmo
    },
    {
      name: 'Gmo_None',
      icon: Gmo_None
    },
    {
      name: 'Dairy',
      icon: Dairy
    },
    {
      name: 'Dairy_None',
      icon: Dairy_None
    }
  ]

  const labelPermissions = userPermissions?.labels

  const addtoggle = () => {
    setAddModal(!addModal)
  }
  const edittoggle = item => {
    setEditModal(!editModal)
    setlabelName(item.labelName)
    setSelectedIcon(item.labelIcon)
    setlabelID(item.id)
  }

  useEffect(() => {
    dispatch(getLabels(user?.restaurantID))
  }, [searchField])

  const addLabel = e => {
    e.preventDefault()

    if (labelName) {
      dispatch(
        addlabel(
          {
            labelName,
            labelIcon: selectedIcon,
            restaurantID: user?.restaurantID
          },
          () => {
            setlabelName('')
            setSelectedIcon('')
            setAddModal(false)
          }
        )
      )
    } else {
      toast.error('Label Name is required.', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    }
  }

  const editLabel = e => {
    e.preventDefault()

    if (labelName) {
      dispatch(
        editlabel(labelID, labelName, selectedIcon, () => {
          setlabelName('')
          setlabelID('')
          setSelectedIcon('')
          setEditModal(false)
        })
      )
    } else {
      toast.error('Label Name is required.')
    }
  }

  return (
    <>
      {/* <OnlyHeader /> */}
      {/* <Container className="mt--7" fluid> */}
      <Row className='mt-2 '>
        <div className='col px-0'>
          <Card className='shadow '>
            <CardContent>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'center'}
              >
                <Typography fontWeight={'bold'} fontSize={'22px'}>
                  Labels
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  <Button
                    variant='contained'
                    onClick={addtoggle}
                    sx={{ marginBottom: '15px', marginRight: '20px' }}
                  >
                    Add Label
                  </Button>
                  <TextField
                    value={searchField}
                    onChange={e => setSearchField(e.target.value)}
                    id='outlined-start-adornment'
                    sx={{ marginBottom: '15px', width: '40ch' }}
                    placeholder='Search'
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position='start'>
                          <SearchOutlinedIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Box>
              </Box>
              {user?.type == 'kitchen-admin' ? (
                <>
                  {labelPermissions?.get ? (
                    <></>
                  ) : (
                    <Row className='py-4 justify-content-center align-items-center'>
                      You don't have the permission to access the page
                    </Row>
                  )}
                </>
              ) : (
                <LabelDataTable
                  tableItems={labelsData}
                  edittoggle={edittoggle}
                  deleteLabel={deleteLabel}
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
          {'Add Label Details'}
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
                Label Name
              </FormHelperText>
              <OutlinedInput
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                required
                value={labelName}
                onChange={e => setlabelName(e.target.value)}
              />
            </FormControl>
            <Typography textAlign={'center'} margin={2}>
              Label Items
            </Typography>
            <Box>
              <Grid container spacing={2}>
                {labelIcons.map(item => (
                  <Grid item xs={2}>
                    <Avatar
                      onClick={() => handleIconClick(item.name)}
                      alt='Remy Sharp'
                      sx={{
                        width: '80px',
                        height: '80px',
                        cursor: 'pointer',
                        boxShadow: `${
                          selectedIcon === item.name
                            ? '10px 10px 10px 0px #DDDDDD'
                            : ''
                        }`
                      }}
                      src={item.icon}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
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
            variant='contained'
            style={{ margin: '20px' }}
            onClick={addLabel}
            autoFocus
          >
            {addLabelLoader ? <Spinner size='md' /> : 'Save'}
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
          {'Edit Label Details'}
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
                Label Name
              </FormHelperText>
              <OutlinedInput
                value={labelName}
                required
                onChange={e => setlabelName(e.target.value)}
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
              />
            </FormControl>
            <Box>
              <Grid container spacing={2}>
                {labelIcons.map(item => (
                  <Grid item xs={2}>
                    <Avatar
                      onClick={() => handleIconClick(item.name)}
                      alt='Remy Sharp'
                      sx={{
                        width: '80px',
                        height: '80px',
                        cursor: 'pointer',
                        boxShadow: `${
                          selectedIcon === item.name
                            ? '10px 10px 10px 0px #DDDDDD'
                            : ''
                        }`
                      }}
                      src={item.icon}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
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
            onClick={editLabel}
            autoFocus
          >
            {editLabelLoader ? <Spinner size='md' /> : 'Update'}
          </Button>
        </DialogActions>
      </Dialog>
      {/* Modal for edit restaurant Details */}
      {/* <div>
        <Modal isOpen={editModal} toggle={edittoggle}>
          <ModalHeader toggle={edittoggle}>Edit Label Details</ModalHeader>
          <ModalBody>
            <Form
              onSubmit={e => {
                e.preventDefault()
                dispatch(
                  editlabel(labelID, labelName, labelDescription, () => {
                    setLabelDescription('')
                    setlabelName('')
                    setlabelID('')
                    setEditModal(false)
                  })
                )
              }}
            >
              <FormGroup>
                <Label for='name'>Label Name</Label>
                <Input
                  type='text'
                  required
                  value={labelName}
                  onChange={e => setlabelName(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Label for='location'>Description</Label>
                <Input
                  type='textarea'
                  value={labelDescription}
                  onChange={e => setLabelDescription(e.target.value)}
                />
              </FormGroup>

              <div className='d-flex justify-content-end'>
                <Button variant='contained'>
                  {editLabelLoader ? <Spinner size='sm' /> : 'Update'}
                </Button>
              </div>
            </Form>
          </ModalBody>
        </Modal>
      </div> */}
    </>
  )
}

export default LabelsMenu
