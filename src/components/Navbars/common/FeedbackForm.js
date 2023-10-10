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
  TextField,
  Typography,
  Paper
} from '@mui/material'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import { useDispatch, useSelector } from 'react-redux'
import { saveFeedback } from '../../../store/actions/authActions'

const scoreData = [
  {
    score: '0',
    color: '#ee471e'
  },
  {
    score: '1',
    color: '#ee471e'
  },
  {
    score: '2',
    color: '#ee471e'
  },
  {
    score: '3',
    color: '#ee471e'
  },
  {
    score: '4',
    color: '#ee471e'
  },
  {
    score: '5',
    color: '#ee471e'
  },
  {
    score: '6',
    color: '#ee471e'
  },
  {
    score: '7',
    color: '#fcc535'
  },
  {
    score: '8',
    color: '#fcc535'
  },
  {
    score: '9',
    color: '#00eaa7'
  },
  {
    score: '10',
    color: '#00eaa7'
  }
]

export default function FeedbackForm (props) {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const [feedback, setFeedback] = useState('')

  const [score, setScore] = useState(-1)

  const sendFeedback = () => {
    dispatch(
      saveFeedback(
        user.restaurantID,
        user.email,
        user.restaurantName,
        user.restaurantType,
        feedback,
        score
      )
    )
  }

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
          {'Feedback'}
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
                <Typography fontWeight={'bold'} fontSize={'20px'} margin={2}>
                  How likely are you to recommend this to a friend?
                </Typography>
                <Box
                  display={'flex'}
                  justifyContent={'space-around'}
                  alignItems={'center'}
                >
                  {scoreData.map((item, index) => (
                    <Paper
                      key={index}
                      sx={{
                        cursor: 'pointer',
                        backgroundColor: `${item.color}`,
                        width: '50px',
                        height: '50px',
                        borderRadius: '10px',
                        boxShadow: `${
                          score !== index
                            ? '10px 10px 10px 0px #AAAAAA'
                            : 'none'
                        }`,
                        marginRight: 1
                      }}
                      onClick={() => setScore(index)}
                    >
                      <Typography
                        color={'white'}
                        fontWeight={'bold'}
                        fontSize={'35px'}
                      >
                        {item.score}
                      </Typography>
                    </Paper>
                  ))}
                </Box>
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
            fullWidth
            disabled={score === -1 || !feedback}
            variant='contained'
            style={{ margin: '30px' }}
            onClick={() => {
              props.changeShowModal(false)
              sendFeedback()
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
