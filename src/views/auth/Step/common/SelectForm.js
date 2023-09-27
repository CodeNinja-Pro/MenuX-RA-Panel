import * as React from 'react'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'

export default function SelectForm (props) {
  return (
    <Box marginBottom={2}>
      <FormControl fullWidth>
        <InputLabel id='demo-simple-select-label'>
          {props.placeholder}
        </InputLabel>
        <Select
          labelId='demo-simple-select-label'
          id='demo-simple-select'
          value={props.businessInfo}
          label={props.placeholder}
          onChange={e => props.onBusinessInfoChange(e.target.value)}
        >
          {props.items.map(item => (
            <MenuItem value={item}>{item}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}
