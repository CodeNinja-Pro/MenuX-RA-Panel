import React from 'react'
import { Container } from 'reactstrap'
import {
  Grid,
  Card,
  ThemeProvider,
  Typography,
  TextField,
  InputAdornment
} from '@mui/material'
import OnlyHeader from '../../components/Headers/OnlyHeader'
import { ThemeMain } from '../../components/common/Theme'
import SuperFeedbackTable from './common/SuperFeedbackTable'

export default function SuperFeedback () {
  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container>
                <Grid item xs={12} marginTop={2} marginBottom={2} padding={1}>
                  <Grid item xs={12}>
                    <Typography
                      textAlign={'left'}
                      fontWeight={'bold'}
                      marginTop={'10px'}
                      fontSize={'25px'}
                    >
                      Feedback
                    </Typography>
                  </Grid>
                  <SuperFeedbackTable />
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
