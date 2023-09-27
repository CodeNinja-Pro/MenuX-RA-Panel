import React, { useState } from 'react'
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
  CardImg,
  Spinner
} from 'reactstrap'
import OnlyHeader from '../components/Headers/OnlyHeader'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../store/actions/MenuManagmentActions'
import { editCategory } from '../store/actions/MenuManagmentActions'
import { getCategories } from '../store/actions/MenuManagmentActions'
import { useEffect } from 'react'
import { deleteCategory } from '../store/actions/MenuManagmentActions'

const Category = () => {
  const dispatch = useDispatch()
  const { user, userPermissions } = useSelector(state => state.auth)
  const categoryPermissions = userPermissions?.category

  const {
    categoriesData,
    categoriesRestData,
    categoryLoader,
    editCategoryLoader
  } = useSelector(state => state.menu)

  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [categoryName, setCategoryName] = useState('')
  const [ID, setID] = useState('')
  const [searchField, setSearchField] = useState('')
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)
  const [removePreImage, setRemovePreImage] = useState('')
  const [selectedImage, setSelectedImage] = useState(
    'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
  )
  const [editSelectedImage, setEditSelectedImage] = useState(
    'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
  )

  const handleClick = page => {
    setCurrentPage(page)
  }

  const addtoggle = () => {
    setCategoryName('')
    setSelectedImage(
      'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
    )

    setAddModal(!addModal)
  }
  const edittoggle = item => {
    setEditModal(!editModal)
    setCategoryName(item?.categoryName)
    setEditSelectedImage(item?.imageURL)
    setRemovePreImage(item?.imageURL)
    setID(item?.id)
  }
  useEffect(() => {
    dispatch(
      getCategories(user?.restaurantID, searchField, hitsPerPage, currentPage)
    )
  }, [searchField, hitsPerPage, currentPage])

  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = categoriesRestData?.nbPages

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
      <Container className='mt--7' fluid>
        {/* Table */}
        <Row>
          <div className='col'>
            <Card className='shadow'>
              <CardHeader className=''>
                <Row>
                  <Col sm='6' lg='3' className='mt-3'>
                    <h3 className='mb-0'>Categories</h3>
                  </Col>
                  <Col sm='6' lg='3' className='mt-3'>
                    {' '}
                    <Input
                      placeholder='Search here...'
                      value={searchField}
                      onChange={e => setSearchField(e.target.value)}
                    />
                  </Col>
                  <Col sm='6' lg='3' className='mt-3'>
                    {' '}
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
                      {hitsPerPage !== '' && (
                        <option value='' disabled>
                          Show Entries
                        </option>
                      )}

                      <option value='5'>5</option>
                      <option value='10'>10</option>
                      <option value='15'>15</option>
                      <option value='20'>20</option>
                      <option value='50'>50</option>
                    </Input>
                  </Col>
                  <Col sm='6' lg='3' className='mt-3'>
                    {' '}
                    {user?.type == 'kitchen-admin' ? (
                      <>
                        {categoryPermissions.add ? (
                          <>
                            {' '}
                            <Button color='primary' onClick={addtoggle} block>
                              Add
                            </Button>
                          </>
                        ) : (
                          ''
                        )}
                      </>
                    ) : (
                      <Button color='primary' onClick={addtoggle} block>
                        Add
                      </Button>
                    )}
                  </Col>
                </Row>
              </CardHeader>

              {user?.type == 'kitchen-admin' ? (
                <>
                  {categoryPermissions?.get ? (
                    <Table
                      className='align-items-center table-flush'
                      responsive
                    >
                      <thead className='thead-light'>
                        <tr>
                          <th scope='col'>Category Name</th>

                          <th scope='col'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {categoriesData?.map(item => {
                          return (
                            <tr>
                              <th scope='row' key={item.id}>
                                {item?.categoryName}
                              </th>

                              <td>
                                {categoryPermissions?.edit ? (
                                  <Button
                                    className='btn-sm'
                                    color='primary'
                                    onClick={() => edittoggle(item)}
                                  >
                                    Edit
                                  </Button>
                                ) : (
                                  ''
                                )}
                                {categoryPermissions?.delete ? (
                                  <Button
                                    className='btn-sm'
                                    color='danger'
                                    onClick={() =>
                                      dispatch(deleteCategory(item?.id))
                                    }
                                  >
                                    Delete
                                  </Button>
                                ) : (
                                  ''
                                )}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
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
                      <th scope='col'>Category Name</th>

                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categoriesData?.map(item => {
                      return (
                        <tr>
                          <th scope='row' key={item.id}>
                            {item?.categoryName}
                          </th>

                          <td>
                            <Button
                              className='btn-sm'
                              color='primary'
                              onClick={() => edittoggle(item)}
                            >
                              Edit
                            </Button>
                            <Button
                              className='btn-sm'
                              color='danger'
                              onClick={() =>
                                dispatch(
                                  deleteCategory(item?.id, item?.imageURL)
                                )
                              }
                            >
                              Delete
                            </Button>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
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
                        href='#'
                        onClick={() => handleClick(currentPage - 1)}
                      >
                        <i className='fas fa-angle-left' />
                        <span className='sr-only'>Previous</span>
                      </PaginationLink>
                    </PaginationItem>
                    {renderPageNumbers()}
                    <PaginationItem
                      disabled={currentPage === categoriesRestData?.nbPages - 1}
                    >
                      <PaginationLink
                        href='#'
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
            <ModalHeader
              toggle={() => {
                setCategoryName('')
                setSelectedImage(
                  'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                )
                setAddModal(false)
              }}
            >
              Add Category Details
            </ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  dispatch(
                    addCategory(
                      {
                        imageURL: selectedImage,
                        categoryName,
                        restaurantID: user?.restaurantID
                      },
                      () => {
                        setCategoryName('')
                        setSelectedImage(
                          'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        )
                        setAddModal(false)
                      }
                    )
                  )
                }}
              >
                <FormGroup>
                  <CardImg
                    alt='Card image cap'
                    bottom
                    src={
                      selectedImage &&
                      typeof selectedImage !== 'string' &&
                      URL.createObjectURL(selectedImage)
                        ? URL.createObjectURL(selectedImage)
                        : selectedImage
                    }
                    style={{
                      height: 200
                    }}
                    // width="50%"
                    className='w-50'
                  />
                  <Input
                    className='mt-2'
                    id='exampleFile'
                    name='file'
                    type='file'
                    onChange={e => {
                      setSelectedImage(e.target.files[0])
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='name'>Category Name</Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    required
                    placeholder='Enter name'
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                  />
                </FormGroup>

                <div className='d-flex justify-content-end'>
                  <Button
                    color='primary'
                    type='submit'
                    disabled={categoryLoader ? true : false}
                  >
                    {categoryLoader ? <Spinner size='sm' /> : 'Save'}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>

        {/* Modal for edit restaurant Details */}
        <div>
          <Modal isOpen={editModal} toggle={edittoggle}>
            <ModalHeader toggle={edittoggle}>Edit Category Details</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  dispatch(
                    editCategory(
                      ID,
                      categoryName,
                      editSelectedImage,
                      removePreImage,
                      () => {
                        setCategoryName('')
                        setID('')
                        setEditSelectedImage(
                          'https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png'
                        )
                        setEditModal(false)
                      }
                    )
                  )
                }}
              >
                <FormGroup>
                  <CardImg
                    alt='Card image cap'
                    bottom
                    src={
                      editSelectedImage instanceof Blob
                        ? URL.createObjectURL(editSelectedImage)
                        : editSelectedImage
                    }
                    style={{
                      height: 200
                    }}
                    // width="50%"
                    className='w-50'
                  />
                  <Input
                    className='mt-2'
                    id='exampleFile'
                    name='file'
                    type='file'
                    onChange={e => {
                      setEditSelectedImage(e.target.files[0])
                    }}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='name'>Category Name</Label>
                  <Input
                    type='text'
                    required
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                  />
                </FormGroup>
                <div className='d-flex justify-content-end'>
                  <Button
                    color='primary'
                    type='submit'
                    disabled={editCategoryLoader}
                  >
                    {editCategoryLoader ? <Spinner size='sm' /> : 'Update'}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </Container>
    </>
  )
}

export default Category
