import React, { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ButtonGroup,
  Button,
  CircularProgress,
  circularProgressClasses
} from '@mui/material'
import { Link } from 'react-router-dom'

export default function RankingForm (props) {
  const [arrange, setArrange] = useState('most')
  const [itemList, setItemList] = useState([
    ...props.items.slice().reverse().slice(0, 10)
  ])

  useEffect(() => {
    if (arrange === 'most') {
      setItemList(props.items.slice().reverse().slice(0, 10))
    } else {
      setItemList(props.items.slice(0, 10))
    }
  }, [arrange])

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
              {props.title}
            </Typography>
            <Typography textAlign={'left'}>{props.description}</Typography>
          </Grid>
          <Grid item xs={3}>
            <ButtonGroup
              disableElevation
              variant='contained'
              aria-label='Disabled elevation buttons'
            >
              <Button
                disabled={arrange === 'most'}
                onClick={() => setArrange('most')}
              >
                Most
              </Button>
              <Button
                disabled={arrange === 'least'}
                onClick={() => setArrange('least')}
              >
                Least
              </Button>
            </ButtonGroup>
          </Grid>
          {itemList.map(item => (
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
