import React, { useEffect, useState } from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  ButtonGroup,
  Button
} from '@mui/material'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar'
import { Link } from 'react-router-dom'
import 'react-circular-progressbar/dist/styles.css'

export default function RankingForm (props) {
  const [arrange, setArrange] = useState('most')

  const percentage = 34

  const color = [
    '#7367F0',
    '#FF9F43',
    '#28C76F',
    '#EA5455',
    '#7367F0',
    '#82868B'
  ]

  return (
    <Card
      sx={{
        // margin: '5px',
        boxShadow: 'none',
        height: '100%'
      }}
    >
      <CardContent>
        <Grid container>
          <Grid item xs={7}>
            <Typography
              fontSize={'20px'}
              fontWeight={'bold'}
              textAlign={'left'}
            >
              {props.title}
            </Typography>
            <Typography textAlign={'left'}>{props.description}</Typography>
          </Grid>
          <Grid
            item
            xs={5}
            display={'flex'}
            justifyContent={'flex-end'}
            alignItems={'center'}
          >
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
          {arrange === 'most' &&
            props.items
              .slice()
              .reverse()
              .slice(0, 5)
              .map((item, index) => (
                <>
                  <Grid
                    xs={9}
                    display={'flex'}
                    justifyContent={'left'}
                    alignItems={'center'}
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
                    alignItems={'center'}
                    marginTop={'10px'}
                  >
                    <Typography>{item.views}</Typography>
                    <div style={{ width: '50px' }}>
                      <CircularProgressbar
                        styles={buildStyles({
                          pathColor: color[index],
                          textColor: color[index],
                          trailColor: '#eee'
                        })}
                        strokeWidth={15}
                        value={parseInt((item.views / props.totalViews) * 100)}
                        text={`${parseInt(
                          (item.views / props.totalViews) * 100
                        )}%`}
                      />
                    </div>
                  </Grid>
                </>
              ))}
          {arrange === 'least' &&
            props.items.slice(0, 5).map((item, index) => (
              <>
                <Grid
                  xs={9}
                  display={'flex'}
                  justifyContent={'left'}
                  alignItems={'center'}
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
                  alignItems={'center'}
                  marginTop={'10px'}
                >
                  <Typography>{item.views}</Typography>
                  <div style={{ width: '50px' }}>
                    <CircularProgressbar
                      styles={buildStyles({
                        pathColor: color[index],
                        textColor: color[index],
                        trailColor: '#eee'
                      })}
                      strokeWidth={15}
                      value={parseInt((item.views / props.totalViews) * 100)}
                      text={`${parseInt(
                        (item.views / props.totalViews) * 100
                      )}%`}
                    />
                  </div>
                </Grid>
              </>
            ))}
        </Grid>
      </CardContent>
    </Card>
  )
}
