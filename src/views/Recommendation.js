import OnlyHeader from '../components/Headers/OnlyHeader'
import React from 'react'
import { useState } from 'react'

import { Card, Button, ThemeProvider } from '@mui/material'
import { addDays } from 'date-fns'

import { Container, Row, Col } from 'reactstrap'
import { ThemeMain } from '../components/common/Theme'
import PickDateRange from '../views/auth/PickDateRange'
import RecommendTable from '../components/Recommendation/RecommendTable'
import { useSelector } from 'react-redux'
import exportFromJSON from 'export-from-json'

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

    const fileName = `Recommendation_${user.id}`
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
                <Card sx={{ height: '450px', boxShadow: 'none' }}>
                  <div>
                    <iframe
                      src={process.env.PUBLIC_URL + '/Animation.html'}
                      title={'Animation'}
                      style={{
                        width: '1700px',
                        height: '470px'
                      }}
                    ></iframe>
                  </div>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: '20px' }}>
              <Col xs={12} md={9}></Col>
              <Col
                xs={12}
                md={1}
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
                <RecommendTable tableItems={data ?? []} />
              </Col>
            </Row>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}

export default Recommendation
