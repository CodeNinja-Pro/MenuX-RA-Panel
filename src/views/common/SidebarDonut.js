import { Box, Grid, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'

export default function SidebarDonut (props) {
  const labels = props.options
  const series = props.series
  const colors = props.colors
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        alignItems={'center'}
      >
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
                <Typography>{series[index] + '%'}</Typography>
              </Box>
            </Grid>
          </Grid>
        ))}
      </Box>
    </>
  )
}
