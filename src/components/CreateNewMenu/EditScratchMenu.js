import React, { useEffect, useState } from 'react'
import { Col, FormGroup, Label, Row, Container } from 'reactstrap'

import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'
import { styled } from '@mui/material/styles'

import { useHistory } from 'react-router-dom'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import {
  editCategory,
  editMenu,
  getParentMenu,
  addMenuNew,
  addCategory,
  deleteCategory,
  deleteMenu,
  rearrangeOrder,
  getLabels,
  getParentMenuName,
  getTabs
} from '../../store/actions/MenuManagmentActions'

import {
  IconButton,
  Card,
  CardActions,
  Typography,
  ThemeProvider,
  TextField,
  Button,
  Checkbox,
  FormControl,
  OutlinedInput,
  CardContent,
  Box,
  Tab,
  Grid,
  FormHelperText,
  Switch,
  Input,
  InputAdornment,
  CardActionArea,
  Stack,
  LinearProgress
} from '@mui/material'

import { TabContext, TabList, TabPanel } from '@mui/lab'

import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import RemoveCircleOutlineOutlinedIcon from '@mui/icons-material/RemoveCircleOutlineOutlined'

import { ThemeMain } from '../common/Theme'
import MultipleSelectForm from './forms/MultipleSelectForm'
import { FiCardContent, FiCardMedia } from '../common/CardBackground'

const AntSwitch = styled(Switch)(({ theme }) => ({
  width: 28,
  height: 16,
  padding: 0,
  display: 'flex',
  '&:active': {
    '& .MuiSwitch-thumb': {
      width: 15
    },
    '& .MuiSwitch-switchBase.Mui-checked': {
      transform: 'translateX(9px)'
    }
  },
  '& .MuiSwitch-switchBase': {
    padding: 2,
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#177ddc' : '#1890ff'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
    width: 12,
    height: 12,
    borderRadius: 6,
    transition: theme.transitions.create(['width'], {
      duration: 200
    })
  },
  '& .MuiSwitch-track': {
    borderRadius: 16 / 2,
    opacity: 1,
    backgroundColor:
      theme.palette.mode === 'dark'
        ? 'rgba(255,255,255,.35)'
        : 'rgba(0,0,0,.25)',
    boxSizing: 'border-box'
  }
}))

