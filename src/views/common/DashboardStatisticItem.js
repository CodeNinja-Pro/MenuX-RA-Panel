import React, { useEffect } from 'react'
import {
  Card,
  Avatar,
  Box,
  Paper,
  Typography,
  CardContent,
  Grid,
  CardMedia
} from '@mui/material'

import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Area,
  AreaChart,
  ResponsiveContainer
} from 'recharts'

export default function DashboardStatisticItem (props) {
  const data = [
    {
      name: 'Page A',
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: 'Page B',
      uv: 6000,
      pv: 1398,
      amt: 2210
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ]

  let color = props.color

  useEffect(() => {}, [props])

  return (
    <>
      <Card sx={{ boxShadow: '1px 1px 15px #EEEEEE' }}>
        <CardContent>
          <Grid container>
            {/* <Grid item xs={12}> */}
            <Paper
              sx={{
                width: '60px',
                height: '60px',
                backgroundColor: `${props.color + '1f'}`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: 'none'
              }}
            >
              {props.revenueComponent ? (
                props.revenueComponent
              ) : (
                <CardMedia
                  component={'img'}
                  image={props.component}
                  sx={{
                    width: '40px',
                    height: '40px'
                  }}
                />
              )}
            </Paper>
            {/* </Grid> */}
          </Grid>
          <Typography
            marginTop={1}
            fontWeight={'bold'}
            fontSize={'20px'}
            textAlign={'left'}
          >
            {props.value}
          </Typography>
          <Box
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Typography>{props.title}</Typography>
            <Typography>{props.stat}</Typography>
          </Box>
          <Grid item xs={12}></Grid>
        </CardContent>
        <div style={{ width: '100%', height: 150 }}>
          <ResponsiveContainer>
            <AreaChart width={250} height={150} data={data}>
              <defs>
                <linearGradient id={props.id} x1='0' y1='0' x2='0' y2='1'>
                  <stop offset='5%' stopColor={color} stopOpacity={0.8} />
                  <stop offset='95%' stopColor={'#ffffff'} stopOpacity={0} />
                </linearGradient>
              </defs>
              <Area
                type='monotone'
                dataKey='uv'
                stroke={props.color}
                fillOpacity={1}
                fill={`url(#${props.id})`}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </>
  )
}
