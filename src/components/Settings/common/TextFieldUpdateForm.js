import React, { useState } from 'react'
import { Box, OutlinedInput, Typography, Button, Grid } from '@mui/material'
import { useDispatch, useSelector } from 'react-redux'
import { updateSocialAccount } from '../../../store/actions/authActions'

export default function TextFieldUpdateForm (props) {
  const [updateFlag, setUpdateFlag] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const handleSocialAccount = name => {
    const url = {
      [name]: props.socialInfo
    }

    setUpdateFlag(false)
    dispatch(updateSocialAccount(user.id, user.socialAccount, url))
  }
  return (
    <>
      <Grid container m={1} display={'flex'} alignItems={'center'}>
        <Grid item xs={4}>
          <Typography textAlign={'left'}>{props.title}</Typography>
        </Grid>
        <Grid item xs={4}>
          <OutlinedInput
            fullWidth
            name={props.socialName}
            value={props.socialInfo}
            onChange={props.setSocialInfo}
            disabled={!updateFlag}
            id='outlined-adornment-weight'
            aria-describedby='outlined-weight-helper-text'
            inputProps={{
              'aria-label': 'weight'
            }}
          />
        </Grid>
        <Grid item xs={4} textAlign={'right'}>
          {updateFlag === false ? (
            <Button onClick={() => setUpdateFlag(true)}>Change</Button>
          ) : (
            <Box>
              <Button
                sx={{ color: '#6E6B7B' }}
                onClick={() => setUpdateFlag(false)}
              >
                Cancel
              </Button>
              <Button
                disabled={props.socialInfo ? false : true}
                onClick={() => handleSocialAccount(props.socialName)}
              >
                Save
              </Button>
            </Box>
          )}
        </Grid>
      </Grid>
    </>
  )
}
