import OnlyHeader from '../components/Headers/OnlyHeader'
import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined'
import Switch from '@mui/material/Switch'
import {
  Tooltip,
  IconButton,
  useTheme,
  Typography,
  ThemeProvider,
  Button,
  Card,
  Paper,
  MenuList,
  MenuItem,
  Divider,
  DialogActions,
  Dialog,
  DialogContentText,
  DialogContent,
  DialogTitle,
  TextField,
  ClickAwayListener,
  Popover,
  Drawer,
  List,
  FormControlLabel,
  Radio,
  RadioGroup,
  Grid,
  LinearProgress
} from '@mui/material'

import {
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
  Form,
  Label,
  Input,
  FormGroup,
  Nav,
  NavItem
} from 'reactstrap'
import {
  getAllParentMenu,
  rearrangeOrder,
  updateActive,
  updateParentMenu
} from '../store/actions/MenuManagmentActions'
import { addParentMenu } from '../store/actions/MenuManagmentActions'
import { getParentMenu } from '../store/actions/MenuManagmentActions'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { addlabel } from '../store/actions/MenuManagmentActions'
import LabelsMenu from '../components/CreateNewMenu/LabelsMenu'
import QRCustomization from '../components/CreateNewMenu/QRCustomization'
import exportFromJSON from 'export-from-json'
import { importMenuNew } from '../store/actions/MenuManagmentActions'
import { deleteMenuNew } from '../store/actions/MenuManagmentActions'
import { Box } from '@mui/material'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { ThemeMain } from '../components/common/Theme'
import TabsMenu from '../components/CreateNewMenu/TabsMenu'
import Coupons from '../components/CreateNewMenu/Coupons'
import Popup from '../components/CreateNewMenu/Popup'
import { addDays } from 'date-fns'
import moment from 'moment'
import ScheduleForm from '../components/Settings/common/ScheduleForm'
import { getCurrentRoleDetail } from '../store/actions/staffAction'

