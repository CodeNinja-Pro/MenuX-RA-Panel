import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'

export default function SidebarDonut (props) {
  const labels = props.options
  const series = props.series
  const colors = props.colors
  return (
    <>
      <Box display={'flex'} flexDirection={'row'}>
        {labels?.map((label, index) => (
          <Grid container spacing={1}>
            <Grid
              item
              xs={4}
              display={'flex'}
              justifyContent={'center'}
              alignItems={'center'}
            >
              <Box display={'flex'} flexDirection={'column'}>
                <Typography>{label}</Typography>
                <Box>
                  <Paper
                    sx={{
                      width: '60px',
                      height: '10px',
                      backgroundColor: `${colors[index]}`
                    }}
                  ></Paper>
                </Box>
                <Typography>
                  {props.totalRevenue !== 0
                    ? new Intl.NumberFormat('en-IN', {
                        maximumSignificantDigits: 3
                      }).format(
                        (Number(series[index]) * 100) /
                          Number(props.totalRevenue)
                      ) + '%'
                    : '0%'}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  )
}
