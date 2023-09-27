import { orders } from '../../helpers/orderData'
import React, { useState } from 'react'
import Chart from 'react-apexcharts'

import {
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Label,
  Input,
  Container
} from 'reactstrap'

function AllOrderCardModal ({ toggle, modal }) {
  const [options, setOptions] = React.useState({
    chart: {
      id: 'basic-bar'
    },
    xaxis: {
      //categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999]
      categories: []
    }
  })

  const [series, setSeries] = React.useState([
    {
      name: 'series-1',
      data: [5, 4, 3, 2, 1, 0]
    }
  ])

  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Orders</ModalHeader>
        <Container>
          <Row>
            <Col>
              <div className='d-lg-flex d-sm-block justify-content-center'>
                <div className='mr-2 d-lg-flex d-sm-block align-items-center'>
                  <Label className='text-nowrap m-1'>From</Label>
                  <Input type='date' placeholder='start date' />
                </div>

                <div className='mr-2 d-lg-flex d-sm-block align-items-center'>
                  <Label className='text-nowrap m-1'>To</Label>
                  <Input type='date' placeholder='start date' />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            {' '}
            <Col className='d-flex justify-content-center'>
              <div className=' my-2'>
                <Input type='range' min='1' max='1000' step='1' />
                <span>Price (1 - 1000)</span>
              </div>
            </Col>
          </Row>
        </Container>
        <ModalBody>
          {/* <Table className="align-items-center table-flush" responsive>
            <thead>
              <th>Order ID</th>
              <th>DISH Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Status</th>
            </thead>
            <tbody>
              {orders?.map((item, index) => {
                return (
                  <tr>
                    <td>{index}</td>
                    <td>{item?.name}</td>
                    <td>{item?.itemsOrdered}</td>
                    <td>{item?.price}</td>
                    <td>
                      <Badge color="primary" pill>
                        {item?.orderStatus == "pending"
                          ? "Pending"
                          : item?.orderStatus == "process"
                          ? item?.orderStatus
                          : item?.orderStatus == "ready"
                          ? item?.orderStatus
                          : ""}
                      </Badge>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table> */}

          <Row className='float-left'>
            <Col lg='12'>
              <i className='fas fa-circle text-primary fa-xs mr-2'></i>
              Active 0
            </Col>
            <Col lg='12'>
              <i className='fas fa-circle text-success fa-xs mr-2'></i>
              Completed 0
            </Col>
            <Col lg='12'>
              <i className='fas fa-circle text-info fa-xs mr-2'></i>
              Cancelled 0
            </Col>
          </Row>

          <div className='app mt-7 mx--3'>
            <div className='row'>
              <div className='mixed-chart'>
                <Chart
                  options={options}
                  series={series}
                  type='line'
                  width='490'
                />
              </div>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AllOrderCardModal
