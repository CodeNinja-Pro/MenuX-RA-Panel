import OnlyHeader from '../components/Headers/OnlyHeader'
import React from 'react'
import { useState } from 'react'

import { Card, Button, Typography, ThemeProvider } from '@mui/material'
import { addDays } from 'date-fns'

import RecommendTableData from '../components/Recommendation/RecommendTableData'

import { Container, Row, Col } from 'reactstrap'
import { ThemeMain } from '../components/common/Theme'
import PickDateRange from '../views/auth/PickDateRange'

function Recommendation () {
  // const dispatch = useDispatch()
  // const { user, uid } = useSelector(state => state.auth)

  // const { restaurantMedia } = useSelector(state => state.restaurant)

  const [dateState, setDateState] = useState([
    {
      startDate: addDays(new Date(), -31),
      endDate: new Date(),
      key: 'selection'
    }
  ])

  const handleDateChange = ranges => {
    setDateState(ranges)
  }

  return (
    <>
      <OnlyHeader />

      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            <Row>
              <Col>
                <Card sx={{ height: '400px' }}>
                  <div>
                    <iframe
                      src={process.env.PUBLIC_URL + '/Animation.html'}
                      title={'Animation'}
                      style={{
                        width: '3000px',
                        height: '800px'
                      }}
                    ></iframe>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col xs={12} md={9}>
                {/* <Typography
                  textAlign={'left'}
                  sx={{
                    border: 'dashed',
                    borderRadius: '10px',
                    borderWidth: '1px',
                    borderColor: '#0074D9',
                    backgroundColor: '#cfebff'
                  }}
                >
                  <Row>
                    <Col>
                      <Typography
                        padding={'10px'}
                        sx={{
                          borderRadius: '20px,'
                        }}
                      >
                        Every day/week (depending on your plan) your smart
                        recommendations are updated. You will be notified to
                        apply new changes to your items. Smart recommendations
                        are added to your custom recommendations. Once you apply
                        new ones, previous ones are still kept on your list.
                      </Typography>
                    </Col>
                  </Row>
                </Typography> */}
              </Col>
              <Col
                xs={12}
                md={1}
                style={{ display: 'flex', alignItems: 'flex-end' }}
              >
                <Button variant='contained'>Export</Button>
              </Col>
              <Col
                xs={12}
                md={2}
                style={{
                  display: 'flex',
                  alignItems: 'flex-end',
                  width: '100%'
                }}
              >
                <PickDateRange
                  setDateState={handleDateChange}
                  datestate={dateState}
                />
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col>
                <RecommendTableData />
              </Col>
            </Row>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Recommendation
