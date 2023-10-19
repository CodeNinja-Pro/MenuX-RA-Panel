import React, { useState } from 'react'
import { Grid, Switch, Typography, Box } from '@mui/material'

export default function SwitchGroupForm (props) {
  const [english, setEnglish] = useState(false)
  const [german, setGerman] = useState(false)
  const [arabic, setArabic] = useState(false)
  const [urdu, setUrdu] = useState(false)
  const [flag, setFlag] = useState('en')

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} lg={8} margin={1}>
          <Typography textAlign={'left'} fontSize={'20px'}>
            {/* Select Language */}
          </Typography>
          <Box
            margin={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => setFlag('en')}
            >
              English
            </Typography>
            <Typography color={'primary'}>
              {flag === 'en' && 'Primary'}
            </Typography>

            <Switch
              checked={english}
              inputProps={'aria-label'}
              onChange={() => setEnglish(!english)}
            />
          </Box>
          <Box
            margin={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => setFlag('ge')}
            >
              Spanish
            </Typography>
            <Typography color={'primary'}>
              {flag === 'ge' && 'Primary'}
            </Typography>
            <Switch
              checked={german}
              inputProps={'aria-label'}
              onChange={() => setGerman(!german)}
            />
          </Box>
          <Box
            margin={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => setFlag('ar')}
            >
              Portuguese
            </Typography>
            <Typography color={'primary'}>
              {flag === 'ar' && 'Primary'}
            </Typography>

            <Switch
              checked={arabic}
              inputProps={'aria-label'}
              onChange={() => setArabic(!arabic)}
            />
          </Box>
          <Box
            margin={1}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography
              sx={{ cursor: 'pointer' }}
              onClick={() => setFlag('ur')}
            >
              French
            </Typography>
            <Typography color={'primary'}>
              {flag === 'ur' && 'Primary'}
            </Typography>
            <Switch
              checked={urdu}
              inputProps={'aria-label'}
              onChange={() => setUrdu(!urdu)}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
