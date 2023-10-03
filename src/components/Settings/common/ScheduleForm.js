import React from 'react'
import { Grid, FormControlLabel, Checkbox, Box } from '@mui/material'
import dayjs from 'dayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { SingleInputTimeRangeField } from '@mui/x-date-pickers-pro/SingleInputTimeRangeField'

export default function ScheduleForm (props) {
  const [value, setValue] = React.useState(() => [
    dayjs('2022-04-17T15:30'),
    dayjs('2022-04-17T18:30')
  ])

  return (
    <>
      <Grid container spacing={2}>
        <Grid
          item
          xs={12}
          lg={8}
          display={'flex'}
          justifyContent={'space-between'}
          alignItems={'center'}
          margin={1}
        >
          <FormControlLabel
            disabled={props.disabled}
            control={<Checkbox defaultChecked />}
            label={props.title}
            // onChange={handleDateChange}
          />
          <Box width={190}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SingleInputTimeRangeField
                disabled={props.disabled}
                // value={props.periodic[props.title]}
                onChange={newValue =>
                  props.handlePeriodic(props.title, newValue)
                }
              />
            </LocalizationProvider>
          </Box>
        </Grid>
      </Grid>
    </>
  )
}
