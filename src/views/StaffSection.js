import React, { useEffect, useState } from 'react'
import { Container } from 'reactstrap'
import {
  Grid,
  Card,
  ThemeProvider,
  Box,
  Typography,
  TextField,
  InputAdornment,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  MenuItem,
  Select,
  FormControl,
  FormHelperText,
  DialogContentText,
  DialogTitle,
  Divider,
  OutlinedInput
} from '@mui/material'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'
import OnlyHeader from '../components/Headers/OnlyHeader'
import { ThemeMain } from '../components/common/Theme'
import StaffTable from '../components/Staff/StaffTable'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  getAllStaffInfo,
  getCurrentRoleDetail,
  getStaffs,
  sendNewStaffRequest
} from '../store/actions/staffAction'
import { toast } from 'react-toastify'

export default function StaffSection () {
  const dispatch = useDispatch()

  const { user } = useSelector(state => state.auth)
  const { staffData } = useSelector(state => state.staff)

  // Status of this section as staff role
  const [sectionPermission, setSectionPermission] = useState(false)
  const { currentRoleDetail } = useSelector(state => state.staff)
  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))
  }, [])

  useEffect(() => {
    const obj = currentRoleDetail.filter(obj => obj.permission === 'Staff')
    if (obj[0]?.allow === 'ViewEdit') {
      setSectionPermission(true)
    } else {
      setSectionPermission(false)
    }
  }, [currentRoleDetail])

  const disableOnTrue = flag => {
    return {
      opacity: flag ? 1 : 0.8,
      pointerEvents: flag ? 'initial' : 'none'
    }
  }

  const [roleName, setRoleName] = useState('')
  const [staffEmail, setStaffEmail] = useState('')
  const [staffName, setStaffName] = useState('')

  const [modalFlag, setModalFlag] = useState(false)

  const [allStaffInfo, setAllStaffInfo] = useState([])

  useEffect(() => {
    dispatch(getStaffs(user.restaurantID))
    dispatch(getAllStaffInfo(user.restaurantID))
  }, [])

  useEffect(() => {
    setAllStaffInfo(staffData)
  }, [staffData])

  const sendStaffRequest = () => {
    const newStaff = {
      name: staffName,
      email: staffEmail,
      role: roleName
    }

    dispatch(
      sendNewStaffRequest(user.restaurantID, newStaff, () => {
        toast.success('You sent the request for new staff successfully.')
        setRoleName('')
        setStaffEmail('')
        setStaffName('')
      })
    )
  }

  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--7 mb-5' fluid>
          <Container fluid>
            <Card sx={{ boxShadow: 'none' }}>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  marginTop={2}
                  marginLeft={2}
                  marginRight={2}
                  marginBottom={2}
                >
                  <Grid
                    item
                    xs={12}
                    display={'flex'}
                    justifyContent={'space-between'}
                    alignItems={'center'}
                  >
                    <Typography
                      fontWeight={'bold'}
                      marginTop={'10px'}
                      fontSize={'25px'}
                    >
                      Total Users
                    </Typography>
                    <Box
                      display={'flex'}
                      sx={
                        user.role === 'staff' &&
                        disableOnTrue(sectionPermission)
                      }
                    >
                      <Button
                        onClick={() => setModalFlag(true)}
                        sx={{ marginRight: 2 }}
                        variant='outlined'
                      >
                        Assign Role
                      </Button>
                      <Link to='/admin/create-role'>
                        <Button variant='contained'>
                          <AddOutlinedIcon />
                          Create Role
                        </Button>
                      </Link>
                    </Box>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography textAlign={'left'}>
                      Find all of your company's administrator accounts and
                      their associate Priviligies.
                    </Typography>
                  </Grid>
                  <Box
                    sx={
                      user.role === 'staff' && disableOnTrue(sectionPermission)
                    }
                  >
                    <Grid
                      item
                      xs={12}
                      display={'flex'}
                      justifyContent={'start'}
                      marginTop={'20px'}
                    >
                      <TextField
                        id='outlined-start-adornment'
                        placeholder='Search'
                        InputProps={{
                          startAdornment: (
                            <InputAdornment position='start'>
                              <SearchOutlinedIcon />
                            </InputAdornment>
                          )
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} marginTop={2}>
                      <StaffTable />
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </Card>

            <Dialog
              open={modalFlag}
              onClose={() => setModalFlag(false)}
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
                {'Assign Role'}
              </DialogTitle>
              <Divider />
              <DialogContent>
                <DialogContentText
                  id='alert-dialog-description'
                  style={{ textAlign: 'center' }}
                >
                  <FormControl fullWidth>
                    <FormHelperText style={{ fontSize: '18px' }}>
                      Role Name
                    </FormHelperText>
                    <Select
                      fullWidth
                      value={roleName}
                      onChange={e => setRoleName(e.target.value)}
                    >
                      {allStaffInfo?.map((staffInfo, index) => (
                        <MenuItem key={index} value={staffInfo.id}>
                          {staffInfo.roleName}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ marginTop: 2 }} fullWidth>
                    <FormHelperText style={{ fontSize: '18px' }}>
                      Email
                    </FormHelperText>
                    <OutlinedInput
                      type='email'
                      placeholder='menuxdigital@gmail.com'
                      value={staffEmail}
                      onChange={e => setStaffEmail(e.target.value)}
                    />
                  </FormControl>
                  <FormControl sx={{ marginTop: 2 }} fullWidth>
                    <FormHelperText style={{ fontSize: '18px' }}>
                      Full Name
                    </FormHelperText>
                    <OutlinedInput
                      type='email'
                      placeholder='John Doe'
                      value={staffName}
                      onChange={e => setStaffName(e.target.value)}
                    />
                  </FormControl>
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
                  style={{ margin: '20px' }}
                  fullWidth
                  onClick={() => {
                    setModalFlag(false)
                  }}
                >
                  Cancel
                </Button>
                <Button
                  fullWidth
                  disabled={!staffEmail || !staffName || !roleName}
                  variant='contained'
                  style={{ margin: '20px' }}
                  onClick={() => {
                    setModalFlag(false)
                    sendStaffRequest()
                  }}
                  autoFocus
                >
                  Send Email
                </Button>
              </DialogActions>
            </Dialog>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
