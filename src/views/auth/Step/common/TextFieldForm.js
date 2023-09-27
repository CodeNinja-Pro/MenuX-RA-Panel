import { Grid, TextField } from '@mui/material'
import React from 'react'

export default function TextFieldForm (props) {
  return (
    <>
      <Grid item xs={12} marginBottom={2}>
        <TextField
          fullWidth
          type={props.type}
          placeholder={props.placeholder}
          value={props.businessInfo}
          onChange={e => props.setBusinessInfo(e.target.value)}
        ></TextField>
      </Grid>
    </>
  )
}
