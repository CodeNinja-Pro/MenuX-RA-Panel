import React, { useState } from 'react'
import { Row } from 'reactstrap'
import {
  Grid,
  Card,
  ThemeProvider,
  Box,
  Typography,
  Button
} from '@mui/material'
import { ThemeMain } from '../common/Theme'
import PopupTable from './common/PopupTable'
import CreatePopup from './common/CreatePopup'

export default function Popup () {
  const [addCP, setAddCP] = useState(false)
  const [popupStatus, setPopupStatus] = useState('')
  const [selectedID, setSelectedID] = useState('')

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Row className='mt-2 '>
          <div className='col px-0'>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography
                      textAlign={'left'}
                      marginLeft={3}
                      fontWeight={'bold'}
                      marginTop={'10px'}
                      fontSize={'25px'}
                    >
                      Marketing Banner
                    </Typography>
                    <Box marginRight={3} marginTop={2}>
                      {addCP && (
                        <Button
                          onClick={() => setAddCP(false)}
                          variant='outlined'
                        >
                          Back
                        </Button>
                      )}
                      {!addCP && (
                        <Button
                          onClick={() => {
                            setAddCP(true)
                            setPopupStatus('create')
                            setSelectedID('')
                          }}
                          variant='contained'
                        >
                          Add Marketing Banner
                        </Button>
                      )}
                    </Box>
                  </Grid>

                  <Grid item xs={12} marginTop={2}>
                    {addCP && (
                      <CreatePopup
                        selectedID={selectedID}
                        popupStatus={popupStatus}
                      />
                    )}
                    {!addCP && (
                      <PopupTable
                        setSelectedID={setSelectedID}
                        setPopupStatus={setPopupStatus}
                        setAddCP={setAddCP}
                      />
                    )}
                  </Grid>
                </Grid>
              </Grid>
            </Card>
          </div>
        </Row>
      </ThemeProvider>
    </>
  )
}
