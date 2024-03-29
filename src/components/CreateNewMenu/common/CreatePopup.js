import React, { useEffect, useState } from 'react'
import {
  CardContent,
  Card,
  ThemeProvider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  OutlinedInput,
  IconButton,
  Box,
  Button,
  CardMedia,
  LinearProgress
} from '@mui/material'
import { ThemeMain } from '../../common/Theme'
import { Col, Container, Row } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import CachedIcon from '@mui/icons-material/Cached'
import {
  addPopup,
  updatePopup
} from '../../../store/actions/MenuManagmentActions'

export default function CreatePopup (props) {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { popupLoader } = useSelector(state => state.menu)
  const { popups } = useSelector(state => state.menu)

  const [bannerImage, setBannerImage] = useState('')
  const [bannerFile, setBannerFile] = useState([])

  const [heading, setHeading] = useState('')
  const [text, setText] = useState('')
  const [delay, setDelay] = useState('')
  const [prevImage, setPrevImage] = useState('')

  useEffect(() => {
    if (props.selectedID !== '') {
      const selectedPopup = popups.filter(
        popup => popup.id === props.selectedID
      )
      setHeading(selectedPopup[0].heading)
      setText(selectedPopup[0].text)
      setDelay(selectedPopup[0].delay)
      setPrevImage(selectedPopup[0].bannerImage)
    }
  }, [props])

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

    setBannerImage(URL.createObjectURL(file))
    setBannerFile(file)
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

  const handlePopup = () => {
    const newPopup = {
      heading,
      text,
      delay
    }
    dispatch(
      addPopup(user.restaurantID, newPopup, bannerFile, () => {
        setHeading('')
        setText('')
        setDelay('')
        setBannerFile([])
        setBannerImage('')
        toast.success('You added new Popup successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      })
    )
  }

  const handleUpdatePopup = () => {
    const newPopup = {
      heading,
      text,
      delay
    }
    dispatch(
      updatePopup(
        user.restaurantID,
        prevImage,
        props.selectedID,
        newPopup,
        bannerFile,
        () => {
          setHeading('')
          setText('')
          setDelay('')
          setBannerFile([])
          setBannerImage('')
          toast.success('You updated current Popup successfully.', {
            style: {
              fontFamily: 'Poppins'
            }
          })
        }
      )
    )
  }

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Container fluid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={8}>
              <Card sx={{ boxShadow: 'none' }}>
                <Typography
                  textAlign={'left'}
                  fontSize={'20px'}
                  fontWeight={'bold'}
                >
                  {props.popupStatus === 'create'
                    ? 'New Marketing Banner'
                    : 'Edit Marketing Banner'}
                </Typography>
                <CardContent>
                  <Row>
                    <Col sm='6' lg={{ size: 4 }}>
                      <FormControl fullWidth variant='outlined'>
                        <FormHelperText
                          style={{ fontSize: '18px' }}
                          id='outlined-weight-helper-text'
                        >
                          Heading
                        </FormHelperText>
                        <OutlinedInput
                          id='outlined-adornment-weight'
                          aria-describedby='outlined-weight-helper-text'
                          inputProps={{
                            'aria-label': 'weight'
                          }}
                          placeholder='ABC'
                          value={heading}
                          onChange={e => setHeading(e.target.value)}
                        />
                      </FormControl>
                      <FormControl fullWidth variant='outlined'>
                        <FormHelperText
                          style={{ fontSize: '18px' }}
                          id='outlined-weight-helper-text'
                        >
                          Text
                        </FormHelperText>
                        <OutlinedInput
                          id='outlined-adornment-weight'
                          aria-describedby='outlined-weight-helper-text'
                          inputProps={{
                            'aria-label': 'weight'
                          }}
                          placeholder='Get 30% off on entire menu'
                          value={text}
                          onChange={e => setText(e.target.value)}
                        />
                      </FormControl>
                      <FormControl fullWidth variant='outlined'>
                        <FormHelperText
                          style={{ fontSize: '18px' }}
                          id='outlined-weight-helper-text'
                        >
                          Delay
                        </FormHelperText>
                        <OutlinedInput
                          id='outlined-adornment-weight'
                          aria-describedby='outlined-weight-helper-text'
                          inputProps={{
                            'aria-label': 'weight'
                          }}
                          type='number'
                          placeholder='30 secs'
                          value={delay}
                          onChange={e => setDelay(e.target.value)}
                        />
                      </FormControl>
                      <Button
                        sx={{ marginTop: 3 }}
                        fullWidth
                        variant='contained'
                        disabled={!delay}
                        onClick={() =>
                          `${
                            props.popupStatus === 'create'
                              ? handlePopup()
                              : handleUpdatePopup()
                          }`
                        }
                      >
                        {popupLoader === true ? (
                          <LinearProgress />
                        ) : (
                          `${
                            props.popupStatus === 'create' ? 'Save' : 'Update'
                          }`
                        )}
                      </Button>
                    </Col>
                    <Col sm='6' lg={{ size: 3, offset: 2 }}>
                      <p>Upload Banner</p>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          alignItems: 'center'
                        }}
                      >
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
                          {bannerImage === '' ? (
                            <>
                              <label
                                id='label-file-upload'
                                htmlFor='input-file-upload'
                                style={{ width: '230px', height: '230px' }}
                                className={dragActive ? 'drag-active' : ''}
                              >
                                <div>
                                  <p>
                                    Only *.JPG, *.JPEG, *.PNG and less then 2MB
                                  </p>
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
                              src={bannerImage}
                            />
                          )}
                        </form>
                      </div>
                      <IconButton
                        onClick={() => {
                          setBannerImage('')
                          setBannerFile({})
                        }}
                        style={{ marginTop: '-20px' }}
                      >
                        <CachedIcon />
                      </IconButton>
                    </Col>
                  </Row>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} lg={4}>
              <Card sx={{ boxShadow: 'none', height: '100%' }}>
                <CardContent>
                  <Box marginTop={1}>
                    <Typography fontWeight={'bold'} fontSize={'20px'}>
                      {heading}
                    </Typography>
                    <Typography marginBottom={1}>{text}</Typography>
                    <Box display={'flex'} justifyContent={'center'}>
                      <Box
                        width={'80%'}
                        height={'250px'}
                        sx={{
                          border: 'dashed',
                          borderRadius: '10px',
                          borderWidth: '1px'
                        }}
                      >
                        {bannerImage ? (
                          <CardMedia
                            width={'100%'}
                            height={'100%'}
                            component={'img'}
                            sx={{ borderRadius: '10px' }}
                            image={bannerImage}
                            alt='Banner Image'
                          />
                        ) : (
                          ''
                        )}
                      </Box>
                    </Box>
                    <Button variant='contained' sx={{ marginTop: 2 }}>
                      Close
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
      </ThemeProvider>
    </>
  )
}
