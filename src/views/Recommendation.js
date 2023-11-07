import OnlyHeader from '../components/Headers/OnlyHeader'
import React from 'react'
import { useState, useEffect } from 'react'

import { Card, Button, ThemeProvider, Box } from '@mui/material'
import { addDays } from 'date-fns'

import { Container, Row, Col } from 'reactstrap'
import { ThemeMain } from '../components/common/Theme'
import PickDateRange from '../views/auth/PickDateRange'
import RecommendTable from '../components/Recommendation/RecommendTable'
import { useSelector, useDispatch } from 'react-redux'
import exportFromJSON from 'export-from-json'
import { getCurrentRoleDetail } from '../store/actions/staffAction'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { DateRangePicker } from '@mui/x-date-pickers-pro'
import dayjs from 'dayjs'

const data = [
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  },
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  },
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  },
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  },
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  },
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  },
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  },
  {
    subject: 'Cheese Sandwich',
    Image: '',
    title: 'Review product details',
    date: '9/7/2023',
    explanation:
      'The product is attractive in the menu, but customers are not ordering it. Please review your product photos, name and description, as the advertisement does not seem well aligned with the product.'
  }
]

function Recommendation () {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  // Enable by staff role
  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)

  let endDate = new Date()
  let startDate = new Date()
  startDate.setMonth(startDate.getMonth() - 1)

  const [dateRange, setDateRange] = useState([dayjs(startDate), dayjs(endDate)])

  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    const obj = currentRoleDetail.filter(
      obj => obj.permission === 'Recommendations'
    )
    if (obj[0]?.allow === 'ViewEdit') {
      setSectionPermission(true)
    } else {
      setSectionPermission(false)
    }
  }, [currentRoleDetail])

  const disableOnTrue = flag => {
    return {
      opacity: flag ? 1 : 0.8,
      pointerEvents: flag ? 'initial' : 'none'
    }
  }

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

  const handleExportData = () => {
    const recommendData = []

    data.forEach(item => {
      recommendData.push({
        subject: item.subject,
        title: item.title,
        createdAt: item.date,
        explanation: item.explanation
      })
    })

    const fileName = `Recommendation_${user.restaurantID}`
    const exportType = exportFromJSON.types.csv
    exportFromJSON({
      data: recommendData,
      fileName,
      exportType
    })
  }

  return (
    <>
      <OnlyHeader />

      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            <Row>
              <Col>
                {window.innerWidth > 768 ? (
                  <Card
                    sx={{
                      width: '100%',
                      height: `400px`,
                      boxShadow: 'none'
                    }}
                  >
                    <iframe
                      src={process.env.PUBLIC_URL + '/Animation.html'}
                      title={'Animation'}
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                    ></iframe>
                  </Card>
                ) : (
                  ''
                )}
              </Col>
            </Row>
            <Box sx={user.role === 'staff' && disableOnTrue(sectionPermission)}>
              <Row style={{ marginTop: '20px' }}>
                <Col xs={12} lg={4} xl={7}></Col>
                <Col
                  xs={3}
                  lg={2}
                  xl={1}
                  style={{ display: 'flex', alignItems: 'flex-end' }}
                >
                  <Button
                    variant='contained'
                    onClick={() => {
                      handleExportData()
                    }}
                  >
                    Export
                  </Button>
                </Col>
                <Col
                  xs={9}
                  lg={6}
                  xl={4}
                  style={{
                    display: 'flex',
                    justifyContent: 'end',
                    alignItems: 'center',
                    width: '100%'
                  }}
                >
                  <DemoContainer components={['DateRangePicker']}>
                    <DateRangePicker
                      localeText={{ start: 'Start', end: 'End' }}
                      value={dateRange}
                      onChange={newValue => setDateRange(newValue)}
                    />
                  </DemoContainer>
                </Col>
              </Row>
              <Row style={{ marginTop: '20px' }}>
                <Col>
                  <RecommendTable tableItems={data ?? []} />
                </Col>
              </Row>
            </Box>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Recommendation
