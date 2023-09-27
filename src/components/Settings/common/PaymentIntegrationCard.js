import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Button
} from '@mui/material'
import React from 'react'

export default function PaymentIntegrationCard (props) {
  return (
    <>
      <Card>
        <Grid container spacing={2}>
          <Grid item xs={12} display={'flex'}>
            <CardMedia
              component={'img'}
              image={props.image}
              alt={'Payment Image'}
              sx={{ width: '100px', margin: '10px', objectFit: 'none' }}
            />
            <CardContent>
              <Box
                display={'flex'}
                justifyContent={'space-between'}
                alignItems={'start'}
                flexDirection={'column'}
              >
                <Typography>{props.title}</Typography>
                <Typography>Payment System</Typography>
                <Button onClick={() => props.handleChange(true)}>Free</Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </>
  )
}
