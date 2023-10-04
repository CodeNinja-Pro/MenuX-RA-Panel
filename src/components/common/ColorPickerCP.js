import React, { useState, useEffect, useRef } from 'react'
import { SketchPicker, ChromePicker, CirclePicker } from 'react-color'
import {
  Box,
  TextField,
  IconButton,
  Modal,
  Typography,
  ThemeProvider,
  Input,
  InputAdornment,
  FormControl,
  FormHelperText,
  OutlinedInput,
  Button,
  Paper
} from '@mui/material'
import ColorLensOutlinedIcon from '@mui/icons-material/ColorLensOutlined'
import CropSquareIcon from '@mui/icons-material/CropSquare'

import iro from '@jaames/iro'
import ColorForm from './ColorForm'
import { ThemeMain } from './Theme'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4
}

export default function ColorPickerCP (props) {
  const [openModal, setOpenModal] = useState(false)

  const [selectedColor, setSelectedColor] = useState(props.currentColor)

  useEffect(() => {
    props.setColor(selectedColor)
  }, [selectedColor])

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Box sx={{ width: '100%', display: 'flex', alignItems: 'flex-end' }}>
          <FormControl sx={{ m: 1 }} variant='outlined'>
            <FormHelperText
              style={{ fontSize: '15px' }}
              id='outlined-weight-helper-text'
            >
              {props.title}
            </FormHelperText>
            <OutlinedInput
              fullWidth
              id='outlined-adornment-weight'
              aria-describedby='outlined-weight-helper-text'
              inputProps={{
                'aria-label': 'weight'
              }}
              value={props.currentColor}
              onChange={props.colorChange}
            />
          </FormControl>
          <Paper
            onClick={() => setOpenModal(!openModal)}
            style={{
              width: '50px',
              height: '50px',
              marginBottom: '12px',
              backgroundColor: `${props.currentColor}`,
              border: 'solid',
              borderWidth: '1px'
            }}
          ></Paper>
        </Box>
        <Modal
          open={openModal}
          onClose={() => setOpenModal(!openModal)}
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <Typography
              id='modal-modal-title'
              style={{ textAlign: 'center' }}
              variant='h6'
              component='h2'
            >
              You can select the color
            </Typography>
            <Box>
              <ColorForm setSelectedColor={setSelectedColor} />
            </Box>
          </Box>
        </Modal>
      </ThemeProvider>
    </>
  )
}
