import React from 'react'
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid
} from '@mui/material'

export default function LanguageForm (props) {
  return (
    <>
      <Grid item xs={6} lg={3}>
        <Card
          sx={{
            cursor: 'pointer',
            boxShadow: `${
              props.flag !== props.title ? '10px 10px 10px 0px #DDDDDD' : ''
            }`
          }}
          onClick={() => props.setFlag(props.title)}
        >
          <Box margin={2}>
            <CardMedia
              width={'100%'}
              height={'100%'}
              component={'img'}
              image={props.image}
            />
          </Box>
          <CardContent>
            <Typography>{props.title}</Typography>
          </CardContent>
        </Card>
      </Grid>
    </>
  )
}
