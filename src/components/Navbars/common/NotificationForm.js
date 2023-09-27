import React, { useState } from 'react'
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
  TextField
} from '@mui/material'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'

export default function NotificationForm (props) {
  return (
    <>
      <Dialog
        open={props.show}
        onClose={() => props.changeShowModal(false)}
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
          {'Notification'}
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
              <CommentOutlinedIcon sx={{ width: '60%', height: '60%' }} />
            </Box>
            <Grid marginTop={'20px'} container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  name='feedback'
                  placeholder='Your Feedback Here...'
                  value={feedback}
                  onChange={e => setFeedback(e.target.value)}
                />
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
              props.changeShowModal(false)
            }}
            autoFocus
          >
            Send
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}
