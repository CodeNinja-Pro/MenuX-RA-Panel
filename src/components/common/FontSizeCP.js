import React, { useEffect } from 'react'
import {
  Select,
  FormControl,
  InputLabel,
  MenuItem,
  Autocomplete,
  TextField,
  Typography
} from '@mui/material'

const fonts = [
  { value: '15', name: '15' },
  { value: '16', name: '16' },
  { value: '17', name: '17' },
  { value: '18', name: '18' },
  { value: '19', name: '19' },
  { value: '20', name: '20' },
  { value: '21', name: '21' },
  { value: '22', name: '22' },
  { value: '23', name: '23' },
  { value: '24', name: '24' },
  { value: '25', name: '25' }
]

export default function FontSizeCP (props) {
  return (
    <>
      <Typography>{props.title}</Typography>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={props.size}
        label='Size'
        onChange={props.setSize}
        fullWidth
        // sx={{ width: 300 }}
      >
        {fonts.map(font => (
          <MenuItem value={font.value}>{font.name}</MenuItem>
        ))}
      </Select>
    </>
  )
}
