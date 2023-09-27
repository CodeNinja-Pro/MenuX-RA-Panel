import OnlyHeader from '../components/Headers/OnlyHeader'
import { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import ReactSwitch from 'react-switch'
import {
  Row,
  Container,
  Card,
  Col,
  Input,
  Button,
  Form,
  Spinner,
  Label,
  FormGroup
} from 'reactstrap'

import { useDispatch, useSelector } from 'react-redux'
import { addForwardFees } from '../store/actions/settingAction'
import { updateForwardFees } from '../store/actions/settingAction'
import { addPaymentConnections } from '../store/actions/settingAction'
import { addPaymentMethodDetails } from '../store/actions/settingAction'

function PaymentConnection () {
  const dispatch = useDispatch()
  const { user, uid } = useSelector(state => state.auth)
  const { loading } = useSelector(state => state.catalog)
  const [checkedCards, setCheckedCards] = useState([])
  const [paypalFormData, setPaypalFormData] = useState({
    paypalClientKey: '',
    paypalSecretKey: ''
  })
  const [stripeFormData, setStripeFormData] = useState({
    stripeClientKey: '',
    stripeSecretKey: ''
  })

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [paymentType, setPaymentType] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [value, setValue] = useState('')
  const [isExist, setIsExist] = useState(null)
  const [index, setIndex] = useState(null)

  const toggle = () => setDropdownOpen(prevState => !prevState)

  const [checked, setChecked] = useState(false)
  const handleChange = nextChecked => {
    setChecked(nextChecked)
  }

  const data = [
    {
      id: '1',
      name: 'paypal',
      data: <i className='fab fa-cc-paypal fa-5x pointer'></i>
    },
    {
      id: '2',
      name: 'stripe',
      data: <i className='fab fa-cc-stripe fa-5x pointer'></i>
    }
    // {
    //   id: "3",
    //   name: "wallet",
    //   data: <i className="fas fa-wallet fa-5x pointer"></i>,
    // },
    // {
    //   id: "4",
    //   name: "square",
    //   data: (
    //     <img
    //       src={square}
    //       alt="square"
    //       width={90}
    //       height={80}
    //       className="pointer"
    //     />
    //   ),
    // },
    // {
    //   id: "5",
    //   name: "telpay",
    //   data: (
    //     <img
    //       src={telpay}
    //       alt="square"
    //       width={90}
    //       height={80}
    //       className="pointer"
    //     />
    //   ),
    // },
    // {
    //   id: "6",
    //   name: "yappy",
    //   data: (
    //     <img
    //       src={yappy}
    //       alt="square"
    //       width={90}
    //       height={80}
    //       className="pointer"
    //     />
    //   ),
    // },
  ]

  // const handleCheckboxChange = (event) => {
  //   const cardId = event.target.value;
  //   const methodName = event.target.name;

  //   const isChecked = event.target.checked;

  //   dispatch(
  //     addPaymentConnections(uid, methodName, () => {
  //       if (isChecked) {
  //         setCheckedCards([...checkedCards, cardId]);
  //       }
  //       // else if (isChecked && checkedCards.length === 2) {
  //       //   enqueueSnackbar("Maximum two payment method can be selected");
  //       // }
  //       else {
  //         setCheckedCards(checkedCards.filter((id) => id !== cardId));
  //       }
  //     })
  //   );
  // };
  const handleCheckboxChange = event => {
    const cardId = event.target.value
    const methodName = event.target.name
    const isChecked = event.target.checked
    dispatch(
      addPaymentConnections(uid, methodName, () => {
        if (isChecked) {
          setCheckedCards(prevCheckedCards => [...prevCheckedCards, cardId])
        } else {
          setCheckedCards(prevCheckedCards =>
            prevCheckedCards.filter(id => id !== cardId)
          )
        }
      })
    )
  }

  const history = useHistory()
  const handleForwardFee = evt => {
    evt.preventDefault()
    let obj = {
      amount: value,
      provider: paymentMethod,
      type: paymentType
    }
    if (isExist) {
      dispatch(
        updateForwardFees(uid, index, obj, () => {
          setPaymentMethod('')
          setPaymentType('')
          setValue('')
          setIsExist(null)
          setIndex(null)
        })
      )
    } else {
      dispatch(
        addForwardFees(uid, obj, () => {
          setPaymentMethod('')
          setPaymentType('')
          setValue('')
        })
      )
    }
  }

  useEffect(() => {
    if (user?.forwardFees) {
      let obj = user?.forwardFees?.find(ele => ele.provider == paymentMethod)
      if (obj) {
        setIsExist(obj)
        setPaymentType(obj.type)
        setValue(obj.amount)
      }
      let indexVal = user?.forwardFees?.findIndex(
        ele => ele.provider === paymentMethod
      )
      if (indexVal == '-1') {
        setIndex(null)
      } else {
        setIndex(indexVal)
      }
    }
  }, [paymentMethod])

  useEffect(() => {
    if (user?.paymentConnections) {
      if (user?.paymentConnections?.paypal && !checkedCards.includes('1')) {
        setCheckedCards(prevCheckedCards => [...prevCheckedCards, '1'])
      }
      if (user?.paymentConnections?.stripe && !checkedCards.includes('2')) {
        setCheckedCards(prevCheckedCards => [...prevCheckedCards, '2'])
      }
      if (user?.paypalClientKey) {
        setPaypalFormData(prevState => ({
          ...prevState,
          paypalClientKey: user?.paypalClientKey
        }))
      }
      if (user?.paypalSecretKey) {
        setPaypalFormData(prevState => ({
          ...prevState,
          paypalSecretKey: user?.paypalSecretKey
        }))
      }
      if (user?.stripeClientKey) {
        setStripeFormData(prevState => ({
          ...prevState,
          stripeClientKey: user?.stripeClientKey
        }))
      }
      if (user?.stripeSecretKey) {
        setStripeFormData(prevState => ({
          ...prevState,
          stripeSecretKey: user?.stripeSecretKey
        }))
      }
    }
  }, [user])

  // Paypal Form Handler
  const handlePaypalFormInput = e => {
    const { name, value } = e.target
    setPaypalFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handlePaypalFormSubmit = e => {
    e.preventDefault()
    dispatch(addPaymentMethodDetails(uid, paypalFormData, 'paypal', () => {}))
  }

  // Stripe form handler
  const handleStripeFormInput = e => {
    const { name, value } = e.target
    setStripeFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleStripeFormSubmit = e => {
    e.preventDefault()
    dispatch(addPaymentMethodDetails(uid, stripeFormData, 'stripe', () => {}))
  }
  return (
    <>
      <OnlyHeader />
      <Container fluid className='mt--7'>
        <div className='col'>
          <Card className='shadow'>
            <Row className='d-lg-flex d-sm-block justify-content-between mx-0 py-3'>
              <Col className='col-3 d-flex align-items-center'>
                <Button
                  size='sm'
                  color='primary'
                  onClick={() => {
                    history.push('/admin/settings')
                  }}
                >
                  <i className='fas fa-arrow-left '></i>
                </Button>

                <h4 className=' pt-2 '>Payment Connection</h4>
              </Col>
              <Col
                className={`col-9 d-flex align-items-center justify-content-${
                  checked ? 'center' : 'end'
                }`}
              >
                <Row className='d-flex align-items-center'>
                  {checked ? (
                    <Col className='d-flex col-8'>
                      <Input
                        type='select'
                        name='select'
                        id='exampleSelect1'
                        className='mx-2'
                        value={paymentMethod}
                        onChange={e => {
                          setPaymentMethod(e.target.value)
                        }}
                      >
                        <option value='' disabled selected>
                          Select Payment Method
                        </option>
                        <option value='paypal'>paypal</option>
                        <option value='stripe'>stripe</option>
                        <option value='wallet'>wallet</option>
                        <option value='square'>square</option>
                        <option value='telpay'>telpay</option>
                        <option value='yappy'>yappy</option>
                      </Input>
                      <Input
                        type='select'
                        name='select'
                        id='exampleSelect'
                        className='mx-2'
                        value={paymentType}
                        onChange={e => {
                          setPaymentType(e.target.value)
                        }}
                      >
                        <option value='' selected disabled>
                          Payment Type
                        </option>
                        <option value='percentage'>Percentage</option>
                        <option value='fixed_price'>Fixed Price</option>
                      </Input>
                      <Input
                        type='number'
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder='Enter Fee'
                      />
                      <Button
                        color='primary'
                        className='ml-3 btn-sm'
                        type='submit'
                        onClick={handleForwardFee}
                        disabled={
                          loading || !paymentMethod || !paymentType || !value
                        }
                      >
                        {loading ? <Spinner size='sm' /> : 'Save'}
                      </Button>
                    </Col>
                  ) : (
                    ''
                  )}

                  <Col
                    className={`d-flex align-items-center justify-content-end ${
                      checked ? 'col-4' : ''
                    }`}
                  >
                    {' '}
                    <ReactSwitch
                      onChange={handleChange}
                      checked={checked}
                      className='react-switch'
                    />
                    <span className='ml-2 ' style={{ fontSize: '12px' }}>
                      Forward Fee to Client
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>

            <Container className='my-4'>
              <Row>
                {data.map((el, id) => {
                  return (
                    <Col
                      key={id}
                      className='d-flex justify-content-center align-items-center'
                    >
                      {/* <Card
                        className="shadow  d-flex justify-content-center align-items-center p-2 mt-2"
                        style={{ width: "120px" }}
                        onClick={() => {
                          const checkbox = document.getElementById(
                            `checkbox-${el.id}`
                          );

                          checkbox.checked = !checkbox.checked;
                          handleCheckboxChange({
                            target: checkbox,
                          });
                        }}
                      >
                        <input
                          type="checkbox"
                          id={`checkbox-${el.id}`}
                          name={el.name}
                          value={el.id}
                          checked={checkedCards.includes(el.id)}
                          onChange={handleCheckboxChange}
                        />

                        {el.data}
                      </Card> */}
                      <Card
                        className='shadow d-flex justify-content-center align-items-center p-2 mt-2'
                        style={{ width: '120px' }}
                        onClick={event => {
                          const checkbox = document.getElementById(
                            `checkbox-${el.id}`
                          )
                          const isChecked = !checkbox.checked
                          checkbox.checked = isChecked
                          handleCheckboxChange({
                            target: checkbox,
                            checked: isChecked
                          })
                        }}
                      >
                        <input
                          type='checkbox'
                          id={`checkbox-${el.id}`}
                          name={el.name}
                          value={el.id}
                          checked={checkedCards.includes(el.id)}
                          onChange={handleCheckboxChange}
                          style={{ pointerEvents: 'none' }}
                        />
                        {el.data}
                      </Card>
                    </Col>
                  )
                })}
              </Row>
              {checkedCards.map((item, index) => (
                <div key={index}>
                  {item.includes('1') && (
                    <Form onSubmit={handlePaypalFormSubmit}>
                      <h2 className='py-2'>
                        Enter Paypal Payment Method Details
                      </h2>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label htmlFor='paypalClientKey'>
                              Paypal Client ID
                            </Label>
                            <Input
                              id='paypalClientKey'
                              name='paypalClientKey'
                              placeholder='Enter Paypal Client ID'
                              type='text'
                              value={paypalFormData.paypalClientKey}
                              onChange={handlePaypalFormInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label htmlFor='paypalSecretKey'>
                              Paypal Client Secret
                            </Label>
                            <Input
                              id='paypalSecretKey'
                              name='paypalSecretKey'
                              placeholder='Enter Paypal Client Secret'
                              type='password'
                              value={paypalFormData.paypalSecretKey}
                              onChange={handlePaypalFormInput}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button type='submit'>Submit</Button>
                    </Form>
                  )}
                  {item.includes('2') && (
                    <Form onSubmit={handleStripeFormSubmit}>
                      <h2 className='py-2'>
                        Enter Stripe Payment Method Details
                      </h2>
                      <Row>
                        <Col md={6}>
                          <FormGroup>
                            <Label htmlFor='stripeClientKey'>
                              Stripe Client ID
                            </Label>
                            <Input
                              id='stripeClientKey'
                              name='stripeClientKey'
                              placeholder='Enter Stripe Client ID'
                              type='text'
                              value={stripeFormData.stripeClientKey}
                              onChange={handleStripeFormInput}
                            />
                          </FormGroup>
                        </Col>
                        <Col md={6}>
                          <FormGroup>
                            <Label htmlFor='stripeSecretKey'>
                              Stripe Client Secret
                            </Label>
                            <Input
                              id='stripeSecretKey'
                              name='stripeSecretKey'
                              placeholder='Enter Stripe Client Secret'
                              type='password'
                              value={stripeFormData.stripeSecretKey}
                              onChange={handleStripeFormInput}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Button type='submit'>Submit</Button>
                    </Form>
                  )}
                </div>
              ))}
            </Container>
          </Card>
        </div>
      </Container>
    </>
  )
}

export default PaymentConnection
