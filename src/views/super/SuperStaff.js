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
import SuperStaffTable from './common/SuperStaffTable'

export default function SuperStaff () {
  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container>
                <Grid item xs={12} marginTop={2} padding={1} marginBottom={2}>
                  <Grid item xs={12}>
                    <Typography
                      textAlign={'left'}
                      fontWeight={'bold'}
                      marginTop={'10px'}
                      fontSize={'25px'}
                    >
                      Staff
                    </Typography>
                  </Grid>
                  <SuperStaffTable />
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
