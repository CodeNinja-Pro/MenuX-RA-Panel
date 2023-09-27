import React, { useEffect, useState } from 'react'

// reactstrap components
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
  Input,
  Col,
  Button
} from 'reactstrap'
// core components

import OnlyHeader from '../components/Headers/OnlyHeader.js'

// import { customerData } from 'helpers/customerData';
// import MultiRangeSlider from "../components/slider/MultiRangeSlider";
import GenderDistributionModal from '../components/Modals/GenderDistributionModal'
import RangeSlider from '../components/slider/RangeSlider'
import { useDispatch, useSelector } from 'react-redux'
import { getAllCustomers } from '../store/actions/customerAction'

const Customers = () => {
  const dispatch = useDispatch()
  const { user, userPermissions, uid } = useSelector(state => state.auth)
  const { customerData, customerRestData } = useSelector(
    state => state.customer
  )
  const [addModal, setAddModal] = useState(false)
  // const [custData, setCustData] = useState(customerData);
  const [value, setValue] = useState([0, 100])
  // const [pay, setPay] = useState('');
  const [gender, setGender] = useState('')
  const [genderModal, setGenderModal] = useState(false)
  const [searchField, setSearchField] = useState('')
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)
  const customerPermissions = userPermissions?.customers

  const genderToggle = () => {
    setGenderModal(!genderModal)
  }
  const addtoggle = () => {
    setAddModal(!addModal)
  }

  // const handleGenderChange = e => {
  // 	setGender(e.target.value);
  // 	setCustData(
  // 		customerData.filter(
  // 			customer =>
  // 				customer.gender === e.target.value || !e.target.value
  // 		)
  // 	);
  // };

  const renderCustomers = () => {
    const startIndex = currentPage * hitsPerPage
    const endIndex = startIndex + hitsPerPage
    const customersToShow = customerData?.slice(startIndex, endIndex)

    return customersToShow?.map((customer, index) => (
      <tr key={index}>
        <th scope='row'>{customer?.name}</th>
        <td>{customer?.age}</td>
        <td>{customer?.gender}</td>
        <td>{customer?.email}</td>
      </tr>
    ))
  }

  useEffect(() => {
    dispatch(getAllCustomers(uid, searchField, gender, value, hitsPerPage))
  }, [searchField, hitsPerPage, gender, value])

  const handleClick = page => {
    setCurrentPage(page)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = customerRestData?.nbPages
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

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      <Container fluid>
        <Container className='mt--7 mb-5' fluid>
          {/* Table */}
          <Row>
            <div className='col'>
              <Card className='shadow'>
                <CardHeader>
                  <Row>
                    <Col sm='6'>
                      {' '}
                      <h3>Customers</h3>
                    </Col>
                    <Col sm='6' className='d-flex justify-content-sm-end'>
                      <Button color='primary' onClick={genderToggle}>
                        Customer Demographics
                      </Button>
                    </Col>
                  </Row>

                  <Row>
                    <Col sm='6' lg='3' className='mt-3'>
                      <Input
                        placeholder='Search here...'
                        onChange={e => {
                          setCurrentPage(0)
                          setSearchField(e.target.value)
                        }}
                        value={searchField}
                      />
                    </Col>
                    <Col sm='6' lg='3' className='mt-3'>
                      {' '}
                      <Input
                        className=' '
                        type='select'
                        id='exampleCustomSelect'
                        value={gender}
                        onChange={e => {
                          setGender(e.target.value)
                          setCurrentPage(0)
                        }}
                        name='gender'
                      >
                        <option value='' selected disabled>
                          select Gender
                        </option>
                        <option value='all'>All</option>
                        <option value='male'>Male</option>
                        <option value='female'>Female</option>
                      </Input>
                    </Col>
                    <Col sm='6' lg='3' className='mt-3'>
                      <Input
                        type='select'
                        id='exampleCustomSelect'
                        name='customSelect'
                        value={hitsPerPage}
                        onChange={e => {
                          setHitsPerPage(e.target.value)
                          setCurrentPage(0)
                        }}
                      >
                        <option value='5'>Show Entries</option>
                        <option value='10'>10</option>
                        <option value='15'>15</option>
                        <option value='20'>20</option>
                        <option value='50'>50</option>
                      </Input>
                    </Col>
                    <Col className='text-center mt-3' sm='6' lg='3'>
                      {' '}
                      {/* <MultiRangeSlider
                      min={0}
                      max={150}
                      onChange={(min) => {
                        setPay(min);
                      }}
                    /> */}
                      <RangeSlider
                        value={value}
                        setValue={setValue}
                        setCurrentPage={setCurrentPage}
                      />
                      <span className='text-nowrap text-center'>Age Range</span>
                    </Col>
                  </Row>
                </CardHeader>
                {user?.type == 'kitchen-admin' ? (
                  <>
                    {customerPermissions?.get ? (
                      <Table
                        className='align-items-center table-flush'
                        responsive
                      >
                        <thead className='thead-light'>
                          <tr>
                            <th scope='col'>Name</th>
                            <th scope='col'>Age</th>
                            <th scope='col'>Gender</th>
                            <th scope='col'>Email</th>
                          </tr>
                        </thead>
                        <tbody>{renderCustomers()}</tbody>
                      </Table>
                    ) : (
                      <Row className='py-4 justify-content-center align-items-center'>
                        You don't have the permission to access the page
                      </Row>
                    )}
                  </>
                ) : (
                  <Table className='align-items-center table-flush' responsive>
                    <thead className='thead-light'>
                      <tr>
                        <th scope='col'>Name</th>
                        <th scope='col'>Age</th>
                        <th scope='col'>Gender</th>
                        <th scope='col'>Email</th>
                      </tr>
                    </thead>
                    <tbody>{renderCustomers()}</tbody>
                  </Table>
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
                        disabled={currentPage === customerRestData?.nbPages - 1}
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
              </Card>
            </div>
          </Row>
        </Container>
      </Container>
      <GenderDistributionModal
        genderModal={genderModal}
        genderToggle={genderToggle}
      />
    </>
  )
}

export default Customers
