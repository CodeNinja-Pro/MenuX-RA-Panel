import React, { useState } from 'react'
import OnlyHeader from '../Headers/OnlyHeader'
import { Container } from 'reactstrap'
import {
  Card,
  CardContent,
  Grid,
  IconButton,
  ThemeProvider,
  Button,
  Box,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  DialogContentText,
  DialogContent,
  FormControl,
  Select,
  MenuItem,
  Typography,
  InputLabel
} from '@mui/material'
import { Link } from 'react-router-dom'
import { ThemeMain } from '../common/Theme'
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos'
import ItemComparisonCard from './ItemComparisonCard'
import AddOutlinedIcon from '@mui/icons-material/AddOutlined'

import MoreHorizIcon from '@mui/icons-material/MoreHoriz'
import ProductImage from '../../assets/common/statistic/product.png'
import LineChart from '../Charts/LineChart'
import PickDateRange from '../../views/auth/PickDateRange'
import { addDays } from 'date-fns'
import ItemRankingForm from './ItemRankingForm'

export default function ItemCompare (props) {
  const [viewTimeRanking, setViewTimeRanking] = useState({
    items: ['Pasta', 'Fries', 'Burger', 'Bread', 'Salad', 'Cheese'],
    parentMenus: [
      'Light Food',
      'Light Food',
      'Light Food',
      'Light Food',
      'Meal',
      'Meal'
    ],
    times: ['54', '234', '23', '12', '65', '33']
  })

  const [modalFlag, setModalFlag] = useState(false)

  const [compareList, setCompareList] = useState([])

  const onCompareClick = e => {
    console.log(compareList)
  }

  const [compareProduct, setCompareProduct] = useState('')
  const compareProductChange = e => {
    setCompareProduct(e.target.value)
  }

  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        <Container className='mt--9 mb-5' fluid>
          <Link to='/admin/item-detail'>
            <IconButton
              color='primary'
              sx={{
                boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.25)',
                marginBottom: '15px',
                marginTop: '10px',
                display: 'flex',
                justifyContent: 'left',
                marginLeft: '40px'
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
          </Link>
          <Container fluid>
            <Grid container spacing={2}>
              <Grid item xs={10} md={6} lg={4}>
                <ItemComparisonCard />
              </Grid>
              <Grid item xs={2} md={1}>
                <Button
                  variant='outlined'
                  sx={{
                    height: '100%',
                    width: '100%',
                    backgroundColor: '#ffffff',
                    border: 'none'
                  }}
                  onClick={() => setModalFlag(true)}
                >
                  <AddOutlinedIcon sx={{ width: '100px', height: '100px' }} />
                </Button>
                {/* <Card sx={{ height: '100%' }}>
                  <CardContent>
                      <AddOutlinedIcon />
                  </CardContent>
                </Card> */}
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
                    {'Compare Items'}
                  </DialogTitle>
                  <Divider />
                  <DialogContent>
                    <DialogContentText
                      id='alert-dialog-description'
                      style={{ textAlign: 'center' }}
                    >
                      <Typography marginBottom={'20px'} fontWeight={'bold'}>
                        Menu Product Item
                      </Typography>
                      <FormControl fullWidth>
                        <InputLabel id='demo-simple-select-autowidth-label'>
                          Product Item
                        </InputLabel>
                        <Select
                          labelId='demo-simple-select-autowidth-label'
                          id='demo-simple-select-autowidth'
                          value={compareProduct}
                          onChange={compareProductChange}
                          fullWidth
                          label='compareProduct'
                        >
                          <MenuItem value={'Pasta'}>Pasta</MenuItem>
                          <MenuItem value={'Cheese'}>Cheese</MenuItem>
                          <MenuItem value={'Burger'}>Burger</MenuItem>
                        </Select>
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
                      variant='contained'
                      style={{ margin: '20px' }}
                      onClick={() => {
                        setModalFlag(false)
                        onCompareClick()
                      }}
                      autoFocus
                    >
                      Compare
                    </Button>
                  </DialogActions>
                </Dialog>
              </Grid>
            </Grid>
          </Container>
        </Container>
      </ThemeProvider>
    </>
  )
}
