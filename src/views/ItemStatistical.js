import React, { useState, useEffect } from 'react'
import { ThemeMain } from '../components/common/Theme'
import OnlyHeader from '../components/Headers/OnlyHeader'
import {
  Box,
  Card,
  Tabs,
  Tab,
  ThemeProvider,
  Typography,
  CardContent
} from '@mui/material'
import { Container } from 'reactstrap'
import StatisticsChart from '../components/ItemStatistics/StatisticsChart'
import { useDispatch, useSelector } from 'react-redux'
import { getCurrentRoleDetail } from '../store/actions/staffAction'
import ItemStatisticTable from '../components/ItemStatistics/ItemStatisticTable'
import ItemDetail from '../components/ItemStatistics/ItemDetail'
import {
  sortCategoryByOrder,
  sortItemByConversionRate,
  sortItemByOrder,
  sortItemByViewTime
} from '../Statistical/generalStatistics'
import { getAllCategories, getAllMenus } from '../store/actions/statisticAction'

export default function ItemStatistical () {
  const [tabFlag, setTabFlag] = useState('Table')
  const { user } = useSelector(state => state.auth)

  const { allMenus, allCategories } = useSelector(state => state.statistic)
  const dispatch = useDispatch()

  // Enable by staff role
  const [sectionPermission, setSectionPermission] = useState(false)

  const [statisticOrDetail, setStatisticOrDetail] = useState('statistic')
  const [selectedItem, setSelectedItem] = useState('')

  const { currentRoleDetail } = useSelector(state => state.staff)

  useEffect(() => {
    if (user.role === 'staff') dispatch(getCurrentRoleDetail(user.staffRole))

    dispatch(getAllMenus(user.restaurantID))
    dispatch(getAllCategories(user.restaurantID))
  }, [])

  useEffect(() => {
    dispatch(sortItemByViewTime(allMenus))
    dispatch(sortItemByOrder(allMenus))
    dispatch(sortItemByConversionRate(allMenus))
    dispatch(sortCategoryByOrder(allMenus, allCategories))
  }, [allMenus])

  useEffect(() => {
    const obj = currentRoleDetail.filter(
      obj => obj.permission === 'Item Statistics'
    )
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

  const handleChange = (e, newValue) => {
    setTabFlag(newValue)
  }

  return (
    <>
      <OnlyHeader />
      <ThemeProvider theme={ThemeMain}>
        {statisticOrDetail === 'statistic' ? (
          <Container className='mt--9 mb-5' fluid>
            <Container fluid>
              <Card sx={{ boxShadow: 'none' }}>
                <Box sx={{ width: '100%', typography: 'body1' }}>
                  <Tabs
                    value={tabFlag}
                    onChange={handleChange}
                    aria-label='wrapped label tabs example'
                  >
                    <Tab value='Table' label='Table' />
                    <Tab value='Statistics' label='Statistics' />
                  </Tabs>
                </Box>
              </Card>
              {tabFlag === 'Table' ? (
                <Card sx={{ marginTop: '15px', boxShadow: 'none' }}>
                  <CardContent>
                    <Typography
                      fontWeight={'bold'}
                      fontSize={'25px'}
                      textAlign={'left'}
                    >
                      Menu Items
                    </Typography>
                    <Typography marginBottom={'10px'} textAlign={'left'}>
                      Item Performance data
                    </Typography>
                    <Box
                      sx={
                        user.role === 'staff' &&
                        disableOnTrue(sectionPermission)
                      }
                    >
                      <ItemStatisticTable
                        setSelectedItem={setSelectedItem}
                        setStatisticOrDetail={setStatisticOrDetail}
                      />
                    </Box>
                  </CardContent>
                </Card>
              ) : (
                <Box
                  sx={user.role === 'staff' && disableOnTrue(sectionPermission)}
                >
                  <StatisticsChart
                    setSelectedItem={setSelectedItem}
                    setStatisticOrDetail={setStatisticOrDetail}
                  />
                </Box>
              )}
            </Container>
          </Container>
        ) : (
          <ItemDetail
            selectedItem={selectedItem}
            setStatisticOrDetail={setStatisticOrDetail}
          />
        )}
      </ThemeProvider>
    </>
  )
}
