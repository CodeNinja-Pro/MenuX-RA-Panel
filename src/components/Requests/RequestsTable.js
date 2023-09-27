import moment from 'moment'
import { useSelector } from 'react-redux'
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
  Input,
  Col,
  Badge,
  Button
} from 'reactstrap'
function RequestTable ({ data }) {
  const { user, userPermissions } = useSelector(state => state.auth)
  const requestPermissions = userPermissions?.requests

  return (
    <Row>
      <div className='col'>
        <Card className='shadow'>
          <CardHeader className='d-lg-flex justify-content-between'>
            <h3>Requests</h3>
            <Row>
              <Col xs='12' sm='6'>
                <Input placeholder='Search here...' />
              </Col>
              <Col xs='12' sm='6' className='mt-2 mt-sm-0'>
                <Input
                  type='select'
                  id='exampleCustomSelect'
                  name='customSelect'
                >
                  <option value=''>Show Entries</option>
                  <option value='5'>5</option>
                  <option value='10'>10</option>
                  <option value='10'>20</option>
                  <option value='50'>50</option>
                </Input>
              </Col>
            </Row>
            <Button onClick={() => window.location.reload()} color='primary'>
              Refresh
            </Button>
          </CardHeader>
          {user?.type == 'kitchen-admin' ? (
            <>
              {requestPermissions?.get ? (
                <>
                  <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Table No</th>
                        <th scope='col'>Customer Name</th>
                        <th scope='col'>Comments</th>
                        <th scope='col'>Status</th>
                        <th scope='col'>Date</th>
                        <th scope='col'>During</th>
                        <th scope='col'>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((el, id) => {
                        const timestamp = el?.createdAt
                        const createdAtMoment = moment
                          .unix(timestamp?.seconds)
                          .utc()
                          .add(timestamp?.nanoseconds / 1000000, 'milliseconds')

                        // calculate the time elapsed in minutes
                        const nowMoment = moment.utc()
                        const elapsedMinutes = nowMoment.diff(
                          createdAtMoment,
                          'minutes'
                        )
                        const color =
                          elapsedMinutes >= 0 && elapsedMinutes <= 3
                            ? 'bg-green'
                            : elapsedMinutes > 3 && elapsedMinutes <= 5
                            ? 'bg-orange'
                            : 'bg-red'

                        return (
                          <tr key={id} className={color}>
                            <th scope='row'>{el?.tableNumber}</th>
                            <td>{el?.customerName}</td>
                            <td> {el?.comments}</td>
                            <td>
                              <Badge color='primary' pill>
                                {el?.status}
                              </Badge>
                            </td>
                            <td>
                              {el.status == 'processing' ? (
                                <>
                                  <Button size='sm' color='success'>
                                    Mark Fulfilled
                                  </Button>
                                  <Button size='sm' color='danger'>
                                    Mark Unfulfilled
                                  </Button>
                                </>
                              ) : (
                                ''
                              )}
                            </td>
                          </tr>
                        )
                      })}{' '}
                    </tbody>
                  </Table>
                </>
              ) : (
                <Row className='justify-content-center align-items-center py-4'>
                  {' '}
                  You have no access to this page{' '}
                </Row>
              )}
            </>
          ) : (
            <>
              {' '}
              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Table No</th>
                    <th scope='col'>Customer Name</th>
                    <th scope='col'>Comments</th>
                    <th scope='col'>Status</th>
                    <th scope='col'>Date</th>
                    <th scope='col'>During</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((el, id) => {
                    const timestamp = el?.createdAt
                    const createdAtMoment = moment
                      .unix(timestamp?.seconds)
                      .utc()
                      .add(timestamp?.nanoseconds / 1000000, 'milliseconds')

                    // calculate the time elapsed in minutes
                    const nowMoment = moment.utc()
                    const elapsedMinutes = nowMoment.diff(
                      createdAtMoment,
                      'minutes'
                    )
                    const color =
                      elapsedMinutes >= 0 && elapsedMinutes <= 3
                        ? 'bg-green'
                        : elapsedMinutes > 3 && elapsedMinutes <= 5
                        ? 'bg-orange'
                        : 'bg-red'

                    return (
                      <tr key={id} className={color}>
                        <th scope='row'>{el?.tableNumber}</th>
                        <td>{el?.customerName}</td>
                        <td> {el?.comments}</td>
                        <td>
                          <Badge color='primary' pill>
                            {el?.status}
                          </Badge>
                        </td>
                        <td>
                          {el.status == 'processing' ? (
                            <>
                              <Button size='sm' color='primary'>
                                Mark Fulfilled
                              </Button>
                              <Button size='sm' color='danger'>
                                Mark Unfulfilled
                              </Button>
                            </>
                          ) : (
                            ''
                          )}
                        </td>
                      </tr>
                    )
                  })}{' '}
                </tbody>
              </Table>
            </>
          )}
          <CardFooter className='py-4'>
            <nav aria-label='...'>
              <Pagination
                className='pagination justify-content-end mb-0'
                listClassName='justify-content-end mb-0'
              >
                <PaginationItem className='disabled'>
                  <PaginationLink
                    href='#pablo'
                    onClick={e => e.preventDefault()}
                    tabIndex='-1'
                  >
                    <i className='fas fa-angle-left' />
                    <span className='sr-only'>Previous</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className='active'>
                  <PaginationLink
                    href='#pablo'
                    onClick={e => e.preventDefault()}
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#pablo'
                    onClick={e => e.preventDefault()}
                  >
                    2 <span className='sr-only'>(current)</span>
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#pablo'
                    onClick={e => e.preventDefault()}
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#pablo'
                    onClick={e => e.preventDefault()}
                  >
                    <i className='fas fa-angle-right' />
                    <span className='sr-only'>Next</span>
                  </PaginationLink>
                </PaginationItem>
              </Pagination>
            </nav>
          </CardFooter>
        </Card>
      </div>
    </Row>
  )
}

export default RequestTable
