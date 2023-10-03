import React, { useState, useRef } from 'react'
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Divider,
  DialogContentText,
  Box,
  Grid,
  IconButton,
  Typography,
  Switch
} from '@mui/material'
import PlayArrowIcon from '@mui/icons-material/PlayArrow'
import QueueMusicIcon from '@mui/icons-material/QueueMusic'
import useSound from 'use-sound'
import Default from './Sounds/default.wav'
import sound1 from './Sounds/Sound1.wav'
import sound2 from './Sounds/Sound2.wav'
import sound3 from './Sounds/Sound3.wav'
import { useDispatch, useSelector } from 'react-redux'
import { updateSoundSetting } from '../../../store/actions/authActions'

export default function SoundSettingModal (props) {
  const { user } = useSelector(state => state.auth)
  const [playDefault] = useSound(Default)
  const [playSound1] = useSound(sound1)
  const [playSound2] = useSound(sound2)
  const [playSound3] = useSound(sound3)

  const [flag, setFlag] = useState('')
  const dispatch = useDispatch()

  const handleSaveMusic = async () => {
    dispatch(updateSoundSetting(user.restaurantID, flag))
  }

  return (
    <>
      <Dialog
        open={props.show}
        onClose={() => {
          //   stop()
          props.changeShowModal(false)
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
          {'Sound Setting'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            sx={{ textAlign: 'center' }}
            display={'flex'}
            flexDirection={'column'}
            alignItems={'center'}
          >
            <Box
              sx={{
                width: '100px',
                height: '100px',
                backgroundColor: '#E1E3EA',
                borderRadius: '50%'
              }}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <QueueMusicIcon sx={{ width: '60%', height: '60%' }} />
            </Box>
            <Grid marginTop={'20px'} container spacing={2}>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <Typography>Default</Typography>
                <IconButton aria-label='play/pause'>
                  <PlayArrowIcon
                    style={{
                      height: 38,
                      width: 38
                    }}
                    onClick={playDefault}
                  />
                </IconButton>
                <Switch
                  checked={flag === 'default' ? true : false}
                  onChange={() => setFlag('default')}
                ></Switch>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <Typography>Sound 1</Typography>
                <IconButton aria-label='play/pause'>
                  <PlayArrowIcon
                    style={{
                      height: 38,
                      width: 38
                    }}
                    onClick={playSound1}
                  />
                </IconButton>
                <Switch
                  checked={flag === 'sound1' ? true : false}
                  onChange={() => setFlag('sound1')}
                ></Switch>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <Typography>Sound 2</Typography>
                <IconButton aria-label='play/pause'>
                  <PlayArrowIcon
                    style={{
                      height: 38,
                      width: 38
                    }}
                    onClick={playSound2}
                  />
                </IconButton>
                <Switch
                  checked={flag === 'sound2' ? true : false}
                  onChange={() => setFlag('sound2')}
                ></Switch>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <Typography>Sound 3</Typography>
                <IconButton aria-label='play/pause'>
                  <PlayArrowIcon
                    style={{
                      height: 38,
                      width: 38
                    }}
                    onClick={playSound3}
                  />
                </IconButton>
                <Switch
                  checked={flag === 'sound3' ? true : false}
                  onChange={() => setFlag('sound3')}
                ></Switch>
              </Grid>
              <Grid
                item
                xs={12}
                display={'flex'}
                justifyContent={'space-around'}
                alignItems={'center'}
              >
                <Typography>None</Typography>
                <Switch
                  checked={flag === 'none' ? true : false}
                  onChange={() => setFlag('none')}
                ></Switch>
              </Grid>
            </Grid>
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
            style={{ margin: '30px' }}
            fullWidth
            onClick={() => {
              props.changeShowModal(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant='contained'
            style={{ margin: '30px' }}
            onClick={() => {
              handleSaveMusic()
              props.changeShowModal(false)
            }}
            autoFocus
          >
            Set
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
