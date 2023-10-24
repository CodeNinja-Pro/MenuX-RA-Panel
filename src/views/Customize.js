import OnlyHeader from '../components/Headers/OnlyHeader'
import React, { useEffect } from 'react'

import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  Grid,
  FormControlLabel,
  Switch,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  Divider,
  IconButton,
  ThemeProvider,
  Slider
} from '@mui/material'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import CachedIcon from '@mui/icons-material/Cached'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

import { styled } from '@mui/material'
import { toast } from 'react-toastify'

import { Container, Row, Col, Spinner } from 'reactstrap'
import ColorPickerCP from '../components/common/ColorPickerCP'
import FontCP from '../components/common/FontCP'
import MobileCP from '../components/common/MobileCP'
import FontSizeCP from '../components/common/FontSizeCP'
import {
  addCustomization,
  getCustomization,
  removeImage
} from '../store/actions/customization'
import { ThemeMain } from '../components/common/Theme'
import { useHistory } from 'react-router-dom'
import 'alertifyjs/build/css/alertify.css'
import 'alertifyjs/build/css/themes/default.css'
import { getCurrentRoleDetail } from '../store/actions/staffAction'

function Customize () {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  useEffect(() => {
    dispatch(getCustomization(user.restaurantID))
  }, [])
  const { restaurantMedia } = useSelector(state => state.restaurant)

  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    const obj = currentRoleDetail.filter(
      obj => obj.permission === 'Customization'
    )
    if (obj[0]?.allow === 'ViewEdit') {
      setSectionPermission(true)
    } else {
      setSectionPermission(false)
    }
  }, [currentRoleDetail])

  const disableOnTrue = flag => {
    return {
      opacity: flag ? 1 : 0.8,
      pointerEvents: flag ? 'initial' : 'none'
    }
  }

  const history = useHistory()

  useEffect(() => {
    const unlisten = history.block((location, action) => {
      if (
        action === 'POP' ||
        window.confirm(
          'You have unsaved changes.Are you sure you want to leave this page?'
        )
      ) {
        return true
      } else {
        return false
      }
    })

    return () => {
      unlisten()
    }
  }, [])

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff'
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be'
        }
      }
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&:before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
      }
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2
    }
  }))

  let data =
    user?.type !== 'kitchen-admin'
      ? user?.restaurantImages
        ? user?.restaurantImages
        : []
      : restaurantMedia?.images
      ? restaurantMedia?.images
      : []

  let logo =
    user?.type !== 'kitchen-admin'
      ? user?.restaurantLogo
        ? user?.restaurantLogo
        : ''
      : restaurantMedia.logo
      ? restaurantMedia.logo
      : []

  const customization = useSelector(state => state.customization)

  const [confirmModal, setConfirmModal] = useState(false)

  const [mainFont, setMainFont] = useState('')
  const [secondaryFont, setSecondaryFont] = useState('')

  const [categoryColor, setCategoryColor] = useState('')
  const categoryColorChange = e => {
    setCategoryColor(e.target.value)
  }
  const [borderColor, setBorderColor] = useState('')
  const borderColorChange = e => {
    setBorderColor(e.target.value)
  }

  const [priceColor, setPriceColor] = useState('')
  const priceColorChange = e => {
    setPriceColor(e.target.value)
  }

  const [itemColor, setItemColor] = useState('')
  const itemColorChange = e => {
    setItemColor(e.target.value)
  }

  const [backgroundColor, setBackgroundColor] = useState('')
  const backgroundColorChange = e => {
    setBackgroundColor(e.target.value)
  }

  const [entireColor, setEntireColor] = useState('')
  const entireColorChange = e => {
    setEntireColor(e.target.value)
  }

  const [fontSize, setFontSize] = useState('18')
  const onFontSizeChange = e => {
    setFontSize(e.target.value)
  }

  const [secondaryFontSize, setSecondaryFontSize] = useState('15')

  const [logoImage, setLogoImage] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [backgroundImage, setBackgroundImage] = useState('')
  const [logoFile, setLogoFile] = useState([])
  const [coverFile, setCoverFile] = useState([])
  const [backgroundFile, setBackgroundFile] = useState([])
  const [colorMode, setColorMode] = useState(true)

  const [patternSize, setPatternSize] = useState('3')
  const onPatternSizeChange = e => {
    setPatternSize(e.target.value)
  }

  const [patternTilt, setPatternTilt] = useState('0')
  const onPatternTiltChange = e => {
    setPatternTilt(e.target.value)
  }
  const [fontWeight, setFontWeight] = useState(false)

  const [savedFlag, setSavedFlag] = useState(false)

  const [theme, setTheme] = useState({
    logoImage: '',
    coverImage: '',
    backgroundImage: '',
    categoryTextColor: categoryColor,
    itemBorderColor: borderColor,
    priceTextColor: priceColor,
    itemTextColor: itemColor,
    itemBackgroundColor: backgroundColor,
    entireBackgroundColor: entireColor,
    mainFont: '',
    secondaryFont: '',
    mainFontSize: '',
    secondaryFontSize: '',
    colorMode: true,
    patternSize,
    patternTilt,
    itemFontWeight: false
  })

  const removeImageHandle = (target, url) => {
    dispatch(
      removeImage(
        user.restaurantID,
        customization.customization.id,
        target,
        url
      )
    )
  }

  useEffect(() => {
    setSavedFlag(true)
    setTheme({
      ...theme,
      logoImage,
      coverImage,
      backgroundImage,
      categoryTextColor: categoryColor,
      itemBorderColor: borderColor,
      priceTextColor: priceColor,
      itemTextColor: itemColor,
      itemBackgroundColor: backgroundColor,
      entireBackgroundColor: entireColor,
      mainFont,
      secondaryFont,
      mainFontSize: fontSize,
      secondaryFontSize,
      colorMode,
      patternSize,
      patternTilt,
      itemFontWeight: fontWeight
    })
  }, [
    logoImage,
    coverImage,
    backgroundImage,
    categoryColor,
    borderColor,
    priceColor,
    itemColor,
    backgroundColor,
    entireColor,
    mainFont,
    secondaryFont,
    fontSize,
    secondaryFontSize,
    colorMode,
    patternSize,
    patternTilt,
    fontWeight
  ])

  useEffect(() => {
    if (customization.customization.length === 0) {
      setMainFont('Poppins')
      setSecondaryFont('Poppins')
      setCategoryColor('#000000')
      setBorderColor('#000000')
      setItemColor('#000000')
      setPriceColor('#000000')
      setBackgroundColor('#ffffff')
      setEntireColor('#ffffff')
      setFontSize('18')
      setSecondaryFontSize('15')
      setLogoImage('')
      setCoverImage('')
      setBackgroundImage('')
      setColorMode(true)
      setPatternSize('3')
      setPatternTilt('0')
      setFontWeight(false)
    } else {
      setMainFont(customization.customization.mainFont)
      setSecondaryFont(customization.customization.secondaryFont)
      setCategoryColor(customization.customization.categoryTextColor)
      setFontSize(customization.customization.mainFontSize)
      setSecondaryFontSize(customization.customization.secondaryFontSize)
      setBorderColor(customization.customization.itemBorderColor)
      setItemColor(customization.customization.itemTextColor)
      setPriceColor(customization.customization.priceTextColor)
      setBackgroundColor(customization.customization.itemBackgroundColor)
      setEntireColor(customization.customization.entireBackgroundColor)
      setLogoImage(customization.customization.logoImage)
      setCoverImage(customization.customization.coverImage)
      setBackgroundImage(customization.customization.backgroundImage)
      setColorMode(customization.customization.colorMode)
      setPatternSize(customization.customization.patternSize)
      setPatternTilt(customization.customization.patternTilt)
      setFontWeight(customization.customization.itemFontWeight)
    }
  }, [customization.customization])

  const logoImageHandleChange = file => {
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
    setLogoImage(URL.createObjectURL(file))
    setLogoFile(file)
  }

  const coverImageHandleChange = file => {
    if (file.size > 2000000) {
      toast.error('Error: Image size is too big')
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

    setCoverImage(URL.createObjectURL(file))
    setCoverFile(file)
  }

  const backgroundImageHandleChange = file => {
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

    setBackgroundImage(URL.createObjectURL(file))
    setBackgroundFile(file)
  }

  const onSelectColorMode = () => {
    if (!colorMode) {
      setCategoryColor('#000000')
      setBorderColor('#000000')
      setItemColor('#000000')
      setPriceColor('#000000')
      setBackgroundColor('#ffffff')
      setEntireColor('#ffffff')
    } else {
      setCategoryColor('#ffffff')
      setBorderColor('#ffffff')
      setItemColor('#ffffff')
      setPriceColor('#ffffff')
      setBackgroundColor('#121212')
      setEntireColor('#121212')
    }
    setColorMode(!colorMode)
  }

  const onConfirmClick = () => {
    setSavedFlag(true)
    dispatch(
      addCustomization(
        user.restaurantID,
        logoFile,
        coverFile,
        backgroundFile,
        theme
      )
    )
  }

  // File Drag and Drop Upload
  const [dragActive, setDragActive] = React.useState(false)
  // ref
  const logoRef = React.useRef(null)
  const coverRef = React.useRef(null)
  const backgroundRef = React.useRef(null)

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
  const handleBackgroundDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      backgroundImageHandleChange(e.dataTransfer.files[0])
    }
  }

  // triggers when file is selected with click
  const handleBackgroundChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      backgroundImageHandleChange(e.target.files[0])
    }
  }

  const handleLogoDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      logoImageHandleChange(e.dataTransfer.files[0])
    }
  }

  // triggers when file is selected with click
  const handleLogoChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      logoImageHandleChange(e.target.files[0])
    }
  }

  const handleCoverDrop = function (e) {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      coverImageHandleChange(e.dataTransfer.files[0])
    }
  }

  // triggers when file is selected with click
  const handleCoverChange = function (e) {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      coverImageHandleChange(e.target.files[0])
    }
  }

  // triggers the input when the button is clicked
  const onLogoButtonClick = () => {
    logoRef.current.click()
  }

  const onCoverButtonClick = () => {
    coverRef.current.click()
  }

  const onBackgroundButtonClick = () => {
    backgroundRef.current.click()
  }

  const valuetext = value => {
    return `${value}°`
  }

  const onFontWeightChange = e => {
    setFontWeight(!fontWeight)
  }

  const label = { inputProps: { 'aria-label': 'Switch demo' } }

  return (
    <>
      <OnlyHeader />

      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            {customization.loading ? (
              <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                <Spinner size={'lg'} className='text-primary'></Spinner>
              </div>
            ) : (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <Row>
                  <Col xs={12} lg={8}>
                    <Card className='shadow'>
                      <CardContent>
                        <Container fluid>
                          <Row>
                            <Col xs='12'>
                              <Row>
                                <Col xl='4' md='6' xs='12'>
                                  <p>App Logo</p>
                                  {customization.loading ? (
                                    <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                                      <Spinner
                                        size={'lg'}
                                        className='text-primary'
                                      ></Spinner>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center'
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
                                            style={{
                                              width: '100px'
                                            }}
                                          />
                                          {logoImage === '' ? (
                                            <>
                                              <label
                                                id='label-file-upload'
                                                htmlFor='input-file-upload'
                                                className={
                                                  dragActive
                                                    ? 'drag-active'
                                                    : ''
                                                }
                                              >
                                                <div>
                                                  <p>
                                                    Only *.JPG, *.JPEG, *.PNG
                                                    and less then 2MB
                                                  </p>
                                                  <FileUploadOutlinedIcon
                                                    sx={{
                                                      width: '50px',
                                                      height: '50px'
                                                    }}
                                                  />
                                                  <button
                                                    className='upload-button'
                                                    onClick={onLogoButtonClick}
                                                    style={{
                                                      height: '100px',
                                                      width: '100%'
                                                    }}
                                                  >
                                                    <Typography>
                                                      Upload a file
                                                    </Typography>
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
                                              style={{ width: '100%' }}
                                              // className={dragActive ? 'drag-active' : ''}
                                              src={logoImage}
                                            />
                                          )}
                                        </form>
                                      </div>
                                      <Box
                                        marginTop={'10px'}
                                        display={'flex'}
                                        justifyContent={'space-around'}
                                      >
                                        <IconButton
                                          onClick={() =>
                                            removeImageHandle(
                                              'logoImage',
                                              logoImage
                                            )
                                          }
                                        >
                                          <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            setLogoImage('')
                                            setLogoFile([])
                                          }}
                                        >
                                          <CachedIcon />
                                        </IconButton>
                                      </Box>
                                    </>
                                  )}
                                </Col>
                                <Col xl='4' md='6' xs='12'>
                                  <p>Cover</p>
                                  {customization.loading ? (
                                    <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                                      <Spinner
                                        size={'lg'}
                                        className='text-primary'
                                      ></Spinner>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center'
                                        }}
                                      >
                                        <form
                                          id='form-file-upload'
                                          onDragEnter={handleDrag}
                                          onSubmit={e => e.preventDefault()}
                                        >
                                          <input
                                            ref={coverRef}
                                            type='file'
                                            id='input-file-upload'
                                            multiple={true}
                                            onChange={handleCoverChange}
                                            style={{
                                              width: '100px'
                                            }}
                                          />
                                          {coverImage === '' ? (
                                            <>
                                              <label
                                                id='label-file-upload'
                                                htmlFor='input-file-upload'
                                                className={
                                                  dragActive
                                                    ? 'drag-active'
                                                    : ''
                                                }
                                              >
                                                <div>
                                                  <p>
                                                    Only *.JPG, *.JPEG, *.PNG
                                                    and less then 2MB
                                                  </p>
                                                  <FileUploadOutlinedIcon
                                                    sx={{
                                                      width: '50px',
                                                      height: '50px'
                                                    }}
                                                  />
                                                  <button
                                                    className='upload-button'
                                                    onClick={onCoverButtonClick}
                                                    style={{
                                                      height: '100px',
                                                      width: '100%'
                                                    }}
                                                  >
                                                    <Typography>
                                                      Upload a file
                                                    </Typography>
                                                  </button>
                                                </div>
                                              </label>
                                              {dragActive && (
                                                <div
                                                  id='drag-file-element'
                                                  onDragEnter={handleDrag}
                                                  onDragLeave={handleDrag}
                                                  onDragOver={handleDrag}
                                                  onDrop={handleCoverDrop}
                                                ></div>
                                              )}
                                            </>
                                          ) : (
                                            <img
                                              id='label-file-upload'
                                              htmlFor='input-file-upload'
                                              style={{ width: '100%' }}
                                              // className={dragActive ? 'drag-active' : ''}
                                              src={coverImage}
                                              onmouseover='showDeleteButton(this)'
                                              onmouseout='hideDeleteButton(this)'
                                            />
                                          )}
                                        </form>
                                      </div>
                                      <Box
                                        marginTop={'10px'}
                                        display={'flex'}
                                        justifyContent={'space-around'}
                                      >
                                        <IconButton
                                          onClick={() =>
                                            removeImageHandle(
                                              'coverImage',
                                              coverImage
                                            )
                                          }
                                        >
                                          <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            setCoverImage('')
                                            setCoverFile([])
                                          }}
                                        >
                                          <CachedIcon />
                                        </IconButton>
                                      </Box>
                                    </>
                                  )}
                                </Col>
                                <Col xl='4' md='6' xs='12'>
                                  <p>Background Pattern 1:1</p>
                                  {customization.loading ? (
                                    <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
                                      <Spinner
                                        size={'lg'}
                                        className='text-primary'
                                      ></Spinner>
                                    </div>
                                  ) : (
                                    <>
                                      <div
                                        style={{
                                          display: 'flex',
                                          justifyContent: 'center'
                                        }}
                                      >
                                        <form
                                          id='form-file-upload'
                                          onDragEnter={handleDrag}
                                          onSubmit={e => e.preventDefault()}
                                        >
                                          <input
                                            ref={backgroundRef}
                                            type='file'
                                            id='input-file-upload'
                                            multiple={true}
                                            onChange={handleBackgroundChange}
                                            style={{
                                              width: '100px'
                                            }}
                                          />
                                          {backgroundImage === '' ? (
                                            <>
                                              <label
                                                id='label-file-upload'
                                                htmlFor='input-file-upload'
                                                className={
                                                  dragActive
                                                    ? 'drag-active'
                                                    : ''
                                                }
                                              >
                                                <div>
                                                  <p>
                                                    Only *.JPG, *.JPEG, *.PNG
                                                    and less then 2MB
                                                  </p>
                                                  <FileUploadOutlinedIcon
                                                    sx={{
                                                      width: '50px',
                                                      height: '50px'
                                                    }}
                                                  />
                                                  <button
                                                    className='upload-button'
                                                    onClick={
                                                      onBackgroundButtonClick
                                                    }
                                                    style={{
                                                      height: '100px',
                                                      width: '100%'
                                                    }}
                                                  >
                                                    <Typography>
                                                      Upload a file
                                                    </Typography>
                                                  </button>
                                                </div>
                                              </label>
                                              {dragActive && (
                                                <div
                                                  id='drag-file-element'
                                                  onDragEnter={handleDrag}
                                                  onDragLeave={handleDrag}
                                                  onDragOver={handleDrag}
                                                  onDrop={handleBackgroundDrop}
                                                ></div>
                                              )}
                                            </>
                                          ) : (
                                            <img
                                              id='label-file-upload'
                                              htmlFor='input-file-upload'
                                              style={{ width: '100%' }}
                                              // className={dragActive ? 'drag-active' : ''}
                                              src={backgroundImage}
                                            />
                                          )}
                                        </form>
                                      </div>
                                      <Box
                                        marginTop={'10px'}
                                        display={'flex'}
                                        justifyContent={'space-around'}
                                      >
                                        <IconButton
                                          onClick={() =>
                                            removeImageHandle(
                                              'backgroundImage',
                                              backgroundImage
                                            )
                                          }
                                        >
                                          <DeleteOutlineOutlinedIcon />
                                        </IconButton>
                                        <IconButton
                                          onClick={() => {
                                            setBackgroundImage('')
                                            setBackgroundFile([])
                                          }}
                                        >
                                          <CachedIcon />
                                        </IconButton>
                                      </Box>
                                      {backgroundImage !== '' ? (
                                        <>
                                          <Typography>Size</Typography>
                                          <Slider
                                            aria-label='Temperature'
                                            defaultValue={3}
                                            // getAriaValueText={valuetext}
                                            valueLabelDisplay='auto'
                                            value={patternSize}
                                            onChange={onPatternSizeChange}
                                            step={1}
                                            marks
                                            min={1}
                                            max={10}
                                          />
                                          <Typography>Tilt</Typography>
                                          <Slider
                                            aria-label='Temperature'
                                            defaultValue={30}
                                            // getAriaValueText={valuetext}
                                            valueLabelDisplay='auto'
                                            value={patternTilt}
                                            onChange={onPatternTiltChange}
                                            step={10}
                                            marks
                                            min={0}
                                            max={360}
                                          />
                                        </>
                                      ) : (
                                        ''
                                      )}
                                    </>
                                  )}
                                </Col>
                              </Row>
                              <Row>
                                <Col>
                                  <h3
                                    style={{
                                      marginTop: '30px',
                                      marginBottom: '30px',
                                      textAlign: 'left'
                                    }}
                                  >
                                    Colors
                                  </h3>
                                </Col>
                              </Row>
                              <Row>
                                <Grid container spacing={3}>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <ColorPickerCP
                                      title={'Category Text Color'}
                                      currentColor={categoryColor}
                                      setColor={setCategoryColor}
                                      colorChange={categoryColorChange}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <ColorPickerCP
                                      title={'Item Border Color'}
                                      currentColor={borderColor}
                                      setColor={setBorderColor}
                                      colorChange={borderColorChange}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <ColorPickerCP
                                      title={'Price Text Color'}
                                      currentColor={priceColor}
                                      setColor={setPriceColor}
                                      colorChange={priceColorChange}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <ColorPickerCP
                                      title={'Item Text Color'}
                                      currentColor={itemColor}
                                      setColor={setItemColor}
                                      colorChange={itemColorChange}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <ColorPickerCP
                                      title={'Item Background Color'}
                                      currentColor={backgroundColor}
                                      setColor={setBackgroundColor}
                                      colorChange={backgroundColorChange}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <ColorPickerCP
                                      title={'Background Color'}
                                      currentColor={entireColor}
                                      setColor={setEntireColor}
                                      colorChange={entireColorChange}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <Box
                                      display={'flex'}
                                      justifyContent={'space-between'}
                                    >
                                      <Typography
                                        marginTop={'10px'}
                                        marginLeft={'30px'}
                                      >
                                        Header(Light/Dark)
                                      </Typography>
                                      <FormControlLabel
                                        onClick={onSelectColorMode}
                                        checked={!colorMode}
                                        control={
                                          <MaterialUISwitch
                                            sx={{ m: 1 }}
                                            defaultChecked={false}
                                          />
                                        }
                                      />
                                    </Box>
                                  </Grid>
                                </Grid>
                              </Row>
                              <Row>
                                <Col>
                                  <h3
                                    style={{
                                      marginTop: '30px',
                                      marginBottom: '30px',
                                      textAlign: 'left'
                                    }}
                                  >
                                    Fonts
                                  </h3>
                                </Col>
                              </Row>
                              <Row>
                                <Grid
                                  container
                                  marginBottom={'20px'}
                                  spacing={4}
                                >
                                  <Grid item xl={5} md={5} xs={12}>
                                    <FontSizeCP
                                      title='Primary Text Font(menu/category/item)'
                                      size={fontSize}
                                      setSize={onFontSizeChange}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    {/* <FontSizeCP
                                    title='Secondary Font'
                                    size={secondaryFontSize}
                                    setSize={onSecondaryFontSizeChange}
                                  /> */}
                                    <Typography>Primary Text Weight</Typography>
                                    <Switch
                                      value={fontWeight}
                                      onChange={onFontWeightChange}
                                      sx={{ marginTop: '10px' }}
                                      {...label}
                                    />
                                  </Grid>
                                </Grid>
                              </Row>
                              <Row>
                                <Grid
                                  container
                                  marginBottom={'20px'}
                                  spacing={4}
                                >
                                  <Grid item xl={5} md={5} xs={12}>
                                    <FontCP
                                      title={
                                        'Primary Text Font(menu/category/item name)'
                                      }
                                      fontFamily={mainFont}
                                      setFontFamily={setMainFont}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <Typography fontFamily={mainFont}>
                                      We love MenuX
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Row>
                              <Row>
                                <Grid
                                  container
                                  marginBottom={'20px'}
                                  spacing={4}
                                >
                                  <Grid item xl={5} md={5} xs={12}>
                                    <FontCP
                                      title={'Secondary Font'}
                                      fontFamily={secondaryFont}
                                      setFontFamily={setSecondaryFont}
                                    />
                                  </Grid>
                                  <Grid item xl={5} md={5} xs={12}>
                                    <Typography fontFamily={secondaryFont}>
                                      We love MenuX
                                    </Typography>
                                  </Grid>
                                </Grid>
                              </Row>
                            </Col>
                          </Row>
                        </Container>
                      </CardContent>
                    </Card>
                  </Col>
                  <Col xs={12} lg={4}>
                    <div
                      style={{
                        position: `${
                          window.innerWidth < 768 ? 'relative' : 'fixed'
                        }`,
                        top: `${window.innerWidth < 768 ? '50px' : '100px'}`,
                        padding: '5px'
                      }}
                    >
                      <Typography
                        marginBottom={2}
                        fontWeight={'bold'}
                        fontSize={'20px'}
                      >
                        Menu Preview
                      </Typography>
                      {window.innerWidth < 768 ? (
                        <MobileCP
                          width={window.innerWidth - 70}
                          theme={theme}
                        />
                      ) : (
                        <MobileCP width={370} theme={theme} />
                      )}
                      <Box
                        display={'flex'}
                        marginBottom={8}
                        justifyContent={'space-around'}
                      >
                        <Button
                          variant='contained'
                          onClick={() => setConfirmModal(true)}
                        >
                          Save Changes
                        </Button>
                      </Box>
                      <Dialog
                        open={confirmModal}
                        onClose={() => setConfirmModal(false)}
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
                          {'Save Changes'}
                        </DialogTitle>
                        <Divider />
                        <DialogContent>
                          <DialogContentText
                            id='alert-dialog-description'
                            style={{ textAlign: 'center' }}
                          >
                            <Typography variant='h6' fontWeight={'bold'}>
                              Apply the Changes
                            </Typography>
                            <Typography fontWeight={'bold'}>
                              Are you sure you want to make the changes to the
                              application
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
                            Cancel
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
                            Confirm
                          </Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </Col>
                </Row>
              </Box>
            )}
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Customize
