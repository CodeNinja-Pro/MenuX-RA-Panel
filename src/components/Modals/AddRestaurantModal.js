import React from 'react'
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Table,
  Card,
  CardBody,
  Row,
  Input,
  Col,
  Label
} from 'reactstrap'

function AddRestaurantModal ({ modal, toggle }) {
  return (
    <div>
      <Modal isOpen={modal} toggle={toggle}>
        <ModalHeader toggle={toggle}>Add New Restaurant</ModalHeader>
        <ModalBody>
          <Row>
            <Col md={6} className='my-2'>
              <Label>Restaurant Name</Label>
              <Input placeholder='Restaurant name' />
            </Col>
            <Col md={6} className='my-2'>
              <Label>Address</Label>
              <Input placeholder='restaurant address' />
            </Col>
            <Col md={6} className='my-2'>
              <Label>City</Label>
              <Input placeholder='City' />
            </Col>
            <Col md={6} className='my-2'>
              <Label>Country</Label>
              <Input placeholder='Country' />
            </Col>
            <Col md={6} className='my-2'>
              <Label>Phone</Label>
              <Input placeholder='phone number' />
            </Col>
            <Col md={6} className='my-2'>
              <Label>Email</Label>
              <Input placeholder='Email' />
            </Col>
            <Col md={6} className='my-2'>
              <Label>Time Zone</Label>
              <Input placeholder='Time Zone' />
            </Col>
          </Row>
          <Row className='d-flex justify-content-between align-items-center mx-1'>
            <div>
              <b>Restaurant ID: #23KFC001</b>
            </div>
            <Button>Add</Button>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddRestaurantModal
