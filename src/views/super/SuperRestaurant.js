import React, { useState } from 'react'
import { Container } from 'reactstrap'
import {
  Grid,
  Card,
  ThemeProvider,
  Box,
  Typography,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  MenuItem,
  DialogTitle,
  Divider,
  FormControl,
  Select
} from '@mui/material'
import OnlyHeader from '../../components/Headers/OnlyHeader'
import { ThemeMain } from '../../components/common/Theme'
import SuperRestaurantTable from './common/SuperRestaurantTable'

export default function SuperRestaurant () {
  const [exportModal, setExportModal] = useState(false)
  const [exportCountry, setExportCountry] = useState('')

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
                      Restaurants
                    </Typography>
                    <Box display={'flex'}>
                      <Button
                        onClick={() => setExportModal(true)}
                        sx={{ marginRight: 2 }}
                        variant='contained'
                      >
                        Export
                      </Button>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography textAlign={'left'}>
                      Registered Restaurant's Data
                    </Typography>
                  </Grid>
                  <SuperRestaurantTable />
                </Grid>
              </Grid>
            </Card>

            <Dialog
              open={exportModal}
              onClose={() => setExportModal(false)}
              aria-labelledby='alert-dialog-title'
              aria-describedby='alert-dialog-description'
            >
              <DialogTitle
                id='alert-dialog-title'
                style={{
                  fontSize: '25px',
                  fontWeight: 'bold'
                }}
              >
                {'Export'}
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText
                  id='alert-dialog-description'
                  style={{ textAlign: 'center' }}
                >
                  <FormControl fullWidth>
                    <Typography
                      marginBottom={1}
                      textAlign={'left'}
                      fontWeight={'bold'}
                    >
                      Country
                    </Typography>
                    <Select
                      id='demo-simple-select'
                      value={exportCountry}
                      onChange={e => setExportCountry(e.target.value)}
                    >
                      <MenuItem value={'USA'}>USA</MenuItem>
                      <MenuItem value={'Panama'}>Panama</MenuItem>
                      <MenuItem value={'Canada'}>Canada</MenuItem>
                    </Select>
                  </FormControl>
                </DialogContentText>
              </DialogContent>
              <DialogActions
                style={{
                  display: 'flex',
                  justifyContent: 'space-around'
                }}
              >
                <Button
                  variant='outlined'
                  style={{ margin: '20px' }}
                  fullWidth
                  onClick={() => {
                    setExportModal(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  variant='contained'
                  style={{ margin: '20px' }}
                  onClick={() => {
                    setExportModal(false)
                  }}
                  autoFocus
                >
                  Export
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
