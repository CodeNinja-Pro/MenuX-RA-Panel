import { useState } from 'react'
import { enqueueSnackbar } from 'notistack'
import moment from 'moment-timezone'

import {
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Col
} from 'reactstrap'
function RestaurantProfileModal ({ addModal, addToggle }) {
  const [availability, setAvailability] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    enqueueSnackbar('Restaurant Details Added')
    addToggle()
  }

  const timeZone = moment.tz.guess()

  return (
    <div>
      <Modal isOpen={addModal}>
        <ModalHeader toggle={addToggle}>Add Restaurant Details</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col md='6'>
                <FormGroup>
                  <Label>Restaurant Name</Label>
                  <Input
                    type='name'
                    placeholder='Restaurant Name'
                    required
                  ></Input>
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <Label>Address</Label>
                  <Input type='name' placeholder='Address' required></Input>
                </FormGroup>
              </Col>
            </Row>
            {/* <Row>
              <Col md='6'>
                <FormGroup>
                  <Label>City</Label>
                  <Input type='name' placeholder='City' required></Input>
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <Label>Country</Label>
                  <Input type='name' placeholder='Country' required></Input>
                </FormGroup>
              </Col>
            </Row> */}
            {/* <Row>
              <Col md='6'>
                <FormGroup>
                  <Label>Phone</Label>
                  <Input type='tel' placeholder='Phone' required></Input>
                </FormGroup>
              </Col>
              <Col md='6'>
                <FormGroup>
                  <Label>Email</Label>
                  <Input type='email' placeholder='Email' required></Input>
                </FormGroup>
              </Col>
            </Row> */}
            <Row>
              <Col md='6'>
                <FormGroup>
                  <Label>Time Zone</Label>
                  <Input type='name' value={timeZone}></Input>
                </FormGroup>
              </Col>
              {/* <Col md="6">
                <FormGroup>
                  <Label>Facebook URL</Label>
                  <Input
                    type="text"
                    placeholder="facebook URL"
                    required
                  ></Input>
                </FormGroup>
              </Col> */}
            </Row>
            {/* <Row>
              <Col md="6">
                <FormGroup>
                  <Label>Twitter URL</Label>
                  <Input type="text" placeholder="Twitter URL" required></Input>
                </FormGroup>
              </Col>
              <Col md="6">
                <FormGroup>
                  <Label>Instagram URL</Label>
                  <Input
                    type="text"
                    placeholder="Instagram URL"
                    required
                  ></Input>
                </FormGroup>
              </Col>
            </Row> */}

            <div className='d-flex justify-content-end'>
              <Button color='primary'>Add</Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default RestaurantProfileModal
