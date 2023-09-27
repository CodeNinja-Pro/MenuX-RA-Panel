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
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
  Spinner
} from 'reactstrap'
// core components
import OnlyHeader from '../components/Headers/OnlyHeader.js'
import { toast } from 'react-toastify'
// import { addNewUser } from '../store/actions/authActions'
import { useDispatch, useSelector } from 'react-redux'
import { getAllAdmins } from '../store/actions/subAdminAction'
import { updateSubAdmin } from '../store/actions/subAdminAction'
import { deleteSubAdmin } from '../store/actions/subAdminAction'

const SubAdmin = () => {
  const { loading } = useSelector(state => state.catalog)
  const { isLoading, adminsData, adminsRestData } = useSelector(
    state => state.admin
  )
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [searchField, setSearchField] = useState('')
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const dispatch = useDispatch()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  })
  const [id, setId] = useState('')
  const [currentPage, setCurrentPage] = useState(0)

  const handleClick = page => {
    setCurrentPage(page)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
  }

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
    // let obj = {
    //   name: formData.firstName + ' ' + formData.lastName,
    //   email: formData.email,
    //   password: formData.password,
    //   type: 'admin',
    //   isDeleted: false
    // }
    // dispatch(
    //   addNewUser(obj, [], () => {
    //     toast.success('Sub-admin Added SuccessFully', {
    //       style: {
    //         fontFamily: 'Poppins'
    //       }
    //     })
    //     // enqueueSnackbar("data added successfuuly");
    //     dispatch({
    //       type: 'GET_ALL_ADMINS',
    //       payload: [...adminsData, obj]
    //     })
    //     setFormData({
    //       firstName: '',
    //       lastName: '',
    //       email: '',
    //       password: ''
    //     })
    //     addtoggle()
    //   })
    // )
  }

  const handleUpdateAdmin = event => {
    event.preventDefault()
    let obj = {
      name: formData.firstName + ' ' + formData.lastName
    }
    dispatch(
      updateSubAdmin(id, obj, () => {
        edittoggle()
        toast.success('Sub-admin Updated SuccessFully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        dispatch({
          type: 'UPDATE_ADMIN',
          payload: {
            id,
            obj
          }
        })
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          password: ''
        })
      })
    )
  }

  const HandleDeleteBtn = () => {
    dispatch(
      deleteSubAdmin(id, () => {
        deletetoggle()
        // toast.success("Sub-admin Deleted SuccessFully");
        dispatch({
          type: 'DELETE_ADMIN',
          payload: id
        })
      })
    )
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = adminsRestData?.nbPages

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
    dispatch(getAllAdmins(searchField, hitsPerPage, currentPage))
  }, [searchField, hitsPerPage, currentPage])

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
                <h3 className='mb-0 pt-2 col-lg-2 '>Sub-Admin</h3>
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
                    <th scope='col'>First Name</th>
                    <th scope='col'>Last Name</th>
                    <th scope='col'>Email</th>
                    <th scope='col'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {adminsData &&
                    adminsData?.map(item => {
                      return (
                        <tr>
                          <td scope='row'>{item?.name.split(' ')[0]}</td>
                          <td>{item?.name.split(' ')[1]}</td>
                          <td> {item?.email}</td>
                          <td>
                            <Button
                              className='btn-sm'
                              color='primary'
                              onClick={() => {
                                setId(item.id)
                                setFormData({
                                  firstName: item?.name.split(' ')[0],
                                  lastName: item?.name.split(' ')[1]
                                })
                                edittoggle()
                              }}
                            >
                              Edit
                            </Button>
                            <Button
                              className='btn-sm'
                              color='danger'
                              onClick={() => {
                                setId(item.id)
                                deletetoggle()
                              }}
                            >
                              Delete
                            </Button>
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
                      disabled={currentPage === adminsRestData?.nbPages - 1}
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

        {/* Modal for add restaurant */}
        <div>
          <Modal isOpen={addModal} toggle={addtoggle}>
            <ModalHeader toggle={addtoggle}>Add Sub Admin</ModalHeader>
            <ModalBody>
              <Form onSubmit={handleSubmit}>
                <FormGroup>
                  <Label for='name'>First Name</Label>
                  <Input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter First Name'
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='location'>Last Name</Label>
                  <Input
                    type='text'
                    name='lastName'
                    id='last-name'
                    placeholder='Enter Last Name'
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='email'>Email</Label>
                  <Input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Enter Email'
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='location'>Password</Label>
                  <Input
                    type='password'
                    name='password'
                    id='password'
                    placeholder='Enter Password'
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                </FormGroup>
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
            <ModalHeader toggle={edittoggle}>
              Edit Restaurant Details
            </ModalHeader>
            <ModalBody>
              <Form onSubmit={handleUpdateAdmin}>
                <FormGroup>
                  <Label for='name'>First Name - Last Name</Label>
                  <Input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Enter First Name'
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </FormGroup>
                {/* <FormGroup>
                  <Label for="location">Last Name</Label>
                  <Input
                    type="text"
                    name="lastName"
                    id="last-name"
                    placeholder="Enter Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </FormGroup> */}
                {/* <FormGroup>
									<Label for='email'>Email</Label>
									<Input
										type='email'
										name='email'
										id='email'
										placeholder='Enter email'
									/>
								</FormGroup>
								<FormGroup>
									<Label for='location'>Password</Label>
									<Input
										type='password'
										name='password'
										id='password'
										placeholder='Enter password'
									/>
								</FormGroup> */}
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

export default SubAdmin
