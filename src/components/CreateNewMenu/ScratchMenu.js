import React, { useEffect, useRef, useState } from 'react'
import {
  Button,
  Col,
  Form,
  FormGroup,
  Input,
  Label,
  Row,
  CustomInput,
  Table
} from 'reactstrap'
import { toast } from 'react-toastify'
import edit from '../../assets/img/icons/edit.svg'
import deleteIcon from '../../assets/img/icons/delete.svg'
import hide from '../../assets/img/icons/hide.svg'
import fileupload from '../../assets/img/icons/fileupload.svg'

import { LinearProgress } from '@mui/material'

import Select from 'react-select'
import { useDispatch, useSelector } from 'react-redux'
import { addCategory } from '../../store/actions/MenuManagmentActions'
import { addMenu } from '../../store/actions/MenuManagmentActions'

import { getLabels } from '../../store/actions/MenuManagmentActions'

const ScratchMenu = ({ menuID }) => {
  const dispatch = useDispatch()
  const { restaurantMedia } = useSelector(state => state.restaurant)
  const { user, userPermissions } = useSelector(state => state.auth)
  const {
    categoriesData,
    labelsData,
    menuData,
    menuRestData,
    addMenuLoader,
    categoryLoader
  } = useSelector(state => state.menu)

  const menuPermissions = userPermissions?.menus

  const [selectedOption, setSelectedOption] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [customOffcanvas, setCustomOffcanvas] = useState(false)
  const [categoryimage, setCategoryImage] = useState(null)
  const [categoryName, setCategoryName] = useState('')
  const [categoriesAndItems, setCategoriesAndItems] = useState([])
  const [itemofCategory, setItemofCategory] = useState('')
  const [showCategory, setShowCategory] = useState(false)
  const [saveAndAddMore, setSaveAndAddMore] = useState(false)
  /////
  const [itemName, setItemName] = useState('')
  const [comments, setComments] = useState('')
  const [category, setCategory] = useState('')
  const [inventory, setInventory] = useState('')
  const [calories, setCalories] = useState('')
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
  const [label, setLabel] = useState('')
  const [videos, setVideos] = useState([])
  const [previewImages, setPreviewImages] = useState([])
  const [previewVideos, setPreviewVideos] = useState([])
  const [images, setImages] = useState([])
  /////
  const fileInput = useRef(null)

  const handleImageClick = () => {
    fileInput.current.click()
  }

  const handleFileChange = event => {
    const file = event.target.files[0]
    const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i

    if (!allowedExtensions.exec(file.name)) {
      toast.error(
        'Invalid file type. Please upload only JPG, JPEG or PNG images.',
        {
          style: {
            fontFamily: 'Poppins'
          }
        }
      )
      fileInput.current.value = ''
      return
    }

    setCategoryImage(event.target.files[0])
  }
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
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

  //   for (let i = 0; i < files.length; i++) {
  //     const file = files[i];
  //     const fileType = file.type;

  //     if (!fileType.startsWith('image/')) {
  //       toast.error('Error: File is not an image.');
  //       // Perform your error handling or display a message to the user
  //       return;
  //     }

  //   const newImages = [...images, ...file];
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

  const secondTable = e => {
    e.preventDefault()
    setSecondTableItems([
      ...secondTableItems,
      { selectedOptions, gender, ageFrom, ageTo }
    ])
    setSelectedOptions('')
    setGender('')
    setAgeFrom('')
    setAgeTo('')
  }
  const genderOptions = [
    { value: 'men', label: 'Men' },
    { value: 'women', label: 'Women' },
    { value: 'all', label: 'All' }
  ]
  const handleChange = selectedOptions => {
    setSelectedOptions(selectedOptions)
  }
  const productOptions = menuData.map(menu => {
    return { value: `${menu.name}`, label: `${menu.name}` }
  })
  const subItemsClick = e => {
    e.preventDefault()
    setItems([...Items, { subItem, price }])
    setSubItem('')
    setPrice('')
  }

  const addCategoryhandle = event => {
    event.preventDefault() // prevent the default form submission behavior
    console.log('Category')
    // if (!categoryimage) {
    //   toast.error('please upload Image...')
    //   return
    // }
    dispatch(
      addCategory(
        {
          categoryName,
          imageURL: categoryimage,
          menuID,
          restaurantID: user.restaurantID
        },
        categoriesID => {
          const obj = {
            type: 'category',
            categoryName,
            image: categoryimage,
            items: [],
            openSubMenu: false,
            addItems: false,
            categoriesID
          }
          setCategoriesAndItems(prevCategories => [...prevCategories, obj]) // add the new object to the existing array of categories
          // localStorage.setItem("categoriesAndItems", JSON.stringify([...categoriesAndItems,obj]));
          if (saveAndAddMore) {
            setCategoryImage('')
            setCategoryName('')
            setSaveAndAddMore(false)
          } else {
            setCustomOffcanvas(false) ///// // close the offcanvas
            setCategoryImage('')
            setCategoryName('')
            setSaveAndAddMore(false)
          }
        }
      )
    )
  }

  // useEffect(() => {
  //   const storedCategoriesAndItems = localStorage.getItem("categoriesAndItems");
  //   if (storedCategoriesAndItems) {
  //     setCategoriesAndItems(JSON.parse(storedCategoriesAndItems));
  //   }
  // }, []);
  const addItemhandle = event => {
    event.preventDefault()
    if (!Items) {
      toast.error('Add sub item', {
        style: {
          fontFamily: 'Poppins'
        }
      })
      return
    }
    // if (!images) {
    //   toast.error("Add atleast one Images");
    //   return;
    // }

    let obj = {
      name: itemName,
      comments,
      // category,
      inventory,
      calories,
      estimatedTime,
      sizes: Items,
      label,
      images: images || [],
      videos: videos || [],
      recommendedProducts: secondTableItems,
      restaurantID: user.restaurantID,
      menuID,
      categoriesID: category?.categoriesID || ''
    }

    console.log(images)

    // Dispatch addMenu action here...
    dispatch(
      addMenu(obj, () => {
        // Create a copy of the categoriesAndItems array
        const updatedCategoriesAndItems = [...categoriesAndItems]
        if (category) {
          // Find the matching category object using Array.find()
          const categoryObj = updatedCategoriesAndItems.find(
            ele => ele.categoriesID === category.categoriesID
          )
          categoryObj.items.push({
            type: 'item',
            itemName,
            image: images[0],
            sizes: Items
          })
        } else {
          // If itemofCategory is falsy, simply push the new menu item into the array
          updatedCategoriesAndItems.push({
            type: 'item',
            itemName,
            image: images[0],
            sizes: Items
          })
        }
        // Update the state with the new categoriesAndItems array
        setCategoriesAndItems(updatedCategoriesAndItems)
        // localStorage.setItem("categoriesAndItems", JSON.stringify(updatedCategoriesAndItems));
        // Clear the input data and close the offcanvas
        clearData()
        setCategory('')
        if (!saveAndAddMore) {
          setCustomOffcanvas(false)
        }
      })
    )
  }

  const clearData = () => {
    setItemName('')
    setComments('')
    setImages('')
    setVideos('')
    setLabel('')
    setAgeFrom('')
    setAgeTo('')
    setSelectedOptions([])
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
  useEffect(() => {
    dispatch(getLabels(user?.restaurantID))
  }, [])
  const toggleDropdownAddtems = index => {
    // create a new array that updates the items property of the clicked category
    if (index != undefined) {
      const updatedCategories = [...categoriesAndItems]
      updatedCategories[index].addItems = !updatedCategories[index].addItems
      setCategoriesAndItems(updatedCategories)
      // localStorage.setItem("categoriesAndItems", JSON.stringify(updatedCategories));
    }
  }

  console.log(categoriesAndItems, 'List')
  return (
    <Row className='row-height mt-2'>
      {!customOffcanvas && (
        <Col lg={3} className='overflow-hidden'>
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
            {/* {show categories on side } */}
            {categoriesAndItems
              ?.filter(ele => ele.type === 'category')
              .map((ele, index) => {
                return (
                  <div key={index} className='d-flex align-items-center'>
                    {' '}
                    <i className='fas fa-ellipsis-v'></i>
                    <i className='fas fa-ellipsis-v'></i>
                    <h2 key={index} className='ml-3  mt-2'>
                      {ele?.categoryName}
                    </h2>
                  </div>
                )
              })}
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
          className='d-flex align-items-center py-2 w-100  bg-white p-3 rounded  cursor-pointer'
          onClick={function noRefCheck () {
            setSelectedOption('Categories')
            setCustomOffcanvas(true)
          }}
        >
          <i className='fas fa-plus cursor-pointer pb-1'></i>
          <h3 className='ml-2 mb-0 '>Add Categories</h3>
        </div>
        {/* <Dropdown
          isOpen={dropdownOpen}
          toggle={toggleDropdown}
          className="w-100"
        >
          <DropdownToggle className="w-100 bg-white">
            <div className="d-flex align-items-center py-2 w-100">
              <i className="fas fa-plus cursor-pointer pb-1"></i>
              <h3 className="ml-2 mb-0 ">Add</h3>
            </div>
          </DropdownToggle>

          <DropdownMenu container="body" className="position-absolute">
            <DropdownItem
              onClick={function noRefCheck() {
                setSelectedOption("Categories");
                setCustomOffcanvas(true);
              }}
            >
              Categories
            </DropdownItem>
            <DropdownItem
              onClick={function noRefCheck() {
                setSelectedOption("Items");
                setCustomOffcanvas(true);
              }}
            >
              Items
            </DropdownItem>
          </DropdownMenu>
        </Dropdown> */}

        {categoriesAndItems?.map((ele, index) => {
          const toggleDropdownItems = index => {
            // create a new array that updates the items property of the clicked category

            if (categoriesAndItems[index]) {
              const updatedCategories = [...categoriesAndItems]
              updatedCategories[index].openSubMenu =
                !updatedCategories[index].openSubMenu
              setCategoriesAndItems(updatedCategories)
              // localStorage.setItem("categoriesAndItems", JSON.stringify(updatedCategories));
            }
          }
          if (ele.type === 'category') {
            return (
              <>
                <div
                  key={index}
                  className='mt-2 shadow d-flex justify-content-between align-items-center p-3  shadow-sm rounded bg-white cursor-pointer '
                  onClick={() => {
                    toggleDropdownItems(index)
                  }}
                >
                  <div className='d-flex align-items-center '>
                    {/* <i className="fas fa-bars"></i> */}
                    <i className='fas fa-equals'></i>
                    {ele.imageURL ? (
                      <img
                        // src={URL.createObjectURL(ele.image)}
                        height={50}
                        width={50}
                        className='ml-4 rounded'
                      />
                    ) : (
                      <></>
                    )}
                    <h2 className='ml-3 mb-0'>
                      {ele.categoryName.toUpperCase()}
                    </h2>
                  </div>
                  <i
                    className={`fas fa-chevron-up mr-3 cursor-pointer ${
                      ele.openSubMenu ? 'rotate' : 'rotate-back'
                    }`}
                    onClick={event => {
                      // event.stopPropagation();
                      // toggleDropdownItems();
                    }}
                  ></i>
                </div>
                {ele.openSubMenu && (
                  <Col>
                    {ele.items?.map((ele, index) => {
                      return (
                        <div
                          key={index}
                          className='mt-2 shadow d-flex justify-content-between align-items-center bg-danger p-3 w-100  float-right shadow-sm rounded bg-white cursor-pointer '
                        >
                          <div className='d-flex align-items-center '>
                            {/* <i className="fas fa-bars"></i> */}
                            <i className='fas fa-equals'></i>
                            {ele.image ? (
                              <img
                                src={
                                  ele.image
                                    ? URL.createObjectURL(ele.image)
                                    : ''
                                }
                                height={50}
                                width={50}
                                className='ml-4 rounded'
                              />
                            ) : (
                              <></>
                            )}
                            <h2 className='ml-3 mb-0'>
                              {ele.itemName.toUpperCase()}
                            </h2>
                          </div>
                          {/* <div className="d-flex bg-secondary rounded w-25  align-items-center border border-gray">
                            <p className="mb-0 text-dark px-2"> $ </p>
                            <Input
                              className="bg-white  w-100 py-0 text-dark"
                              disabled
                              value={ele?.sizes[0]?.price || "NaN"}
                            ></Input>
                          </div> */}
                        </div>
                      )
                    })}
                    <div
                      className='d-flex align-items-center p-3 mt-2 bg-white rounded w-100 mb-2 cursor-pointer float-right'
                      onClick={() => {
                        setSelectedOption('Items')
                        // setItemofCategory(ele.categoryName);
                        clearData()
                        // setToEdit("");
                        setCustomOffcanvas(true)
                        setCategory(ele)
                      }}
                    >
                      <i className='fas fa-plus cursor-pointer pb-1'></i>
                      <h3 className='ml-2 mb-0 '>Add Item</h3>
                    </div>
                    {/* <Dropdown
                      isOpen={ele.addItems}
                      toggle={() => {
                        toggleDropdownAddtems(index);
                      }}
                      className="my-2 w-100"
                    >
                      <DropdownToggle className="w-75 bg-white  float-right">
                        <div className="d-flex align-items-center py-2 w-100">
                          <i className="fas fa-plus cursor-pointer pb-1"></i>
                          <h3 className="ml-2 mb-0 ">Add</h3>
                        </div>
                      </DropdownToggle>
                     
                      <DropdownMenu container="body" className=" ml-5">
                        <DropdownItem
                          onClick={() => {
                            setSelectedOption("Items");
                            // setItemofCategory(ele.categoryName);
                            setCustomOffcanvas(true);
                            setCategory(ele);
                          }}
                        >
                          Items
                        </DropdownItem>
                      </DropdownMenu>
                    </Dropdown> */}
                  </Col>
                )}
              </>
            )
          } else {
            return (
              <div
                key={index}
                className='mt-2 shadow d-flex justify-content-between align-items-center p-3  shadow-sm rounded bg-white cursor-pointer '
              >
                <div className='d-flex align-items-center '>
                  {/* <i className="fas fa-bars"></i> */}
                  <i className='fas fa-equals'></i>
                  <img
                    src={ele.image ? URL.createObjectURL(ele.image) : ''}
                    height={50}
                    width={50}
                    className='ml-4 rounded'
                  />
                  <h2 className='ml-3 mb-0'>{ele?.itemName.toUpperCase()}</h2>
                </div>
                <div className='d-flex bg-secondary rounded align-items-center border border-gray'>
                  <p className='mb-0 text-dark px-2 '> $ </p>
                  <Input value={ele?.price} className='border-white '></Input>
                </div>
              </div>
            )
          }
        })}
      </Col>
      {customOffcanvas &&
        (selectedOption === 'Categories' ? (
          //Add Categories
          <Col lg={6}>
            <div className='w-100 h-100 bg-white shadow-sm d-flex flex-column justify-content-evenly  side-offcanvas'>
              {/* Header */}
              <div className='w-100 d-flex align-items-center py-4 px-4 border-bottom border-top'>
                {' '}
                <i
                  className='fas fa-times fa-2x cursor-pointer'
                  onClick={() => {
                    setCategoryImage('')
                    setCategoryName('')
                    setSaveAndAddMore(false)
                    setCustomOffcanvas(false)
                  }}
                ></i>
                <h2 className='mb-0 ml-4'>Add New Menu</h2>
              </div>
              {/* body */}
              <div>
                <Form onSubmit={addCategoryhandle}>
                  <div className='px-3 py-2'>
                    <FormGroup>
                      <Label for='name'>
                        <strong className='text-danger'>*</strong>Name
                      </Label>
                      <Input
                        id='name'
                        name='name'
                        placeholder='Pasta'
                        type='text'
                        required
                        value={categoryName}
                        onChange={e => {
                          setCategoryName(e.target.value)
                        }}
                      />
                    </FormGroup>
                    {/* {image section for categories} */}
                    {/* <div> */}
                    {/* {categoryimage ? (
                        // <img
                        //   src={URL.createObjectURL(categoryimage)}
                        //   alt="Uploaded"
                        //   style={{
                        //     width: "200px",
                        //     height: "200px",
                        //     border: "1px dotted #dde2e7",
                        //   }}
                        //   className="cursor-pointer"
                        //   onClick={handleImageClick}
                        // />
                        <div className='d-flex flex-column justify-content-center align-items-center border'>
                          {' '}
                          <img
                            src={
                              categoryimage instanceof File
                                ? URL.createObjectURL(categoryimage)
                                : categoryimage
                            }
                            alt='Uploaded'
                            style={{
                              width: '200px',
                              height: '200px',
                              border: '1px dotted #dde2e7'
                            }}
                            className='cursor-pointer rounded m-1'
                            onClick={handleImageClick}
                          />
                          <i
                            className='<i fa-regular fa-pen-to-square  w-100  py-2  shadow-sm  cursor-pointer  d-flex justify-content-center border'
                            onClick={handleImageClick}
                          >
                            {' '}
                          </i>
                        </div>
                      ) : (
                        <img
                          src={fileupload}
                          alt='Placeholder'
                          className='cursor-pointer'
                          style={{
                            width: '200px',
                            height: '200px',
                            border: '1px dotted #dde2e7'
                          }}
                          onClick={handleImageClick}
                        />
                      )} */}
                    {/* <input
                        type='file'
                        ref={fileInput}
                        accept='.jpg,.jpeg,.png'
                        onChange={handleFileChange}
                        style={{ display: 'none' }}
                      />
                    </div>
                    <p className='text-muted mt-3'>
                      Recommended resolution is for landscape 1536x1024px,
                      square 1536x1536px or portrait 1536x2304 or bigger with a
                      file size of less than 10MB.
                    </p> */}
                  </div>
                  <div className='d-flex justify-content-between align-items-center py-2  px-3 border-bottom border-top'>
                    {' '}
                    <FormGroup check>
                      <Input
                        type='checkbox'
                        checked={saveAndAddMore}
                        onChange={() => {
                          setSaveAndAddMore(!saveAndAddMore)
                        }}
                        style={{ width: '1em', height: '1em' }}
                      />
                      <Label check>Save and add more</Label>
                    </FormGroup>
                    <Button
                      type='submit'
                      className='d-flex align-items-center'
                      style={{
                        background: restaurantMedia.adminColor
                      }}
                      disabled={categoryLoader}
                    >
                      {categoryLoader ? <LinearProgress /> : ''}
                      Submit
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        ) : (
          // Add items
          <Col lg={6}>
            <div className='w-100 h-100 bg-white shadow-sm d-flex flex-column justify-content-evenly '>
              {/* Header */}
              <div className='d-flex align-items-center py-4 px-4 border-bottom border-top'>
                {' '}
                {/* <i className="fas fa-times"></i> */}
                <i
                  className='fas fa-times fa-2x cursor-pointer '
                  onClick={() => {
                    setCustomOffcanvas(false)
                    clearData()
                  }}
                ></i>
                <h2 className='mb-0 ml-4'>Add Items</h2>
              </div>
              {/* body */}
              <div className='p-4 '>
                <Form onSubmit={addItemhandle}>
                  <Row>
                    <Col>
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
                              value={itemName}
                              onChange={e => setItemName(e.target.value)}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for='item-name'>Est. Prep Time</Label>
                            <Input
                              type='number'
                              min={1}
                              placeholder='Time'
                              value={estimatedTime}
                              onBlur={e => {
                                if (Number(e.target.value) < 0) {
                                  setEstimatedTime('')
                                }
                              }}
                              onChange={e => {
                                setEstimatedTime(e.target.value)
                              }}
                            />
                          </FormGroup>
                        </Col>
                        {/* {showCategory ? (
                          <Col>
                            <FormGroup>
                              <Label for="location">Category</Label>
                              <CustomInput
                                type="select"
                                id="exampleCustomSelect"
                                name="customSelect"
                                // required
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                              >
                                <option value="">Select</option>
                                {categoriesData.map((item, index) => {
                                  return (
                                    <option
                                      value={item.categoryName}
                                      key={index}
                                    >
                                      {item.categoryName}
                                    </option>
                                  );
                                })}
                                <option value="fast food">Fast Food</option>
                            <option value="chinese">Chinese</option>
                            <option value="rice">Rice</option> 
                              </CustomInput>
                            </FormGroup>
                          </Col>
                        ) : (
                          ""
                        )} */}
                      </Row>
                      {/* <Row>
                        <Col>
                          <FormGroup>
                            <Label for="item-name">Est. Prep Time</Label>
                            <Input
                              type="number"
                              min={1}
                              placeholder="Time"
                              value={estimatedTime}
                              required
                              onBlur={(e) => {
                                if (Number(e.target.value) < 0) {
                                  setEstimatedTime("");
                                }
                              }}
                              onChange={(e) => {
                                setEstimatedTime(e.target.value);
                              }}
                            />
                          </FormGroup>
                        </Col>
                        <Col>
                          <FormGroup>
                            <Label for="location">Inventory</Label>
                            <CustomInput
                              type="select"
                              id="exampleCustomSelect"
                              name="customSelect"
                              required
                              value={inventory}
                              onChange={(e) => setInventory(e.target.value)}
                            >
                              <option value="">Select</option>
                              <option value="fast food">Fast Food</option>
                              <option value="chinese">Chinese</option>
                              <option value="rice">Rice</option>
                            </CustomInput>
                          </FormGroup>
                        </Col>
                      </Row> */}
                      <Row>
                        <Col>
                          <FormGroup>
                            <Label for='location'>Label</Label>
                            <CustomInput
                              type='select'
                              value={label}
                              // required
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
                              onBlur={e => {
                                if (Number(e.target.value) < 0) {
                                  setCalories('')
                                }
                              }}
                              onChange={e => {
                                setCalories(e.target.value)
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
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
                              onChange={e => {
                                setComments(e.target.value)
                              }}
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row className='overflow-auto'>
                        {/* {images?.map((url, index) => (
                          <Col md={3} className='mt-2 mb-2'>
                            <Card key={index} style={{ height: '140px' }}>
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
                                    setImages(prevImagesToRemove => [
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
                        <Col md={3} className='mt-2 mb-2'>
                          <Card style={{ height: '140px' }}>
                            <CardMedia
                              component='img'
                              height='80'
                              image={fileUploadImage}
                            />
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
                                for='file-images'
                                className={`d-flex flex-column file-input__label ${
                                  previewImages && previewImages.length > 0
                                    ? 'd-none'
                                    : ''
                                }`}
                                // className='text-center cursor-pointer'
                              >
                                <span className='d-flex flex-column text-center'>
                                  Upload
                                </span>
                              </Label>
                            </CardActions>
                          </Card>
                        </Col> */}
                        <Col className='col-6'>
                          <div className='preview-images'>
                            {images && images.length > 0 ? (
                              <>
                                <div
                                  style={{
                                    maxHeight: '200px',
                                    overflowY: 'auto'
                                  }}
                                >
                                  {images.map((file, index) => (
                                    <div
                                      key={index}
                                      className='d-flex flex-column align-items-center justify-content-between mt-1 border '
                                    >
                                      <img
                                        key={index}
                                        width={125}
                                        src={URL.createObjectURL(file)}
                                        alt=''
                                        className='p-1'
                                      />

                                      <i
                                        className='fas fa-trash-alt p-2  border d-flex justify-content-center  cursor-pointer shadow-sm w-100'
                                        onClick={() => {
                                          setImages(prevImages =>
                                            prevImages.filter(
                                              image => image !== file
                                            )
                                          )
                                        }}
                                      ></i>
                                    </div>
                                  ))}
                                </div>
                                <FormGroup className='file-input mt-2'>
                                  <Input
                                    type='file'
                                    multiple
                                    name='item'
                                    id='file-images'
                                    placeholder='Images'
                                    accept='.jpg,.jpeg,.png'
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
                              </>
                            ) : (
                              <FormGroup className='file-input'>
                                <Input
                                  type='file'
                                  multiple
                                  name='item'
                                  id='file-images'
                                  placeholder='Images'
                                  accept='.jpg,.jpeg,.png'
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
                        {/* <Col className="col-6">
                          <div className="preview-videos">
                            {videos && videos.length > 0 ? (
                              previewVideos.map((url) => (
                                <video key={url} width="100%" controls>
                                  <source src={url} type="video/mp4" />
                                </video>
                              ))
                              <>
                                <div
                                  style={{
                                    maxHeight: "200px",
                                    overflowY: "auto",
                                  }}
                                >
                                  {videos?.map((file, index) => (
                                    <div
                                      key={index}
                                      className="d-flex flex-column align-items-center justify-content-center border mt-1"
                                    >
                                      <video
                                        width="80%"
                                        controls
                                        className="p-1"
                                      >
                                        <source
                                          src={URL.createObjectURL(file)}
                                          type="video/mp4"
                                        />
                                      </video>
                                      <i
                                        className="fas fa-trash-alt p-2  d-flex justify-content-center align-items-center border  w-100  cursor-pointer shadow-sm"
                                        onClick={() => {
                                          setVideos((prevVideos) =>
                                            prevVideos.filter(
                                              (video) => video !== file
                                            )
                                          );
                                        }}
                                      ></i>
                                    </div>
                                  ))}
                                </div>
                                <FormGroup className="file-input mt-2">
                                  <Input
                                    type="file"
                                    multiple
                                    className="file-input__input"
                                    accept=".mp4"
                                    onChange={videosHandleChange}
                                    // ref={fileVideosInputRef}
                                    id="video-file"
                                  />
                                  <Label
                                    for="video-file"
                                    className={`d-flex flex-column file-input__label ${
                                      previewVideos && previewVideos.length > 0
                                        ? "d-none"
                                        : ""
                                    }`}
                                  >
                                    <img src={fileupload} alt="" />
                                    <span className="text-center">
                                      Upload Videos
                                    </span>
                                  </Label>
                                </FormGroup>
                              </>
                            ) : (
                              <FormGroup className="file-input">
                                <Input
                                  type="file"
                                  multiple
                                  className="file-input__input"
                                  accept=".mp4"
                                  onChange={videosHandleChange}
                                  id="video-file"
                                />
                                <Label
                                  for="video-file"
                                  className={`d-flex flex-column file-input__label ${
                                    previewVideos && previewVideos.length > 0
                                      ? "d-none"
                                      : ""
                                  }`}
                                >
                                  <img src={fileupload} alt="" />
                                  <span className="text-center">
                                    Upload Videos
                                  </span>
                                </Label>
                              </FormGroup>
                            )}
                          </div>
                        </Col> */}
                      </Row>
                    </Col>
                  </Row>

                  <hr className='my-1' />
                  <Row className='mt-3'>
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
                              type='number'
                              min={1}
                              name='price'
                              step={1}
                              id='item'
                              placeholder='Item Name'
                              value={price}
                              onBlur={e => {
                                if (Number(e.target.value) < 0) {
                                  setPrice('')
                                }
                              }}
                              onChange={e => {
                                setPrice(e.target.value)
                              }}
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
                            style={
                              !subItem || !price
                                ? {}
                                : { background: restaurantMedia.adminColor }
                            }
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
                          <tr>
                            <td>{item.subItem}</td>
                            <td>{item.price}</td>
                            <td className='table-actions'>
                              <img src={hide} alt='' className='mx-2' />
                              <img
                                src={deleteIcon}
                                alt=''
                                className='mx-2'
                                onClick={() => handleRemove('subItems', index)}
                              />
                              <img src={edit} alt='' className='mx-2' />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <hr className='my-1' />
                  <Row>
                    <Col>
                      <Row>
                        <Col md={7}>
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
                    <Col md={12}>
                      <Row className='d-flex justify-content-between align-items-center'>
                        <Col>
                          <FormGroup>
                            <Label for='location'>Age Range</Label>
                            <div className='age-range'>
                              <Input
                                type='number'
                                value={ageFrom}
                                min={1}
                                onBlur={e => {
                                  if (Number(e.target.value) < 0) {
                                    setAgeFrom('')
                                  }
                                }}
                                onChange={e => {
                                  setAgeFrom(e.target.value)
                                }}
                              />{' '}
                              To
                              <Input
                                type='number'
                                min={1}
                                value={ageTo}
                                disabled={!ageFrom}
                                onBlur={e => {
                                  if (Number(e.target.value) < 0) {
                                    setAgeTo('')
                                  }
                                  if (
                                    Number(e.target.value) < Number(ageFrom)
                                  ) {
                                    toast.error(
                                      'To age should be greater then from..',
                                      {
                                        style: {
                                          fontFamily: 'Poppins'
                                        }
                                      }
                                    )
                                    setAgeTo('')
                                  }
                                }}
                                onChange={e => {
                                  setAgeTo(e.target.value)
                                }}
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
                            style={
                              selectedOptions.length === 0 ||
                              !ageFrom ||
                              !ageTo ||
                              !gender
                                ? {}
                                : { background: restaurantMedia.adminColor }
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
                          <tr>
                            <td>
                              {item.selectedOptions.map(option => {
                                return <span>{option.label}</span>
                              })}
                            </td>
                            <td>{item.gender}</td>
                            <td>
                              {item.ageFrom}-{item.ageTo}
                            </td>
                            <td className='table-actions'>
                              <img src={hide} alt='' className='mx-2' />
                              <img
                                src={deleteIcon}
                                alt=''
                                className='mx-2'
                                onClick={() =>
                                  handleRemove('recommended', index)
                                }
                              />
                              <img src={edit} alt='' className='mx-2' />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                  <Row>
                    <Col md={7}>
                      {' '}
                      <FormGroup check>
                        <Input
                          type='checkbox'
                          checked={saveAndAddMore}
                          onChange={() => {
                            setSaveAndAddMore(!saveAndAddMore)
                          }}
                          style={{ width: '1em', height: '1em' }}
                        />
                        <Label check>Save and add more</Label>
                      </FormGroup>
                    </Col>
                    <Col className='d-flex justify-content-end'>
                      <Button
                        className='modal__btn'
                        type='submit'
                        style={{ background: restaurantMedia.adminColor }}
                        disabled={addMenuLoader}
                      >
                        {addMenuLoader ? <LinearProgress /> : ''} Save
                      </Button>
                    </Col>
                  </Row>
                </Form>
              </div>
            </div>
          </Col>
        ))}
    </Row>
  )
}

export default ScratchMenu
