import React, { useEffect, useState } from 'react'
import {
  CardContent,
  Card,
  ThemeProvider,
  Grid,
  Typography,
  FormControl,
  FormHelperText,
  OutlinedInput,
  IconButton,
  Box,
  Button,
  Select,
  MenuItem,
  FormControlLabel,
  Checkbox,
  Switch,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material'

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'

import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { ThemeMain } from '../common/Theme'
import OnlyHeader from '../Headers/OnlyHeader'
import { Container } from 'reactstrap'
import AddIcon from '@mui/icons-material/Add'
import {
  addNewRole,
  getStaffs,
  deleteStaffRole
} from '../../store/actions/staffAction'
import { toast } from 'react-toastify'

export default function CreateRole (props) {
  const history = useHistory()
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { staffData, isLoading } = useSelector(state => state.staff)

  const [roleName, setRoleName] = useState('')
  const [permission, setPermission] = useState('')
  const [allow, setAllow] = useState('')

  const [selectedSection, setSelectedSection] = useState([])

  const [staffRole, setStaffRole] = useState([])

  const [allStaffInfo, setAllStaffInfo] = useState([])

  useEffect(() => {
    setAllStaffInfo(staffData)
  }, [staffData])

  useEffect(() => {
    dispatch(getStaffs(user.restaurantID))
  }, [])

  const addRoleForSection = () => {
    const newRole = {
      permission,
      allow
    }
    setStaffRole(prevState => [...prevState, newRole])
    setSelectedSection(prevState => [...prevState, permission])
    setPermission('')
    setAllow('')
  }

  const removeAllow = permission => {
    const filteredDocuments = staffRole.filter(
      (item, i) => item.permission !== permission
    )
    const filterdSelected = selectedSection.filter(
      (item, i) => item !== permission
    )
    setSelectedSection(filterdSelected)
    setStaffRole(filteredDocuments)
  }

  const createNewRole = async () => {
    if (staffRole.length === 10) {
      const newRole = {
        roleName,
        role: staffRole
      }

      let allKeys = []
      allStaffInfo?.map(info => {
        allKeys.push(info.roleName)
      })
      if (allKeys.includes(roleName)) {
        toast.warn('You can not add the role with the same name.')
      } else {
        dispatch(
          addNewRole(user.restaurantID, newRole, () => {
            setStaffRole([])
            setSelectedSection([])
            setRoleName('')
            toast.success('You added new Staff Role successfully.')
          })
        )
      }
    } else {
      toast.error(
        'You should set up the permission of all sections for staff role.'
      )
    }
  }

  const deleteRole = id => {
    dispatch(deleteStaffRole(id))
  }

  return (
    <>
      <ThemeProvider theme={ThemeMain}>
        <Grid container spacing={2}>
          <Grid item xs={12} lg={4}>
            <Card sx={{ boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <FormControl fullWidth variant='outlined'>
                      <FormHelperText
                        style={{ fontSize: '18px' }}
                        id='outlined-weight-helper-text'
                      >
                        Role Name
                      </FormHelperText>
                      <OutlinedInput
                        id='outlined-adornment-weight'
                        aria-describedby='outlined-weight-helper-text'
                        inputProps={{
                          'aria-label': 'weight'
                        }}
                        placeholder='Waiter'
                        value={roleName}
                        onChange={e => setRoleName(e.target.value)}
                      />
                    </FormControl>
                    <FormControl fullWidth variant='outlined'>
                      <FormHelperText
                        style={{ fontSize: '18px' }}
                        id='outlined-weight-helper-text'
                      >
                        Permission
                      </FormHelperText>
                      <Select
                        labelId='demo-simple-select-label'
                        id='demo-simple-select'
                        value={permission}
                        onChange={e => setPermission(e.target.value)}
                      >
                        <MenuItem
                          disabled={
                            selectedSection.includes('Menu') ? true : false
                          }
                          value={'Menu'}
                        >
                          Menu
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Orders') ? true : false
                          }
                          value={'Orders'}
                        >
                          Orders
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Requests') ? true : false
                          }
                          value={'Requests'}
                        >
                          Requests
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Item Statistics')
                              ? true
                              : false
                          }
                          value={'Item Statistics'}
                        >
                          Item Statistics
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Recommendations')
                              ? true
                              : false
                          }
                          value={'Recommendations'}
                        >
                          Recommendations
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Customer Feedback')
                              ? true
                              : false
                          }
                          value={'Customer Feedback'}
                        >
                          Customer Feedback
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Customers') ? true : false
                          }
                          value={'Customers'}
                        >
                          Customers
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Staff') ? true : false
                          }
                          value={'Staff'}
                        >
                          Staff
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Customization')
                              ? true
                              : false
                          }
                          value={'Customization'}
                        >
                          Customization
                        </MenuItem>
                        <MenuItem
                          disabled={
                            selectedSection.includes('Setting') ? true : false
                          }
                          value={'Setting'}
                        >
                          Setting
                        </MenuItem>
                      </Select>
                    </FormControl>
                    {permission ? (
                      <>
                        <Typography
                          fontWeight={'bold'}
                          fontSize={'20px'}
                          textAlign={'left'}
                          margin={3}
                        >
                          {permission}
                        </Typography>
                        <Box
                          display={'flex'}
                          justifyContent={'space-around'}
                          alignItems={'center'}
                        >
                          <FormControlLabel
                            control={
                              <Switch
                                checked={allow === 'ViewOnly' ? true : false}
                                onChange={() => setAllow('ViewOnly')}
                              />
                            }
                            label='ViewOnly'
                          />
                          <FormControlLabel
                            control={
                              <Switch
                                checked={allow === 'ViewEdit' ? true : false}
                                onChange={() => setAllow('ViewEdit')}
                              />
                            }
                            label='View And Edit'
                          />
                        </Box>
                      </>
                    ) : (
                      ''
                    )}
                    <Button
                      sx={{ display: 'flex', margin: 3 }}
                      variant='contained'
                      disabled={!permission || !allow}
                      onClick={addRoleForSection}
                    >
                      <AddIcon />
                      Add
                    </Button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Box
                  display={'flex'}
                  flexDirection={'column'}
                  justifyContent={'space-between'}
                  alignItems={'center'}
                >
                  {staffRole.length === 0 ? (
                    <Typography fontWeight={'bold'}>
                      No Roles Permissions added Yet
                    </Typography>
                  ) : (
                    ''
                  )}
                  {staffRole?.map(item => (
                    <Box sx={{ width: '100%' }}>
                      <Typography
                        fontWeight={'bold'}
                        fontSize={'20px'}
                        textAlign={'left'}
                        margin={1}
                        marginLeft={10}
                      >
                        {item.permission}
                      </Typography>
                      <Box display={'flex'} justifyContent={'space-around'}>
                        <FormControlLabel
                          control={<Checkbox checked={true} />}
                          label='View'
                        />
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={item.allow === 'ViewOnly' ? false : true}
                            />
                          }
                          label='Edit'
                        />
                        <IconButton
                          color='error'
                          onClick={() => {
                            removeAllow(item.permission)
                          }}
                        >
                          <RemoveCircleOutlineIcon />
                        </IconButton>
                      </Box>
                      <Divider />
                    </Box>
                  ))}
                  <Box marginTop={5}>
                    <Button
                      variant='outlined'
                      sx={{ marginRight: 3 }}
                      onClick={() => {
                        props.setFlag(false)
                      }}
                    >
                      Discard
                    </Button>
                    <Button
                      variant='contained'
                      disabled={isLoading || !staffRole || !roleName}
                      onClick={() => {
                        createNewRole()
                      }}
                    >
                      Create Role
                    </Button>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} lg={4}>
            <Card sx={{ boxShadow: 'none', height: '100%' }}>
              <CardContent>
                <Typography
                  marginBottom={2}
                  fontWeight={'bold'}
                  fontSize={'20px'}
                >
                  All Staff Roles
                </Typography>

                {allStaffInfo?.map((item, index) => (
                  <Accordion key={index}>
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls='panel1a-content'
                      id='panel1a-header'
                    >
                      <Box
                        sx={{ width: '100%' }}
                        display={'flex'}
                        justifyContent={'space-between'}
                        alignItems={'center'}
                      >
                        <Typography fontSize={'20px'}>
                          {item.roleName}
                        </Typography>
                        <IconButton
                          onClick={() => {
                            deleteRole(item.id)
                          }}
                        >
                          <DeleteOutlineOutlinedIcon
                            color='error'
                            fontSize='medium'
                          />
                        </IconButton>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      {item.role?.map((role, index) => (
                        <Box key={index}>
                          <Typography
                            textAlign={'left'}
                            fontWeight={'bold'}
                            fontSize={'18px'}
                            marginLeft={2}
                            marginBottom={1}
                          >
                            {role.permission}
                          </Typography>
                          <Box display={'flex'} justifyContent={'space-around'}>
                            <FormControlLabel
                              control={<Checkbox checked={true} />}
                              label='View'
                            />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={
                                    role.allow === 'ViewOnly' ? false : true
                                  }
                                />
                              }
                              label='Edit'
                            />
                          </Box>
                        </Box>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                ))}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </ThemeProvider>
    </>
  )
}
