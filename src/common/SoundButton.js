import { Button } from '@mui/material'
import React from 'react'
import useSound from 'use-sound'
import sound from './sounds/Sound1.wav'

export default function SoundButton (props) {
  const [playSound] = useSound(sound)
  return (
    <>
      <Button
        variant={props.variant}
        onClick={() => {
          playSound()
          props.onClick()
        }}
        sx={props.sx}
        fullWidth
        className={props.className}
      ></Button>
    </>
  )
}
