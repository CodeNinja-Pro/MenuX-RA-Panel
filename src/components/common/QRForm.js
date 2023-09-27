import React, { useState } from 'react'
import { QRCode } from 'react-qrcode-logo'
import { Button, IconButton, Typography } from '@mui/material'
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined'
import copy from 'clipboard-copy'
import { enqueueSnackbar } from 'notistack'

export default function QRForm (props) {
  const [url, setUrl] = useState('restaurantName.menuxdigital.com')

  const onCopyClick = e => {
    copy(url)
    enqueueSnackbar('Copied -> ' + url)
  }

  return (
    <>
      <QRCode
        value={props.style.name} // here you should keep the link/value(string) for which you are generation promocode
        size={250} // the dimension of the QR code (number)
        logoImage={props.style.logoImage} // URL of the logo you want to use, make sure it is a dynamic url
        logoHeight={50}
        removeQrCodeBehindLogo
        logoWidth={50}
        logoOpacity={1}
        eyeColor={props.style.pointColor}
        bgColor={props.style.backgroundColor}
        fgColor={props.style.pointColor}
        enableCORS={true} // enabling CORS, this is the thing that will bypass that DOM check
        // qrStyle='dots' // type of qr code, wether you want dotted ones or the square ones
        // eyeRadius={10} // radius of the promocode eye
        id={props.style.name}
      />
      <br />
      <Typography color={'#0074D9'} marginTop={'20px'}>
        <IconButton onClick={onCopyClick}>
          <ContentCopyOutlinedIcon sx={{ color: '#0074D9' }} />
        </IconButton>
        {url}
      </Typography>
      {/* <Button
        variant='contained'
        onClick={() => downloadCode()}
        style={{ marginTop: '20px' }}
      >
        Download Code
      </Button> */}
    </>
  )
}
