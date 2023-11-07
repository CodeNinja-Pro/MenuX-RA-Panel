import React, { useEffect, useState } from 'react'
import { Grid, Switch, Typography, Box } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateLanguages,
  updateMenuLanguage
} from '../../../store/actions/settingAction'

export default function SwitchGroupForm (props) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)

  const [english, setEnglish] = useState(user.menuLang.english)
  const [spanish, setSpanish] = useState(user.menuLang.spanish)
  const [portuguese, setPortuguese] = useState(user.menuLang.portuguese)
  const [french, setFrench] = useState(user.menuLang.french)
  const [flag, setFlag] = useState(user.language)

  useEffect(() => {
    dispatch(updateLanguages(user.id, flag))
  }, [flag])

  useEffect(() => {
    let menuLang = {
      english,
      spanish,
      portuguese,
      french
    }

    dispatch(updateMenuLanguage(user.id, menuLang))
  }, [english, spanish, portuguese, french])

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
              onClick={() => setFlag('english')}
            >
              English
            </Typography>
            <Typography color={'primary'}>
              {flag === 'english' && 'Primary'}
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
              onClick={() => setFlag('spanish')}
            >
              Spanish
            </Typography>
            <Typography color={'primary'}>
              {flag === 'spanish' && 'Primary'}
            </Typography>
            <Switch
              checked={spanish}
              inputProps={'aria-label'}
              onChange={() => setSpanish(!spanish)}
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
              onClick={() => setFlag('portuguese')}
            >
              Portuguese
            </Typography>
            <Typography color={'primary'}>
              {flag === 'portuguese' && 'Primary'}
            </Typography>

            <Switch
              checked={portuguese}
              inputProps={'aria-label'}
              onChange={() => setPortuguese(!portuguese)}
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
              onClick={() => setFlag('french')}
            >
              French
            </Typography>
            <Typography color={'primary'}>
              {flag === 'french' && 'Primary'}
            </Typography>
            <Switch
              checked={french}
              inputProps={'aria-label'}
              onChange={() => setFrench(!french)}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
