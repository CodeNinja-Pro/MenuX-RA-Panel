import React, { useEffect, useRef, useState } from 'react'
import {
  Col,
  FormGroup,
  Label,
  Row,
  Table,
  Container,
  Spinner
} from 'reactstrap'

import deleteIcon from '../../assets/img/icons/delete.svg'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import EditOutlinedIcon from '@mui/icons-material/EditOutlined'

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
  getParentMenuName
} from '../../store/actions/MenuManagmentActions'

import {
  IconButton,
  Card,
  CardActions,
  CardMedia,
  Typography,
  ThemeProvider,
  TextField,
  Button,
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  CardContent,
  Box,
  Divider,
  ListItemText,
  InputLabel,
  StyledEngineProvider
} from '@mui/material'
import FileUploadOutlinedIcon from '@mui/icons-material/FileUploadOutlined'

import { useTheme } from '@mui/material/styles'

import { ThemeMain } from '../common/Theme'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const itemTags = [
  'Vegetarian',
  'Vegan',
  'Keto',
  'Kosher',
  'Halal',
  'Spicy',
  'Molluscs',
  'Customizable',
  'Organic',
  'GMO',
  'Dairy'
]

const EditScratchMenu = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { user, userPermissions } = useSelector(state => state.auth)

  const {
    labelsData,
    editLabelLoader,
    addMenuLoader,
    categoryLoader,
    editMenuData,
    editCategoryLoader,
    parentMenuName
  } = useSelector(state => state.menu)
  const pathParts = window.location.href.split('/')
  const menuID = pathParts[pathParts.length - 1]

  let labels = []
  useEffect(() => {
    dispatch(getLabels(user?.restaurantID))
    dispatch(getParentMenuName(menuID))
  }, [])

  useEffect(() => {
    labelsData.map(label => {
      labels.push(label.labelName)
    })
    console.log(labels)
  }, [labelsData])

  const [selectedOption, setSelectedOption] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [customOffcanvas, setCustomOffcanvas] = useState(false)
  const [categoryImage, setCategoryImage] = useState(null)
  const [name, setName] = useState('')
  const [categoriesAndItems, setCategoriesAndItems] = useState([])
  const [toEdit, setToEdit] = useState('')

  const [categoryImagesToRemove, setCategoryImageToRemove] = useState('')
  const [imagesToRemove, setImagesToRemove] = useState([])
  const [videosToRemove, setVideosToRemove] = useState([])
  const [saveAndAddMore, setSaveAndAddMore] = useState(false)
  // Field for new Value
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [labelGroup, setLabelGroup] = useState([])
  const [itemTag, setItemTag] = useState('')
  const [comments, setComments] = useState('')
  const [previewImages, setPreviewImages] = useState([])
  const [subItem, setSubItem] = useState('')
  const [subPrice, setSubPrice] = useState('')
  const [subCalories, setSubCalories] = useState('')
  const [Items, setItems] = useState([])
  const [calories, setCalories] = useState('')
  const [estimatedTime, setEstimatedTime] = useState('')
  const [recommendations, setRecommendations] = useState([])
  const [secondTableItems, setSecondTableItems] = useState([])

  const [category, setCategory] = useState('')
  const [selectedOptions, setSelectedOptions] = useState([])
  const [label, setLabel] = useState('')
  const [videos, setVideos] = useState([])
  const [images, setImages] = useState([])
  const [menuItemCount, setMenuItemCount] = useState(0)

  const [editTitle, setEditTitle] = useState('')

  const handleLabelChange = event => {
    const {
      target: { value }
    } = event
    setLabelGroup(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value
    )
  }

  const fileInput = useRef(null)
  // const imagesRef = useRef(null);
  // const fileVideosInputRef = useRef(null);

  const handleImageClick = () => {
    fileInput.current.click()
  }

  const handleFileChange = event => {
    setCategoryImageToRemove(categoryImage || '')
    setCategoryImage(event.target.files[0])
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
    setToEdit('')
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
  // const imagesHandleChange = (e) => {
  //   const files = e.target.files;
  //   const newImages = [...images, ...files];
  //   setImages(newImages);
  //   setPreviewImages(newImages.map((file) => URL.createObjectURL(file)));
  // };

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

  // const videosHandleChange = (e) => {
  //   const files = e.target.files;
  //   const validFormat = "video/mp4";
  //   const maxSize = 10 * 1024 * 1024; // 10MB
  //   const newVideos = [];
  //   const newPreviewVideos = [];

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const fileType = file.type;
  //     const fileSize = file.size;

  //     if (fileType !== validFormat) {
  //       toast.error(
  //         `Error: Invalid file format ${file?.name}. Please select an .mp4 video.`
  //       );
  //       // Perform your error handling or display a message to the user
  //       continue; // Skip further processing for non-mp4 files
  //     }

  //     if (fileSize > maxSize) {
  //       toast.error(
  //         `Error: File ${file?.name} exceeds the maximum allowed size of 10MB. Please select a smaller video.`
  //       );
  //       // Perform your error handling or display a message to the user
  //       continue; // Skip further processing for oversized files
  //     }

  //     newVideos.push(file);
  //     newPreviewVideos.push(URL.createObjectURL(file));
  //   }

  //   setVideos([...videos, ...newVideos]);
  //   setPreviewVideos([...previewVideos, ...newPreviewVideos]);
  // };

  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions)
  }
  // const productOptions = menuData.map((menu) => {
  //   return { value: `${menu.name}`, label: `${menu.name}` };
  // });

  const subItemsClick = e => {
    e.preventDefault()
    setItems([...Items, { subItem, subPrice, subCalories }])
    setSubItem('')
    setSubPrice('')
    setSubCalories('')
  }
  const addCategoryHandle = event => {
    event.preventDefault() // prevent the default form submission behavior

    dispatch(
      addCategory(
        {
          categoryName: name,
          imageURL: categoryImage,
          menuID,
          order: editMenuData.length,
          restaurantID: user.restaurantID
        },
        categoriesID => {
          const obj = {
            type: 'category',
            categoryName: name,
            imageURL: categoryImage,
            items: [],
            add: false,
            categoriesID
          }
          // setCategoriesAndItems(prevCategories => [...prevCategories, obj]) // add the new object to the existing array of categories
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
      order: menuItemCount,
      name: item,
      price: price,
      comments,
      calories,
      itemTag: itemTag,
      estimatedTime,
      sizes: Items,
      label: labelGroup || '',
      images: images || [],
      recommendations: recommendations,
      subItems: secondTableItems,
      restaurantID: user.restaurantID,
      menuID,
      categoriesID: category?.id || ''
    }

    // Dispatch addMenu action here...
    dispatch(
      addMenuNew(obj, res => {
        // Create a copy of the categoriesAndItems array
        const updatedCategoriesAndItems = [...categoriesAndItems]
        if (res.categoriesID) {
          // Find the matching category object using Array.find()
          console.log(category)
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
    setComments('')
    setImages('')
    setVideos('')
    setLabel('')
    setSelectedOptions([])
    setItems([])
    setCalories('')
    setEstimatedTime('')
    setCategory('')
    setPrice('')
    setSubPrice('')
    setPreviewImages([])
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
          // close the offcanvas
          setCategoryImage('')
          setName('')
        }
      )
    )
  }

  const setEditItem = (event, item) => {
    event.preventDefault()
    setItem(item?.name)
    setPrice(item?.price)
    setComments(item?.comments)
    setImages(item?.images)
    setPreviewImages(item?.images)
    setLabel(item?.label)
    setItems(item?.sizes)
    setItemTag(item?.itemTag)
    setLabelGroup(item?.labelGroup)
    setCalories(item?.calories)
    setEstimatedTime(item?.estimatedTime)
    setSecondTableItems(item?.subItems)
    setSelectedOption('Items')
    setCustomOffcanvas(true)
    setToEdit(item)
  }
  const updateItemHandle = event => {
    event.preventDefault()

    if (!Items) {
      toast.error('Add sub item', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      return
    }
    // if (!images || !previewImages) {
    //   toast.error("Add atleast one Images");
    //   return;
    // }
    // if (!videos || !previewVideos) {
    //   toast.error("Add atleast one video");
    //   return;
    // }

    let obj = {
      name: item,
      comments,
      price: price,
      // category,
      // inventory,
      calories,
      estimatedTime,
      sizes: Items || [],
      label: label || '',
      images: images || [],
      videos: videos || [],
      subItems: secondTableItems || [],
      restaurantID: user.restaurantID,
      menuID,
      categoriesID: toEdit?.categoriesID || ''
    }

    // Dispatch addMenu action here...
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
        imagesToRemove,
        videosToRemove
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

  const handleDragOver = event => {
    event.preventDefault()
  }

  const handleDrop = event => {
    event.preventDefault()
    // Access the data being dropped
    const droppedItem = event.dataTransfer.getData('text/plain')
    // Handle the dropped item
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
    // dropped outside the list
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

  // const setCurrentMenuItems = id => {
  //   const result = categories.filter(data => {
  //     return data.id === id
  //   })
  //   setMenuItems(result[0].items)
  //   // console.log('menuItems', result[0].items)
  // }

  useEffect(() => {
    if (itemFlag && menuItems) {
      // const id = menuItems[0].categoriesID
      dispatch(rearrangeOrder(menuItems, categoryIndex, 'menuItem'))
      setFlag(false)
    }
  }, [menuItems])

  const onItemDragEnd = result => {
    // setCurrentMenuItems(result.source.droppableId)
    // dropped outside the list
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

  // a little function to help us with reordering the result
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
              <span></span>
            </div>
          </Col>
        </Row>
        {editLabelLoader ? (
          <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
            <Spinner size={'lg'} className='text-primary'></Spinner>
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
                  {/* {addMenuLoader ? (
                    <div className='w-100 v-100 d-flex justify-content-center align-items-center py-5'>
                      <Spinner className='text-primary'></Spinner>
                    </div>
                  ) : ( */}
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
                  {/* )} */}
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
                <Spinner size={'lg'} className='text-primary'></Spinner>
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
                                              {/* <i className='fas fa-bars'></i> */}
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
                                                {ele.name?.toUpperCase()}
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
                                                style={{ marginLeft: '15px' }}
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
                                        </div>
                                      )}
                                    </Draggable>
                                  ))}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
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
                      {/* <div>
                        <div
                          className='d-flex align-items-center p-3 mt-2 bg-white rounded w-100 mb-2 cursor-pointer float-right'
                          onClick={() => {
                            setSelectedOption('Items')
                            // setItemofCategory(ele.categoryName);
                            clearData()
                            setToEdit('')
                            setCustomOffcanvas(true)
                            setCategory(ele)
                          }}
                        >
                          <i className='fas fa-plus cursor-pointer pb-1'></i>
                          <h3 className='ml-2 mb-0 '>
                            {toEdit ? 'Edit Item' : 'Add Item'}
                          </h3>
                        </div>
                      </div>
                      {ele.items?.map(item => {
                        return (
                          <div style={{ marginLeft: '30px' }}>
                            <div
                              key={index}
                              className='mt-2 shadow d-flex justify-content-between align-items-center p-3  shadow-sm rounded bg-white cursor-pointer '
                              onClick={event => {
                                setEditItem(event, item)
                              }}
                            >
                              <div className='d-flex align-items-center '>
                                <i className='fas fa-equals'></i>
                                <img
                                  src={
                                    item?.images.length > 0
                                      ? item?.images[0] instanceof File
                                        ? URL.createObjectURL(item?.images[0])
                                        : item?.images[0]
                                      : Logo
                                  }
                                  height={50}
                                  width={50}
                                  className='ml-4 rounded'
                                />
                                <h2 className='ml-3 mb-0'>
                                  {item?.categoryName?.toUpperCase()}
                                </h2>
                              </div>
    
                              <div className='d-flex bg-secondary rounded w-25 align-items-center border border-gray shadow-sm'>
                                <p className='mb-0 text-dark px-2'> $ </p>
                                <Input
                                  className='bg-white text-dark'
                                  disabled
                                  value={item?.sizes[0]?.price || 'NaN'}
                                ></Input>
                              </div>
                            </div>
                          </div>
                        )
                      })} */}
                    </>
                  )
                })
              )}
            </Col>

            {customOffcanvas &&
              (selectedOption == 'Categories' ? (
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
                          {categoryLoader ? (
                            <Spinner size={'sm'} className='mr-3'></Spinner>
                          ) : (
                            ''
                          )}
                          {toEdit ? 'Update' : 'Submit'}
                        </Button>
                      </div>
                    </div>
                  </div>
                </Col>
              ) : (
                // Add items
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
                    <div className='p-4 '>
                      <Box>
                        <Row>
                          <Col>
                            <FormControl fullWidth>
                              <Typography for='item-name' marginBottom={1}>
                                Item Name
                              </Typography>
                              <TextField
                                name='item'
                                id='item'
                                placeholder='Item Name'
                                value={item}
                                onChange={e => setItem(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormControl sx={{ marginTop: '20px' }} fullWidth>
                              <Typography marginBottom={1}>
                                Item Price
                              </Typography>
                              <TextField
                                type='number'
                                placeholder='Item Price'
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <StyledEngineProvider injectFirst>
                              <FormControl fullWidth sx={{ marginTop: '20px' }}>
                                <Typography marginBottom={1}>Labels</Typography>
                                <Select
                                  multiple
                                  value={labelGroup}
                                  onChange={handleLabelChange}
                                  input={<OutlinedInput />}
                                  renderValue={selected => selected.join(', ')}
                                  MenuProps={MenuProps}
                                >
                                  {labels.map(name => (
                                    <MenuItem key={name} value={name}>
                                      <Checkbox
                                        checked={labelGroup.indexOf(name) > -1}
                                      />
                                      <ListItemText primary={name} />
                                    </MenuItem>
                                  ))}
                                </Select>
                              </FormControl>
                            </StyledEngineProvider>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormControl fullWidth sx={{ marginTop: '20px' }}>
                              <Typography marginBottom={1}>
                                Item Tags
                              </Typography>
                              <Select
                                value={itemTag}
                                onChange={e => setItemTag(e.target.value)}
                              >
                                {itemTags.map((item, index) => (
                                  <MenuItem key={index} value={item}>
                                    {item}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FormControl
                              sx={{
                                marginTop: '20px',
                                marginBottom: '70px',
                                height: '100px'
                              }}
                              fullWidth
                            >
                              <Typography marginBottom={1}>
                                Description
                              </Typography>
                              <TextField
                                placeholder='Description'
                                value={comments}
                                multiline
                                rows={4}
                                onChange={e => setComments(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row className='overflow-auto'>
                          {previewImages?.map((url, index) => (
                            <Col md={3} className='mt-2 mb-2'>
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
                                <CardMedia
                                  component='img'
                                  height='80'
                                  image={url}
                                  alt=''
                                />
                                <CardActions>
                                  <i
                                    className='fas fa-trash-alt p-2  border w-100 d-flex justify-content-center  cursor-pointer shadow-sm '
                                    onClick={() => {
                                      setImagesToRemove(prevImagesToRemove => [
                                        ...prevImagesToRemove,
                                        url
                                      ])
                                      setPreviewImages(prevPreviewImages =>
                                        prevPreviewImages.filter(
                                          image => image !== url
                                        )
                                      )
                                    }}
                                  ></i>
                                </CardActions>
                              </Card>
                            </Col>
                          ))}
                          <Col md={6} className='mt-2 mb-2'>
                            <Card
                              style={{ height: '140px' }}
                              sx={{
                                border: 'dashed',
                                borderWidth: '1px',
                                borderColor: '#0074D9',
                                boxShadow: 'none'
                              }}
                            >
                              <CardContent sx={{ padding: '2px' }}>
                                <FileUploadOutlinedIcon />
                                <Typography>
                                  *.JPG, *.PNG, *.JPEG and less than 2MB
                                </Typography>
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
                                  style={{ width: '100%' }}
                                  for='file-images'
                                  className={`d-flex flex-column file-input__label ${
                                    previewImages && previewImages.length > 0
                                      ? 'd-none'
                                      : ''
                                  }`}
                                >
                                  <span className='d-flex flex-column text-center'>
                                    Upload
                                  </span>
                                </Label>
                              </CardActions>
                            </Card>
                          </Col>
                        </Row>
                        <Divider sx={{ marginTop: '20px' }} />
                        <Row>
                          <Col>
                            <Typography
                              marginTop={2}
                              fontWeight={'bold'}
                              fontSize={'18px'}
                            >
                              Sub Item Information
                            </Typography>
                          </Col>
                        </Row>
                        <Row className='mt-3'>
                          <Col>
                            <FormControl>
                              <Typography>Item Name</Typography>
                              <TextField
                                name='subItem'
                                placeholder='Item Name'
                                value={subItem}
                                onChange={e => setSubItem(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl>
                              <Typography>Item Price</Typography>
                              <TextField
                                type='number'
                                min={1}
                                name='subPrice'
                                placeholder='Price'
                                value={subPrice}
                                onChange={e => setSubPrice(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl>
                              <Typography>Calories</Typography>
                              <TextField
                                type='number'
                                min={1}
                                name='subCalories'
                                placeholder='Calories'
                                value={subCalories}
                                onChange={e => setSubCalories(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <Button
                              fullWidth
                              sx={{ marginTop: '10px', marginBottom: '10px' }}
                              variant='outlined'
                              disabled={!subItem || !subCalories || !subPrice}
                              onClick={e => subItemsClick(e)}
                            >
                              Add New Sub Item
                            </Button>
                          </Col>
                        </Row>
                        <Table
                          className='align-items-center table-flush sub__items-table'
                          responsive
                        >
                          <thead style={{ backgroundColor: '#cfebff' }}>
                            <tr>
                              <th scope='col'>Item</th>
                              <th scope='col'>Price</th>
                              <th scope='col'>Calories</th>
                              <th scope='col'>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {Items?.map((item, index) => {
                              return (
                                <tr key={index}>
                                  <td>{item.subItem}</td>
                                  <td>{item.subPrice}</td>
                                  <td>{item.subCalories}</td>
                                  <td className='table-actions'>
                                    <img
                                      src={deleteIcon}
                                      alt=''
                                      className='mx-2 cursor-pointer'
                                      onClick={() =>
                                        handleRemove('subItems', index)
                                      }
                                    />
                                    {/* <img
                                      src={edit}
                                      alt=''
                                      className='mx-2 cursor-pointer'
                                    /> */}
                                  </td>
                                </tr>
                              )
                            })}
                          </tbody>
                        </Table>
                        <Divider sx={{ marginBottom: '20px' }} />
                        <Row>
                          <Col>
                            {/* <FormControl fullWidth sx={{ marginTop: '20px' }}>
                              <Typography for='item-name' marginBottom={1}>
                                Recommendation Product
                              </Typography>
                              <Select
                                multiple
                                value={recommendations}
                                onChange={handleRecommendationChange}
                                input={<OutlinedInput />}
                                MenuProps={MenuProps}
                              >
                                {recommendations.map(
                                  (recommendation, index) => (
                                    <MenuItem
                                      key={index}
                                      value={recommendation}
                                      style={getRecommendationStyles(
                                        recommendation,
                                        recommendations,
                                        theme
                                      )}
                                    >
                                      {recommendation}
                                    </MenuItem>
                                  )
                                )}
                              </Select>
                            </FormControl> */}
                          </Col>
                        </Row>
                        <Row style={{ marginTop: '20px' }}>
                          <Col>
                            <FormControl>
                              <Typography for='item-name' marginBottom={1}>
                                EST (Min)
                              </Typography>
                              <TextField
                                fullWidth
                                type='number'
                                min={1}
                                placeholder='EST, Preparation Time'
                                value={estimatedTime}
                                onBlur={e => {
                                  if (Number(e.target.value) < 0) {
                                    setEstimatedTime('')
                                  }
                                }}
                                onChange={e => setEstimatedTime(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                          <Col>
                            <FormControl>
                              <Typography marginBottom={1}>Calories</Typography>
                              <TextField
                                type='Number'
                                min={1}
                                name='item'
                                placeholder='Calories'
                                value={calories}
                                onChange={e => setCalories(e.target.value)}
                              />
                            </FormControl>
                          </Col>
                        </Row>
                        <Row style={{ marginBottom: '20px' }}>
                          <Col className='d-flex justify-content-end'>
                            <Button
                              sx={{ marginTop: '20px' }}
                              fullWidth
                              variant='contained'
                              disabled={!item || !price}
                              onClick={
                                toEdit ? updateItemHandle : addItemhandle
                              }
                            >
                              {addMenuLoader ? (
                                <Spinner size={'sm'} className='mr-3'></Spinner>
                              ) : (
                                ''
                              )}{' '}
                              {toEdit ? 'Update' : 'Save'}
                            </Button>
                          </Col>
                        </Row>
                      </Box>
                    </div>
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
