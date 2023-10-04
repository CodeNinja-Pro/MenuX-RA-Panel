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
  IconButton
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
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import CachedIcon from '@mui/icons-material/Cached'

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

  const [labelImage, setLabelImage] = useState('')
  const [labelImageFile, setLabelImageFile] = useState([])

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
          labelImageFile,
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
        editlabel(labelID, labelName, labelImageFile, () => {
          setlabelName('')
          setlabelID('')
          setLabelImageFile([])
          setEditModal(false)
        })
      )
    } else {
      toast.error('Label Name is required.')
    }
  }

  // File Upload
  const onBannerButtonClick = () => {
    logoRef.current.click()
  }

  const bannerImageHandleChange = file => {
    // const file = e.target.files[0]
    console.log(file)
    if (file.size > 3000000) {
      toast.error('Error: Image size is too big', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      return
    }
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png']

    if (!validFormats.includes(file.type)) {
      toast.error(
        `Error: Invalid file format. Please select a .jpg, .jpeg, or .png image.`,
        {
          style: {
            fontFamily: 'Poppins'
          }
        }
      )
      return
    }

    setLabelImage(URL.createObjectURL(file))
    setLabelImageFile(file)
  }

  const [dragActive, setDragActive] = React.useState(false)
  // ref
  const logoRef = React.useRef(null)

  // handle drag events
  const handleDrag = function (e) {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true)
    } else if (e.type === 'dragleave') {
      setDragActive(false)
    }
  }

  // triggers when file is dropped
  const handleLogoDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      bannerImageHandleChange(e.dataTransfer.files[0])
    }
  }

  // triggers when file is selected with click
  const handleLogoChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      bannerImageHandleChange(e.target.files[0])
    }
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
                  <Grid item xs={6} lg={7}>
                    <Typography
                      textAlign={'left'}
                      marginLeft={2}
                      fontWeight={'bold'}
                      fontSize={'22px'}
                    >
                      Labels
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    lg={2}
                    display={'flex'}
                    alignItems={'center'}
                  >
                    <Button
                      variant='contained'
                      onClick={addtoggle}
                      sx={{ marginBottom: '15px' }}
                    >
                      Create a new label
                    </Button>
                  </Grid>
                  <Grid item xs={12} lg={3}>
                    <TextField
                      fullWidth
                      value={searchField}
                      onChange={e => setSearchField(e.target.value)}
                      id='outlined-start-adornment'
                      sx={{ marginBottom: '15px' }}
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
                </Grid>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                ></Box>
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
      <Dialog
        open={addModal}
        onClose={() => {
          setAddModal(false)
          setLabelImageFile([])
          setLabelImage('')
        }}
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
          {'Add New Label'}
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
            <Box
              marginTop={2}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Box>
                <form
                  id='form-file-upload'
                  onDragEnter={handleDrag}
                  onSubmit={e => e.preventDefault()}
                >
                  <input
                    ref={logoRef}
                    type='file'
                    id='input-file-upload'
                    multiple={true}
                    onChange={handleLogoChange}
                  />
                  {labelImage === '' ? (
                    <>
                      <label
                        id='label-file-upload'
                        htmlFor='input-file-upload'
                        style={{ width: '230px', height: '230px' }}
                        className={dragActive ? 'drag-active' : ''}
                      >
                        <div>
                          <p>Only *.JPG, *.JPEG, *.PNG and less then 2MB</p>
                          <FileUploadOutlinedIcon fontSize='large' />
                          <button
                            className='upload-button'
                            onClick={onBannerButtonClick}
                            style={{
                              height: '100px',
                              width: '100%'
                            }}
                          >
                            <Typography>Upload a file</Typography>
                          </button>
                        </div>
                      </label>
                      {dragActive && (
                        <div
                          id='drag-file-element'
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleLogoDrop}
                        ></div>
                      )}
                    </>
                  ) : (
                    <img
                      id='label-file-upload'
                      htmlFor='input-file-upload'
                      style={{ width: '100%', height: '230px' }}
                      src={labelImage}
                    />
                  )}
                </form>
              </Box>
              <IconButton
                onClick={() => {
                  setLabelImage('')
                  setLabelImageFile({})
                }}
                style={{ marginTop: '-20px' }}
              >
                <CachedIcon />
              </IconButton>
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
            disabled={!labelName}
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
          {'Edit the Label'}
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
            <Box
              marginTop={2}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
              flexDirection={'column'}
            >
              <Box>
                <form
                  id='form-file-upload'
                  onDragEnter={handleDrag}
                  onSubmit={e => e.preventDefault()}
                >
                  <input
                    ref={logoRef}
                    type='file'
                    id='input-file-upload'
                    multiple={true}
                    onChange={handleLogoChange}
                  />
                  {labelImage === '' ? (
                    <>
                      <label
                        id='label-file-upload'
                        htmlFor='input-file-upload'
                        style={{ width: '230px', height: '230px' }}
                        className={dragActive ? 'drag-active' : ''}
                      >
                        <div>
                          <p>Only *.JPG, *.JPEG, *.PNG and less then 2MB</p>
                          <FileUploadOutlinedIcon fontSize='large' />
                          <button
                            className='upload-button'
                            onClick={onBannerButtonClick}
                            style={{
                              height: '100px',
                              width: '100%'
                            }}
                          >
                            <Typography>Upload a file</Typography>
                          </button>
                        </div>
                      </label>
                      {dragActive && (
                        <div
                          id='drag-file-element'
                          onDragEnter={handleDrag}
                          onDragLeave={handleDrag}
                          onDragOver={handleDrag}
                          onDrop={handleLogoDrop}
                        ></div>
                      )}
                    </>
                  ) : (
                    <img
                      id='label-file-upload'
                      htmlFor='input-file-upload'
                      style={{ width: '100%', height: '230px' }}
                      src={labelImage}
                    />
                  )}
                </form>
              </Box>
              <IconButton
                onClick={() => {
                  setLabelImage('')
                  setLabelImageFile({})
                }}
                style={{ marginTop: '-20px' }}
              >
                <CachedIcon />
              </IconButton>
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
            disabled={!labelName}
            variant='contained'
            style={{ margin: '20px' }}
            onClick={editLabel}
            autoFocus
          >
            {editLabelLoader ? <Spinner size='md' /> : 'Save'}
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
