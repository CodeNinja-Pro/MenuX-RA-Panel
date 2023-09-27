import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { enqueueSnackbar } from 'notistack'
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
  Col,
  Spinner
} from 'reactstrap'
import { addStoreTiming } from '../../store/actions/settingAction'
function AddStoreTimingModal ({ addModal, addToggle }) {
  const dispatch = useDispatch()
  const { uid, user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.catalog)
  const [formData, setFormData] = useState({
    day: '',
    startTime: '',
    endTime: ''
  })

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = e => {
    e.preventDefault()
    if (formData.startTime === formData.endTime) {
      enqueueSnackbar('Start and end Time must not be same')
      return
    }
    let obj = user?.storeTiming?.find(ele => ele.day == formData.day)
    if (obj) {
      toast.warn('Timing For This Day Already Exisy.You Can Update This', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } else {
      dispatch(
        addStoreTiming(uid, formData, () => {
          addToggle()
          setFormData({
            day: '',
            startTime: '',
            endTime: ''
          })
        })
      )
    }
  }
  const closeModal = () => {
    setFormData({
      day: '',
      startTime: '',
      endTime: ''
    })
  }
  return (
    <div>
      <Modal isOpen={addModal} onClosed={closeModal}>
        <ModalHeader toggle={addToggle}>Add Store Timings</ModalHeader>
        <ModalBody>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Col>
                <FormGroup>
                  <Label for='location'>Days</Label>
                  <Input
                    type='select'
                    id='exampleCustomSelect'
                    name='day'
                    required
                    onChange={handleChange}
                    value={formData.day}
                  >
                    <option value='' selected disabled>
                      Select Day
                    </option>
                    <option>Monday</option>
                    <option>Tuesday</option>
                    <option>Wednesday</option>
                    <option>Thursday</option>
                    <option>Friday</option>
                    <option>Saturday</option>
                    <option>Sunday</option>
                  </Input>
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <FormGroup>
                  <Label for='start-time'>Start Time</Label>
                  <Input
                    type='time'
                    name='startTime'
                    id='start-time'
                    required
                    placeholder='Start time'
                    onChange={handleChange}
                    value={formData.startTime}
                  />
                </FormGroup>
              </Col>
            </Row>
            <Row>
              <Col>
                {' '}
                <FormGroup>
                  <Label for='start-time'>End Time</Label>
                  <Input
                    type='time'
                    name='endTime'
                    id='end-time'
                    required
                    placeholder='End time'
                    onChange={handleChange}
                    value={formData.endTime}
                  />
                </FormGroup>
              </Col>
            </Row>

            <div className='d-flex justify-content-end'>
              <Button color='primary' disabled={loading}>
                {loading ? <Spinner size='sm' /> : 'Add'}
              </Button>
            </div>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  )
}

export default AddStoreTimingModal
