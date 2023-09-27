import React, { useEffect, useState } from 'react'
import {
  CardContent,
  Card,
  ThemeProvider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  OutlinedInput,
  IconButton,
  Box,
  Button,
  Select,
  MenuItem
} from '@mui/material'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeMain } from '../common/Theme'
import OnlyHeader from '../Headers/OnlyHeader'
import { Container } from 'reactstrap'

export default function CreateRole () {
  const history = useHistory()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)

  const [roleName, setRoleName] = useState('')
  const [permission, setPermission] = useState('')

  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--9 mb-5' fluid>
          <Box display={'flex'} alignItems={'center'}>
            <IconButton
              color='primary'
              onClick={() => {
                history.goBack()
              }}
              sx={{
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                marginBottom: '15px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'left',
                marginLeft: '40px'
              }}
            >
              <ArrowBackIosNewIcon sx={{ marginRight: '3px' }} />
            </IconButton>
            <Typography marginLeft={3} fontWeight={'bold'} fontSize={'24px'}>
              Create Role
            </Typography>
          </Box>
          <Container fluid>
            <Grid container spacing={2}>
              <Grid item xs={12} lg={7}>
                <Card sx={{ boxShadow: 'none', height: '100%' }}>
                  <CardContent>
                    <Grid container spacing={2}>
                      <Grid item xs={8}>
                        <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                          <FormHelperText
                            style={{ fontSize: '18px' }}
                            id='outlined-weight-helper-text'
                          >
                            Role Name
                          </FormHelperText>
                          <OutlinedInput
                            id='outlined-adornment-weight'
                            aria-describedby='outlined-weight-helper-text'
                            inputProps={{
                              'aria-label': 'weight'
                            }}
                            value={roleName}
                            onChange={e => setRoleName(e.target.value)}
                          />
                        </FormControl>
                        <FormControl fullWidth sx={{ m: 1 }} variant='outlined'>
                          <FormHelperText
                            style={{ fontSize: '18px' }}
                            id='outlined-weight-helper-text'
                          >
                            Permission
                          </FormHelperText>
                          <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={permission}
                            onChange={e => setPermission(e.target.value)}
                          >
                            <MenuItem value={'Menu'}>Menu</MenuItem>
                            <MenuItem value={'Orders'}>Orders</MenuItem>
                            <MenuItem value={'Requests'}>Requests</MenuItem>
                            <MenuItem value={'Item Statistics'}>
                              Item Statistics
                            </MenuItem>
                            <MenuItem value={'Recommendations'}>
                              Recommendations
                            </MenuItem>
                            <MenuItem value={'Customer Feedback'}>
                              Customer Feedback
                            </MenuItem>
                            <MenuItem value={'Customers'}>Customers</MenuItem>
                            <MenuItem value={'Staff'}>Staff</MenuItem>
                            <MenuItem value={'Customization'}>
                              Customization
                            </MenuItem>
                            <MenuItem value={'Setting'}>Setting</MenuItem>
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} lg={5}>
                <Card sx={{ boxShadow: 'none', height: '100%' }}>
                  <CardContent>
                    <Box
                      display={'flex'}
                      marginTop={3}
                      justifyContent={'space-around'}
                    >
                      <Button
                        variant='outlined'
                        onClick={() => {
                          history.goBack()
                        }}
                      >
                        Discard
                      </Button>
                      <Button variant='contained' onClick={() => {}}>
                        Create Role
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
