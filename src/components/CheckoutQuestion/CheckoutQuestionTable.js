import { useState } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Row,
  Button,
  Input,
  Col,
  Container
} from 'reactstrap'
function CheckoutQuestionTable ({ data, addToggle }) {
  const { question } = useSelector(state => state.checkoutQuestion)
  const history = useHistory()

  //search functionality
  const [search, setSearch] = useState('')
  const handleSearchFilter = e => {
    setSearch(e.target.value)
  }

  const filteredResponses = question?.filter(item =>
    item?.title.includes(search)
  )
  //   pagination coding and filtering
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)

  const handlePageChange = event => {
    setPageSize(event.target.value)
    setCurrentPage(1)
  }

  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize

  const numPages = Math.ceil(filteredResponses.length / pageSize)

  const pageLinks = []

  for (let i = 1; i <= numPages; i++) {
    pageLinks.push(
      <PaginationItem key={i} active={i === currentPage}>
        <PaginationLink href='#pablo' onClick={() => setCurrentPage(i)}>
          {i}
        </PaginationLink>
      </PaginationItem>
    )
  }

  return (
    <Container fluid>
      <Row>
        <div className='col'>
          <Card className='shadow'>
            <CardHeader className='d-lg-flex justify-content-between'>
              <h3>Checkout Question</h3>
              <Row>
                <Col xs='12' sm='4' lg='4'>
                  <Input
                    placeholder='Search here...'
                    value={search}
                    onChange={handleSearchFilter}
                  />
                </Col>
                <Col xs='12' sm='4' lg='4' className='my-2 my-sm-0'>
                  {' '}
                  <Input
                    id='exampleSelect'
                    value={pageSize}
                    onChange={handlePageChange} // Here
                    type='select'
                  >
                    <option value='5'>Show Entries</option>
                    <option value='10'>10</option>
                    <option value='15'>15</option>
                    <option value='20'>20</option>
                    <option value='25'>25</option>
                  </Input>
                </Col>
                <Col xs='12' sm='4' lg='4' className=''>
                  {' '}
                  <Button color='primary' onClick={addToggle} block>
                    Add
                  </Button>
                </Col>
              </Row>
            </CardHeader>

            <Table className='align-items-center table-flush' responsive>
              <thead className='thead-light'>
                <tr>
                  <th scope='col'>Name</th>
                  <th scope='col'>Type</th>

                  <th scope='col'>Actions</th>
                </tr>
              </thead>
              <tbody>
                {question.length > 0 &&
                  filteredResponses
                    ?.slice(startIndex, endIndex)

                    ?.map((el, idx) => {
                      return (
                        <tr key={idx}>
                          <th scope='row'>{el?.title}</th>
                          <th scope='row'>{el?.type}</th>
                          <td>
                            <Button
                              className='btn-sm'
                              color='primary'
                              onClick={() => {
                                history.push(
                                  `/admin/checkout-responses/${el?.id}`
                                )
                              }}
                            >
                              View Response
                            </Button>
                            {/* <Button
                              className='btn-sm'
                              color='success'
                              onClick={() => {
                                history.push(
                                  `/admin/checkout-responses/${el?.id}`
                                )
                              }}
                            >
                              Got it
                            </Button> */}
                          </td>
                        </tr>
                      )
                    })}
              </tbody>
            </Table>
            <CardFooter className='py-4'>
              <nav aria-label='...'>
                <Pagination
                  className='pagination justify-content-end mb-0'
                  listClassName='justify-content-end mb-0'
                >
                  <PaginationItem disabled={currentPage === 1}>
                    <PaginationLink
                      href='#pablo'
                      onClick={() => setCurrentPage(currentPage - 1)}
                    >
                      <i className='fas fa-angle-left' />
                      <span className='sr-only'>Previous</span>
                    </PaginationLink>
                  </PaginationItem>
                  {pageLinks}
                  <PaginationItem disabled={currentPage === numPages}>
                    <PaginationLink
                      href='#pablo'
                      onClick={() => setCurrentPage(currentPage + 1)}
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
    </Container>
  )
}

export default CheckoutQuestionTable
