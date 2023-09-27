import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import {
  Grid,
  Card,
  ThemeProvider,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button
} from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import OnlyHeader from '../components/Headers/OnlyHeader'
import { ThemeMain } from '../components/common/Theme'
import StaffTable from '../components/Staff/StaffTable'
import { StaffData } from '../components/Staff/StaffData'
import { Link } from 'react-router-dom'

export default function StaffSection () {
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
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography
                      fontWeight={'bold'}
                      marginTop={'10px'}
                      fontSize={'25px'}
                    >
                      Total Users
                    </Typography>
                    <Box display={'flex'}>
                      <Button sx={{ marginRight: 2 }} variant='outlined'>
                        Assign Role
                      </Button>
                      <Link to='/admin/create-role'>
                        <Button variant='contained'>
                          <AddOutlinedIcon />
                          Create Role
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography textAlign={'left'}>
                      Find all of your company's administrator accounts and
                      their associate Priviligies.
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
                    <StaffTable tableItems={StaffData} />
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
