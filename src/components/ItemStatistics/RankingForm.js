import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ButtonGroup,
  Button,
  CircularProgress
} from '@mui/material'
import { Link } from 'react-router-dom'

export default function RankingForm (props) {
  const items = props.items
  return (
    <Card sx={{ margin: '5px' }}>
      <CardContent>
        <Grid container>
          <Grid item xs={9}>
            <Typography
              fontSize={'20px'}
              fontWeight={'bold'}
              textAlign={'left'}
            >
              Top Menu Items Clicks
            </Typography>
            <Typography textAlign={'left'}>
              Menu Items customers visit more often.
            </Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup
              disableElevation
              variant='contained'
              aria-label='Disabled elevation buttons'
            >
              <Button>Most</Button>
              <Button>Least</Button>
            </ButtonGroup>
          </Grid>
          {items.map(item => (
            <>
              <Grid
                xs={9}
                display={'flex'}
                justifyContent={'left'}
                marginTop={'10px'}
              >
                <Link to={`/admin/item-detail/${item.id}`}>
                  <Typography color={'#121212'}>{item.name}</Typography>
                </Link>
              </Grid>
              <Grid
                xs={3}
                display={'flex'}
                justifyContent={'space-around'}
                marginTop={'10px'}
              >
                <Typography>{item.rate + '%'}</Typography>
                <CircularProgress
                  variant='determinate'
                  size={'25px'}
                  value={item.rate}
                />
              </Grid>
            </>
          ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
