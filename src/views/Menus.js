import React, { useRef, useState } from 'react'
import { enqueueSnackbar } from 'notistack'
// reactstrap components
import {
  CustomInput,
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
import csvtojson from 'csvtojson'
// core components
import OnlyHeader from '../components/Headers/OnlyHeader.js'
// import { menuData } from "helpers/menuData";
import Select from 'react-select'

import edit from '../assets/img/icons/edit.svg'
import deleteIcon from '../assets/img/icons/delete.svg'
import fileupload from '../assets/img/icons/fileupload.svg'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories } from '../store/actions/MenuManagmentActions'
import { getLabels } from '../store/actions/MenuManagmentActions'
import { useEffect } from 'react'
import { addMenu } from '../store/actions/MenuManagmentActions'
import { getMenu } from '../store/actions/MenuManagmentActions'
import { editMenu } from '../store/actions/MenuManagmentActions'
import { deleteMenu } from '../store/actions/MenuManagmentActions'
import exportFromJSON from 'export-from-json'
import { importMenu } from '../store/actions/MenuManagmentActions'
import { toast } from 'react-toastify'

const Menus = () => {
  const dispatch = useDispatch()
  const { user, userPermissions } = useSelector(state => state.auth)
  const { categoriesData, labelsData, menuData, menuRestData, addMenuLoader } =
    useSelector(state => state.menu)
  const menuPermissions = userPermissions?.menus

  const [addModal, setAddModal] = useState(false)
  const [editModal, setEditModal] = useState(false)
  const [item, setItem] = useState('')
  const [comments, setComments] = useState('')
  const [category, setCategory] = useState('')
  const [inventory, setInventory] = useState('')
  const [calories, setCalories] = useState('')
  const [subCalories, setSubCalories] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])
  const [gender, setGender] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [Items, setItems] = useState([])
  const [subItem, setSubItem] = useState('')
  const [price, setPrice] = useState('')
  const [ageFrom, setAgeFrom] = useState('')
  const [ageTo, setAgeTo] = useState('')
  const [secondTableItems, setSecondTableItems] = useState([])
  const [ID, setID] = useState('')
  const [searchField, setSearchField] = useState('')
  const [hitsPerPage, setHitsPerPage] = useState(5)
  const [currentPage, setCurrentPage] = useState(0)

  const handleClick = page => {
    setCurrentPage(page)
  }

  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions)
  }
  // console.log("category", category);
  const [label, setLabel] = useState('')
  // const [fileData, setFileData] = useState([])
  const [images, setImages] = useState([])
  const [videos, setVideos] = useState([])
  const [editingIndex, setEditingIndex] = useState(-1)
  const [recommendedIndex, setRecommendedIndex] = useState(-1)
  const [imagesToRemove, setImagesToRemove] = useState([])
  const [videosToRemove, setvideosToRemove] = useState([])

  const productOptions = menuData.map(menu => {
    return { value: `${menu.name}`, label: `${menu.name}` }
  })

  const genderOptions = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'all', label: 'All' }
  ]
  const [ViewModal, setViewModal] = useState(false)
  const [menuDetails, setMenuDetails] = useState({})
  const Viewtoggle = () => {
    setViewModal(!ViewModal)
  }

  const addtoggle = () => {
    setAddModal(!addModal)
    clearData()
  }
  const edittoggle = item => {
    setEditModal(!editModal)
    setItem(item.name)
    setComments(item.comments)
    setImages(item.images)
    setPreviewImages(item.images)
    setVideos(item.videos)
    setPreviewVideos(item.videos)
    setLabel(item.label)
    setItems(item?.sizes)
    setInventory(item.inventory)
    setCalories(item.calories)
    setEstimatedTime(item.estimatedTime)
    setCategory(item.category)
    setSecondTableItems(item?.recommendedProducts)
    setID(item.id)
  }
  const clearData = () => {
    setItem('')
    setComments('')
    setImages('')
    setVideos('')
    setLabel('')
    setAgeFrom('')
    setAgeTo('')
    setSelectedOptions('')
    setSecondTableItems([])

    setItems([])
    setInventory('')
    setCalories('')
    setEstimatedTime('')
    setCategory('')
    setGender('')
    setPrice('')
    setPreviewImages([])
    setPreviewVideos([])
  }

  const [previewImages, setPreviewImages] = useState([])

  const [previewVideos, setPreviewVideos] = useState([])

  const imagesHandleChange = e => {
    const files = e.target.files
    const newImages = [...images]

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('image/')) {
        newImages.push(file)
      } else {
        toast.warn('Invalid file type. Please select image files only.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      }
    }
    setImages(newImages)
    setPreviewImages(
      newImages.map(file => {
        if (file?.name) {
          let imgUrl = URL.createObjectURL(file)
          return imgUrl
        } else {
          return file
        }
      })
    )
  }
  const videosHandleChange = e => {
    const files = e.target.files
    const newVideos = [...videos]

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (file.type.startsWith('video/')) {
        newVideos.push(file)
      } else {
        toast.warn('Invalid file type. Please select video files only.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      }
    }

    setVideos(newVideos)
    setPreviewVideos(
      newVideos.map(file => {
        if (file?.name) {
          let videoUrl = URL.createObjectURL(file)
          return videoUrl
        } else {
          return file
        }
      })
    )
  }

  // console.log(previewImages, previewVideos);
  const subItemsClick = e => {
    e.preventDefault()
    setItems([...Items, { subItem, price, calories }])
    setSubItem('')
    setPrice('')
  }

  const secondTable = e => {
    e.preventDefault()
    if (ageFrom === ageTo) {
      enqueueSnackbar('Date range must have a gap')
      return
    }
    setSecondTableItems([
      ...secondTableItems,
      { selectedOptions, gender, ageFrom, ageTo }
    ])
    setSelectedOptions('')
    setGender('')
    setAgeFrom('')
    setAgeTo('')
  }

  const handleRemove = (arr, index) => {
    if (arr === 'subItems') {
      let filterItems = Items.filter((x, i) => i !== index)
      setItems(filterItems)
    } else if (arr === 'recommended') {
      let filterItems = secondTableItems.filter((x, i) => i !== index)
      setSecondTableItems(filterItems)
    }
  }
  const handleItemChange = (e, index, field) => {
    const newItems = [...Items]
    newItems[index][field] = e.target.value
    setItems(newItems)
  }
  const handleUpdateClick = (index, item) => {
    const updatedItems = [...Items]
    const updatedItem = updatedItems[index]
    updatedItem.subItem = item?.subItem
    updatedItem.price = item?.price

    setItems(updatedItems)
    setEditingIndex(-1)
  }
  const handleRecommededChange = (index, field, value) => {
    const updatedItems = [...secondTableItems]
    updatedItems[index][field] = value
    setSecondTableItems(updatedItems)
  }

  const handleRecommededUpdate = (index, value) => {
    const updatedItems = [...secondTableItems]
    const updatedItem = { ...updatedItems[index] }

    updatedItem.selectedOptions = value.selectedOptions
    updatedItem.gender = value.gender
    updatedItem.ageFrom = value.ageFrom
    updatedItem.ageTo = value.ageTo

    updatedItems[index] = updatedItem
    setSecondTableItems(updatedItems)
    setRecommendedIndex(-1)
  }

  const handleAddSubmit = e => {
    e.preventDefault()
    let obj = {
      name: item,
      comments,
      category,
      inventory,
      calories,
      estimatedTime,
      sizes: Items,
      label,
      images,
      videos,
      recommendedProducts: secondTableItems,
      restaurantID: user.restaurantID,
      menuID: 'none'
    }
    dispatch(
      addMenu(obj, () => {
        clearData()
        setAddModal(!addModal)
      })
    )
  }
  const handleEditSubmit = e => {
    e.preventDefault()
    let obj = {
      name: item,
      comments,
      category,
      inventory,
      calories,
      estimatedTime,
      sizes: Items,
      label,
      images,
      videos,
      recommendedProducts: secondTableItems,
      restaurantID: user?.restaurantID,
      menuID: 'none'
    }
    dispatch(
      editMenu(
        ID,
        obj,
        () => {
          clearData()
          setEditModal(!editModal)
        },
        imagesToRemove,
        videosToRemove
      )
    )
  }

  useEffect(() => {
    dispatch(getMenu(user?.restaurantID, searchField, hitsPerPage, currentPage))
  }, [searchField, hitsPerPage, currentPage])

  const renderPageNumbers = () => {
    const pageNumbers = []
    const totalPages = menuRestData?.nbPages

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
    dispatch(getCategories(user?.restaurantID))
  }, [])

  useEffect(() => {
    dispatch(getLabels(user?.restaurantID))
  }, [])

  const fileRef = useRef()
  const handleClickMenu = () => {
    fileRef.current.click()
  }

  const handleImport = event => {
    const file = event.target.files[0]
    const fileName = file.name.split('.')[1]
    if (fileName == 'csv') {
      const reader = new FileReader()
      reader.readAsText(file)
      reader.onload = () => {
        csvtojson()
          .fromString(reader.result)
          .then(importedData => {
            const result = importedData.map(obj => {
              delete obj?.id
              return obj
            })

            dispatch(importMenu(importedData))
          })
          .catch(error => console.log(error))
      }
    } else {
      enqueueSnackbar('select the CSV file')
    }
  }

  const exportData = () => {
    const fileName = 'menu'
    const exportType = exportFromJSON.types.csv
    exportFromJSON({ data: menuData, fileName, exportType })
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
              <CardHeader className=''>
                <Row>
                  <Col>
                    <h3 className='mb-0'>Menu</h3>
                  </Col>
                </Row>
                <Row>
                  <Col sm='6' lg='3' className='mt-3'>
                    {' '}
                    <Input
                      placeholder='Search Here.. '
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
                    {user?.type === 'kitchen-admin' ? (
                      <>
                        {menuPermissions?.add ? (
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
                  <Col sm='6' lg='3' className='mt-3'>
                    <>
                      <form>
                        <input
                          type='file'
                          // onChange={(e) => {
                          //   setFile(e.target.files[0]);
                          // }}
                          onChange={handleImport}
                          ref={fileRef}
                          hidden
                        ></input>
                        {user?.type === 'kitchen-admin' ? (
                          <>
                            {menuPermissions?.import ? (
                              <Button
                                color='primary'
                                block
                                onClick={handleClickMenu}
                              >
                                Import Menu
                              </Button>
                            ) : (
                              ''
                            )}
                          </>
                        ) : (
                          <Button
                            color='primary'
                            block
                            onClick={handleClickMenu}
                          >
                            Import Menu
                          </Button>
                        )}
                      </form>
                      {user?.type === 'kitchen-admin' ? (
                        <>
                          {menuPermissions?.export ? (
                            <>
                              {' '}
                              <Button
                                color='primary'
                                className='mt-2'
                                block
                                onClick={exportData}
                              >
                                Export Menu
                              </Button>
                            </>
                          ) : (
                            ''
                          )}
                        </>
                      ) : (
                        <Button
                          color='primary'
                          className='mt-2'
                          block
                          onClick={exportData}
                        >
                          Export Menu
                        </Button>
                      )}
                    </>
                  </Col>
                </Row>
              </CardHeader>
              {user?.type === 'kitchen-admin' ? (
                <>
                  {menuPermissions?.get ? (
                    <>
                      <Table
                        className='align-items-center table-flush'
                        responsive
                      >
                        <thead className='thead-light'>
                          <tr>
                            <th scope='col'>Title</th>
                            <th scope='col'>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {menuData?.map(item => {
                            return (
                              <tr>
                                <th scope='row'>{item?.name}</th>
                                {/* <td>{item?.restaurantID}</td> */}
                                <td>
                                  {menuPermissions?.edit ? (
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
                                  <Button className='btn-sm' color='primary'>
                                    View
                                  </Button>
                                  {menuPermissions?.delete ? (
                                    <Button
                                      className='btn-sm'
                                      color='danger'
                                      onClick={() =>
                                        dispatch(deleteMenu(item.id))
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
                    </>
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
                      <th scope='col'>Title</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {menuData?.map(item => {
                      return (
                        <tr>
                          <th scope='row'>{item?.name}</th>
                          {/* <td>{item?.restaurantID}</td> */}
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
                              color='primary'
                              onClick={() => {
                                Viewtoggle()
                                setMenuDetails(item)
                              }}
                            >
                              View
                            </Button>
                            <Button
                              className='btn-sm'
                              color='danger'
                              onClick={() => dispatch(deleteMenu(item.id))}
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

              {menuRestData?.nbPages > 1 ? (
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
                        disabled={currentPage === menuRestData?.nbPages - 1}
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
              ) : (
                ''
              )}
            </Card>
          </div>
        </Row>

        {/* Modal for add restaurant */}
        <div>
          <Modal
            className='modal-xl modal-dialog-scrollable'
            isOpen={addModal}
            toggle={addtoggle}
          >
            <ModalHeader toggle={addtoggle}>Add Menu</ModalHeader>
            <ModalBody>
              <Form onSubmit={e => handleAddSubmit(e)}>
                <Row>
                  <Col md={7} lg={7} xl={7} sm={10} xs={10}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Item Name</Label>
                          <Input
                            type='text'
                            name='item'
                            id='item'
                            required
                            placeholder='Item Name'
                            value={item}
                            onChange={e => setItem(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Category</Label>
                          <CustomInput
                            type='select'
                            id='exampleCustomSelect'
                            name='customSelect'
                            required
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                          >
                            <option value=''>Select</option>
                            {categoriesData.map((item, index) => {
                              return (
                                <option value={item.categoryName} key={index}>
                                  {item.categoryName}
                                </option>
                              )
                            })}
                            {/* <option value="fast food">Fast Food</option>
                            <option value="chinese">Chinese</option>
                            <option value="rice">Rice</option> */}
                          </CustomInput>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>
                            Estimated Preperation Time
                          </Label>
                          <Input
                            type='number'
                            min={1}
                            placeholder='00'
                            value={estimatedTime}
                            required
                            onChange={e => setEstimatedTime(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Inventory</Label>
                          <CustomInput
                            type='select'
                            id='exampleCustomSelect'
                            name='customSelect'
                            required
                            value={inventory}
                            onChange={e => setInventory(e.target.value)}
                          >
                            <option value=''>Select</option>
                            <option value='fast food'>Fast Food</option>
                            <option value='chinese'>Chinese</option>
                            <option value='rice'>Rice</option>
                          </CustomInput>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Label</Label>
                          <CustomInput
                            type='select'
                            value={label}
                            required
                            onChange={e => setLabel(e.target.value)}
                          >
                            <option value=''>Select</option>
                            {labelsData.map(item => {
                              return (
                                <option value={item?.labelName}>
                                  {item?.labelName}
                                </option>
                              )
                            })}
                            {/* <option value="Vegan">Vegan</option>
                            <option value="Halal">Halal</option> */}
                          </CustomInput>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Calories</Label>
                          <Input
                            type='number'
                            min={1}
                            name='item'
                            id='item'
                            required
                            placeholder='Calories'
                            value={calories}
                            onChange={e => setCalories(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={5} lg={5} xl={5} sm={10} xs={10}>
                    <Row>
                      <Col>
                        {' '}
                        <FormGroup>
                          <Label for='price'>Comments</Label>
                          <Input
                            type='text'
                            name='price'
                            id='price'
                            required
                            placeholder='Comments'
                            value={comments}
                            onChange={e => setComments(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col className='col-6'>
                        <div className='preview-images'>
                          {previewImages && previewImages.length > 0 ? (
                            previewImages.map(url => (
                              <img key={url} width={100} src={url} alt='' />
                            ))
                          ) : (
                            <FormGroup className='file-input'>
                              <Input
                                type='file'
                                multiple
                                name='item'
                                id='file-images'
                                placeholder='Images'
                                className='file-input__input'
                                onChange={imagesHandleChange}
                              />
                              <Label
                                for='file-images'
                                className={`d-flex flex-column file-input__label ${
                                  previewImages && previewImages.length > 0
                                    ? 'd-none'
                                    : ''
                                }`}
                              >
                                <img src={fileupload} alt='' />
                                <span className='text-center'>
                                  Upload Images
                                </span>
                              </Label>
                            </FormGroup>
                          )}
                        </div>
                      </Col>
                      <Col className='col-6'>
                        <div className='preview-videos'>
                          {previewVideos && previewVideos.length > 0 ? (
                            previewVideos.map(url => (
                              <video key={url} width='100%' controls>
                                <source src={url} type='video/mp4' />
                              </video>
                            ))
                          ) : (
                            <FormGroup className='file-input'>
                              <Input
                                type='file'
                                multiple
                                className='file-input__input'
                                onChange={videosHandleChange}
                                id='video-file'
                              />
                              <Label
                                for='video-file'
                                className={`d-flex flex-column file-input__label ${
                                  previewVideos && previewVideos.length > 0
                                    ? 'd-none'
                                    : ''
                                }`}
                              >
                                <img src={fileupload} alt='' />
                                <span className='text-center'>
                                  Upload Videos
                                </span>
                              </Label>
                            </FormGroup>
                          )}
                        </div>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row>
                  {' '}
                  {/* <Col>
                    <FormGroup>
                      <Button className="modal__btn">Hide Item</Button>
                    </FormGroup>
                  </Col> */}
                </Row>
                <hr className='my-1' />
                <Row>
                  <Col md={7} lg={7} xl={7} sm={9} xs={9}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Size</Label>
                          <Input
                            type='text'
                            name='item'
                            id='item'
                            placeholder='Item Size'
                            value={subItem}
                            onChange={e => setSubItem(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Price</Label>
                          <Input
                            type='number'
                            name='price'
                            min={0}
                            id='item'
                            placeholder='Price'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Calories</Label>
                          <Input
                            type='number'
                            name='calories'
                            min={0}
                            id='item'
                            placeholder='Calories'
                            value={subCalories}
                            onChange={e => setSubCalories(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={5}
                    lg={5}
                    xl={5}
                    sm={3}
                    xs={3}
                    className='d-flex justify-content-end align-items-center'
                  >
                    <Row>
                      <Col>
                        <Button
                          className='modal__btn'
                          disabled={!calories || !price}
                          onClick={e => subItemsClick(e)}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Table
                  className='align-items-center table-flush sub__items-table'
                  responsive
                >
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Sub Item</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Items?.map((item, index) => {
                      return (
                        <tr key={index}>
                          {editingIndex === index ? (
                            <>
                              <td>
                                <Input
                                  type='text'
                                  placeholder='Item Name'
                                  value={item.subItem}
                                  onChange={e =>
                                    handleItemChange(e, index, 'subItem')
                                  }
                                />
                              </td>
                              <td>
                                <Input
                                  type='number'
                                  placeholder='Price'
                                  min={0}
                                  value={item.price}
                                  onChange={e =>
                                    handleItemChange(e, index, 'price')
                                  }
                                />
                              </td>
                              <td className='table-actions'>
                                <Button
                                  size='sm'
                                  color='primary'
                                  onClick={() => handleUpdateClick(index, item)}
                                >
                                  Update
                                </Button>{' '}
                              </td>
                            </>
                          ) : (
                            <>
                              {' '}
                              <td className='text-capitalize'>
                                {item.subItem}
                              </td>
                              <td>{item.price}</td>
                              <td className='table-actions'>
                                {/* <img src={hide} alt="" className="mx-2" /> */}
                                <img
                                  src={edit}
                                  alt=''
                                  className='mx-2'
                                  onClick={() => setEditingIndex(index)}
                                />
                                <img
                                  src={deleteIcon}
                                  alt=''
                                  className='mx-2'
                                  onClick={() =>
                                    handleRemove('subItems', index)
                                  }
                                />
                              </td>
                            </>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <hr className='my-1' />
                {menuData?.length > 0 ? (
                  <>
                    {' '}
                    <Row>
                      <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                        <Row>
                          <Col>
                            <FormGroup>
                              <Label for='location'>Recommended Products</Label>
                              <Select
                                isMulti
                                options={productOptions}
                                value={selectedOptions}
                                onChange={handleChange}
                              />
                            </FormGroup>
                          </Col>
                          <Col>
                            <FormGroup className='mx-3'>
                              <Label for='location'>Gender</Label>
                              <CustomInput
                                type='select'
                                id='exampleCustomSelect'
                                name='customSelect'
                                value={gender}
                                onChange={e => setGender(e.target.value)}
                              >
                                <option value=''>Select</option>
                                {genderOptions.map(gender => {
                                  return (
                                    <option value={gender.value}>
                                      {gender.label}
                                    </option>
                                  )
                                })}
                              </CustomInput>
                            </FormGroup>
                          </Col>
                        </Row>
                      </Col>
                      <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                        <Row className='d-flex justify-content-between align-items-center'>
                          <Col>
                            <FormGroup>
                              <Label for='location'>Age Range</Label>
                              <div className='age-range'>
                                <Input
                                  type='number'
                                  min={1}
                                  value={ageFrom}
                                  onChange={e => setAgeFrom(e.target.value)}
                                />{' '}
                                To
                                <Input
                                  type='number'
                                  min={1}
                                  value={ageTo}
                                  onChange={e => setAgeTo(e.target.value)}
                                />
                              </div>
                            </FormGroup>
                          </Col>

                          <Col className='d-flex justify-content-end'>
                            <Button
                              className='modal__btn'
                              disabled={
                                selectedOptions.length === 0 ||
                                !ageFrom ||
                                !ageTo ||
                                !gender
                              }
                              onClick={e => secondTable(e)}
                            >
                              Save
                            </Button>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Table
                      className='align-items-center table-flush sub__items-table'
                      responsive
                    >
                      <thead className='thead-light'>
                        <tr>
                          <th scope='col'>Recommend Products</th>
                          <th scope='col'>Gender</th>
                          <th scope='col'>Age Range</th>
                          <th scope='col'>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {secondTableItems?.map((item, index) => {
                          return (
                            <tr key={index}>
                              {recommendedIndex === index ? (
                                <>
                                  <td>
                                    <Select
                                      isMulti
                                      value={item.selectedOptions}
                                      options={productOptions}
                                      onChange={selectedValues =>
                                        handleRecommededChange(
                                          index,
                                          'selectedOptions',
                                          selectedValues
                                        )
                                      }
                                    />
                                  </td>
                                  <td>
                                    <CustomInput
                                      type='select'
                                      id='exampleCustomSelect'
                                      name='customSelect'
                                      value={item.gender}
                                      onChange={e =>
                                        handleRecommededChange(
                                          index,
                                          'gender',
                                          e.target.value
                                        )
                                      }
                                    >
                                      <option value=''>Select</option>
                                      {genderOptions.map(gender => {
                                        return (
                                          <option value={gender.value}>
                                            {gender.label}
                                          </option>
                                        )
                                      })}
                                    </CustomInput>
                                  </td>
                                  <td>
                                    <div className='age-range'>
                                      <Input
                                        type='number'
                                        min={1}
                                        value={item.ageFrom}
                                        onChange={e =>
                                          handleRecommededChange(
                                            index,
                                            'ageFrom',
                                            e.target.value
                                          )
                                        }
                                      />
                                      To
                                      <Input
                                        type='number'
                                        min={1}
                                        value={item.ageTo}
                                        onChange={e =>
                                          handleRecommededChange(
                                            index,
                                            'ageTo',
                                            e.target.value
                                          )
                                        }
                                      />
                                    </div>
                                  </td>
                                  <td className='table-actions'>
                                    <Button
                                      size='sm'
                                      color='primary'
                                      onClick={() =>
                                        handleRecommededUpdate(index, item)
                                      }
                                    >
                                      Update
                                    </Button>
                                  </td>
                                </>
                              ) : (
                                <>
                                  {' '}
                                  <td>
                                    {item.selectedOptions.map(option => {
                                      return (
                                        <span className='text-capitalize'>
                                          {option.label}&nbsp;
                                        </span>
                                      )
                                    })}
                                  </td>
                                  <td className='text-capitalize'>
                                    {item.gender}
                                  </td>
                                  <td>
                                    {item.ageFrom}-{item.ageTo}
                                  </td>
                                  <td className='table-actions'>
                                    <img
                                      src={edit}
                                      alt=''
                                      className='mx-2'
                                      onClick={() => setRecommendedIndex(index)}
                                    />
                                    <img
                                      src={deleteIcon}
                                      alt=''
                                      className='mx-2'
                                      onClick={() =>
                                        handleRemove('recommended', index)
                                      }
                                    />
                                  </td>
                                </>
                              )}
                            </tr>
                          )
                        })}
                      </tbody>
                    </Table>
                  </>
                ) : (
                  ''
                )}

                <Row>
                  <Col className='d-flex justify-content-end'>
                    <Button
                      className='modal__btn'
                      type='submit'
                      disabled={Items?.length < 1}
                    >
                      {addMenuLoader ? <Spinner size='sm' /> : 'Save'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </ModalBody>
          </Modal>
        </div>

        {/* Modal for edit restaurant Details */}
        <div>
          <Modal
            className='modal-xl modal-dialog-scrollable'
            isOpen={editModal}
            toggle={edittoggle}
          >
            <ModalHeader toggle={edittoggle}>Edit Menu</ModalHeader>
            <ModalBody>
              <Form onSubmit={e => handleEditSubmit(e)}>
                <Row>
                  <Col md={7} lg={7} xl={7} sm={10} xs={10}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Item Name</Label>
                          <Input
                            type='text'
                            name='item'
                            id='item'
                            placeholder='Item Name'
                            value={item}
                            onChange={e => setItem(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Category</Label>
                          <CustomInput
                            type='select'
                            id='exampleCustomSelect'
                            name='customSelect'
                            value={category}
                            onChange={e => setCategory(e.target.value)}
                          >
                            <option value=''>Select</option>
                            {categoriesData.map((item, index) => {
                              return (
                                <option value={item.categoryName} key={index}>
                                  {item.categoryName}
                                </option>
                              )
                            })}
                          </CustomInput>
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>
                            Estimated Preperation Time
                          </Label>
                          <Input
                            type='number'
                            min={1}
                            placeholder='00'
                            value={estimatedTime}
                            onChange={e => setEstimatedTime(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Inventory</Label>
                          <CustomInput
                            type='select'
                            id='exampleCustomSelect'
                            name='customSelect'
                            value={inventory}
                            onChange={e => setInventory(e.target.value)}
                          >
                            <option value=''>Select</option>
                            <option value='fast food'>Fast Food</option>
                            <option value='chinese'>Chinese</option>
                            <option value='rice'>Rice</option>
                          </CustomInput>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={5} lg={5} xl={5} sm={10} xs={10}>
                    <Row>
                      <Col>
                        {' '}
                        <FormGroup>
                          <Label for='price'>Comments</Label>
                          <Input
                            type='text'
                            name='price'
                            id='price'
                            placeholder='Comments'
                            value={comments}
                            onChange={e => setComments(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Label</Label>
                          <CustomInput
                            type='select'
                            value={label}
                            onChange={e => setLabel(e.target.value)}
                          >
                            <option value=''>Select</option>
                            {labelsData.map(item => {
                              return (
                                <option value={item?.labelName}>
                                  {item?.labelName}
                                </option>
                              )
                            })}
                          </CustomInput>
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Calories</Label>
                          <Input
                            type='number'
                            min={1}
                            name='item'
                            id='item'
                            placeholder='Calories'
                            value={calories}
                            onChange={e => setCalories(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Row className='d-flex align-items-center ml-3'>
                  {previewImages
                    ? previewImages.map(image => (
                        <div className='position-relative media__parent_div '>
                          <img
                            src={image}
                            width='80px'
                            className='rounded mx-3 mb-2'
                          />
                          <i
                            className='fa-solid fa-x media__cross_icon'
                            onClick={() => {
                              setImagesToRemove(prevImagesToRemove => [
                                ...prevImagesToRemove,
                                image
                              ])
                              setPreviewImages(prevPreviewImages =>
                                prevPreviewImages.filter(img => img !== image)
                              )
                              setImages(prevPreviewImages =>
                                prevPreviewImages.filter(img => img !== image)
                              )
                            }}
                          ></i>
                        </div>
                      ))
                    : ''}

                  <FormGroup className='file-input'>
                    <Input
                      type='file'
                      multiple
                      name='item'
                      id='file-images'
                      placeholder='Images'
                      className='file-input__input'
                      onChange={imagesHandleChange}
                    />
                    <Label
                      for='file-images'
                      className='d-flex flex-column file-input__label'
                    >
                      {' '}
                      <img src={fileupload} alt='' width='80px' height='80px' />
                      <span
                        className='text-center'
                        style={{ fontSize: '12px' }}
                      >
                        Upload Images
                      </span>
                    </Label>
                  </FormGroup>
                </Row>
                <Row className='d-flex align-items-center ml-3'>
                  {previewVideos
                    ? previewVideos.map(video => (
                        <div className='position-relative media__parent_div '>
                          <video
                            src={video}
                            width='80px'
                            className='rounded mx-3 mb-2'
                          />
                          <i
                            className='fa-solid fa-x media__cross_icon'
                            onClick={() => {
                              setvideosToRemove(Remove => [...Remove, video])
                              setPreviewVideos(Remove =>
                                Remove.filter(vid => vid !== video)
                              )
                              setVideos(Remove =>
                                Remove.filter(vid => vid !== video)
                              )
                            }}
                          ></i>
                        </div>
                      ))
                    : ''}
                  <FormGroup className='file-input'>
                    <Input
                      type='file'
                      multiple
                      className='file-input__input'
                      onChange={videosHandleChange}
                      id='video-file'
                    />
                    <Label
                      for='video-file'
                      className='d-flex flex-column file-input__label'
                    >
                      <img src={fileupload} alt='' width='80px' height='80px' />
                      <span
                        className='text-center'
                        style={{ fontSize: '12px' }}
                      >
                        Upload Videos
                      </span>
                    </Label>
                  </FormGroup>
                </Row>
                <hr className='my-1' />
                <Row>
                  <Col md={7} lg={7} xl={7} sm={9} xs={9}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Sub Item</Label>
                          <Input
                            type='text'
                            name='item'
                            id='item'
                            placeholder='Item Name'
                            value={subItem}
                            onChange={e => setSubItem(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Price</Label>
                          <Input
                            type='text'
                            name='price'
                            id='item'
                            placeholder='Item Name'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup>
                          <Label for='item-name'>Price</Label>
                          <Input
                            type='text'
                            name='price'
                            id='item'
                            placeholder='Item Name'
                            value={price}
                            onChange={e => setPrice(e.target.value)}
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col
                    md={5}
                    lg={5}
                    xl={5}
                    sm={3}
                    xs={3}
                    className='d-flex justify-content-end align-items-center'
                  >
                    <Row>
                      <Col>
                        <Button
                          className='modal__btn'
                          disabled={!subItem || !price}
                          onClick={e => subItemsClick(e)}
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Table
                  className='align-items-center table-flush sub__items-table'
                  responsive
                >
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Sub Item</th>
                      <th scope='col'>Price</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {Items?.map((item, index) => {
                      return (
                        <tr key={index}>
                          {editingIndex === index ? (
                            <>
                              <td>
                                <Input
                                  type='text'
                                  placeholder='Item Name'
                                  value={item.subItem}
                                  onChange={e =>
                                    handleItemChange(e, index, 'subItem')
                                  }
                                />
                              </td>
                              <td>
                                <Input
                                  type='number'
                                  placeholder='Price'
                                  min={0}
                                  value={item.price}
                                  onChange={e =>
                                    handleItemChange(e, index, 'price')
                                  }
                                />
                              </td>
                              <td className='table-actions'>
                                <Button
                                  size='sm'
                                  color='primary'
                                  onClick={() => handleUpdateClick(index, item)}
                                >
                                  Update
                                </Button>{' '}
                              </td>
                            </>
                          ) : (
                            <>
                              {' '}
                              <td className='text-capitalize'>
                                {item.subItem}
                              </td>
                              <td>{item.price}</td>
                              <td className='table-actions'>
                                {/* <img src={hide} alt="" className="mx-2" /> */}
                                <img
                                  src={edit}
                                  alt=''
                                  className='mx-2'
                                  onClick={() => setEditingIndex(index)}
                                />
                                <img
                                  src={deleteIcon}
                                  alt=''
                                  className='mx-2'
                                  onClick={() =>
                                    handleRemove('subItems', index)
                                  }
                                />
                              </td>
                            </>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <hr className='my-1' />
                <Row>
                  <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                    <Row>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Recommended Products</Label>
                          <Select
                            isMulti
                            options={productOptions}
                            value={selectedOptions}
                            onChange={handleChange}
                          />
                        </FormGroup>
                      </Col>
                      <Col>
                        <FormGroup className='mx-3'>
                          <Label for='location'>Gender</Label>
                          <CustomInput
                            type='select'
                            id='exampleCustomSelect'
                            name='customSelect'
                            value={gender}
                            onChange={e => setGender(e.target.value)}
                          >
                            <option value=''>Select</option>
                            {genderOptions.map(gender => {
                              return (
                                <option value={gender.value}>
                                  {gender.label}
                                </option>
                              )
                            })}
                          </CustomInput>
                        </FormGroup>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6} lg={6} xl={6} sm={12} xs={12}>
                    <Row className='d-flex justify-content-between align-items-center'>
                      <Col>
                        <FormGroup>
                          <Label for='location'>Age Range</Label>
                          <div className='age-range'>
                            <Input
                              type='number'
                              min={1}
                              value={ageFrom}
                              onChange={e => setAgeFrom(e.target.value)}
                            />{' '}
                            To
                            <Input
                              type='number'
                              min={1}
                              value={ageTo}
                              onChange={e => setAgeTo(e.target.value)}
                            />
                          </div>
                        </FormGroup>
                      </Col>

                      <Col className='d-flex justify-content-end'>
                        <Button
                          className='modal__btn'
                          onClick={e => secondTable(e)}
                          disabled={
                            selectedOptions.length === 0 ||
                            !ageFrom ||
                            !ageTo ||
                            !gender
                          }
                        >
                          Save
                        </Button>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                <Table
                  className='align-items-center table-flush sub__items-table'
                  responsive
                >
                  <thead className='thead-light'>
                    <tr>
                      <th scope='col'>Recommend Products</th>
                      <th scope='col'>Gender</th>
                      <th scope='col'>Age Range</th>
                      <th scope='col'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {secondTableItems?.map((item, index) => {
                      return (
                        <tr key={index}>
                          {recommendedIndex === index ? (
                            <>
                              <td>
                                <Select
                                  isMulti
                                  value={item.selectedOptions}
                                  options={productOptions}
                                  onChange={selectedValues =>
                                    handleRecommededChange(
                                      index,
                                      'selectedOptions',
                                      selectedValues
                                    )
                                  }
                                />
                              </td>
                              <td>
                                <CustomInput
                                  type='select'
                                  id='exampleCustomSelect'
                                  name='customSelect'
                                  value={item.gender}
                                  onChange={e =>
                                    handleRecommededChange(
                                      index,
                                      'gender',
                                      e.target.value
                                    )
                                  }
                                >
                                  <option value=''>Select</option>
                                  {genderOptions.map(gender => {
                                    return (
                                      <option value={gender.value}>
                                        {gender.label}
                                      </option>
                                    )
                                  })}
                                </CustomInput>
                              </td>
                              <td>
                                <div className='age-range'>
                                  <Input
                                    type='number'
                                    min={1}
                                    value={item.ageFrom}
                                    onChange={e =>
                                      handleRecommededChange(
                                        index,
                                        'ageFrom',
                                        e.target.value
                                      )
                                    }
                                  />
                                  To
                                  <Input
                                    type='number'
                                    min={1}
                                    value={item.ageTo}
                                    onChange={e =>
                                      handleRecommededChange(
                                        index,
                                        'ageTo',
                                        e.target.value
                                      )
                                    }
                                  />
                                </div>
                              </td>
                              <td className='table-actions'>
                                <Button
                                  size='sm'
                                  color='primary'
                                  onClick={() =>
                                    handleRecommededUpdate(index, item)
                                  }
                                >
                                  Update
                                </Button>
                              </td>
                            </>
                          ) : (
                            <>
                              {' '}
                              <td>
                                {item.selectedOptions.map(option => {
                                  return (
                                    <span className='text-capitalize'>
                                      {option.label}&nbsp;
                                    </span>
                                  )
                                })}
                              </td>
                              <td className='text-capitalize'>{item.gender}</td>
                              <td>
                                {item.ageFrom}-{item.ageTo}
                              </td>
                              <td className='table-actions'>
                                <img
                                  src={edit}
                                  alt=''
                                  className='mx-2'
                                  onClick={() => setRecommendedIndex(index)}
                                />
                                <img
                                  src={deleteIcon}
                                  alt=''
                                  className='mx-2'
                                  onClick={() =>
                                    handleRemove('recommended', index)
                                  }
                                />
                              </td>
                            </>
                          )}
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
                <Row>
                  <Col className='d-flex justify-content-end'>
                    <Button
                      className='modal__btn'
                      type='submit'
                      disabled={Items?.length < 1}
                    >
                      Save
                    </Button>
                  </Col>
                </Row>
              </Form>

              {/* <Form>
                <Row className='d-flex flex-row align-items-end'>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='item-name'>Item Name</Label>
                      <Input
                        type='text'
                        name='item'
                        id='item'
                        placeholder='Item Name'
                        value={item}
                        onChange={e => setItem(e.target.value)}
                      />
                    </FormGroup>
                  </Col>

                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='price'>Comments</Label>
                      <Input
                        type='text'
                        name='price'
                        id='price'
                        placeholder='Comments'
                        value={comments}
                        onChange={e => setComments(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for='price'>Price</Label>
                      <Input
                        type='text'
                        name='price'
                        id='price'
                        placeholder='Item Price'
                        value={price}
                        onChange={e => setPrice(e.target.value)}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='location'>Category</Label>
                      <CustomInput
                        type='select'
                        id='exampleCustomSelect'
                        name='customSelect'
                        value={category}
                        onChange={e => setCategory(e.target.value)}
                      >
                        <option value=''>Select</option>
                        <option value='fast food'>Fast Food</option>
                        <option value='chinese'>Chinese</option>
                        <option value='rice'>Rice</option>
                      </CustomInput>
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='location'>Recommended Products</Label>
                      <Select
                        isMulti
                        options={productOptions}
                        value={selectedOptions}
                        onChange={handleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    <FormGroup>
                      <Label for='location'>Label</Label>
                      <CustomInput
                        type='select'
                        value={label}
                        onChange={e => setLabel(e.target.value)}
                      >
                        <option value=''>Select</option>
                        <option value='Tofu or tempeh'>Tofu or tempeh</option>
                        <option value='Lentils'>Lentils</option>
                        <option value='Chickpeas'>Chickpeas</option>
                      </CustomInput>
                    </FormGroup>
                  </Col>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='item-name'>Images</Label>
                      <Input
                        type='file'
                        multiple
                        name='item'
                        id='item'
                        placeholder='Images'
                        onChange={imagesHandleChange}
                      />
                    </FormGroup>
                  </Col>
                  <Col>
                    {' '}
                    <FormGroup>
                      <Label for='item-name'>Videos</Label>
                      <Input
                        type='file'
                        multiple
                        onChange={videosHandleChange}
                      />
                    </FormGroup>
                  </Col>
                </Row>
                <Row>
                  {' '}
                  <Col>
                    <FormGroup>
                      <Button
                        className=''
                        color='primary'
                        onClick={handleAddItem}
                      >
                        <i className='fa fa-plus'></i>
                      </Button>
                    </FormGroup>
                  </Col>
                </Row>

                {menu.map((ele, index) => {
                  return (
                    <>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Input
                              className='text-dark'
                              type='text'
                              name='item'
                              id='item'
                              color='black'
                              value={ele.item}
                              onChange={e => setItem(e.target.value)}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Input
                              className='text-dark'
                              type='text'
                              color='black'
                              value={ele.comments}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Input
                              className='text-dark'
                              type='text'
                              name='price'
                              id='price'
                              value={ele.price}
                              onChange={e => setPrice(e.target.value)}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Input
                              className='text-dark'
                              type='text'
                              id='category'
                              name='category'
                              value={ele.category}
                              onChange={e => setCategory(e.target.value)}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col>
                          <FormGroup>
                            <Select
                              isMulti
                              options={productOptions}
                              value={selectedOptions}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Input
                              className='text-dark'
                              type='text'
                              value={ele.label}
                              onChange={e => setCategory(e.target.value)}
                              readOnly
                            />
                          </FormGroup>
                        </Col>

                        <Col>
                          <FormGroup>
                            <Input
                              className='text-dark'
                              type='file'
                              // value={ele.images}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Input
                              className='text-dark'
                              type='file'
                              // value={ele.videos}
                              readOnly
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        {' '}
                        <Col>
                          <FormGroup>
                            <Button
                              color='danger'
                              onClick={e => handleDeleteItem(index)}
                            >
                              <i className='fa fa-minus'></i>
                            </Button>
                          </FormGroup>
                        </Col>
                      </Row>
                    </>
                  )
                })}

                <div className='d-flex justify-content-end'>
                  <Button color='primary'>Save</Button>
                </div>
              </Form> */}
            </ModalBody>
          </Modal>
        </div>

        {/* Modal for view menu details  */}
        <div>
          <Modal
            className='modal-xl modal-dialog-scrollable'
            isOpen={ViewModal}
            toggle={Viewtoggle}
          >
            <ModalHeader toggle={Viewtoggle}>Menu Details</ModalHeader>
            <ModalBody>
              <Row>
                <Col md={4}>
                  <FormGroup>
                    <Label>Item Name</Label>
                    <Input
                      readOnly
                      value={menuDetails?.name}
                      className='text-capitalize'
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label> Category</Label>
                    <Input
                      readOnly
                      value={menuDetails?.category}
                      className='text-capitalize'
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label> Inventory</Label>
                    <Input
                      readOnly
                      value={menuDetails?.inventory}
                      className='text-capitalize'
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label> Estimated Time</Label>
                    <Input readOnly value={menuDetails?.estimatedTime} />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label> Calories</Label>
                    <Input readOnly value={menuDetails?.calories} />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Comments</Label>
                    <Input
                      readOnly
                      value={menuDetails?.comments}
                      className='text-capitalize'
                    />
                  </FormGroup>
                </Col>
                <Col md={4}>
                  <FormGroup>
                    <Label>Views</Label>
                    <Input readOnly value={menuDetails?.views} />
                  </FormGroup>
                </Col>
                <Col md={12}>
                  <Table>
                    <thead>
                      <th>Sub Item</th>
                      <th>Price</th>
                    </thead>
                    <tbody>
                      {menuDetails?.sizes?.map(item => {
                        return (
                          <tr>
                            <td className='text-capitalize'>{item?.subItem}</td>
                            <td>{item?.price}</td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row className='d-flex align-items-center mb-2'>
                <h3 className='mx-3'>Images</h3>
                {menuDetails &&
                  menuDetails?.images?.map(menu => {
                    return (
                      <img src={menu} width={100} className='mx-2 rounded' />
                    )
                  })}
              </Row>
              <Row className='my-3 d-flex align-items-center'>
                <h3 className='mx-3'>Videos</h3>
                {menuDetails &&
                  menuDetails?.videos?.map(menu => {
                    console.log({ menu })
                    return (
                      <video src={menu} width={100} className='mx-2 rounded' />
                    )
                  })}
              </Row>
              <Row className='my-3'>
                <h3 className='mx-3'>Recommended Products</h3>
                <Table>
                  <thead>
                    <td>Selected Options</td>
                    <th>Age From</th>
                    <th>Age to</th>
                    <th>Gender</th>
                  </thead>
                  <tbody>
                    {menuDetails?.recommendedProducts?.map(product => {
                      return (
                        <tr>
                          <td className='text-capitalize'>
                            {product?.selectedOptions?.map(option => {
                              return option?.label
                            })}
                          </td>
                          <td>{product?.ageFrom}</td>
                          <td>{product?.ageTo}</td>
                          <td className='text-capitalize'>{product?.gender}</td>
                        </tr>
                      )
                    })}
                  </tbody>
                </Table>
              </Row>
            </ModalBody>
          </Modal>
        </div>
      </Container>
    </>
  )
}

export default Menus
