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
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { deleteStaff } from '../store/actions/staffAction'

const KitchenStaff = () => {
  const dispatch = useDispatch()
  const { loading } = useSelector(state => state.catalog)
  const { isLoading, staffData, staffRestData } = useSelector(
    state => state.staff
  )
  const { uid } = useSelector(state => state.auth)
  const [searchField, setSearchField] = useState('')
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const [id, setId] = useState('')
  const [permissionId, setPermissionId] = useState('')
  const [addModal, setAddModal] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    role: ''
  })
  const [currentPage, setCurrentPage] = useState(0)

  const [menu, setMenu] = useState(false)
  const [menuOptions, setMenuOptions] = useState({
    get: true,
    add: false,
    import: false,
    export: false,
    edit: false,
    delete: false
  })

  const [category, setCategory] = useState(false)
  const [categoryOptions, setCategoryOptions] = useState({
    get: true,
    add: false,
    edit: false,
    delete: false
  })

  const [label, setLabel] = useState(false)
  const [labelOptions, setlabelOptions] = useState({
    get: true,
    add: false,
    edit: false,
    delete: false
  })

  const [order, setOrder] = useState(false)
  const [orderOptions, setOrderOptions] = useState({
    get: true,
    update: true
  })

  const [requests, setRequests] = useState(false)
  const [requestOptions, setRequestOptions] = useState({
    get: true
  })

  const [reports, setReports] = useState(false)
  const [reportsOptions, setreportsOptions] = useState({
    get: true,
    export: false
  })

  const [catalog, setCatalog] = useState(false)
  const [catalogOptions, setCatalogOptions] = useState({
    get: true,
    add: false,
    edit: false,
    delete: false
  })

  const [checkoutQuestions, setCheckoutQuestions] = useState(false)
  const [checkoutOptions, setCheckoutOptions] = useState({
    get: true,
    add: false
  })

  const [settings, setSettings] = useState(false)
  const [settingsOptions, setSettingsOptions] = useState({
    get: true
  })

  const [notifications, setNotifications] = useState(false)
  const [notificationsOptions, setNotificationsOptions] = useState({
    get: true
  })

  const [customer, setCustomer] = useState(false)
  const [customerOptions, setCustomerOptions] = useState({
    get: true
  })
  const [customization, setCustomization] = useState(false)
  const [customizationOptions, setCustomizationOptions] = useState({
    get: true,
    add: false,
    update: false
  })

  const handleClick = page => {
    setCurrentPage(page)
  }

  const handleInputChange = event => {
    const { name, value } = event.target
    setFormData(prevFormData => ({ ...prevFormData, [name]: value }))
    if (name === 'role') {
      clearData()
    }
  }

  const addtoggle = () => {
    setAddModal(!addModal)
    clearFormData()
  }

  const [editModal, setEditModal] = useState(false)

  const editToggle = () => {
    setEditModal(!editModal)
  }
  console.log(order)
  const [deleteModal, setDeleteModal] = useState(false)
  const deletetoggle = () => {
    setDeleteModal(!deleteModal)
  }

  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = staffRestData?.nbPages
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
  const handleSubmit = event => {
    event.preventDefault()
    let obj = {
      name: formData.name + ' ' + formData.lastName,
      email: formData.email,
      password: formData.password,
      type: formData.role,
      isDeleted: false,
      restaurantID: uid
    }
    let permissions = {}

    if (menu) {
      permissions.menus = menuOptions
    }
    if (category) {
      permissions.category = categoryOptions
    }
    if (label) {
      permissions.labels = labelOptions
    }
    if (order) {
      permissions.order = orderOptions
    }
    if (requests) {
      permissions.requests = requestOptions
    }
    if (reports) {
      permissions.reports = reportsOptions
    }
    if (catalog) {
      permissions.catalog = catalogOptions
    }
    if (checkoutQuestions) {
      permissions.checkoutQuestions = checkoutOptions
    }
    if (settings) {
      permissions.settings = settingsOptions
    }
    if (notifications) {
      permissions.notifications = notificationsOptions
    }
    if (customer) {
      permissions.customers = customerOptions
    }
    if (customization) {
      permissions.customization = customizationOptions
    }
    // dispatch(
    //   addNewUser(obj, permissions, () => {
    //     toast.success('Staff Added SuccessFully', {
    //       style: {
    //         fontFamily: 'Poppins'
    //       }
    //     })
    //     clearFormData()
    //     addtoggle()
    //     clearData()
    //     // console.log(uid, searchField, hitsPerPage, currentPage, "kitchen page");
    //     setTimeout(() => {
    //       dispatch(getAllStaff(uid, searchField, hitsPerPage, currentPage))
    //     }, 2000)
    //   })
    // )
  }

  const handleUpdateStaff = event => {
    event.preventDefault()
    let obj = {
      name: formData.name + ' ' + formData.lastName,
      type: formData.role
    }
    let permissions = {}

    if (menu) {
      permissions.menus = menuOptions
    }
    if (category) {
      permissions.category = categoryOptions
    }
    if (label) {
      permissions.labels = labelOptions
    }
    if (order) {
      permissions.order = orderOptions
    }
    if (requests) {
      permissions.requests = requestOptions
    }
    if (reports) {
      permissions.reports = reportsOptions
    }
    if (catalog) {
      permissions.catalog = catalogOptions
    }
    if (checkoutQuestions) {
      permissions.checkoutQuestions = checkoutOptions
    }
    if (settings) {
      permissions.settings = settingsOptions
    }
    if (notifications) {
      permissions.notifications = notificationsOptions
    }
    if (customer) {
      permissions.customers = customerOptions
    }
    if (customization) {
      permissions.customization = customizationOptions
    }
    dispatch()
    // updateStaff(id, obj, permissionId, permissions, () => {
    //   editToggle()
    //   clearData()
    //   toast.success('Staff Updated SuccessFully', {
    //     style: {
    //       fontFamily: 'Poppins'
    //     }
    //   })
    //   clearFormData()
    //   setTimeout(() => {
    //     dispatch(getAllStaff(uid, searchField, hitsPerPage, currentPage))
    //   }, 2000)
    // })
  }

  const clearData = () => {
    setMenu(false)
    setMenuOptions({
      get: true,
      add: false,
      import: false,
      export: false,
      edit: false,
      delete: false
    })
    setCategory(false)
    setCategoryOptions({
      get: true,
      add: false,
      edit: false,
      delete: false
    })
    setLabel(false)
    setlabelOptions({
      get: true,
      add: false,
      edit: false,
      delete: false
    })
    setOrder(false)
    setOrderOptions({
      get: true,
      update: true
    })

    setRequests(false)
    setRequestOptions({
      get: true
    })

    setReports(false)
    setRequestOptions({
      get: true,
      export: false
    })

    setNotifications(false)
    setNotificationsOptions({
      get: true
    })
    setCatalog(false)
    setCatalogOptions({
      get: true,
      add: false,
      edit: false,
      delete: false
    })
    setSettings(false)
    setSettingsOptions({
      get: true
    })
    setCheckoutQuestions(false)
    setCheckoutOptions({
      get: true,
      add: false
    })
    setCustomer(false)
    setCustomerOptions({
      get: true
    })
    setCustomization(false)
    setCustomerOptions({
      get: true,
      add: false,
      update: false
    })
  }

  const clearFormData = () => {
    setFormData({
      name: '',
      lastName: '',
      email: '',
      password: '',
      role: ''
    })
  }
  const HandleDeleteBtn = () => {
    dispatch(
      deleteStaff(id, permissionId, () => {
        deletetoggle()
        toast.success('Staff Deleted Successfully', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      })
    )
  }
  useEffect(() => {
    // dispatch(getAllStaff(uid, searchField, hitsPerPage, currentPage))
  }, [searchField, hitsPerPage, currentPage])

  return (
    <>
      <OnlyHeader />
      {/* Page content */}
      {/* <Container fluid className='header pb-5'> */}
      <Container fluid className='my--7'>
        <Container fluid>
          {/* Table */}
          <Row>
            <div className='col'>
              <Card className='shadow'>
                <CardHeader className='d-lg-flex  d-sm-block justify-content-between'>
                  <h3 className='pt-2 col-lg-2 '>Staff</h3>
                  <Row>
                    <Col xs='12' md='2' style={{ marginTop: '10px' }}>
                      <Label check>
                        <Input type='checkbox' /> View
                      </Label>
                    </Col>
                    <Col xs='12' md='2' style={{ marginTop: '10px' }}>
                      <Label check>
                        <Input type='checkbox' /> Interact
                      </Label>
                    </Col>
                    <Col xs='12' md='3'>
                      {' '}
                      <Input
                        placeholder='Search here...'
                        onChange={e => setSearchField(e.target.value)}
                        value={searchField}
                      />
                    </Col>
                    <Col xs='12' md='3' className='my-2 my-md-0'>
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
                    <Col xs='12' md='2'>
                      {' '}
                      <Button color='primary' onClick={addtoggle} block>
                        Add
                      </Button>
                    </Col>
                  </Row>
                </CardHeader>

                <Table className='align-items-center table-flush' responsive>
                  {staffData?.length === 0 ? (
                    <tbody>
                      <tr>
                        <td className='text-center' colSpan='4'>
                          {/* <Spinner /> */}
                          No Staff to display
                        </td>
                      </tr>
                    </tbody>
                  ) : (
                    <>
                      <thead className='thead-light'>
                        <tr>
                          <th scope='col'>First Name</th>
                          <th scope='col'>Last Name</th>
                          <th scope='col'>Role</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {staffData?.map((item, index) => {
                          return (
                            <tr key={index}>
                              <td>{item?.name.split(' ')[0]}</td>
                              <td>{item?.name.split(' ')[1]}</td>
                              <td>{item?.type}</td>

                              <td>
                                <Button
                                  className='btn-sm'
                                  color='primary'
                                  onClick={() => {
                                    const permissions = item?.permissions
                                    setId(item?.id)
                                    setPermissionId(item?.permissions?.id)
                                    setFormData({
                                      name: item?.name.split(' ')[0],
                                      lastName: item?.name.split(' ')[1],

                                      role: item?.type
                                    })
                                    if (permissions?.labels) {
                                      setLabel(true)
                                      setlabelOptions(permissions?.labels)
                                    }
                                    if (permissions?.order) {
                                      setOrder(true)
                                      setOrderOptions(permissions?.order)
                                    }
                                    if (permissions?.menus) {
                                      setMenu(true)
                                      setMenuOptions(permissions?.menus)
                                    }
                                    if (permissions?.category) {
                                      setCategory(true)
                                      setCategoryOptions(permissions?.category)
                                    }
                                    if (permissions?.requests) {
                                      setRequests(true)
                                      setRequestOptions(permissions?.requests)
                                    }
                                    if (permissions?.customers) {
                                      setCustomer(true)
                                      setCustomerOptions(permissions?.customers)
                                    }
                                    if (permissions?.catalog) {
                                      setCatalog(true)
                                      setCatalogOptions(permissions?.catalog)
                                    }
                                    if (permissions?.checkoutQuestions) {
                                      setCheckoutQuestions(true)
                                      setCheckoutOptions(
                                        permissions?.checkoutQuestions
                                      )
                                    }
                                    if (permissions?.customization) {
                                      setCustomization(true)
                                      setCustomizationOptions(
                                        permissions?.customization
                                      )
                                    }
                                    if (permissions?.settings) {
                                      setSettings(true)
                                      setSettingsOptions(permissions?.settings)
                                    }
                                    if (permissions?.notifications) {
                                      setNotifications(true)
                                      setNotificationsOptions(
                                        permissions?.notifications
                                      )
                                    }
                                    editToggle()
                                  }}
                                >
                                  Edit
                                </Button>
                                <Button
                                  className='btn-sm'
                                  color='danger'
                                  onClick={() => {
                                    setId(item?.id)
                                    // console.log({ item });
                                    setPermissionId(item?.permissions?.id)
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
                    </>
                  )}
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
                        disabled={currentPage === staffRestData?.nbPages - 1}
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
              <ModalHeader toggle={addtoggle}>Add Staff</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleSubmit}>
                  <FormGroup>
                    <Label for='name'>First Name</Label>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      required
                      placeholder='First Name'
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='location'>Last Name</Label>
                    <Input
                      type='text'
                      name='lastName'
                      id='last-name'
                      required
                      placeholder='Last Name'
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
                      required
                      placeholder='Email'
                      value={formData.email}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='password'>Password</Label>
                    <Input
                      type='password'
                      name='password'
                      required
                      id='password'
                      placeholder='Password'
                      value={formData.password}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='password'>Role</Label>
                    <Input
                      type='select'
                      name='role'
                      id='role'
                      required
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value='' selected disabled>
                        Select Role
                      </option>
                      <option value='kitchen-admin'>Admin</option>
                      <option value='kitchen-cook'>Cook</option>
                    </Input>
                  </FormGroup>
                  {formData.role === 'kitchen-admin' ? (
                    <>
                      {/* <UserPermissions
                        menu={menu}
                        setMenu={setMenu}
                        menuOptions={menuOptions}
                        setMenuOptions={setMenuOptions}
                        category={category}
                        setCategory={setCategory}
                        categoryOptions={categoryOptions}
                        setCategoryOptions={setCategoryOptions}
                        label={label}
                        setLabel={setLabel}
                        labelOptions={labelOptions}
                        setlabelOptions={setlabelOptions}
                        setRequests={setRequests}
                        requests={requests}
                        requestOptions={requestOptions}
                        setRequestOptions={setRequestOptions}
                        order={order}
                        setOrder={setOrder}
                        orderOptions={orderOptions}
                        setOrderOptions={setOrderOptions}
                        reports={reports}
                        setReports={setReports}
                        reportsOptions={reportsOptions}
                        setreportsOptions={setreportsOptions}
                        checkoutOptions={checkoutOptions}
                        setCheckoutOptions={setCheckoutOptions}
                        checkoutQuestions={checkoutQuestions}
                        setCheckoutQuestions={setCheckoutQuestions}
                        settings={settings}
                        setSettings={setSettings}
                        settingsOptions={settingsOptions}
                        setSettingsOptions={setSettingsOptions}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        notificationsOptions={notificationsOptions}
                        setNotificationsOptions={setNotificationsOptions}
                        catalog={catalog}
                        setCatalog={setCatalog}
                        catalogOptions={catalogOptions}
                        setCatalogOptions={setCatalogOptions}
                        customer={customer}
                        setCustomer={setCustomer}
                        customerOptions={customerOptions}
                        setCustomerOptions={setCustomerOptions}
                        customization={customization}
                        setCustomization={setCustomization}
                        customizationOptions={customizationOptions}
                        setCustomizationOptions={setCustomizationOptions}
                      /> */}
                    </>
                  ) : formData.role === 'kitchen-cook' ? (
                    // <UserPermissions
                    //   type='cook'
                    //   order={order}
                    //   setOrder={setOrder}
                    //   orderOptions={orderOptions}
                    //   setOrderOptions={setOrderOptions}
                    // />
                    <></>
                  ) : (
                    ''
                  )}
                  <div className='d-flex justify-content-end'>
                    <Button color='primary' disabled={loading}>
                      {loading ? <Spinner size='sm' /> : 'Save'}
                    </Button>
                  </div>
                </Form>
              </ModalBody>
            </Modal>
          </div>

          {/* edit modal  */}
          <div>
            <Modal isOpen={editModal} toggle={editToggle}>
              <ModalHeader toggle={editToggle}>Edit Staff</ModalHeader>
              <ModalBody>
                <Form onSubmit={handleUpdateStaff}>
                  <FormGroup>
                    <Label for='name'>First Name</Label>
                    <Input
                      type='text'
                      name='name'
                      id='name'
                      placeholder='First Name'
                      value={formData.name}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='location'>Last Name</Label>
                    <Input
                      type='text'
                      name='lastName'
                      id='last-name'
                      placeholder='Last Name'
                      value={formData.lastName}
                      onChange={handleInputChange}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label for='password'>Role</Label>
                    <Input
                      type='select'
                      name='role'
                      id='role'
                      value={formData.role}
                      onChange={handleInputChange}
                    >
                      <option value='' selected disabled>
                        Select Role
                      </option>
                      <option value='kitchen-admin'>Admin</option>
                      <option value='kitchen-cook'>Cook</option>
                    </Input>
                  </FormGroup>
                  {formData.role === 'kitchen-admin' ? (
                    <>
                      {/* <UserPermissions
                        menu={menu}
                        setMenu={setMenu}
                        menuOptions={menuOptions}
                        setMenuOptions={setMenuOptions}
                        category={category}
                        setCategory={setCategory}
                        categoryOptions={categoryOptions}
                        setCategoryOptions={setCategoryOptions}
                        label={label}
                        setLabel={setLabel}
                        labelOptions={labelOptions}
                        setlabelOptions={setlabelOptions}
                        setRequests={setRequests}
                        requests={requests}
                        requestOptions={requestOptions}
                        setRequestOptions={setRequestOptions}
                        order={order}
                        setOrder={setOrder}
                        orderOptions={orderOptions}
                        setOrderOptions={setOrderOptions}
                        reports={reports}
                        setReports={setReports}
                        reportsOptions={reportsOptions}
                        setreportsOptions={setreportsOptions}
                        checkoutOptions={checkoutOptions}
                        setCheckoutOptions={setCheckoutOptions}
                        checkoutQuestions={checkoutQuestions}
                        setCheckoutQuestions={setCheckoutQuestions}
                        settings={settings}
                        setSettings={setSettings}
                        settingsOptions={settingsOptions}
                        setSettingsOptions={setSettingsOptions}
                        notifications={notifications}
                        setNotifications={setNotifications}
                        notificationsOptions={notificationsOptions}
                        setNotificationsOptions={setNotificationsOptions}
                        catalog={catalog}
                        setCatalog={setCatalog}
                        catalogOptions={catalogOptions}
                        setCatalogOptions={setCatalogOptions}
                        customer={customer}
                        setCustomer={setCustomer}
                        customerOptions={customerOptions}
                        setCustomerOptions={setCustomerOptions}
                        customization={customization}
                        setCustomization={setCustomization}
                        customizationOptions={customizationOptions}
                        setCustomizationOptions={setCustomizationOptions}
                      /> */}
                    </>
                  ) : formData.role === 'kitchen-cook' ? (
                    // <UserPermissions
                    //   type='cook'
                    //   order={order}
                    //   setOrder={setOrder}
                    //   orderOptions={orderOptions}
                    //   setOrderOptions={setOrderOptions}
                    // />
                    <></>
                  ) : (
                    ''
                  )}
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
              <ModalHeader toggle={deletetoggle}>Delete Staff</ModalHeader>
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
      </Container>
    </>
  )
}

export default KitchenStaff
