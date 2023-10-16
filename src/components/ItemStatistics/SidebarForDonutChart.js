import { Box, LinearProgress, Paper, Typography } from '@mui/material'
import React from 'react'

export default function SidebarForDonutChart (props) {
  const labels = props.options
  const series = props.series
  const colors = props.colors
  return (
    <>
      <Box
        display={'flex'}
        justifyContent={'space-around'}
        flexDirection={'column'}
      >
        {labels?.map((label, index) => (
          <>
            <Typography>{label}</Typography>
            <Box>
              <Box>
                <Paper
                  sx={{
                    width: '100#',
                    height: '10px',
                    backgroundColor: `${colors[index]}`
                  }}
                ></Paper>
              </Box>
              <Typography>{series[index]}</Typography>
            </Box>
          </>
        ))}
      </Box>
    </>
  )
}
