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
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import SuperStaffTable from './common/SuperStaffTable'

export default function SuperStaff () {
  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  marginTop={2}
                  marginLeft={2}
                  marginRight={2}
                  marginBottom={2}
                >
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
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'start'}
                    marginTop={'20px'}
                  >
                    <TextField
                      id='outlined-start-adornment'
                      placeholder='Search'
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position='start'>
                            <SearchOutlinedIcon />
                          </InputAdornment>
                        )
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} marginTop={2}>
                    <SuperStaffTable />
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
