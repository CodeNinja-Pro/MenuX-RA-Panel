import React from 'react'
import { FormControl, FormHelperText, OutlinedInput } from '@mui/material'

export default function TextFieldForm (props) {
  return (
    <>
      <FormControl fullWidth variant='outlined'>
        <FormHelperText
          style={{ fontSize: '15px' }}
          id='outlined-weight-helper-text'
        >
          {props.title}
        </FormHelperText>
        <OutlinedInput
          disabled={props.title === 'Email' ? true : false}
          value={props.personalInfo}
          onChange={props.setPersonalInfo}
          id='outlined-adornment-weight'
          aria-describedby='outlined-weight-helper-text'
          inputProps={{
            'aria-label': 'weight'
          }}
        />
      </FormControl>
    </>
  )
}
