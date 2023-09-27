import React, { useState } from 'react'
import {
  Dialog,
  DialogActions,
  Button,
  DialogTitle,
  DialogContent,
  Divider,
  DialogContentText,
  Switch,
  Box,
  Typography,
  Grid
} from '@mui/material'
import { US, IT, FR, ES, PT } from 'country-flag-icons/react/3x2'

export default function ChangeLanguageDialog (props) {
  const [flag, setFlag] = useState('')

  const country = [
    {
      title: 'English',
      code: <US style={{ width: '30px', height: '20px' }} />
    },
    {
      title: 'Spanish',
      code: <ES style={{ width: '30px', height: '20px' }} />
    },
    {
      title: 'French',
      code: <FR style={{ width: '30px', height: '20px' }} />
    },
    {
      title: 'Italian',
      code: <IT style={{ width: '30px', height: '20px' }} />
    },
    {
      title: 'Portuguese',
      code: <PT style={{ width: '30px', height: '20px' }} />
    }
  ]

  return (
    <>
      <Dialog
        open={props.changeLanguageDialog}
        onClose={() => props.setChangeLanguageDialog(false)}
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
          {'Change Language'}
        </DialogTitle>
        <Divider />
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            sx={{ textAlign: 'center' }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {country.map(item => (
                  <Box
                    margin={1}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography>
                      {item.code} {item.title}
                    </Typography>
                    <Switch
                      checked={flag === item.title ? true : false}
                      inputProps={'aria-label'}
                      onChange={() => setFlag(item.title)}
                    />
                  </Box>
                ))}
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
              props.setChangeLanguageDialog(false)
            }}
          >
            Cancel
          </Button>
          <Button
            fullWidth
            variant='contained'
            style={{ margin: '30px' }}
            onClick={() => {
              props.setChangeLanguageDialog(false)
            }}
            autoFocus
          >
            Change
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
