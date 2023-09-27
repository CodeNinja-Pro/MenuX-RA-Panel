import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button,
  FormControl,
  FormHelperText,
  Dialog,
  DialogActions,
  DialogContentText,
  OutlinedInput,
  Divider,
  DialogTitle,
  DialogContent,
  Icon
} from '@mui/material'
import VisaCard from '../../../assets/common/patmentCard/Payment.png'
import ExpressCard from '../../../assets/common/patmentCard/Payment1.png'
import React, { useState } from 'react'
import PriorityHighRoundedIcon from '@mui/icons-material/PriorityHighRounded'

export default function PaymentCardForm (props) {
  const [deleteModalFlag, setDeleteModalFlag] = useState(false)
  return (
    <>
      <Card sx={{ boxShadow: 'none' }}>
        <CardContent>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              display={'flex'}
              justifyContent={'space-between'}
              alignItems={'center'}
            >
              <Box>
                <Typography textAlign={'left'} fontWeight={'bold'}>
                  {props.title}
                </Typography>
                <Box display={'flex'} marginTop={'10px'}>
                  <Box>
                    <CardMedia
                      width={'150px'}
                      component={'img'}
                      image={VisaCard}
                      alt='Visa Card'
                    />
                  </Box>
                  <Box marginLeft={'10px'}>
                    <Typography>{props.holderName}</Typography>
                    <Typography>Card expires at {props.expired}</Typography>
                  </Box>
                </Box>
              </Box>
              <Box display={'flex'}>
                <Button
                  sx={{ backgroundColor: '#F1F1F2', color: '#7E8299' }}
                  onClick={() => setDeleteModalFlag(true)}
                >
                  Delete
                </Button>
                <Button
                  sx={{
                    marginLeft: '20px',
                    backgroundColor: '#F1F1F2',
                    color: '#7E8299'
                  }}
                  onClick={() => props.setModal(true)}
                >
                  Edit
                </Button>
              </Box>
              {/* Edit Diaglog */}

              {/* Delete Diaglog */}
              <Dialog
                open={deleteModalFlag}
                onClose={() => setDeleteModalFlag(false)}
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
                  {'Delete Card Info'}
                </DialogTitle>
                <Divider />
                <DialogContent>
                  <DialogContentText
                    id='alert-dialog-description'
                    style={{ textAlign: 'center' }}
                  >
                    <Icon
                      sx={{
                        width: '100px',
                        height: '100px',
                        backgroundColor: '#FF9999',
                        borderRadius: '50%'
                      }}
                    >
                      <PriorityHighRoundedIcon
                        sx={{
                          width: '100%',
                          height: '100%',
                          color: '#F60000'
                        }}
                      />
                    </Icon>
                    <Typography fontSize={'18px'}>
                      Are you sure you want to delete this card information?
                    </Typography>
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
                    color='error'
                    style={{ margin: '20px' }}
                    fullWidth
                    onClick={() => {
                      setDeleteModalFlag(false)
                    }}
                  >
                    Keep Card
                  </Button>
                  <Button
                    fullWidth
                    variant='contained'
                    color='error'
                    style={{ margin: '20px' }}
                    onClick={() => {
                      setDeleteModalFlag(false)
                    }}
                    autoFocus
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  )
}