const EditScratchMenu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(state => state.auth)

  const [allLabels, setAllLabels] = useState([])
  const [allTabs, setAllTabs] = useState([])

  const {
    labelsData,
    tabsData,
    editLabelLoader,
    addMenuLoader,
    categoryLoader,
    editMenuData,
    editCategoryLoader,
    parentMenuName
  } = useSelector(state => state.menu)
  const pathParts = window.location.href.split('/')
  const menuID = pathParts[pathParts.length - 1]

  const [selectedTab, setSelectedTab] = useState('General Information')

  const handleSelectedTab = (e, newValue) => {
    setSelectedTab(newValue)
  }

  useEffect(() => {
    dispatch(getLabels(user?.restaurantID))
    dispatch(getTabs(user?.restaurantID))
    dispatch(getParentMenuName(menuID))
  }, [])

  useEffect(() => {
    const names = labelsData.map(label => {
      return label.labelName
    })
    setAllLabels(names)
  }, [labelsData])

  useEffect(() => {
    const names = tabsData.map(tab => {
      return tab.tabName
    })
    setAllTabs(names)
  }, [tabsData])

  const [selectedOption, setSelectedOption] = useState(null)
  const [customOffcanvas, setCustomOffcanvas] = useState(false)
  const [categoryImage, setCategoryImage] = useState(null)
  const [name, setName] = useState('')
  const [categoriesAndItems, setCategoriesAndItems] = useState([])
  const [toEdit, setToEdit] = useState('')

  const [categoryImagesToRemove, setCategoryImageToRemove] = useState('')
  const [imagesToRemove, setImagesToRemove] = useState([])
  const [saveAndAddMore, setSaveAndAddMore] = useState(false)

  // General information for new item
  const [item, setItem] = useState('')
  const [description, setDescription] = useState('')
  const [price, setPrice] = useState('')
  const [previewImages, setPreviewImages] = useState([])
  const [labels, setLabels] = useState([])
  const [tabs, setTabs] = useState([])
  const [recommendations, setRecommendations] = useState('')
  const [markAsSold, setMarkAsSold] = useState(false)

  // Price options
  const [topping, setTopping] = useState('')
  const [variationName, setVariationName] = useState('')
  const [mandatoryOption, setMandatoryOption] = useState('')
  const [priceOptions, setPriceOptions] = useState([])
  const [optionName, setOptionName] = useState('')
  const [optionPrice, setOptionPrice] = useState('')

  // COGS
  const [costOfGoods, setCostOfGoods] = useState([])
  const [totalPrice, setTotalPrice] = useState(0)
  const [itemName, setItemName] = useState('')
  const [itemPrice, setItemPrice] = useState('')

  const [category, setCategory] = useState('')
  const [images, setImages] = useState([])
  const [menuItemCount, setMenuItemCount] = useState(0)

  const [editTitle, setEditTitle] = useState('')

  // Menu Item filter
  const [itemFilter, setItemFilter] = useState(false)

  const handleCostOfGoods = () => {
    setCostOfGoods([
      ...costOfGoods,
      {
        name: itemName,
        price: itemPrice
      }
    ])
    setItemName('')
    setItemPrice('')
    setTotalPrice(Number(totalPrice) + Number(itemPrice))
  }

  const getTotalPrice = () => {
    let sum = 0
    costOfGoods.map(item => {
      sum += Number(item.price)
    })
    return Number(sum)
  }

  // Image handleChange Event
  const imagesHandleChange = e => {
    const files = e.target.files
    const newImages = []
    const newPreviewImages = []
    const validFormats = ['image/jpeg', 'image/jpg', 'image/png']
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      const fileType = file.type
      const fileSize = file.size

      if (fileSize > 3000000) {
        toast.error('Error: Image size is too big', {
          style: {
            fontFamily: 'Poppins'
          }
        })
        continue
      }

      if (!validFormats.includes(fileType)) {
        toast.error(
          `Error: Invalid file format  ${file?.name}. Please select a .jpg, .jpeg, or .png image.`,
          {
            style: {
              fontFamily: 'Poppins'
            }
          }
        )
        // Perform your error handling or display a message to the user
        continue // Skip further processing for non-image files
      }

      newImages.push(file)
      newPreviewImages.push(URL.createObjectURL(file))
      console.log(newPreviewImages)
    }

    setImages([...images, ...newImages])
    setPreviewImages([...previewImages, ...newPreviewImages])
  }

  const addCategoryHandle = event => {
    event.preventDefault() // prevent the default form submission behavior

    dispatch(
      addCategory(
        {
          categoryName: name,
          views: 0,
          purchase: 0,
          orderCount: 0,
          menuID,
          order: editMenuData.length,
          restaurantID: user.restaurantID
        },
        categoriesID => {
          if (saveAndAddMore) {
            setCategoryImage('')
            setName('')
            setSaveAndAddMore(false)
          } else {
            setCustomOffcanvas(false)
            setCategoryImage('')
            setName('')
            setSaveAndAddMore(false)
          }
        }
      )
    )
    dispatch(
      getParentMenu(menuID, res => {
        toast.success('Added new category.', {
          style: {
            fontFamily: 'Poppins'
          }
        })
      })
    )
  }

  const addItemhandle = event => {
    event.preventDefault()

    let obj = {
      restaurantID: user.restaurantID,
      menuID,
      categoriesID: category?.id || '',
      order: menuItemCount,
      item: item,
      description: description,
      price: Number(price),
      images: images || [],
      labels: labels,
      tabs: tabs,
      recommendations: recommendations,
      markAsSold: markAsSold,
      topping: topping,
      variationName: variationName,
      mandatoryOption: mandatoryOption,
      priceOptions: priceOptions,
      costOfGoods: costOfGoods,
      totalPrice: Number(totalPrice)
    }

    dispatch(
      addMenuNew(obj, res => {
        // Create a copy of the categoriesAndItems array
        const updatedCategoriesAndItems = [...categoriesAndItems]
        if (res.categoriesID) {
          // Find the matching category object using Array.find()
          const categoryObj = updatedCategoriesAndItems.find(
            ele => ele.id === category.id
          )
          categoryObj.items.push(res)
        } else {
          // If itemofCategory is falsy, simply push the new menu item into the array
          updatedCategoriesAndItems.push(res)
        }
        // Update the state with the new categoriesAndItems array
        setCategoriesAndItems(updatedCategoriesAndItems)

        dispatch({
          type: 'EDIT_MENU',
          payload: categoriesAndItems
        })

        // Clear the input data and close the offcanvas
        clearData()
        setCustomOffcanvas(false)
        setCategory('')
      })
    )
  }

  const clearData = () => {
    setItem('')
    setDescription('')
    setImages('')
    setPrice('')
    setLabels([])
    setTabs([])
    setRecommendations([])
    setMarkAsSold(false)
    setTopping('')
    setVariationName('')
    setMandatoryOption('')
    setPriceOptions([])
    setPreviewImages([])
    setCostOfGoods([])
    setTotalPrice('')
  }

  const productOptions = []
  categoriesAndItems.forEach(menu => {
    if (menu.items && menu.items.length > 0) {
      menu.items.forEach(item => {
        productOptions.push({ value: item.name, label: item.name })
      })
    }
  })

  const setEditCategory = (event, category) => {
    event.preventDefault()
    setCategoryImage(category?.imageURL)
    setName(category?.categoryName)
    setSelectedOption('Categories')
    setCustomOffcanvas(true)
    setToEdit(category)
    setEditTitle(category.categoryName)
  }

  const updateCategoryHandle = event => {
    event.preventDefault()
    dispatch(
      editCategory(
        toEdit.id,
        name,
        categoryImage,
        categoryImagesToRemove,
        res => {
          const tempArr = [...categoriesAndItems]
          const toUpdate = tempArr.find(ele => ele.id == res.id)
          toUpdate.categoryName = res.name
          toUpdate.imageURL = res.imageURL

          if (!saveAndAddMore) {
            setSaveAndAddMore(false)
          }
          setCategoryImage('')
          setName('')
        }
      )
    )
  }

  const setEditItem = (event, item) => {
    event.preventDefault()
    setItem(item?.item)
    setPrice(item?.price)
    setDescription(item?.description)
    setLabels(item?.labels)
    setTabs(item?.tabs)
    setPreviewImages(item?.images)
    setRecommendations(item?.recommendations)
    setMarkAsSold(item?.markAsSold)
    setTopping(item?.topping)
    setVariationName(item?.variationName)
    setMandatoryOption(item?.mandatoryOption)
    setPriceOptions(item?.priceOptions)
    setCostOfGoods(item?.costOfGoods)
    setTotalPrice(item?.totalPrice)
    setSelectedOption('Items')
    setCustomOffcanvas(true)
    setToEdit(item)
  }

  const updateItemHandle = event => {
    event.preventDefault()

    let obj = {
      restaurantID: user.restaurantID,
      menuID,
      categoriesID: toEdit?.categoriesID || '',
      item: item,
      description: description,
      price: price,
      images: images || [],
      labels: labels,
      tabs: tabs,
      recommendations: recommendations,
      markAsSold: markAsSold,
      topping: topping,
      variationName: variationName,
      mandatoryOption: mandatoryOption,
      priceOptions: priceOptions,
      costOfGoods: costOfGoods,
      totalPrice: totalPrice
    }

    dispatch(
      editMenu(
        toEdit?.id,
        obj,
        res => {
          const tempArr = [...categoriesAndItems]
          if (res.categoriesID) {
            const categoryIndex = tempArr.findIndex(
              ele => res.categoriesID === ele.id
            )

            if (categoryIndex !== -1) {
              const category = tempArr[categoryIndex]

              // Find the item index within the items array based on matching id
              const itemIndex = category.items.findIndex(
                item => res.id === item.id
              )

              if (itemIndex !== -1) {
                // Replace the item with res
                category.items[itemIndex] = res
              }
            }
          } else {
            const respectedIndex = tempArr.findIndex(ele => ele.id == res.id)
            tempArr.splice(respectedIndex, 1, res)
          }
          if (!saveAndAddMore) {
            setCustomOffcanvas(false)
          }
          setCategoriesAndItems(tempArr)
          clearData()

          setCategory('')
          setToEdit('')
        },
        imagesToRemove
      )
    )
  }
  useEffect(() => {
    if (editMenuData.length == 0) {
      dispatch(
        getParentMenu(menuID, res => {
          setCategoriesAndItems(res || [])
        })
      )
    }
    setCategoriesAndItems(editMenuData || [])
  }, [editMenuData])

  const [isDragging, setIsDragging] = useState(false)

  const handleDragStart = event => {
    setIsDragging(true)
    // Set the data being dragged (e.g., an ID or object)
    event.dataTransfer.setData('text/plain', 'dragged-item')
  }

  const handleDragEnd = () => {
    setIsDragging(false)
  }

  const onDeleteIconClick = async (event, item) => {
    event.preventDefault()

    if (item.type === 'category') {
      dispatch(deleteCategory(item?.id, item.menuID, item?.imageURL))
    } else {
      dispatch(deleteMenu(item?.id, item.menuID, item?.images))
    }
  }

  const [flag, setFlag] = useState(false)
  const [categories, setCategories] = useState([])

  useEffect(() => {
    editMenuData.sort((a, b) => a.order - b.order)
    editMenuData.map(data => data.items.sort((a, b) => a.order - b.order))
    setCategories(editMenuData)
    dispatch({
      type: 'CATEGORY_EDIT_LOADER',
      payload: false
    })
  }, [editMenuData])

  useEffect(() => {
    if (flag && categories) {
      const id = categories[0].menuID
      dispatch(rearrangeOrder(categories, id, 'category'))
      setFlag(false)
    }
  }, [categories])

  const onDragEnd = result => {
    if (!result.destination) {
      return
    }

    console.log('result', result)

    setFlag(true)
    const items = reorder(
      categories,
      result.source.index,
      result.destination.index
    )
    console.log('items', items)
    setCategories(items)
  }

  const [itemFlag, setItemFlag] = useState(false)
  const [menuItems, setMenuItems] = useState([])
  const [categoryIndex, setCategoryIndex] = useState('')

  useEffect(() => {
    if (itemFlag && menuItems) {
      // const id = menuItems[0].categoriesID
      dispatch(rearrangeOrder(menuItems, categoryIndex, 'menuItem'))
      setFlag(false)
    }
  }, [menuItems])

  const onItemDragEnd = result => {
    setCategoryIndex(result.source.droppableId)
    const menus = categories.filter(data => {
      return data.id === result.source.droppableId
    })

    if (!result.destination) {
      return
    }

    setItemFlag(true)
    const items = reorder(
      menus[0].items,
      result.source.index,
      result.destination.index
    )

    setMenuItems(items)
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  return (
    <ThemeProvider theme={ThemeMain}>
      <Container className='mt-5 pt-5 vh-100'>
        <Row>
          <Col className='shadow-sm bg-white pt-3 mx-3'>
            <div className='d-flex justify-content-between align-items-center mb-3'>
              <i
                className='fas fa-2x fa-angle-left cursor-pointer'
                onClick={() => {
                  history.push('/admin/new-menu')
                }}
              ></i>
              <Typography fontWeight={'bold'} fontSize={'23px'}>
                {toEdit ? editTitle : parentMenuName}
              </Typography>
              <Stack direction='row' spacing={1} alignItems='center'>
                <Typography>Move</Typography>
                <AntSwitch
                  checked={itemFilter}
                  onChange={e => setItemFilter(e.target.checked)}
                  inputProps={{ 'aria-label': 'ant design' }}
                />
                <Typography>Sort by Profit</Typography>
              </Stack>
            </div>
          </Col>
        </Row>
        {editLabelLoader ? (
          <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
            <LinearProgress />
          </div>
        ) : (
          <Row className='row-height mt-2'>
            {!customOffcanvas && (
              <Col md={3} className=''>
                <div className='h-100 w-100 p-3 shadow rounded bg-white'>
                  <div className='d-flex justify-content-between align-items-center '>
                    <h3>Categories</h3>
                    <i
                      className='fas fa-plus cursor-pointer'
                      onClick={() => {
                        setSelectedOption('Categories')
                        setCustomOffcanvas(true)
                      }}
                    ></i>
                  </div>
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId='droppable'>
                      {(provided, snapshot) => (
                        <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                        >
                          {categories.map((ele, index) => (
                            <Draggable
                              key={ele.id}
                              draggableId={ele.id}
                              index={index}
                            >
                              {(provided, snapshot) => (
                                <div
                                  // className='droppable'
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  <div
                                    key={ele.id}
                                    className='d-flex align-items-center'
                                  >
                                    {' '}
                                    <i className='fas fa-ellipsis-v'></i>
                                    <i className='fas fa-ellipsis-v'></i>
                                    <h2 key={index} className='ml-3  mt-2'>
                                      <div
                                        draggable
                                        onDragStart={handleDragStart}
                                        onDragEnd={handleDragEnd}
                                      >
                                        {ele?.categoryName}
                                      </div>
                                    </h2>
                                  </div>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                </div>
              </Col>
            )}

            <Col className=' pt-4'>
              {!categoriesAndItems && (
                <p className='text-center p-3 rounded border-danger'>
                  You don't have any category yet. Start adding one.
                </p>
              )}
              <div
                style={{ backgroundColor: '#cfebff' }}
                className='shadow d-flex align-items-center p-3 cursor-pointer shadow-sm rounded'
                onClick={function noRefCheck () {
                  setSelectedOption('Categories')
                  setCategoryImage('')
                  setName('')
                  setToEdit('')
                  setCustomOffcanvas(true)
                }}
              >
                <i className='fas fa-plus cursor-pointer pb-1'></i>
                <h3 className='ml-2 mb-0'>Add Categories</h3>
              </div>
              {editCategoryLoader ? (
                <LinearProgress />
              ) : (
                categoriesAndItems?.map((ele, index) => {
                  const toggleDropdownItems = index => {
                    // create a new array that updates the items property of the clicked category
                    if (index != undefined) {
                      const updatedCategories = [...categoriesAndItems]
                      updatedCategories[index].openSubMenu =
                        !updatedCategories[index].openSubMenu
                      setCategoriesAndItems(updatedCategories)
                    }
                  }
                  return (
                    <>
                      <div
                        key={index}
                        className='mt-2 shadow cursor-pointer d-flex justify-content-between align-items-center p-3 shadow-sm bg-white rounded'
                        style={{ cursor: 'pointer' }}
                        onClick={event => {
                          event.stopPropagation()
                          toggleDropdownItems(index)
                        }}
                      >
                        <div className='d-flex align-items-center'>
                          <i className='fas fa-equals'></i>
                          {ele.imageURL ? (
                            <img
                              src={
                                ele.imageURL instanceof File
                                  ? URL.createObjectURL(ele.imageURL)
                                  : ele.imageURL
                              }
                              height={50}
                              width={50}
                              className='ml-4 rounded'
                            />
                          ) : (
                            <></>
                          )}
                          <h2 className='ml-3 mb-0'>
                            {ele?.categoryName?.toUpperCase()}
                          </h2>
                        </div>
                        <div>
                          <IconButton
                            color='black'
                            onClick={event => {
                              setEditCategory(event, ele)
                            }}
                          >
                            <EditOutlinedIcon />
                          </IconButton>
                          <IconButton
                            color='black'
                            onClick={event => onDeleteIconClick(event, ele)}
                          >
                            <DeleteOutlineOutlinedIcon />
                          </IconButton>
                          <i
                            className={`fas fa-chevron-up ml-3 mr-3 cursor-pointer ${
                              ele.openSubMenu ? 'rotate' : 'rotate-back'
                            }`}
                            onClick={event => {
                              event.stopPropagation()
                              toggleDropdownItems(index)
                            }}
                          ></i>
                        </div>
                      </div>
                      {ele.openSubMenu && (
                        <Col className='pl-4'>
                          {!itemFilter ? (
                            <DragDropContext onDragEnd={onItemDragEnd}>
                              <Droppable droppableId={ele.id}>
                                {(provided, snapshot) => (
                                  <div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                  >
                                    {ele.items.map((ele, index) => (
                                      <Draggable
                                        key={ele.id}
                                        draggableId={ele.id}
                                        index={index}
                                      >
                                        {(provided, snapshot) => (
                                          <div
                                            ref={provided.innerRef}
                                            {...provided.draggableProps}
                                            {...provided.dragHandleProps}
                                          >
                                            <div
                                              key={index}
                                              className='mt-2 shadow cursor-pointer d-flex justify-content-between align-items-center p-3 shadow-sm bg-white rounded '
                                            >
                                              <div className='d-flex align-items-center'>
                                                <div className='d-flex align-items-center h-100'>
                                                  {' '}
                                                  <i className='fas fa-1x fa-ellipsis-v'></i>
                                                  <i className='fas fa-1x fa-ellipsis-v'></i>
                                                </div>
                                                {ele?.images.length > 0 ? (
                                                  <img
                                                    src={
                                                      ele?.images[0] instanceof
                                                      File
                                                        ? URL.createObjectURL(
                                                            ele?.images[0]
                                                          )
                                                        : ele?.images[0]
                                                    }
                                                    height={50}
                                                    width={50}
                                                    className='ml-4 rounded'
                                                  />
                                                ) : (
                                                  <></>
                                                )}
                                                <h2 className='ml-3 mb-0'>
                                                  {ele.item?.toUpperCase()}
                                                </h2>
                                              </div>

                                              <div className='d-flex align-items-center'>
                                                <div className='bg-white text-dark'></div>
                                                {'Price : '}
                                                {ele?.price === undefined
                                                  ? 0
                                                  : ele?.price + '$'}
                                                {'    '}
                                                {'Calorie : '}
                                                {ele?.calories === undefined ||
                                                ele?.calories === null
                                                  ? 0
                                                  : ele?.calories}
                                                <IconButton
                                                  style={{
                                                    marginLeft: '15px'
                                                  }}
                                                  color='black'
                                                  onClick={event => {
                                                    setEditItem(event, ele)
                                                  }}
                                                >
                                                  <EditOutlinedIcon />
                                                </IconButton>
                                                <IconButton
                                                  color='black'
                                                  onClick={event => {
                                                    onDeleteIconClick(
                                                      event,
                                                      ele
                                                    )
                                                  }}
                                                >
                                                  <DeleteOutlineOutlinedIcon />
                                                </IconButton>
                                              </div>
                                            </div>
                                          </div>
                                        )}
                                      </Draggable>
                                    ))}
                                    {provided.placeholder}
                                  </div>
                                )}
                              </Droppable>
                            </DragDropContext>
                          ) : (
                            <>
                              {ele.items
                                .sort((a, b) => b.price - a.price)
                                .map((ele, index) => (
                                  <div
                                    key={index}
                                    className='mt-2 shadow cursor-pointer d-flex justify-content-between align-items-center p-3 shadow-sm bg-white rounded '
                                  >
                                    <div className='d-flex align-items-center'>
                                      {ele?.images.length > 0 ? (
                                        <img
                                          src={
                                            ele?.images[0] instanceof File
                                              ? URL.createObjectURL(
                                                  ele?.images[0]
                                                )
                                              : ele?.images[0]
                                          }
                                          height={50}
                                          width={50}
                                          className='ml-4 rounded'
                                        />
                                      ) : (
                                        <></>
                                      )}
                                      <h2 className='ml-3 mb-0'>
                                        {ele.item?.toUpperCase()}
                                      </h2>
                                    </div>

                                    <div className='d-flex align-items-center'>
                                      <div className='bg-white text-dark'></div>
                                      {'Price : '}
                                      {ele?.price === undefined
                                        ? 0
                                        : ele?.price + '$'}
                                      {'    '}
                                      {'Calorie : '}
                                      {ele?.calories === undefined ||
                                      ele?.calories === null
                                        ? 0
                                        : ele?.calories}
                                      <IconButton
                                        style={{
                                          marginLeft: '15px'
                                        }}
                                        color='black'
                                        onClick={event => {
                                          setEditItem(event, ele)
                                        }}
                                      >
                                        <EditOutlinedIcon />
                                      </IconButton>
                                      <IconButton
                                        color='black'
                                        onClick={event => {
                                          onDeleteIconClick(event, ele)
                                        }}
                                      >
                                        <DeleteOutlineOutlinedIcon />
                                      </IconButton>
                                    </div>
                                  </div>
                                ))}
                            </>
                          )}
                          <div
                            style={{ backgroundColor: '#cfebff' }}
                            className='d-flex align-items-center p-3 mt-2 rounded w-100 mb-2 shadow shadow-sm cursor-pointer  float-right'
                            onClick={() => {
                              setSelectedOption('Items')
                              // setItemofCategory(ele.categoryName);
                              clearData()
                              setToEdit('')
                              setCustomOffcanvas(true)
                              setCategory(ele)
                              setMenuItemCount(ele.items.length)
                            }}
                          >
                            <i className='fas fa-plus cursor-pointer pb-1'></i>
                            <h3 className='ml-2 mb-0 '>
                              {/* {toEdit ? 'Edit Item' : 'Add Item'} */}
                              Add Item
                            </h3>
                          </div>
                        </Col>
                      )}
                    </>
                  )
                })
              )}
            </Col>

            {customOffcanvas &&
              (selectedOption === 'Categories' ? (
                //Add Categories
                <Col md={6}>
                  <div className='w-100 h-100 bg-white shadow-sm d-flex flex-column justify-content-evenly  side-offcanvas'>
                    {/* Header */}
                    <div className='w-100 d-flex align-items-center py-4 px-4 border-bottom border-top'>
                      {' '}
                      <i
                        className='fas fa-close fa-2x cursor-pointer'
                        onClick={() => {
                          setCategoryImage('')
                          setName('')
                          setToEdit('')
                          setSaveAndAddMore(false)
                          setCustomOffcanvas(false)
                        }}
                      ></i>
                      <Typography fontWeight={'bold'} fontSize={'22px'}>
                        {toEdit ? 'Edit Category' : 'Add New Category'}
                      </Typography>
                    </div>
                    {/* body */}
                    <div>
                      <div className='px-3 py-2 mb-5'>
                        <Typography
                          fontSize={'20px'}
                          marginTop={'20px'}
                          for='name'
                        >
                          <strong>*</strong>Name
                        </Typography>
                        <TextField
                          fullWidth
                          id='name'
                          name='name'
                          placeholder='Pasta'
                          type='text'
                          required
                          value={name}
                          onChange={e => {
                            setName(e.target.value)
                          }}
                        />
                      </div>
                      <div className='d-flex justify-content-between align-items-center py-2  px-3 border-bottom border-top'>
                        {' '}
                        <FormGroup check>
                          <Checkbox
                            checked={saveAndAddMore}
                            onChange={() => {
                              setSaveAndAddMore(!saveAndAddMore)
                            }}
                          />
                          <Label check>Save and add more</Label>
                        </FormGroup>
                        <Button
                          variant='contained'
                          disabled={categoryLoader}
                          onClick={event => {
                            toEdit
                              ? updateCategoryHandle(event)
                              : addCategoryHandle(event)
                          }}
                        >
                          {categoryLoader ? <LinearProgress /> : ''}
                          {toEdit ? 'Update' : 'Submit'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ) : (
                <Col md={6}>
                  <div className='w-100 h-100 bg-white shadow-sm d-flex flex-column justify-content-evenly '>
                    <div className='d-flex align-items-center py-4 px-4 border-bottom border-top'>
                      {' '}
                      <i
                        className='fas fa-close fa-2x cursor-pointer'
                        onClick={() => {
                          setCustomOffcanvas(false)
                          setToEdit('')
                        }}
                      ></i>
                      <Typography fontSize={'22px'} fontWeight={'bold'}>
                        {toEdit ? 'Edit Items' : 'Add Items'}
                      </Typography>
                    </div>
                    <Box sx={{ width: '100%', typography: 'body1' }}>
                      <TabContext value={selectedTab}>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                          <TabList
                            onChange={handleSelectedTab}
                            aria-label='lab API tabs example'
                          >
                            <Tab
                              label='General Information'
                              value='General Information'
                            />
                            <Tab label='Price Options' value='Price Options' />
                            <Tab label='COGS' value='COGS' />
                          </TabList>
                        </Box>
                        <TabPanel value='General Information'>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <FormControl fullWidth variant='outlined'>
                                <FormHelperText
                                  style={{ fontSize: '15px' }}
                                  id='outlined-weight-helper-text'
                                >
                                  Name
                                </FormHelperText>
                                <OutlinedInput
                                  fullWidth
                                  id='outlined-adornment-weight'
                                  aria-describedby='outlined-weight-helper-text'
                                  inputProps={{
                                    'aria-label': 'weight'
                                  }}
                                  value={item}
                                  onChange={e => setItem(e.target.value)}
                                />
                              </FormControl>
                              <FormControl fullWidth variant='outlined'>
                                <FormHelperText
                                  style={{ fontSize: '15px' }}
                                  id='outlined-weight-helper-text'
                                >
                                  Description
                                </FormHelperText>
                                <OutlinedInput
                                  multiline
                                  rows={10}
                                  fullWidth
                                  id='outlined-adornment-weight'
                                  aria-describedby='outlined-weight-helper-text'
                                  inputProps={{
                                    'aria-label': 'weight'
                                  }}
                                  value={description}
                                  onChange={e => setDescription(e.target.value)}
                                />
                              </FormControl>
                              <FormControl fullWidth variant='outlined'>
                                <FormHelperText
                                  style={{ fontSize: '15px' }}
                                  id='outlined-weight-helper-text'
                                >
                                  Price
                                </FormHelperText>
                                <OutlinedInput
                                  fullWidth
                                  id='outlined-adornment-weight'
                                  aria-describedby='outlined-weight-helper-text'
                                  endAdornment={
                                    <InputAdornment position='end'>
                                      $
                                    </InputAdornment>
                                  }
                                  inputProps={{
                                    'aria-label': 'weight'
                                  }}
                                  value={price}
                                  type='number'
                                  onChange={e => setPrice(e.target.value)}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <Typography textAlign={'left'} marginLeft={1}>
                                Images({previewImages.length}/5)
                              </Typography>
                              <Row className='overflow-auto'>
                                {previewImages?.map((url, index) => (
                                  <Col xs={4} className='mt-2 mb-2'>
                                    <Card
                                      key={index}
                                      style={{ height: '140px' }}
                                      sx={{
                                        border: 'dashed',
                                        borderWidth: '1px',
                                        borderColor: '#0074D9',
                                        boxShadow: 'none'
                                      }}
                                    >
                                      <CardActionArea
                                        disableRipple
                                        sx={{ height: '100%' }}
                                      >
                                        <FiCardMedia
                                          media='picture'
                                          alt='Background'
                                          image={url}
                                          sx={{ height: '100%' }}
                                        />
                                        <FiCardContent>
                                          <Box
                                            display={'flex'}
                                            justifyContent={'flex-start'}
                                          >
                                            <IconButton
                                              sx={{ color: 'white' }}
                                              onClick={() => {
                                                setImagesToRemove(
                                                  prevImagesToRemove => [
                                                    ...prevImagesToRemove,
                                                    url
                                                  ]
                                                )
                                                setPreviewImages(
                                                  prevPreviewImages =>
                                                    prevPreviewImages.filter(
                                                      image => image !== url
                                                    )
                                                )
                                              }}
                                            >
                                              <RemoveCircleOutlineOutlinedIcon color='white' />
                                            </IconButton>
                                          </Box>
                                        </FiCardContent>
                                      </CardActionArea>
                                    </Card>
                                  </Col>
                                ))}
                                <Col xs={4} className='mt-2 mb-2'>
                                  {previewImages.length < 5 ? (
                                    <Card
                                      style={{ height: '140px' }}
                                      sx={{
                                        border: 'dashed',
                                        borderWidth: '1px',
                                        borderColor: '#0074D9',
                                        boxShadow: 'none',
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        flexDirection: 'column'
                                      }}
                                    >
                                      <CardContent sx={{ padding: '2px' }}>
                                        <FileUploadOutlinedIcon
                                          sx={{ width: '40px', height: '40px' }}
                                        />
                                      </CardContent>
                                      <CardActions>
                                        <input
                                          type='file'
                                          multiple
                                          name='item'
                                          id='file-images'
                                          placeholder='Images'
                                          className='file-input__input'
                                          accept='.jpg,.jpeg,.png'
                                          onChange={imagesHandleChange}
                                        />
                                        <Label
                                          style={{
                                            width: '100%'
                                          }}
                                          for='file-images'
                                          className={`d-flex flex-column file-input__label`}
                                        >
                                          <span className='d-flex flex-column text-center'>
                                            Upload
                                          </span>
                                        </Label>
                                      </CardActions>
                                    </Card>
                                  ) : (
                                    ''
                                  )}
                                </Col>
                              </Row>
                            </Grid>
                            <Grid item xs={12}>
                              <MultipleSelectForm
                                title={'Labels'}
                                items={allLabels}
                                selectedItems={labels}
                                handleSelected={setLabels}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <MultipleSelectForm
                                title={'Tags'}
                                items={allTabs}
                                selectedItems={tabs}
                                handleSelected={setTabs}
                              />
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth variant='outlined'>
                                <FormHelperText
                                  style={{ fontSize: '15px' }}
                                  id='outlined-weight-helper-text'
                                >
                                  Recommended Items
                                </FormHelperText>
                                <OutlinedInput
                                  fullWidth
                                  id='outlined-adornment-weight'
                                  aria-describedby='outlined-weight-helper-text'
                                  inputProps={{
                                    'aria-label': 'weight'
                                  }}
                                  value={recommendations}
                                  onChange={e =>
                                    setRecommendations(e.target.value)
                                  }
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12} marginBottom={9}>
                              <Box
                                display={'flex'}
                                justifyContent={'space-between'}
                                alignItems={'center'}
                              >
                                <Typography marginLeft={2}>
                                  Mark as Sold out
                                </Typography>
                                <Switch
                                  checked={markAsSold}
                                  onChange={e =>
                                    setMarkAsSold(e.target.checked)
                                  }
                                  defaultChecked
                                />
                              </Box>
                            </Grid>
                          </Grid>
                        </TabPanel>
                        <TabPanel value='Price Options'>
                          <Grid container spacing={2}>
                            <Grid item xs={12}>
                              <FormControl
                                sx={{ marginTop: 3 }}
                                fullWidth
                                variant='standard'
                              >
                                <Input
                                  id='standard-adornment-weight'
                                  endAdornment={
                                    <InputAdornment position='end'>
                                      <AddOutlinedIcon />
                                    </InputAdornment>
                                  }
                                  aria-describedby='standard-weight-helper-text'
                                  value={topping}
                                  onChange={e => setTopping(e.target.value)}
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                              <FormControl fullWidth variant='outlined'>
                                <FormHelperText
                                  style={{ fontSize: '15px' }}
                                  id='outlined-weight-helper-text'
                                >
                                  Variation Name
                                </FormHelperText>
                                <OutlinedInput
                                  fullWidth
                                  id='outlined-adornment-weight'
                                  aria-describedby='outlined-weight-helper-text'
                                  inputProps={{
                                    'aria-label': 'weight'
                                  }}
                                  value={variationName}
                                  onChange={e =>
                                    setVariationName(e.target.value)
                                  }
                                />
                              </FormControl>
                            </Grid>
                            <Grid item xs={7}>
                              <FormControl fullWidth variant='outlined'>
                                <FormHelperText
                                  style={{ fontSize: '15px' }}
                                  id='outlined-weight-helper-text'
                                >
                                  Mandatory Options
                                </FormHelperText>
                                <OutlinedInput
                                  fullWidth
                                  id='outlined-adornment-weight'
                                  aria-describedby='outlined-weight-helper-text'
                                  inputProps={{
                                    'aria-label': 'weight'
                                  }}
                                  type='number'
                                  value={mandatoryOption}
                                  onChange={e =>
                                    setMandatoryOption(e.target.value)
                                  }
                                />
                              </FormControl>
                            </Grid>
                            {priceOptions?.map((option, index) => (
                              <Grid item xs={12}>
                                <Grid item xs={12}>
                                  <Typography textAlign={'left'} marginLeft={1}>
                                    Option {index}
                                  </Typography>
                                </Grid>
                                <Grid
                                  container
                                  spacing={1}
                                  alignItems={'center'}
                                >
                                  <Grid item xs={7}>
                                    <TextField
                                      disabled
                                      value={option.name}
                                      fullWidth
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <OutlinedInput
                                      endAdornment={
                                        <InputAdornment position='end'>
                                          $
                                        </InputAdornment>
                                      }
                                      fullWidth
                                      disabled
                                      type='number'
                                      value={option.price}
                                    />
                                  </Grid>
                                  <Grid item xs={2}>
                                    <IconButton
                                      onClick={() => {
                                        const filtered = priceOptions.filter(
                                          (item, i) => i !== index
                                        )
                                        setPriceOptions(filtered)
                                      }}
                                    >
                                      <RemoveCircleOutlineOutlinedIcon color='error' />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))}
                            <Grid item xs={12}>
                              <Grid item xs={12}>
                                <Typography textAlign={'left'} marginLeft={1}>
                                  Option {priceOptions.length + 1}
                                </Typography>
                              </Grid>
                              <Grid container spacing={1} alignItems={'center'}>
                                <Grid item xs={7}>
                                  <TextField
                                    fullWidth
                                    value={optionName}
                                    onChange={e =>
                                      setOptionName(e.target.value)
                                    }
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <OutlinedInput
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        $
                                      </InputAdornment>
                                    }
                                    fullWidth
                                    type='number'
                                    value={optionPrice}
                                    onChange={e =>
                                      setOptionPrice(e.target.value)
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                fullWidth
                                disabled={!optionName || !optionPrice}
                                variant='contained'
                                onClick={() => {
                                  setPriceOptions([
                                    ...priceOptions,
                                    { name: optionName, price: optionPrice }
                                  ])
                                  setOptionName('')
                                  setOptionPrice('')
                                }}
                              >
                                <AddOutlinedIcon />
                                Add
                              </Button>
                            </Grid>
                          </Grid>
                        </TabPanel>
                        <TabPanel value='COGS'>
                          <Grid container spacing={2}>
                            {costOfGoods?.map((item, index) => (
                              <Grid item xs={12}>
                                <Grid item xs={12}>
                                  <Typography textAlign={'left'} marginLeft={1}>
                                    Item
                                  </Typography>
                                </Grid>
                                <Grid
                                  container
                                  spacing={1}
                                  alignItems={'center'}
                                >
                                  <Grid item xs={7}>
                                    <TextField
                                      disabled
                                      fullWidth
                                      value={item.name}
                                    />
                                  </Grid>
                                  <Grid item xs={3}>
                                    <OutlinedInput
                                      endAdornment={
                                        <InputAdornment position='end'>
                                          $
                                        </InputAdornment>
                                      }
                                      fullWidth
                                      disabled
                                      value={item.price}
                                    />
                                  </Grid>
                                  <Grid item xs={2}>
                                    <IconButton
                                      onClick={() => {
                                        const filtered = costOfGoods.filter(
                                          (item, i) => i !== index
                                        )
                                        setCostOfGoods(filtered)
                                        setTotalPrice(
                                          Number(totalPrice) -
                                            Number(item.price)
                                        )
                                      }}
                                    >
                                      <RemoveCircleOutlineOutlinedIcon color='error' />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </Grid>
                            ))}

                            <Grid item xs={12}>
                              <Grid item xs={12}>
                                <Typography textAlign={'left'} marginLeft={1}>
                                  New Item
                                </Typography>
                              </Grid>
                              <Grid container spacing={1} alignItems={'center'}>
                                <Grid item xs={7}>
                                  <TextField
                                    fullWidth
                                    value={itemName}
                                    onChange={e => setItemName(e.target.value)}
                                  />
                                </Grid>
                                <Grid item xs={3}>
                                  <OutlinedInput
                                    endAdornment={
                                      <InputAdornment position='end'>
                                        $
                                      </InputAdornment>
                                    }
                                    fullWidth
                                    type='number'
                                    value={itemPrice}
                                    onChange={e => setItemPrice(e.target.value)}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={4}>
                              <Button
                                fullWidth
                                variant='contained'
                                disabled={!itemName || !itemPrice}
                                onClick={() => {
                                  handleCostOfGoods()
                                  setItemName('')
                                  setItemPrice('')
                                }}
                              >
                                <AddOutlinedIcon />
                                Add
                              </Button>
                            </Grid>
                            <Grid marginTop={9} item xs={12} display={'flex'}>
                              <Typography
                                fontSize={18}
                                fontWeight={'bold'}
                                textAlign={'left'}
                              >
                                {`${'Total Price : ' + getTotalPrice() + '$'}`}
                              </Typography>
                            </Grid>
                            <Grid
                              display={'flex'}
                              justifyContent={'space-around'}
                              alignItems={'center'}
                              item
                              xs={12}
                              marginTop={2}
                            >
                              <Button
                                sx={{ width: '150px' }}
                                variant='outlined'
                              >
                                Cancel
                              </Button>
                              <Button
                                sx={{ width: '150px' }}
                                variant='contained'
                                disabled={!item || !price}
                                onClick={
                                  toEdit ? updateItemHandle : addItemhandle
                                }
                              >
                                {addMenuLoader ? <LinearProgress /> : ''}{' '}
                                {toEdit ? 'Update' : 'Save'}
                              </Button>
                            </Grid>
                          </Grid>
                        </TabPanel>
                      </TabContext>
                    </Box>
                  </div>
                </Col>
              ))}
          </Row>
        )}
      </Container>
    </ThemeProvider>
  )
}
export default EditScratchMenu
