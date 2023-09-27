import React from 'react'
import OnlyHeader from '../components/Headers/OnlyHeader'
import { Container, Row, Col, Card, CardBody, CardHeader } from 'reactstrap'

const Statistics = () => {
  return (
    <>
      <OnlyHeader />
      <Container className='mt--7' fluid>
        <Card className='mt-3'>
          <CardHeader className='border-0 d-flex justify-content-between'>
            <h3 className='mb-0 pt-2 col-lg-10 col-md-auto'>Payment</h3>
          </CardHeader>
          <CardBody>
            <Row>
              <Col xs='6'>
                <h2>Payment Details</h2>
                <Row>
                  <Col>Total Amount: 5000</Col>
                </Row>
              </Col>
              <Col xs='6'>
                <h2>Payment Processor</h2>
                <Row>
                  <Col>Credit Card</Col>
                </Row>
                <Row>
                  <Col>Debit Card</Col>
                </Row>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Container>
    </>
  )
}

export default Statistics
