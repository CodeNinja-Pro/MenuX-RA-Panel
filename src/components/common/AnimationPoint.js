import React, { useRef } from 'react'
import { AnimateKeyframes } from 'react-simple-animate'
import { Style } from './Styles'
import { Paper, Box, Slide } from '@mui/material'

export default function () {
  const min = -1000
  const max = 1000
  const range = max - min + 1

  const randomNum = Math.floor(Math.random() * range) + min

  const icon = (
    <Paper
      sx={{
        width: 10,
        height: 10,
        borderRadius: '50%',
        backgroundColor: '#34aadc'
      }}
      // elevation={4}
    ></Paper>
  )

  const containerRef = useRef(null)

  return (
    <div>
      <Box sx={{ p: 2, height: 200, overflow: 'hidden' }} ref={containerRef}>
        <Slide in={true} container={containerRef.current}>
          {icon}
        </Slide>
      </Box>
    </div>
  )
}
