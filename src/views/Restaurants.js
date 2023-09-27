import React, { useState } from 'react'
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
// core components
import OnlyHeader from '../components/Headers/OnlyHeader.js'
import { useDispatch, useSelector } from 'react-redux'
// import { addNewUser } from '../store/actions/authActions'
import { toast } from 'react-toastify'
import { getAllRestaurant } from '../store/actions/restaurantAction'
import { useEffect } from 'react'
import { updateMerchant } from '../store/actions/restaurantAction'
import { deleteRestaurant } from '../store/actions/restaurantAction'

const Restaurants = () => {
  const dispatch = useDispatch()
  const { restaurantsData, isLoading, restaurantsRestData } = useSelector(
    state => state.restaurant
  )
  const { loading } = useSelector(state => state.catalog)
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    status: '',
    language: '',
    url: '',
    email: '',
    password: '',
    authType: ''
  })
  const [searchField, setSearchField] = useState('')
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const handleClick = page => {
    setCurrentPage(page)
  }
  const [editId, setEditId] = useState('')
  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData({ ...formData, [name]: value })
  }

  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)

  const addtoggle = () => {
    setAddModal(!addModal)
  }
  const edittoggle = () => {
    setEditModal(!editModal)
  }
  const deletetoggle = () => {
    setDeleteModal(!deleteModal)
  }
  const handleSubmit = event => {
    event.preventDefault()
    let obj = {
      name: formData.name,
      email: formData.email,
      location: formData.location,
      status: formData.status.toLowerCase(),
      language: formData.language,
      // url: formData.url,
      password: formData.password,
      // authType: formData.authType,
      type: 'restaurant',
      isDeleted: false,
      subScriptionStatus: 'subscribe',
      currency: 'USD',
      subscription: {},
      restaurantLogo: ''
    }
    // dispatch(
    //   addNewUser(obj, [], () => {
    //     addtoggle()
    //     toast.success('Merchant Added SuccessFully', {
    //       style: {
    //         fontFamily: 'Poppins'
    //       }
    //     })
    //     setFormData({
    //       name: '',
    //       location: '',
    //       status: '',
    //       language: '',
    //       url: '',
    //       email: '',
    //       password: '',
    //       authType: ''
    //     })
    //   })
    // )
  }

  const handleUpdateRestaurant = event => {
    event.preventDefault()
    let obj = {
      name: formData.name,
      location: formData.location,
      status: formData.status,
      language: formData.language
      // url: formData.url,
      // authType: formData.authType,
    }
    dispatch(
      updateMerchant(editId, obj, () => {
        edittoggle()
        toast.success('Merchant Updated SuccessFully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        setFormData({
          name: '',
          location: '',
          status: '',
          language: '',
          url: '',
          email: '',
          password: '',
          authType: ''
        })
      })
    )
  }

  const HandleDeleteBtn = () => {
    dispatch(
      deleteRestaurant(editId, () => {
        deletetoggle()
        toast.success('Merchant Deleted SuccessFully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      })
    )
  }
  useEffect(() => {
    dispatch(getAllRestaurant(searchField, hitsPerPage, currentPage))
  }, [searchField, hitsPerPage, currentPage])

  // Generate page number components

  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = restaurantsRestData?.nbPages

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
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className='d-lg-flex  d-sm-block justify-content-between'>
                <h3 className='mb-0 pt-2 col-lg-2 '>Merchants</h3>
                <Input
                  className='col-lg-4 mx-1 my-2 my-sm-0'
                  placeholder='Search here...'
                  value={searchField}
                  onChange={e => setSearchField(e.target.value)}
                />
                <Input
                  className='col-lg-3 mx-1 my-2 my-sm-0'
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
                <Button
                  className='mb-0 col-lg-2'
                  color='primary'
                  onClick={addtoggle}
                >
                  Add
                </Button>
              </CardHeader>

              <Table className='align-items-center table-flush' responsive>
                <thead className='thead-light'>
                  <tr>
                    <th scope='col'>Merchant Name</th>
                    <th scope='col'>Location</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {restaurantsData &&
                    restaurantsData.map(ele => {
                      return (
                        <tr>
                          <th scope='row'>{ele?.name}</th>
                          <td>{ele?.location}</td>
                          <td>
                            <Button
                              className='btn-sm'
                              color='primary'
                              onClick={() => {
                                setFormData({
                                  name: ele?.name,
                                  location: ele?.location,
                                  status: ele?.status,
                                  language: ele?.language,
                                  url: ele?.url,
                                  authType: ele?.authType
                                })
                                setEditId(ele.id)
                                edittoggle()
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className='btn-sm'
                              color='danger'
                              onClick={() => {
                                setEditId(ele.id)
                                deletetoggle()
                              }}
                            >
                              Delete
                            </Button>
                            <Button className='btn-sm' color='success'>
                              <a
                                href='https://pinea-restaurant.web.app/auth/login'
                                target='_blank'
                                className='text-white'
                              >
                                Login
                              </a>
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                </tbody>
              </Table>
              {/* {restaurantsRestData?.nbPages > 1 ? ( */}
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
                      disabled={
                        currentPage === restaurantsRestData?.nbPages - 1
                      }
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
              {/* ) : (
								''
							)} */}
            </Card>
          </div>
        </Row>

        {/* Modal for add restaurant */}
        <div>
          <Modal isOpen={addModal} toggle={addtoggle}>
            <ModalHeader toggle={addtoggle}>Add Merchant Details</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='name'>Merchant Name</Label>
                      <Input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter name'
                        value={formData.name}
                        onChange={handleInputChange}
                        required
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
                        value={formData.location}
                        onChange={handleInputChange}
                        required
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
                        name='status'
                        id='status'
                        value={formData.status}
                        onChange={handleInputChange}
                        required
                      >
                        <option value='' selected disabled>
                          Select Status
                        </option>
                        <option value='Active'>Active</option>
                        <option value='InActive'>InActive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Language</Label>
                      <Input
                        type='select'
                        name='language'
                        required
                        id='language'
                        value={formData.language}
                        onChange={handleInputChange}
                      >
                        <option value='' disabled selected>
                          Select Language
                        </option>
                        <option value='en'>English</option>
                        <option value='ru'>Russian</option>
                        <option value='fr'>French</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <FormGroup>
                      <Label for="accessible">Domain URL</Label>
                      <Input
                        required
                        type="name"
                        name="url"
                        id="url"
                        placeholder="Enter URL"
                        value={formData.url}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='email'>Email</Label>
                      <Input
                        required
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                        value={formData.email}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='location'>Password</Label>
                      <Input
                        required
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter password'
                        value={formData.password}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Authentication Type</Label>
                      <Input
                        required
                        type='select'
                        name='authType'
                        id='authType'
                        value={formData.authType}
                        onChange={handleInputChange}
                      >
                        <option value='' selected disabled>
                          Select Auth Type
                        </option>
                        <option value='google'>Google Auth</option>
                        <option value='sms'>SMS</option>
                        <option value='email'>Email</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <div className='d-flex justify-content-end'>
                  <Button color='primary' disabled={loading}>
                    {loading ? <Spinner size='sm' /> : 'Save'}
                  </Button>
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
              <Form onSubmit={handleUpdateRestaurant}>
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='name'>Merchant Name</Label>
                      <Input
                        type='text'
                        name='name'
                        id='name'
                        placeholder='Enter name'
                        value={formData.name}
                        onChange={handleInputChange}
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
                        value={formData.location}
                        onChange={handleInputChange}
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
                        name='status'
                        id='status'
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value='' selected disabled>
                          Select Status
                        </option>
                        <option value='Active'>Active</option>
                        <option value='InActive'>InActive</option>
                      </Input>
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Language</Label>
                      <Input
                        type='select'
                        name='language'
                        id='language'
                        value={formData.language}
                        onChange={handleInputChange}
                      >
                        <option value='' disabled selected>
                          Select Language
                        </option>
                        <option value='en'>English</option>
                        <option value='ru'>Russian</option>
                        <option value='fr'>French</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>
                {/* <Row>
                  <Col>
                    <FormGroup>
                      <Label for="accessible">Domain URL</Label>
                      <Input
                        type="text"
                        name="url"
                        id="url"
                        placeholder="Enter URL"
                        value={formData.url}
                        onChange={handleInputChange}
                      />
                    </FormGroup>
                  </Col>
                </Row> */}
                <Row>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Authentication Type</Label>
                      <Input
                        type='select'
                        name='authType'
                        id='authType'
                        value={formData.authType}
                        onChange={handleInputChange}
                      >
                        <option value='' selected disabled>
                          Select Auth Type
                        </option>
                        <option value='google'>Google Auth</option>
                        <option value='sms'>SMS</option>
                        <option value='email'>Email</option>
                      </Input>
                    </FormGroup>
                  </Col>
                </Row>

                <div className='d-flex justify-content-end'>
                  <Button color='primary' disabled={isLoading}>
                    {isLoading ? <Spinner size='sm' /> : 'Save'}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
          {/* Delete Modal */}
          <Modal isOpen={deleteModal}>
            <ModalHeader toggle={deletetoggle}>Delete Restaurant</ModalHeader>
            <ModalBody>
              <h3>Are you sure you want to delete ?</h3>
              <div className='d-flex justify-content-end'>
                <Button
                  color='primary'
                  onClick={HandleDeleteBtn}
                  disabled={isLoading}
                >
                  {isLoading ? <Spinner size='sm' /> : 'Delete'}
                </Button>
              </div>
            </ModalBody>
          </Modal>
        </div>
      </Container>
    </>
  )
}

export default Restaurants
