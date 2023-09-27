import OnlyHeader from '../components/Headers/OnlyHeader'

import { useEffect, useRef, useState } from 'react'

import moment from 'moment'
import { DateRangePicker } from 'react-date-range'
import { addDays } from 'date-fns'
import {
  Card,
  CardHeader,
  CardFooter,
  Pagination,
  PaginationItem,
  PaginationLink,
  Table,
  Container,
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
import { useDispatch, useSelector } from 'react-redux'
import { getAllMerchantAction } from '../store/actions/restaurantAction'
import { getfilterOrdersAction } from '../store/actions/orderActions'
import exportFromJSON from 'export-from-json'
function PaymentsAndReports () {
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const handleClickOutside = event => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [ref])

  const addtoggle = () => {
    setAddModal(!addModal)
  }
  const edittoggle = () => {
    setEditModal(!editModal)
  }
  // const data = [
  //   {
  //     merchantName: 'COTE Korean Steakhouse',
  //     itemsSold: 3,
  //     purchaseId: 12345,
  //     TotalAmount: '300'
  //   },
  //   {
  //     merchantName: 'COTE Korean Steakhouse',
  //     itemsSold: 3,
  //     purchaseId: 1234567,
  //     TotalAmount: '200'
  //   },
  //   {
  //     merchantName: 'San Carlo Osteria Piemonte',
  //     itemsSold: 1,
  //     purchaseId: 93483,
  //     TotalAmount: '500'
  //   },
  //   {
  //     merchantName: 'Keens Steakhouse',
  //     itemsSold: 8,
  //     purchaseId: 287382,
  //     TotalAmount: '300'
  //   },
  //   {
  //     merchantName: 'Scalini Fedeli',
  //     itemsSold: 4,
  //     purchaseId: 84574,
  //     TotalAmount: '100'
  //   }
  // ]
  const [datestate, setDateState] = useState([
    {
      startDate: addDays(new Date(), -7),
      endDate: new Date(),
      key: 'selection'
    }
  ])
  const startDate = moment(datestate[0].startDate).unix()
  const endDate = moment(datestate[0].endDate).unix()
  const dateRangeString =
    datestate.length > 0
      ? `${moment(datestate[0].startDate).format('DD MMM YYYY')} - ${moment(
          datestate[0].endDate
        ).format('DD MMM YYYY')}`
      : `${moment().format('DD MMM YYYY')} - ${moment().format('DD MMM YYYY')}`
  console.log('dateRangeString', dateRangeString)
  const dispatch = useDispatch()
  useEffect(() => {
    // dispatch(getAllOrdersAction());
    dispatch(getAllMerchantAction())
  }, [])

  const { allOrder, OrdersRestData, Loader } = useSelector(
    state => state.orders
  )
  const totalquantity = order => {
    const totalQuantity = order?.reduce((acc, item) => {
      return acc + item?.quantity
    }, 0)
    return totalQuantity
  }
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const [searchMerchant, setSearchMerchant] = useState('')
  const { merchantData } = useSelector(state => state.restaurant)
  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = OrdersRestData?.nbPages
    if (totalPages >= 1) {
      const visiblePages = 3 // or 4, depending on your preference
      let startPage = Math.max(currentPage - 1, 0)
      let endPage = Math.min(startPage + visiblePages - 1, totalPages - 1)
      if (startPage > 0) {
        pageNumbers.push(
          <PaginationItem key='start-ellipsis' disabled>
            <PaginationLink href=''>...</PaginationLink>
          </PaginationItem>
        )
      }

      for (let i = startPage; i <= endPage; i++) {
        pageNumbers.push(
          <PaginationItem key={i} active={i === currentPage}>
            <PaginationLink href='' onClick={() => handleClick(i)}>
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        )
      }

      if (endPage < totalPages - 1) {
        if (endPage < totalPages - 2) {
          pageNumbers.push(
            <PaginationItem key='end-ellipsis' disabled>
              <PaginationLink href=''>...</PaginationLink>
            </PaginationItem>
          )
        }

        pageNumbers.push(
          <PaginationItem key={totalPages - 1}>
            <PaginationLink href='' onClick={() => handleClick(totalPages - 1)}>
              {totalPages}
            </PaginationLink>
          </PaginationItem>
        )
      }
    }

    return pageNumbers
  }
  useEffect(() => {
    if (merchantData.length > 0) {
      setSearchMerchant(merchantData[0]?.id)
    }
  }, [merchantData])
  useEffect(() => {
    if (searchMerchant) {
      dispatch(
        getfilterOrdersAction(
          searchMerchant,
          pageSize,
          currentPage,
          startDate,
          endDate
        )
      )
    }
  }, [searchMerchant, currentPage, pageSize, startDate, endDate])
  const handleClick = page => {
    setCurrentPage(page)
  }
  const handlePageChange = event => {
    setPageSize(event.target.value)
    setCurrentPage(1)
  }
  const totalAmountShow = () => {
    const totalamount = allOrder?.reduce((acc, item) => {
      return acc + item?.totalAmount
    }, 0)
    return totalamount
  }

  const exportData = () => {
    const fileName = 'order detail'

    const exportType = exportFromJSON.types.csv
    let temp = []
    allOrder?.forEach(el => {
      let qty = totalquantity(el?.order)
      temp.push({
        orderID: el?.id,
        'Items Sold': qty,
        'Total Amount': el?.totalAmount
      })
    })
    if (temp.length > 0) {
      exportFromJSON({ data: temp, fileName, exportType })
    }
  }

  return (
    <>
      <OnlyHeader />
      <Container className='mt--7 mb-5' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className=''>
                <Row className='justify-content-between  align-items-center'>
                  <Col md='6'>
                    {' '}
                    <h3 className='mb-0 pt-2 d-block'>Payments and Reports</h3>
                  </Col>
                  <Col md='6'>
                    {' '}
                    <h4 className='mb-0 pt-2 d-block'>
                      Total Amount : {totalAmountShow()}$
                    </h4>
                  </Col>
                </Row>

                <Row className='mt-2'>
                  <Col xs='12' sm='6' md='6' xl='3' className='mt-2'>
                    {' '}
                    <Input
                      type='select'
                      id='exampleCustomSelect'
                      name='customSelect'
                      value={searchMerchant}
                      onChange={e => {
                        setSearchMerchant(e.target.value)
                      }}
                    >
                      <option value='' disabled>
                        Select Merchant
                      </option>
                      {merchantData?.map(obj => (
                        <>
                          <option value={obj?.id}>{obj?.name}</option>
                        </>
                      ))}
                    </Input>
                  </Col>
                  <Col xs='12' sm='6' md='6' xl='3' className='mt-2'>
                    {' '}
                    <Input
                      type='select'
                      id='exampleCustomSelect'
                      name='customSelect'
                      value={pageSize}
                      onChange={handlePageChange}
                    >
                      <option value=''>Show Entries</option>
                      <option value='5'>5</option>
                      <option value='10'>10</option>
                      <option value='20'>20</option>
                      <option value='50'>50</option>
                    </Input>
                  </Col>
                  <Col xs='12' sm='6' md='6' xl='3' className='mt-2'>
                    {' '}
                    <div ref={ref}>
                      <Input
                        value={dateRangeString}
                        className='pointer'
                        onClick={() => setIsOpen(!isOpen)}
                        readOnly
                      />
                      {isOpen && (
                        <DateRangePicker
                          onChange={item => setDateState([item.selection])}
                          showSelectionPreview={true}
                          moveRangeOnFirstSelection={false}
                          months={2}
                          ranges={datestate}
                          direction='horizontal'
                          preventSnapRefocus={true}
                          calendarFocus='backwards'
                          className='dateRangerSet'
                        />
                      )}
                    </div>
                  </Col>

                  <Col xs='12' sm='6' md='6' xl='3' className='mt-2'>
                    {' '}
                    <Button color='primary' block onClick={exportData}>
                      Export
                    </Button>
                  </Col>
                </Row>
              </CardHeader>
              {Loader ? (
                <div
                  className='loader d-flex justify-content-center align-items-center my-5'
                  style={{
                    overflow: 'hidden'
                  }}
                >
                  <Spinner size='lg' color='primary' />
                </div>
              ) : (
                <>
                  <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Purchase Id</th>
                        <th scope='col'>Items sold</th>
                        <th scope='col'>Total Amount</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrder?.length > 0 &&
                        allOrder.map((el, idx) => {
                          return (
                            <tr>
                              <td>{el?.id}</td>
                              <td>{totalquantity(el?.order)}</td>
                              <td>${el?.totalAmount}</td>
                            </tr>
                          )
                        })}
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
                    <PaginationItem disabled={currentPage === 0}>
                      <PaginationLink
                        href=''
                        onClick={() => handleClick(currentPage - 1)}
                      >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {/* Page numbers */}
                    {renderPageNumbers()}
                    {/* Next button */}
                    <PaginationItem
                      disabled={currentPage === OrdersRestData?.nbPages - 1}
                    >
                      <PaginationLink
                        href=''
                        onClick={() => handleClick(currentPage + 1)}
                      >
                        <i className='fas fa-angle-right' />
                        <span className='sr-only'>Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter>
              {/* <CardFooter className="py-4">
                <nav aria-label="...">
                  <Pagination
                    className="pagination justify-content-end mb-0"
                    listClassName="justify-content-end mb-0"
                  >
                    <PaginationItem className="disabled">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                        tabIndex="-1"
                      >
                        <i className="fas fa-angle-left" />
                        <span className="sr-only">Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem className="active">
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        1
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        2 <span className="sr-only">(current)</span>
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        3
                      </PaginationLink>
                    </PaginationItem>
                    <PaginationItem>
                      <PaginationLink
                        href="#pablo"
                        onClick={(e) => e.preventDefault()}
                      >
                        <i className="fas fa-angle-right" />
                        <span className="sr-only">Next</span>
                      </PaginationLink>
                    </PaginationItem>
                  </Pagination>
                </nav>
              </CardFooter> */}
            </Card>
          </div>
        </Row>

        {/* Modal for add restaurant */}
        <div>
          <Modal isOpen={addModal} toggle={addtoggle}>
            <ModalHeader toggle={addtoggle}>Add Merchant Details</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='name'>Merchant Name</Label>
                      <Input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter name'
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Location</Label>
                      <Input
                        type='text'
                        name='location'
                        id='location'
                        placeholder='Enter location'
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Status</Label>
                      <Input
                        type='select'
                        id='exampleCustomSelect'
                        name='customSelect'
                      >
                        <option value='' selected disabled>
                          Select Status
                        </option>
                        <option value='5'>Active</option>
                        <option value='10'>InActive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Language</Label>
                      <Input
                        type='select'
                        id='exampleCustomSelect'
                        name='customSelect'
                      >
                        <option value='' selected disabled>
                          Select Language
                        </option>
                        <option value='5'>English</option>
                        <option value='5'>Russian</option>
                        <option value='10'>French</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='accessible'>Accessible</Label>
                      <Input
                        type='name'
                        name='url'
                        id='accessible'
                        placeholder='Enter URL'
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='email'>Email</Label>
                      <Input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='location'>Password</Label>
                      <Input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter password'
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className='d-flex justify-content-end'>
                  <Button color='primary'>Save</Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>

        {/* Modal for edit restaurant Details */}
        <div>
          <Modal isOpen={editModal} toggle={edittoggle}>
            <ModalHeader toggle={edittoggle}>Edit Merchant Details</ModalHeader>
            <ModalBody>
              <Form>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='name'>Merchant Name</Label>
                      <Input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter name'
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='location'>Location</Label>
                      <Input
                        type='text'
                        name='location'
                        id='location'
                        placeholder='Enter location'
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Status</Label>
                      <Input
                        type='select'
                        id='exampleCustomSelect'
                        name='customSelect'
                      >
                        <option value='' selected disabled>
                          Select Status
                        </option>
                        <option value='5'>Active</option>
                        <option value='10'>InActive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Language</Label>
                      <Input
                        type='select'
                        id='exampleCustomSelect'
                        name='customSelect'
                      >
                        <option value='' selected disabled>
                          Select Language
                        </option>
                        <option value='5'>English</option>
                        <option value='5'>Russian</option>
                        <option value='10'>French</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='accessible'>Accessible</Label>
                      <Input
                        type='name'
                        name='url'
                        id='accessible'
                        placeholder='Enter URL'
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='email'>Email</Label>
                      <Input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='location'>Password</Label>
                      <Input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter password'
                      />
                    </FormGroup>
                  </Col>
                </Row>

                <div className='d-flex justify-content-end'>
                  <Button color='primary'>Save</Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </Container>
    </>
  )
}

export default PaymentsAndReports
