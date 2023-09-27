import OnlyHeader from '../components/Headers/OnlyHeader'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

import { Row, Container, Card, CardHeader, Col } from 'reactstrap'

function Settings () {
  const { user, userPermissions } = useSelector(state => state.auth)
  const settingsPermissions = userPermissions?.settings

  const data = [
    {
      icon: 'fab fa-cc-paypal',
      title: 'Payment',
      link: 'payment-connection'
    },
    {
      icon: 'fas fa-business-time',
      title: 'Store Timings',
      link: 'store-timings'
    },
    {
      icon: 'fas fa-truck',
      title: 'Pickup or Delivery',
      link: 'pickup-or-delivery'
    },
    {
      icon: 'fas fa-user-clock',
      title: 'Holidays',
      link: 'holidays'
    },
    // {
    // 	icon: 'fas fa-cogs',
    // 	title: 'Customization',
    // 	link: 'customization',
    // },
    {
      icon: 'fas fa-user-cog',
      title: 'Client Settings',
      link: 'client-settings'
    },
    {
      icon: 'fas fa-user-cog',
      title: 'Account Settings',
      link: 'accout-settings'
    },
    {
      icon: 'fas fa-user-cog',
      title: 'Venue Settings',
      link: 'venue-settings'
    }
  ]
  const history = useHistory()
  return (
    <>
      <OnlyHeader />
      <Container fluid>
        <Container fluid className='mt--7'>
          <Row>
            <Col>
              <Card className='shadow'>
                <CardHeader className='d-lg-flex d-sm-block justify-content-between'>
                  <h3 className='mb-0 pt-2 '>Settings</h3>
                </CardHeader>

                <Container className='my-4'>
                  {user?.type === 'kitchen-admin' ? (
                    <>
                      {settingsPermissions?.get ? (
                        <Row className='pb-2'>
                          {data?.map((el, id) => {
                            return (
                              <Col
                                // md={2}
                                key={id}
                                className='mt-2 d-flex justify-content-center'
                              >
                                <Card
                                  className='shadow rounded d-flex justify-content-center align-items-center py-4 px-2 pointer'
                                  style={{
                                    width: '150px'
                                  }}
                                  onClick={() => {
                                    history.push(`/admin/${el.link}`)
                                  }}
                                >
                                  <i className={`${el.icon} fa-2x `}></i>
                                  <h4 className='mt-2 m-0'>{el.title}</h4>
                                </Card>
                              </Col>
                            )
                          })}
                        </Row>
                      ) : (
                        <Row className='py-4 justify-content-center align-items-center'>
                          You don't have the permission to access the page
                        </Row>
                      )}
                    </>
                  ) : (
                    <Row className='pb-2'>
                      {data?.map((el, id) => {
                        return (
                          <Col
                            // md={2}
                            key={id}
                            className='mt-2 d-flex justify-content-center'
                          >
                            <Card
                              className='shadow rounded d-flex justify-content-center align-items-center py-4 px-2 pointer'
                              style={{ width: '150px' }}
                              onClick={() => {
                                history.push(`/admin/${el.link}`)
                              }}
                            >
                              <i className={`${el.icon} fa-2x `}></i>
                              <h4 className='mt-2 m-0'>{el.title}</h4>
                            </Card>
                          </Col>
                        )
                      })}
                    </Row>
                  )}
                </Container>
              </Card>
            </Col>
          </Row>
        </Container>
      </Container>
    </>
  )
}

export default Settings
