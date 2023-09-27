import OnlyHeader from '../components/Headers/OnlyHeader'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { enqueueSnackbar } from 'notistack'
import {
  Row,
  Container,
  Card,
  CardHeader,
  Col,
  Label,
  Input,
  Button,
  Spinner
} from 'reactstrap'
import { updateDeliveryDays } from '../store/actions/settingAction'
import { addDeliveryDays } from '../store/actions/settingAction'
import { updatePickUpDays } from '../store/actions/settingAction'
import { addPickUpDays } from '../store/actions/settingAction'

function PickupOrDelivery () {
  const history = useHistory()
  const dispatch = useDispatch()
  const { uid, user } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.catalog)
  const [pickupData, setPickUpData] = useState({
    startTime: '',
    endTime: ''
  })
  const [deliveryData, setDeliveryData] = useState({
    startTime: '',
    endTime: ''
  })
  const [selectedPickUpDays, setSelectedPickUpDays] = useState(['monday'])
  const [selectedDeliveryDays, setSelectedDeliveryDays] = useState(['monday'])

  const handlePickUpChange = e => {
    setPickUpData({ ...pickupData, [e.target.name]: e.target.value })
  }

  const handleDeliveryChange = e => {
    setDeliveryData({ ...deliveryData, [e.target.name]: e.target.value })
  }

  function handlePickUpDayClick (day) {
    setSelectedPickUpDays(prevSelectedDays => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(d => d !== day)
      } else {
        return [...prevSelectedDays, day]
      }
    })
  }
  function handleDeliveryDayClick (day) {
    setSelectedDeliveryDays(prevSelectedDays => {
      if (prevSelectedDays.includes(day)) {
        return prevSelectedDays.filter(d => d !== day)
      } else {
        return [...prevSelectedDays, day]
      }
    })
  }
  useEffect(() => {
    if (user?.pickupDays) {
      let temp = []
      for (let i = 0; i < user?.pickupDays.length; i++) {
        temp.push(user?.pickupDays[i].day)
        setSelectedPickUpDays(temp)
      }
      setPickUpData({
        startTime: user?.pickupDays[0]?.startTime,
        endTime: user?.pickupDays[0]?.endTime
      })
    }

    if (user?.deliveryDays) {
      let temp = []
      for (let i = 0; i < user?.deliveryDays.length; i++) {
        temp.push(user?.deliveryDays[i].day)
        setSelectedDeliveryDays(temp)
      }
      setDeliveryData({
        startTime: user?.deliveryDays[0]?.startTime,
        endTime: user?.deliveryDays[0]?.endTime
      })
    }
  }, [user])

  const handlePickUpAndDelivery = () => {
    if (pickupData?.startTime === pickupData?.endTime) {
      enqueueSnackbar('Pickup start and end time can not be the same')
      return
    }
    if (deliveryData?.startTime === deliveryData?.endTime) {
      enqueueSnackbar('Delivery start and end time can not be the same')
      return
    }
    if (pickupData.startTime !== '' && pickupData.endTime !== '') {
      if (user?.pickupDays) {
        dispatch(updatePickUpDays(uid, selectedPickUpDays, pickupData))
      } else {
        dispatch(addPickUpDays(uid, selectedPickUpDays, pickupData))
      }
    }
    if (deliveryData.startTime !== '' && deliveryData.endTime !== '') {
      if (user?.deliveryDays) {
        dispatch(updateDeliveryDays(uid, selectedDeliveryDays, deliveryData))
      } else {
        dispatch(addDeliveryDays(uid, selectedDeliveryDays, deliveryData))
      }
    }
  }

  const days = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ]

  return (
    <>
      <OnlyHeader />
      <Container fluid className='mt--7'>
        <div className='col'>
          <Card className='shadow'>
            <CardHeader className='d-lg-flex d-sm-block justify-content-between'>
              <div className='d-flex align-items-center'>
                <Button
                  size='sm'
                  color='primary'
                  onClick={() => {
                    history.push('/admin/settings')
                  }}
                >
                  <i className='fas fa-arrow-left '></i>
                </Button>

                <h3 className=' pt-2 '>Pickup or Delivery</h3>
              </div>
            </CardHeader>

            <Container className='mb-4'>
              {/* <Row>
                <Col xs="12" xl="6">
                  <Label>Delivery Type:</Label>
                  <Row className="">
                    <Col>
                      <Label className="ml-4">
                        <Input type="radio" name="radio1" /> Delivery
                      </Label>
                    </Col>
                    <Col>
                      <Label className="ml-4">
                        <Input type="radio" name="radio1" /> Pickup
                      </Label>
                    </Col>
                    <Col>
                      <Label className="ml-4">
                        <Input type="radio" name="radio1" /> Both
                      </Label>
                    </Col>
                  </Row>
                </Col>
              </Row> */}
              <Label className='mt-3 ml-3'>
                <strong>Pickup :</strong>
              </Label>
              <Row className='mx-3 my-3'>
                <Col className='px-0'>
                  <Label>Pickup Day</Label>
                  <Row className='mx-3'>
                    {days?.map((day, idx) => {
                      return (
                        <Button
                          key={idx}
                          className={`text-capitalize ${
                            selectedPickUpDays.includes(day)
                              ? 'pickup__btn__active'
                              : 'pickup__btn'
                          }`}
                          onClick={() => handlePickUpDayClick(day)}
                          // onClick={() => setPickUpActive(idx)}
                        >
                          {day}
                        </Button>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
              <Row className='mx-1 my-3'>
                <Col>
                  <Label>Start Time</Label>
                  <Input
                    type='time'
                    name='startTime'
                    id='start-time'
                    placeholder='Start time'
                    onChange={handlePickUpChange}
                    value={pickupData.startTime}
                  />
                </Col>
                <Col>
                  <Label>End Time</Label>
                  <Input
                    type='time'
                    name='endTime'
                    id='end-time'
                    placeholder='End time'
                    onChange={handlePickUpChange}
                    value={pickupData.endTime}
                  />
                </Col>
              </Row>
              <Label className='mt-3 ml-3'>
                <strong>Delivery :</strong>
              </Label>
              <Row className='mx-3 my-3'>
                <Col className='px-0'>
                  <Label>Delivery Day</Label>
                  <Row className='mx-3'>
                    {days?.map((day, idx) => {
                      return (
                        <Button
                          key={idx}
                          className={`text-capitalize ${
                            selectedDeliveryDays.includes(day)
                              ? 'pickup__btn__active'
                              : 'pickup__btn'
                          }`}
                          onClick={() => handleDeliveryDayClick(day)}
                        >
                          {day}
                        </Button>
                      )
                    })}
                  </Row>
                </Col>
              </Row>
              <Row className='mx-1 my-3'>
                <Col>
                  <Label>Start Time</Label>
                  <Input
                    type='time'
                    name='startTime'
                    id='start-time'
                    placeholder='Start time'
                    onChange={handleDeliveryChange}
                    value={deliveryData.startTime}
                  />
                </Col>
                <Col>
                  <Label>End Time</Label>
                  <Input
                    type='time'
                    name='endTime'
                    id='end-time'
                    placeholder='End time'
                    onChange={handleDeliveryChange}
                    value={deliveryData.endTime}
                  />
                </Col>
              </Row>
              <Row>
                <Col className='d-flex mt-3'>
                  {' '}
                  <Button
                    color='primary'
                    disabled={loading}
                    className='ml-auto'
                    onClick={handlePickUpAndDelivery}
                  >
                    {loading ? <Spinner size='sm' /> : 'Save'}
                  </Button>
                </Col>
              </Row>
            </Container>
          </Card>
        </div>
      </Container>
    </>
  )
}

export default PickupOrDelivery
