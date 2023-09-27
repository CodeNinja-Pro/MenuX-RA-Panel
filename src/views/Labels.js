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
  Spinner
} from 'reactstrap'
import OnlyHeader from '../components/Headers/OnlyHeader'
// import { labelData } from "helpers/labelData";
import { useDispatch, useSelector } from 'react-redux'
import { addlabel } from '../store/actions/MenuManagmentActions'
import { getLabels } from '../store/actions/MenuManagmentActions'
import { useEffect } from 'react'
import { editlabel } from '../store/actions/MenuManagmentActions'
import { deleteLabel } from '../store/actions/MenuManagmentActions'

const Labels = () => {
  const dispatch = useDispatch()
  const { user, userPermissions } = useSelector(state => state.auth)
  const { labelsData, labelsRestData, addLabelLoader, editLabelLoader } =
    useSelector(state => state.menu)
  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [labelName, setlabelName] = useState('')
  const [labelID, setlabelID] = useState('')
  const [labelDescription, setLabelDescription] = useState('')
  const [searchField, setSearchField] = useState('')
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const labelPermissions = userPermissions?.labels

  const handleClick = page => {
    setCurrentPage(page)
  }
  const addtoggle = () => {
    setAddModal(!addModal)
  }
  const edittoggle = item => {
    setEditModal(!editModal)
    setlabelName(item.labelName)
    setLabelDescription(item.labelDescription)
    setlabelID(item.id)
  }

  useEffect(() => {
    // dispatch(
    //   getLabels(user?.restaurantID, searchField, hitsPerPage, currentPage)
    // )
  }, [searchField, hitsPerPage, currentPage])

  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = labelsRestData?.nbPages

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
              <CardHeader>
                <Row>
                  <Col sm='6' lg='3' className='mt-3'>
                    <h3 className='mb-0 '>Labels</h3>
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
                      <option value='5'>Show Entries</option>
                      <option value='10'>10</option>
                      <option value='15'>15</option>
                      <option value='20'>20</option>
                      <option value='50'>50</option>
                    </Input>
                  </Col>
                  <Col sm='6' lg='3' className='mt-3'>
                    {user?.type == 'kitchen-admin' ? (
                      <>
                        {labelPermissions?.add ? (
                          <Button color='primary' onClick={addtoggle} block>
                            Add
                          </Button>
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
                  {labelPermissions?.get ? (
                    <Table
                      className='align-items-center table-flush'
                      responsive
                    >
                      <thead className='thead-light'>
                        <tr>
                          <th scope='col'>Label Name</th>
                          <th scope='col'>Description</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {labelsData?.map(item => {
                          return (
                            <tr>
                              <th scope='row'>{item?.labelName}</th>
                              <td>
                                {item?.labelDescription.slice(0, 40)}
                                ...
                              </td>
                              <td>
                                {labelPermissions?.edit ? (
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
                                {labelPermissions?.delete ? (
                                  <Button
                                    className='btn-sm'
                                    color='danger'
                                    onClick={() =>
                                      dispatch(deleteLabel(item.id))
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
                      <th scope='col'>Label Name</th>
                      <th scope='col'>Description</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {labelsData?.map(item => {
                      return (
                        <tr>
                          <th scope='row'>{item?.labelName}</th>
                          <td>
                            {item?.labelDescription.slice(0, 40)}
                            ...
                          </td>
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
                              onClick={() => dispatch(deleteLabel(item.id))}
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
                      disabled={currentPage === labelsRestData?.nbPages - 1}
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
            <ModalHeader toggle={addtoggle}>Add Label Details</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  dispatch(
                    addlabel(
                      {
                        labelName,
                        labelDescription,
                        restaurantID: user?.restaurantID
                      },
                      () => {
                        setLabelDescription('')
                        setlabelName('')
                        setAddModal(false)
                      }
                    )
                  )
                }}
              >
                <FormGroup>
                  <Label for='name'>Label Name</Label>
                  <Input
                    type='text'
                    name='name'
                    id='name'
                    required
                    placeholder='Enter name'
                    value={labelName}
                    onChange={e => setlabelName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='location'>Description</Label>
                  <Input
                    type='textarea'
                    placeholder='Enter Description'
                    value={labelDescription}
                    onChange={e => setLabelDescription(e.target.value)}
                  />
                </FormGroup>

                <div className='d-flex justify-content-end'>
                  <Button color='primary' type='submit'>
                    {addLabelLoader ? <Spinner size='sm' /> : 'Save'}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>

        {/* Modal for edit restaurant Details */}
        <div>
          <Modal isOpen={editModal} toggle={edittoggle}>
            <ModalHeader toggle={edittoggle}>Edit Label Details</ModalHeader>
            <ModalBody>
              <Form
                onSubmit={e => {
                  e.preventDefault()
                  dispatch(
                    editlabel(labelID, labelName, labelDescription, () => {
                      setLabelDescription('')
                      setlabelName('')
                      setlabelID('')
                      setEditModal(false)
                    })
                  )
                }}
              >
                <FormGroup>
                  <Label for='name'>Label Name</Label>
                  <Input
                    type='text'
                    required
                    value={labelName}
                    onChange={e => setlabelName(e.target.value)}
                  />
                </FormGroup>
                <FormGroup>
                  <Label for='location'>Description</Label>
                  <Input
                    type='textarea'
                    value={labelDescription}
                    required
                    onChange={e => setLabelDescription(e.target.value)}
                  />
                </FormGroup>

                <div className='d-flex justify-content-end'>
                  <Button color='primary' type='submit'>
                    {editLabelLoader ? <Spinner size='sm' /> : 'Update'}
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

export default Labels