function CreateNewMenu () {
  const theme = useTheme()

  const dispatch = useDispatch()
  const history = useHistory()
  const { user } = useSelector(state => state.auth)
  const {
    parentMenus,
    addMenuLoader,
    editLabelLoader,
    addLabelLoader,
    importLoader
  } = useSelector(state => state.menu)

  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    if (user.role === 'staff') {
      const obj = currentRoleDetail.filter(obj => obj.permission === 'Menu')
      if (obj[0]?.allow === 'ViewEdit') {
        setSectionPermission(true)
      } else {
        setSectionPermission(false)
      }
    }
  }, [currentRoleDetail])

  const disableOnTrue = flag => {
    return {
      opacity: flag ? 1 : 0.8,
      pointerEvents: flag ? 'initial' : 'none'
    }
  }

  const [isOpen, setIsOpen] = useState(false)
  const [isMenuNameOpen, setIsMenuNameOpen] = useState(false)
  const [selectedEdit, setSelectedEdit] = useState('')
  const [selectedOption, setSelectedOption] = useState(null)
  const [menuName, setMenuName] = useState('')
  const [menuID, setMenuID] = useState('')
  const [selectedTab, setSelectedTab] = useState('Menu Details')
  const [labelName, setLabelName] = useState('')
  const [labelDescription, setLabelDescription] = useState('')

  const [labelModal, setLabelModal] = useState(false)

  const [availabilityDrawer, setAvailabilityDrawer] = useState(false)

  const [toDeleteParent, setToDeleteParent] = useState({})

  const [dateState, setDateState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 31),
      key: 'selection'
    }
  ])

  const handleDateChange = ranges => {
    setDateState(ranges)
  }

  const [timeState, setTimeState] = useState({
    startTime: '',
    endTime: ''
  })

  const returnFunctionStart = event => {
    setTimeState({ startTime: event.startTime })
  }

  const returnFunctionEnd = event => {
    setTimeState({ endTime: event.endTime })
  }

  const [allDayCheck, setAllDayCheck] = useState(true)

  const changeAllDayCheck = () => {
    setAllDayCheck(!allDayCheck)
  }

  const labeltoggle = () => {
    setLabelModal(!labelModal)
  }

  // Availablity setting section
  const [availabilityCondition, setAvailabilityCondition] = useState('')
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

  const [periodic, setPeriodic] = useState({
    Mon: [],
    Tue: [],
    Wed: [],
    Thu: [],
    Fri: [],
    Sat: [],
    Sun: []
  })

  const handlePeriodic = (date, timeRange) => {
    setPeriodic({
      [date]: timeRange
    })
    console.log(periodic)
  }

  let menuCreationOption = [
    {
      icon: <i className='fas fa-2x fa-file-import'></i>,
      title: 'Import your menu',
      subtitle: 'Download the sample sheet(Excel) and fill with your items.'
    },
    {
      icon: <i className='fas fa-2x fa-cubes'></i>,
      title: 'Start from scratch',
      subtitle: 'Start with an empty menu.'
    }
  ]

  const fileRef = useRef()
  const handleClickMenu = () => {
    fileRef.current.click()
    // console.log(fileRef)
  }

  const exportData = ele => {
    const csvData = []

    dispatch(
      getParentMenu(ele.id, menu => {
        if (menu) {
          menu.forEach((Category, index) => {
            if (Category && Category.items.length > 0) {
              Category?.items.forEach((item, index) => {
                csvData.push({
                  RestaurantID: ele?.restaurantID,
                  MenuID: ele?.id,
                  MenuName: ele?.name,
                  CategoryName: `${Category?.categoryName}`,
                  CategoryID: `${Category?.id}`,
                  ItemName: item?.name,
                  ItemImage: item?.images[0],
                  Sizes: item?.sizes
                    ?.map(sizeItem => `${sizeItem.subItem}->${sizeItem.price}`)
                    .join(','),
                  Views: item?.views
                })
              })
            }
          })
        }
        const fileName = `${ele?.name}_${ele?.restaurantID}`
        const exportType = exportFromJSON.types.csv
        exportFromJSON({ data: csvData, fileName, exportType })
      })
    )
  }
  const handleDelete = id => {
    console.log(id)
    dispatch(
      getParentMenu(id, menu => {
        const categoryIds = menu.map(category => category.id)
        let allImages = []

        menu.forEach(category => {
          if (category.imageURL) {
            allImages.push(category.imageURL)
          }
          if (category.items && category.items.length > 0) {
            category.items.forEach(item => {
              if (item.images && item.images.length > 0) {
                allImages = [...allImages, ...item.images]
              }
            })
          }
        })
        dispatch(deleteMenuNew(id, categoryIds, allImages, user?.restaurantID))
      })
    )
  }

  const fileReader = new FileReader()
  const [importData, setImportData] = useState([])

  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf('\n')).split(',')
    const csvRows = string.slice(string.indexOf('\n') + 1).split('\n')

    const array = csvRows.map(i => {
      const values = i.split(',')
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index]
        return object
      }, {})
      return obj
    })
    setImportData(array)

    dispatch(
      importMenuNew(array, user.restaurantID, () => {
        setIsOpen(false)
        setSelectedOption(null)
      })
    )
  }

  const handleImport = event => {
    event.preventDefault()
    const file = event.target.files[0]

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target.result
        csvFileToArray(text)
      }

      fileReader.readAsText(file)
    }
  }

  // Function to handle the selection of an option
  const handleSelectOption = option => {
    setSelectedOption(option)
  }

  const handleParentMenu = event => {
    event.preventDefault()

    const alreadyExist = parentMenus.find(item => item.name == menuName)
    if (alreadyExist) {
      toast.error('Menu Already Added..!', {
        style: {
          fontFamily: 'Poppins'
        }
      })
    } else {
      dispatch(
        addParentMenu(menuName, user?.restaurantID, id => {
          // setMenuID(id)
          setSelectedTab('Menu Details')
          setIsMenuNameOpen(false)
          setIsOpen(false)
          // setSelectedTab('')
        })
      )
    }
  }
  useEffect(() => {
    dispatch(getAllParentMenu(user?.restaurantID))
  }, [])

  const [deleteModalShow, setDeleteModalShow] = useState(false)

  useEffect(() => {
    console.log(deleteModalShow)
  }, [deleteModalShow])

  const deleteHandleChange = ele => {
    console.log(ele)
    setToDeleteParent(ele)
  }

  const setActiveHandle = (id, status) => {
    if (status === 'true') {
      dispatch(updateActive(id, 'false', user.restaurantID))
    } else {
      dispatch(updateActive(id, 'true', user.restaurantID))
    }
  }
  const [popperOpen, setPopperOpen] = useState(false)

  // const handleClick = () => {
  //   setPopperOpen(!popperOpen)
  // }

  const [modalRenameOpen, setRenameModalOpen] = useState(false)
  const [modalViewOpen, setViewModalOpen] = useState(false)

  const [tabState, setTabState] = useState({
    activeTab: '1'
  })

  const [name, setName] = useState('')

  useEffect(() => {
    setName(toDeleteParent.name)
  }, [toDeleteParent.name])

  const renameParentMenu = () => {
    dispatch(updateParentMenu(toDeleteParent.id, name, user?.restaurantID))
  }

  const [flag, setFlag] = useState(false)
  const [parents, setParents] = useState([])

  useEffect(() => {
    parentMenus.sort((a, b) => a.order - b.order)
    setParents(parentMenus)
  }, [parentMenus])

  useEffect(() => {
    if (flag === true) {
      dispatch(rearrangeOrder(parents, user?.restaurantID, 'parent'))
      setFlag(false)
    }
  }, [parents])

  const onDragEnd = result => {
    // dropped outside the list
    if (!result.destination) {
      return
    }

    setFlag(true)
    const items = reorder(
      parents,
      result.source.index,
      result.destination.index
    )

    setParents(items)
  }

  // a little function to help us with reordering the result
  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list)
    const [removed] = result.splice(startIndex, 1)
    result.splice(endIndex, 0, removed)

    return result
  }

  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='my--7' fluid>
          <Container fluid>
            <Row disabled>
              <Col className=' shadow-sm bg-white pt-3'>
                <Box
                  display={'flex'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                  margin={1}
                  marginBottom={'20px'}
                >
                  {menuID ? (
                    <i
                      className='fas fa-2x fa-angle-left cursor-pointer'
                      onClick={() => {
                        setMenuID('')
                        setSelectedTab('Menu Details')
                      }}
                    ></i>
                  ) : (
                    ''
                  )}
                  <Typography
                    fontSize={'24px'}
                    fontWeight={'bold'}
                    color={'#0074D9'}
                  >
                    {menuID ? menuName : 'New Menu'}
                  </Typography>
                  <Box
                    sx={
                      user.role === 'staff' && disableOnTrue(sectionPermission)
                    }
                  >
                    <Button
                      disabled={addMenuLoader}
                      variant='contained'
                      onClick={() => {
                        setIsOpen(true)
                      }}
                    >
                      Create New Menu
                    </Button>
                  </Box>
                </Box>
                {menuID ? (
                  ''
                ) : (
                  <Nav pills style={{ marginBottom: '10px' }}>
                    <NavItem
                      className='cursor-pointer mx-3'
                      onClick={() => {
                        setSelectedTab('Menu Details')
                      }}
                    >
                      <Typography
                        fontWeight={'bold'}
                        color={selectedTab === 'Menu Details' ? '#0074D9' : ''}
                      >
                        Menu Details
                      </Typography>
                    </NavItem>
                    <NavItem
                      className='cursor-pointer mx-3'
                      onClick={() => {
                        setSelectedTab('QR')
                      }}
                    >
                      <Typography
                        fontWeight={'bold'}
                        color={selectedTab === 'QR' ? '#0074D9' : ''}
                      >
                        QR Codes{' '}
                      </Typography>
                    </NavItem>
                    <NavItem
                      className='cursor-pointer mx-3'
                      onClick={() => {
                        setSelectedTab('Labels')
                      }}
                    >
                      <Typography
                        fontWeight={'bold'}
                        color={selectedTab === 'Labels' ? '#0074D9' : ''}
                      >
                        Labels{' '}
                      </Typography>
                    </NavItem>
                    <NavItem
                      className='cursor-pointer mx-3'
                      onClick={() => {
                        setSelectedTab('Tags')
                      }}
                    >
                      <Typography
                        fontWeight={'bold'}
                        color={selectedTab === 'Tags' ? '#0074D9' : ''}
                      >
                        Tags{' '}
                      </Typography>
                    </NavItem>
                    <NavItem
                      className='cursor-pointer mx-3'
                      onClick={() => {
                        setSelectedTab('Coupons')
                      }}
                    >
                      <Typography
                        fontWeight={'bold'}
                        color={selectedTab === 'Coupons' ? '#0074D9' : ''}
                      >
                        Coupons{' '}
                      </Typography>
                    </NavItem>
                    <NavItem
                      className='cursor-pointer mx-3'
                      onClick={() => {
                        setSelectedTab('Pop up')
                      }}
                    >
                      <Typography
                        fontWeight={'bold'}
                        color={selectedTab === 'Pop up' ? '#0074D9' : ''}
                      >
                        Marketing Banner{' '}
                      </Typography>
                    </NavItem>
                  </Nav>
                )}
              </Col>
            </Row>

            {selectedTab === 'Menu Details' && (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <Row>
                  <Col>
                    {parents.length > 0 ? (
                      <DragDropContext onDragEnd={onDragEnd}>
                        <Droppable droppableId='droppable'>
                          {(provided, snapshot) => (
                            <div
                              {...provided.droppableProps}
                              ref={provided.innerRef}
                            >
                              {parents.map((ele, index) => (
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
                                        className='d-flex align-items-center justify-content-between mt-2 bg-white rounded p-3 shadow  '
                                      >
                                        <div className='d-flex align-items-center '>
                                          <div className='d-flex align-items-center h-100'>
                                            {' '}
                                            <i className='fas fa-2x fa-ellipsis-v'></i>
                                            <i className='fas fa-2x fa-ellipsis-v'></i>
                                          </div>
                                          <div className='ml-3 h-100 d-flex flex-column justify-content-space-evenly'>
                                            <h2 className='mb-0 mt-2'>
                                              {ele.name}
                                            </h2>
                                            <p className='text-muted'>
                                              {moment
                                                .unix(ele.createdAt?.seconds)
                                                .format('MMM DD, YYYY')}
                                            </p>
                                          </div>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                          <Switch
                                            checked={
                                              ele.active === 'true'
                                                ? true
                                                : false
                                            }
                                            onChange={() => {
                                              setActiveHandle(
                                                ele.id,
                                                ele.active
                                              )
                                            }}
                                            name='loading'
                                            color='primary'
                                          />
                                          <Button
                                            sx={{
                                              marginLeft: '20px',
                                              marginRight: '20px'
                                            }}
                                            disabled={addMenuLoader}
                                            variant='contained'
                                            onClick={event => {
                                              setSelectedEdit(ele.id)

                                              dispatch(
                                                getParentMenu(ele.id, () => {
                                                  history.push(
                                                    `/admin/edit-menu/${ele.id}`
                                                  )
                                                })
                                              )
                                            }}
                                          >
                                            {editLabelLoader &&
                                              ele.id == selectedEdit && (
                                                <LinearProgress />
                                              )}{' '}
                                            Edit
                                          </Button>
                                          <Tooltip arrow>
                                            <IconButton
                                              aria-describedby={id}
                                              color='inherit'
                                              size='small'
                                              onClick={event => {
                                                handleClick(event)
                                                deleteHandleChange(ele)
                                              }}
                                            >
                                              <SettingsOutlinedIcon
                                                style={{ marginTop: '5px' }}
                                              />
                                            </IconButton>
                                            <Popover
                                              id={id}
                                              open={open}
                                              anchorEl={anchorEl}
                                              onClose={handleClose}
                                              anchorOrigin={{
                                                vertical: 'bottom',
                                                horizontal: 'left'
                                              }}
                                            >
                                              <Paper>
                                                <ClickAwayListener
                                                  onClickAway={handleClose}
                                                >
                                                  <MenuList id='split-button-menu'>
                                                    <MenuItem
                                                      onClick={() => {
                                                        setAvailabilityDrawer(
                                                          true
                                                        )
                                                        setPopperOpen(false)
                                                      }}
                                                      key={'Availability'}
                                                    >
                                                      Availability
                                                    </MenuItem>

                                                    <MenuItem
                                                      onClick={() => {
                                                        setPopperOpen(false)
                                                        setRenameModalOpen(true)
                                                      }}
                                                      key={'Rename'}
                                                    >
                                                      Rename
                                                    </MenuItem>
                                                    <MenuItem
                                                      onClick={() => {
                                                        setSelectedEdit(ele.id)
                                                        exportData(ele)
                                                        setPopperOpen(false)
                                                      }}
                                                      key={'Export'}
                                                    >
                                                      Export
                                                    </MenuItem>
                                                    <MenuItem
                                                      onClick={() => {
                                                        setPopperOpen(false)
                                                        setDeleteModalShow(true)
                                                      }}
                                                      sx={{
                                                        color: '#e74c3c'
                                                      }}
                                                      key={'Delete'}
                                                    >
                                                      Delete
                                                    </MenuItem>
                                                  </MenuList>
                                                </ClickAwayListener>
                                              </Paper>
                                            </Popover>
                                            <Drawer
                                              anchor={'right'}
                                              open={availabilityDrawer}
                                              onClose={() =>
                                                setAvailabilityDrawer(false)
                                              }
                                            >
                                              <Box
                                                sx={{ width: '410' }}
                                                role='presentation'
                                                onKeyDown={() =>
                                                  setAvailabilityDrawer(false)
                                                }
                                              >
                                                <List>
                                                  <Grid
                                                    container
                                                    margin={2}
                                                    spacing={2}
                                                    width={500}
                                                  >
                                                    <Grid item xs={12}>
                                                      <Typography
                                                        marginBottom={3}
                                                        fontWeight={'bold'}
                                                        fontSize={'23px'}
                                                      >
                                                        Availability
                                                      </Typography>
                                                    </Grid>
                                                    <Grid
                                                      item
                                                      xs={12}
                                                      marginRight={2}
                                                    >
                                                      <RadioGroup
                                                        defaultValue='Always'
                                                        name='radio-buttons-group'
                                                        value={
                                                          availabilityCondition
                                                        }
                                                        onChange={e => {
                                                          setAllDayCheck(true)
                                                          setAvailabilityCondition(
                                                            e.target.value
                                                          )
                                                        }}
                                                      >
                                                        <FormControlLabel
                                                          value='Always'
                                                          control={<Radio />}
                                                          label='Always'
                                                        />
                                                        <Typography
                                                          marginBottom={1}
                                                          marginLeft={4}
                                                        >
                                                          The menu will always
                                                          be shown
                                                        </Typography>
                                                        <FormControlLabel
                                                          value='Periodic'
                                                          control={<Radio />}
                                                          label='Periodic'
                                                        />
                                                        <Grid
                                                          item
                                                          xs={12}
                                                          marginLeft={2}
                                                          sx={{ width: '100%' }}
                                                        >
                                                          {days.map(day => (
                                                            <ScheduleForm
                                                              disabled={
                                                                availabilityCondition ===
                                                                'Periodic'
                                                                  ? false
                                                                  : true
                                                              }
                                                              handlePeriodic={
                                                                handlePeriodic
                                                              }
                                                              key={day}
                                                              title={day}
                                                              periodic={
                                                                periodic
                                                              }
                                                            />
                                                          ))}
                                                        </Grid>
                                                      </RadioGroup>
                                                    </Grid>
                                                    <Grid item xs={12}>
                                                      <Box
                                                        marginRight={2}
                                                        display={'flex'}
                                                        justifyContent={'end'}
                                                      >
                                                        <Button
                                                          variant='contained'
                                                          color='error'
                                                          sx={{
                                                            marginRight: 2
                                                          }}
                                                        >
                                                          Cancel
                                                        </Button>
                                                        <Button variant='contained'>
                                                          Save
                                                        </Button>
                                                      </Box>
                                                    </Grid>
                                                  </Grid>
                                                </List>
                                              </Box>
                                            </Drawer>
                                            <Dialog
                                              open={deleteModalShow}
                                              onClose={() =>
                                                setDeleteModalShow(false)
                                              }
                                              aria-labelledby='alert-dialog-title'
                                              aria-describedby='alert-dialog-description'
                                            >
                                              <DialogTitle
                                                id='alert-dialog-title'
                                                style={{
                                                  fontSize: '25px',
                                                  fontWeight: 'bold'
                                                }}
                                              >
                                                {'Delete Parent Menu'}
                                              </DialogTitle>
                                              <Divider />
                                              <DialogContent>
                                                <DialogContentText
                                                  id='alert-dialog-description'
                                                  style={{
                                                    textAlign: 'center'
                                                  }}
                                                >
                                                  <Typography>
                                                    Are you really going to
                                                    delete this menu?
                                                  </Typography>
                                                </DialogContentText>
                                              </DialogContent>
                                              <DialogActions
                                                style={{
                                                  display: 'flex',
                                                  justifyContent: 'space-around'
                                                }}
                                              >
                                                <Button
                                                  color='error'
                                                  variant='outlined'
                                                  style={{
                                                    margin: '30px'
                                                  }}
                                                  fullWidth
                                                  onClick={() => {
                                                    setDeleteModalShow(false)
                                                  }}
                                                >
                                                  Cancel
                                                </Button>
                                                <Button
                                                  color='error'
                                                  fullWidth
                                                  variant='contained'
                                                  style={{
                                                    margin: '30px'
                                                  }}
                                                  onClick={() => {
                                                    setDeleteModalShow(false)
                                                    setSelectedEdit(
                                                      toDeleteParent.id
                                                    )
                                                    handleDelete(
                                                      toDeleteParent.id
                                                    )
                                                  }}
                                                  autoFocus
                                                >
                                                  Delete
                                                </Button>
                                              </DialogActions>
                                            </Dialog>
                                            <Dialog
                                              open={modalRenameOpen}
                                              onClose={() =>
                                                setRenameModalOpen(false)
                                              }
                                              aria-labelledby='alert-dialog-title'
                                              aria-describedby='alert-dialog-description'
                                            >
                                              <DialogTitle
                                                id='alert-dialog-title'
                                                style={{
                                                  fontSize: '25px',
                                                  fontWeight: 'bold'
                                                }}
                                              >
                                                {'Rename Parent Menu'}
                                              </DialogTitle>
                                              <Divider />
                                              <DialogContent>
                                                <DialogContentText
                                                  id='alert-dialog-description'
                                                  style={{
                                                    textAlign: 'center'
                                                  }}
                                                >
                                                  <Typography
                                                    marginBottom={'20px'}
                                                  >
                                                    Would you like to rename
                                                    your menu?
                                                  </Typography>
                                                  <TextField
                                                    fullWidth
                                                    name='name'
                                                    onChange={e =>
                                                      setName(e.target.value)
                                                    }
                                                  ></TextField>
                                                </DialogContentText>
                                              </DialogContent>
                                              <DialogActions
                                                style={{
                                                  display: 'flex',
                                                  justifyContent: 'space-around'
                                                }}
                                              >
                                                <Button
                                                  variant='outlined'
                                                  style={{
                                                    margin: '30px'
                                                  }}
                                                  fullWidth
                                                  onClick={() => {
                                                    setRenameModalOpen(false)
                                                  }}
                                                >
                                                  Cancel
                                                </Button>
                                                <Button
                                                  fullWidth
                                                  variant='contained'
                                                  style={{
                                                    margin: '30px'
                                                  }}
                                                  onClick={() => {
                                                    renameParentMenu()
                                                    setRenameModalOpen(false)
                                                  }}
                                                  autoFocus
                                                >
                                                  Update
                                                </Button>
                                              </DialogActions>
                                            </Dialog>
                                          </Tooltip>
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
                      <div className='w-100 v-100 d-flex justify-content-center align-items-center py-5'>
                        <strong>No Menus found.</strong>
                      </div>
                    )}
                  </Col>
                </Row>
              </Box>
            )}
            {/* Label Section */}
            {selectedTab == 'Labels' && (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <LabelsMenu></LabelsMenu>
              </Box>
            )}
            {/* QR Customization */}
            {selectedTab == 'QR' && (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <QRCustomization></QRCustomization>
              </Box>
            )}
            {selectedTab == 'Tags' && (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <TabsMenu></TabsMenu>
              </Box>
            )}
            {selectedTab == 'Coupons' && (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <Coupons></Coupons>
              </Box>
            )}
            {selectedTab == 'Pop up' && (
              <Box
                sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
              >
                <Popup></Popup>
              </Box>
            )}
          </Container>
        </Container>
        <Modal
          isOpen={isOpen}
          toggle={() => setIsOpen(false)}
          centered
          size='lg'
          className='p-3'
        >
          <i
            className='fa fa-1x fa-close ml-auto mr-3 mt-3 cursor-pointer'
            onClick={() => {
              setIsOpen(false)
              setSelectedOption('')
            }}
          ></i>
          <div className='d-flex flex-column align-items-center '>
            <h1 className='text-center'>
              How would you like to set up your menu?
            </h1>
            <p className=''>
              Let's set up your menu, remember you can manage it anytime.
            </p>
          </div>
          <ModalBody>
            <div className='d-flex justify-content-center'>
              <Row className='px-3'>
                {menuCreationOption?.map((ele, index) => {
                  return (
                    <Col className='p-0 px-1' key={index}>
                      <Card
                        className={`d-flex flex-column align-items-center  cursor-pointer pt-5 px-4 pb-4 border h-100 ${
                          selectedOption && selectedOption?.title === ele.title
                            ? 'border-primary'
                            : ''
                        }`}
                        onClick={() => handleSelectOption(ele)}
                      >
                        {ele.icon}
                        <h2 className='mt-3'>{ele.title}</h2>
                        <p className='mt-2 text-center'>{ele.subtitle}</p>{' '}
                      </Card>
                    </Col>
                  )
                })}
              </Row>
            </div>
          </ModalBody>
          <ModalFooter>
            <input
              type='file'
              onChange={handleImport}
              ref={fileRef}
              hidden
            ></input>
            <Button
              color='primary'
              disabled={!selectedOption || importLoader}
              onClick={() => {
                if (selectedOption?.title === 'Start from scratch') {
                  setMenuName('')
                  setIsMenuNameOpen(true)
                } else {
                  handleClickMenu()
                }
              }}
            >
              {importLoader && <LinearProgress />}
              {selectedOption
                ? selectedOption?.title === 'Start from scratch'
                  ? 'create'
                  : 'upload'
                : 'create'}
            </Button>
          </ModalFooter>
        </Modal>
        <Dialog
          open={isMenuNameOpen}
          onClose={() => setIsMenuNameOpen(false)}
          aria-labelledby='alert-dialog-title'
          aria-describedby='alert-dialog-description'
        >
          <DialogTitle
            id='alert-dialog-title'
            style={{
              fontSize: '25px',
              fontWeight: 'bold'
            }}
          >
            {'Menu Name'}
          </DialogTitle>
          <Divider />
          <DialogContent>
            <DialogContentText
              margin={2}
              id='alert-dialog-description'
              style={{
                textAlign: 'center'
              }}
            >
              <TextField
                sx={{ marginBottom: '20px' }}
                name='menuName'
                onChange={e => setMenuName(e.target.value)}
              ></TextField>
            </DialogContentText>
          </DialogContent>
          <DialogActions sx={{ margin: '30px' }}>
            <Button
              fullWidth
              variant='contained'
              disabled={addMenuLoader}
              className='d-flex align-items-center'
              onClick={handleParentMenu}
            >
              {addMenuLoader ? <LinearProgress /> : ''} Save
            </Button>
          </DialogActions>
        </Dialog>
        {/* Modal for add restaurant */}
        <div>
          <Modal isOpen={labelModal} toggle={labeltoggle}>
            <ModalHeader toggle={labeltoggle}>Add Label Details</ModalHeader>
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
                        setLabelName('')
                        setLabelModal(false)
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
                    onChange={e => setLabelName(e.target.value)}
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
                    {addLabelLoader ? <LinearProgress /> : 'Save'}
                  </Button>
                </div>
              </Form>
            </ModalBody>
          </Modal>
        </div>
      </ThemeProvider>
    </>
  )
}

export default CreateNewMenu
