import OnlyHeader from '../components/Headers/OnlyHeader'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Button,
  Card,
  CardHeader,
  Container,
  Form,
  FormGroup,
  Label,
  Row,
  Spinner
} from 'reactstrap'
import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { updateLanguages } from '../store/actions/settingAction'
import { updateRestaurantCurrency } from '../store/actions/settingAction'

const VenueSettings = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { uid, user } = useSelector(state => state.auth)
  const { loading, currencyLoading } = useSelector(state => state.setting)
  const [selectedLanguages, setSelectedLanguages] = useState([])
  const [selectedCurrency, setSelectedCurrency] = useState('')

  const options = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'ur', label: 'Urdu' },
    { value: 'de', label: 'German' }
  ]
  const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'EUR', label: 'EUR' },
    { value: 'GBP', label: 'GBP' },
    { value: 'JPY', label: 'JPY' }
  ]
  const handleSelect = selectedOptions => {
    const selectedValues = selectedOptions.map(option => option.value)
    setSelectedLanguages(selectedValues)
  }

  function handleCurrencyChange (selectedOption) {
    const selectedValues = selectedOption.value
    setSelectedCurrency(selectedValues)
  }
  useEffect(() => {
    if (user?.languages) {
      setSelectedLanguages(user?.languages)
    } else {
      setSelectedLanguages([])
    }
    if (user?.currency) {
      setSelectedCurrency(user?.currency)
    } else {
      setSelectedCurrency('')
    }
  }, [user])

  const handleLanguageSubmit = evt => {
    evt.preventDefault()
    dispatch(updateLanguages(uid, selectedLanguages))
  }
  const handleCurrencySubmit = evt => {
    evt.preventDefault()
    dispatch(updateRestaurantCurrency(uid, selectedCurrency))
  }

  return (
    <>
      <OnlyHeader />
      <Container className='mt--7 mb-5' fluid>
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='d-lg-flex  d-sm-block justify-content-between'>
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

                  <h3 className=' pt-2 '>Venue Setting</h3>
                </div>
              </CardHeader>
              <div className='mx-3 mx-md-5 my-2'>
                <h3 className=' pt-2 '>Restaurant Languages</h3>
                <Form onSubmit={handleLanguageSubmit}>
                  <FormGroup>
                    <Label for='languages'>Select languages:</Label>
                    <Select
                      placeholder='Select Languages'
                      isMulti
                      options={options}
                      value={options.filter(option =>
                        selectedLanguages.includes(option.value)
                      )}
                      onChange={handleSelect}
                    />
                  </FormGroup>

                  <div className='d-flex justify-content-end'>
                    <Button
                      color='primary'
                      type='submit'
                      disabled={selectedLanguages.length === 0 || loading}
                    >
                      {loading ? <Spinner size='sm' /> : 'Save'}
                    </Button>
                  </div>
                </Form>
              </div>
              <div className='mx-3 mx-md-5 my-2'>
                <h3 className=' pt-2 '>Restaurant Currency</h3>
                <Form onSubmit={handleCurrencySubmit}>
                  <FormGroup>
                    <Label for='languages'>Select Currency:</Label>
                    <Select
                      value={currencyOptions.filter(option =>
                        selectedCurrency.includes(option.value)
                      )}
                      placeholder='Select Currency'
                      options={currencyOptions}
                      onChange={handleCurrencyChange}
                    />
                  </FormGroup>

                  <div className='d-flex justify-content-end'>
                    <Button
                      color='primary'
                      type='submit'
                      disabled={currencyLoading}
                    >
                      {currencyLoading ? <Spinner size='sm' /> : 'Save'}
                    </Button>
                  </div>
                </Form>
              </div>
              <div className='mx-3 mx-md-5 my-2'>
                <h3 className=' pt-2 '>Client(guest User)</h3>
              </div>
            </Card>
          </div>
        </Row>
      </Container>
    </>
  )
}

export default VenueSettings
