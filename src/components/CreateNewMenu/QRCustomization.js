import React, { useEffect, useState } from 'react'
import { Card, CardHeader, CardFooter, Row, Col, Spinner } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import ColorPickerCP from '../common/ColorPickerCP'
import copy from 'clipboard-copy'
import { enqueueSnackbar } from 'notistack'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import { QRCode } from 'react-qrcode-logo'
import { v4 as uuidv4 } from 'uuid'

import { toast } from 'react-toastify'
import {
  IconButton,
  Typography,
  Button,
  Dialog,
  DialogActions,
  Divider,
  DialogContent,
  DialogTitle,
  DialogContentText,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Select,
  MenuItem
} from '@mui/material'
import CachedIcon from '@mui/icons-material/Cached'
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

const QRCustomization = () => {
  const { user } = useSelector(state => state.auth)

  const [pointColor, setPointColor] = useState('#000000')
  const pointColorChange = e => {
    setPointColor(e.target.value)
  }
  const [backgroundColor, setBackgroundColor] = useState('#ffffff')
  const backgroundColorChange = e => {
    setBackgroundColor(e.target.value)
  }

  const [logoImage, setLogoImage] = useState('')
  const [logoFile, setLogoFile] = useState([])

  // File Upload
  const logoImageHandleChange = file => {
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

    setLogoImage(URL.createObjectURL(file))
    setLogoFile(file)
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

  const onLogoButtonClick = () => {
    logoRef.current.click()
  }

  const [confirmModal, setConfirmModal] = useState(false)

  const [format, setFormat] = useState('PNG')
  const formatHandleChange = e => {
    setFormat(e.target.value)
  }

  const [tableNumber, setTableNumber] = useState('1')
  const onTableNumberChange = e => {
    setTableNumber(e.target.value)
  }

  const [primaryKey, setPrimaryKey] = useState('')

  const onDownloadClick = async () => {
    const keyArray = await generatePrimaryKey(tableNumber)

    keyArray.map((arrayItem, index) => {
      setPrimaryKey(arrayItem)
      const canvas = document.getElementById(user.email)
      if (canvas) {
        const pngUrl = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
        let downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = index + '_' + user.restaurantName + '.' + format
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
      }
    })
    toast.success(`You downloaded ${tableNumber} QR codes successfully.`, {
      style: {
        fontFamily: 'Poppins'
      }
    })
  }

  const onAllDownloadClick = e => {
    const allTable = ['all']
    allTable.map(all => {
      console.log(all)
      setPrimaryKey(all)
      const canvas = document.getElementById(user.email)
      if (canvas) {
        const pngUrl = canvas
          .toDataURL('image/png')
          .replace('image/png', 'image/octet-stream')
        let downloadLink = document.createElement('a')
        downloadLink.href = pngUrl
        downloadLink.download = user.restaurantName + '.' + format
        document.body.appendChild(downloadLink)
        downloadLink.click()
        document.body.removeChild(downloadLink)
        toast.success('You downloaded QR code for all tables successfully.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      }
    })
  }

  const generatePrimaryKey = count => {
    const allPrimaryKey = []
    for (let i = 0; i < count; i++) {
      const uniqueKey = uuidv4()
      allPrimaryKey.push(uniqueKey)
    }
    return allPrimaryKey
  }

  const [url, setUrl] = useState('restaurantName.menuxdigital.com')

  useEffect(() => {
    setUrl(user.restaurantName + '.menuxdigital.com')
  }, [user])

  const onCopyClick = e => {
    copy(url)
    enqueueSnackbar('Copied -> ' + url)
  }

  return (
    <>
      <Row className='mt-2'>
        <Col sm='12' lg='8' style={{ paddingLeft: '0px', paddingRight: '0px' }}>
          <Card className='shadow '>
            <CardHeader>
              <Row>
                <Col sm='6' md={{ size: 4 }}>
                  <ColorPickerCP
                    title={'QR Color'}
                    currentColor={pointColor}
                    setColor={setPointColor}
                    colorChange={pointColorChange}
                  />
                  <ColorPickerCP
                    title={'Background Color'}
                    currentColor={backgroundColor}
                    setColor={setBackgroundColor}
                    colorChange={backgroundColorChange}
                  />
                </Col>
                <Col sm='6' md={{ size: 3, offset: 2 }}>
                  <p>App Logo</p>
                  <div>
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
                      {logoImage === '' ? (
                        <>
                          <label
                            id='label-file-upload'
                            htmlFor='input-file-upload'
                            style={{ width: '100%', height: '230px' }}
                            className={dragActive ? 'drag-active' : ''}
                          >
                            <div>
                              <p>Only *.JPG, *.JPEG, *.PNG and less then 2MB</p>
                              <FileUploadOutlinedIcon fontSize='large' />
                              <button
                                className='upload-button'
                                onClick={onLogoButtonClick}
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
                          // className={dragActive ? 'drag-active' : ''}
                          src={logoImage}
                        />
                      )}
                    </form>
                    <IconButton
                      onClick={() => {
                        setLogoImage('')
                        setLogoFile({})
                      }}
                      style={{ marginTop: '-20px' }}
                    >
                      <CachedIcon />
                    </IconButton>
                  </div>
                </Col>
              </Row>
              <Typography
                fontSize={'18px'}
                fontWeight={'bold'}
                textAlign={'left'}
                marginBottom={'20px'}
              >
                QR Codes for Ordering
              </Typography>
              <Row>
                <Col sm='12' md='6'>
                  <Card>
                    <CardHeader
                      style={{
                        backgroundColor: '#F0F0F0',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column'
                      }}
                    >
                      <div>
                        <Typography
                          fontSize={'17px'}
                          textAlign={'left'}
                          fontWeight={'bold'}
                        >
                          Unique QR for every table
                        </Typography>
                        <Typography fontSize={'15px'} textAlign={'left'}>
                          Each table will have a unique QR code to identify the
                          table number without the need to ask customers to
                          enter it manually.
                        </Typography>
                      </div>
                      <Button
                        style={{ marginTop: '20px' }}
                        onClick={() => setConfirmModal(true)}
                        variant='contained'
                      >
                        <FileDownloadOutlinedIcon />
                        Download Table QR Codes
                      </Button>
                    </CardHeader>
                  </Card>
                </Col>
                <Col sm='12' md='6'>
                  <Card style={{ height: '100%' }}>
                    <CardHeader
                      style={{
                        backgroundColor: '#F0F0F0',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-between',
                        flexDirection: 'column'
                      }}
                    >
                      <div>
                        <Typography
                          fontSize={'17px'}
                          textAlign={'left'}
                          fontWeight={'bold'}
                        >
                          One QR Code for all tables
                        </Typography>
                        <Typography fontSize={'15px'} textAlign={'left'}>
                          Download a single QR code and request customers to
                          enter their table number when submitting an order.
                        </Typography>
                      </div>
                      <Button variant='contained' onClick={onAllDownloadClick}>
                        <FileDownloadOutlinedIcon />
                        Download Single QR Code for all Tables
                      </Button>
                    </CardHeader>
                  </Card>
                </Col>
              </Row>
            </CardHeader>
          </Card>
        </Col>
        <Col sm='12' lg='4' style={{ paddingRight: '0px' }}>
          <Card className='shadow' style={{ height: '100%' }}>
            <CardHeader style={{ height: '100%' }}>
              <Typography
                fontSize={'25px'}
                fontWeight={'bold'}
                marginBottom={'20px'}
              >
                QR Preview
              </Typography>
              <div>
                {logoImage === '' ? (
                  <QRCode
                    value={primaryKey} // here you should keep the link/value(string) for which you are generation promocode
                    size={250} // the dimension of the QR code (number)
                    eyeColor={pointColor}
                    bgColor={backgroundColor}
                    fgColor={pointColor}
                    enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
                    // qrStyle='dots' // type of qr code, wether you want dotted ones or the square ones
                    // eyeRadius={10} // radius of the promocode eye
                    id={user.email}
                  />
                ) : (
                  <QRCode
                    value={tableNumber} // here you should keep the link/value(string) for which you are generation promocode
                    size={250} // the dimension of the QR code (number)
                    logoImage={logoImage} // URL of the logo you want to use, make sure it is a dynamic url
                    logoHeight={50}
                    removeQrCodeBehindLogo
                    logoWidth={50}
                    logoOpacity={1}
                    eyeColor={pointColor}
                    bgColor={backgroundColor}
                    fgColor={pointColor}
                    enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
                    // qrStyle='dots' // type of qr code, wether you want dotted ones or the square ones
                    // eyeRadius={10} // radius of the promocode eye
                    id={user.email}
                  />
                )}
                <br />
                <Typography
                  color={'#0074D9'}
                  marginTop={'20px'}
                  onClick={onCopyClick}
                  sx={{ cursor: 'pointer' }}
                >
                  <IconButton>
                    <ContentCopyOutlinedIcon sx={{ color: '#0074D9' }} />
                  </IconButton>
                  {url}
                </Typography>
              </div>
            </CardHeader>
          </Card>
        </Col>
      </Row>
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
          {'QR Code for Tables'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            style={{ textAlign: 'center' }}
          >
            <FormControl sx={{ width: '400px' }} variant='outlined'>
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Number of Tables
              </FormHelperText>
              <OutlinedInput
                id='outlined-adornment-weight'
                aria-describedby='outlined-weight-helper-text'
                inputProps={{
                  'aria-label': 'weight'
                }}
                type='number'
                value={tableNumber}
                onChange={onTableNumberChange}
              />
            </FormControl>
            <br />
            <FormControl
              sx={{ marginTop: '30px', width: '400px' }}
              variant='outlined'
            >
              <FormHelperText
                style={{ fontSize: '15px' }}
                id='outlined-weight-helper-text'
              >
                Format
              </FormHelperText>
              <Select
                labelId='demo-simple-select-label'
                id='demo-simple-select'
                value={format}
                label='Age'
                onChange={formatHandleChange}
              >
                <MenuItem value={'PNG'}>PNG</MenuItem>
                <MenuItem value={'JPG'}>JPG</MenuItem>
              </Select>
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
              onDownloadClick()
            }}
            autoFocus
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default QRCustomization
