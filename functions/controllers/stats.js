const admin = require('firebase-admin')
const asyncHandler = require('../middlewares/asyncHandler')
const moment = require('moment')
const cors = require('cors')

exports.sortByItemViews = asyncHandler(async (req, res) => {
  try {
    const itemHistory = await admin
      .firestore()
      .collection('reviews')
      .where('restaurantID', '==', req.query.restaurantID)
      .get()

    let itemByViews = {}

    itemHistory?.docs?.forEach(item => {
      const itemID = item?.itemID
      if (!itemByViews[itemID]) {
        itemByViews[itemID] = 1
      }
      itemByViews[itemID]++
    })

    res.status(200).json({
      success: true,
      data: itemByViews
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error?.message
    })
  }
})

// exports.getRestaurantVisits = asyncHandler(async (req, res) => {
//   try {
//     const visits = await admin
//       .firestore()
//       .collection('visits')
//       .where('restaurantID', '==', req.query.restaurantID)
//       .get()

//     let year = new Date().getFullYear()
//     const allMonths = Array.from(
//       { length: 12 },
//       (_, i) => (i + 1).toString().padStart(2, '0') + `-${year}`
//     )

//     const visitsByMonth = {}
//     allMonths.forEach(month => {
//       visitsByMonth[month] = 0
//     })

// visits?.docs?.forEach(visit => {
//   const date = visit?.data()?.createdAt?.toDate()
//   const month = date.getMonth() + 1
//   const year = date.getFullYear()
//   const key = `${month.toString().padStart(2, '0')}-${year}`
//   if (!visitsByMonth[key]) {
//     visitsByMonth[key] = 0
//   }
//   visitsByMonth[key]++
// })
//     res.status(200).json({
//       success: true,
//       data: visitsByMonth
//     })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })
// exports.getRestaurantRevenueEarned = asyncHandler(async (req, res) => {
//   try {
//     const ordersRef = await admin
//       .firestore()
//       .collection('orders')
//       .where('restaurantID', '==', req.query.restaurantID)
//       .get()

//     const visitsArray = ordersRef.docs.map(doc => doc.data())
//     const revenueByPaymentMethod = visitsArray.reduce((acc, visit) => {
//       const paymentMethod = visit.paymentMethod
//         ? visit.paymentMethod.toLowerCase()
//         : null

//       const totalAmount = visit.totalAmount

//       if (acc[paymentMethod]) {
//         acc[paymentMethod] += totalAmount
//       } else {
//         acc[paymentMethod] = totalAmount
//       }

//       return acc
//     }, {})
//     res.status(200).json({
//       success: true,
//       data: revenueByPaymentMethod
//     })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })

// exports.getRestaurantOrderAnaylsis = asyncHandler(async (req, res) => {
//   try {
//     const orders = await admin
//       .firestore()
//       .collection('orders')
//       .where('restaurantID', '==', req.query.restaurantID)
//       .get()

//     let year = new Date().getFullYear()
//     const allMonths = Array.from(
//       { length: 12 },
//       (_, i) => (i + 1).toString().padStart(2, '0') + `-${year}`
//     )
//     const ordersByMonth = {}

//     allMonths.forEach(month => {
//       ordersByMonth[month] = { active: 0, pending: 0, completed: 0 }
//     })

//     orders?.docs?.forEach(order => {
//       const { status, createdAt } = order?.data()

//       // Convert createdAt to month
//       const month = moment.unix(createdAt?.seconds).format('MM-YYYY')

//       switch (status) {
//         case 'active':
//           ordersByMonth[month].active++
//           break
//         case 'pending':
//           ordersByMonth[month].pending++
//           break
//         case 'completed':
//           ordersByMonth[month].completed++
//           break
//         default:
//           break
//       }
//     })

//     res.status(200).json({
//       success: true,
//       data: ordersByMonth
//     })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })
// exports.getPeakHours = asyncHandler(async (req, res) => {
//   try {
//     let orders = await admin.firestore().collection('orders').get()
//     if (req.query?.type == 'day') {
//       res.status(200).json({
//         success: true,
//         data: []
//       })
//     } else if (req.query?.type == 'week') {
//       const now = new Date() // Get current date and time
//       const oneWeekAgo = new Date(
//         now.getFullYear(),
//         now.getMonth(),
//         now.getDate() - 7
//       ) // Get date 7 days ago
//       const oneDayMs = 86400000
//       const dayHours = {} // Object to store counts per hour
//       for (let i = 0; i < 7; i++) {
//         const dateMs = now - oneDayMs * i
//         const dateStr = new Date(dateMs).toISOString().substr(0, 10)
//         dayHours[dateStr] = 0
//       }
//       orders.docs.forEach(order => {
//         if (order.data().createdAt.toDate() >= oneWeekAgo) {
//           const date = moment
//             .unix(order.data().createdAt.seconds)
//             .format('YYYY-MM-DD') // Get date string (without time)
//           const hour = order.data().createdAt.toDate().getHours() // Get hour
//           if (!dayHours[date]) {
//             dayHours[date] = {}
//           }
//           if (dayHours[date][hour]) {
//             dayHours[date][hour]++
//           } else {
//             dayHours[date][hour] = 1
//           }
//         }
//       })

//       // Loop through days and get combined count of peak hours
//       const combinedCountsByDay = {}
//       Object.keys(dayHours).forEach(date => {
//         const hourCounts = dayHours[date]
//         const hoursSorted = Object.keys(hourCounts).sort(
//           (a, b) => hourCounts[b] - hourCounts[a]
//         )
//         const peakHours = hoursSorted.slice(0, 3)
//         let combinedCount = 0
//         peakHours.forEach(hour => {
//           combinedCount += hourCounts[hour]
//         })
//         combinedCountsByDay[date] = combinedCount
//       })

//       res.status(200).json({
//         success: true,
//         data: combinedCountsByDay
//       })
//     } else if (req.query?.type == 'month') {
//       let year = new Date().getFullYear()
//       const allMonths = Array.from(
//         { length: 12 },
//         (_, i) => (i + 1).toString().padStart(2, '0') + `-${year}`
//       )
//       const peakHoursByMonth = {}

//       // Initialize the peakHoursByMonth object with all months having zero orders
//       allMonths.forEach(month => {
//         peakHoursByMonth[month] = []
//       })
//       orders?.docs?.forEach(order => {
//         // Get the month and hour of the order
//         const month = moment
//           .unix(order?.data()?.createdAt?.seconds)
//           .format('MM-YYYY')
//         const hour = order?.data()?.createdAt?.toDate()?.getHours()

//         // If this is the first order we've seen for this month, initialize an empty array for it
//         if (!peakHoursByMonth[month]) {
//           peakHoursByMonth[month] = []
//         }

//         // Add the hour to the array for this month
//         peakHoursByMonth[month].push(hour)
//       })

//       // Calculate the peak hour for each month
//       const peakHours = {}
//       for (const month in peakHoursByMonth) {
//         const hours = peakHoursByMonth[month]

//         // Count how many orders occurred in each hour
//         const orderCounts = {}
//         hours.forEach(hour => {
//           if (!orderCounts[hour]) {
//             orderCounts[hour] = 0
//           }
//           orderCounts[hour]++
//         })

//         // Find the hour with the most orders
//         let maxOrders = 0
//         let peakHour = 0
//         for (const hour in orderCounts) {
//           if (orderCounts[hour] > maxOrders) {
//             maxOrders = orderCounts[hour]
//             peakHour = Number(hour)
//           }
//         }

//         // Store the peak hour for this month
//         peakHours[month] = peakHour
//       }

//       res.status(200).json({
//         success: true,
//         data: peakHours
//       })
//     } else if (req.query?.type == 'range') {
//       const startDate = new Date(req.query?.startDate)
//       const endDate = new Date(req.query?.endDate)
//       const ordersByDayHour = {}
//       const date = new Date(startDate.getTime())
//       while (date <= endDate) {
//         const dateStr = date.toISOString().substr(0, 10)
//         ordersByDayHour[dateStr] = 0
//         date.setDate(date.getDate() + 1)
//       }
//       orders?.docs?.forEach(order => {
//         if (
//           order?.data().createdAt?.toDate() >= startDate &&
//           order?.data().createdAt?.toDate() <= endDate
//         ) {
//           const day = moment
//             .unix(order?.data().createdAt?.seconds)
//             .format('YYYY-MM-DD')
//           const hour = order?.data().createdAt?.toDate().getHours()
//           const key = `${day}_${hour}`
//           if (ordersByDayHour[key]) {
//             ordersByDayHour[key]++
//           } else {
//             ordersByDayHour[key] = []
//           }
//         }
//       })

//       // Find peak hours for each day
//       let combinedHoursByDay = {}
//       for (let key in ordersByDayHour) {
//         const ordersCount = ordersByDayHour[key]
//         const day = key.slice(0, 10)
//         if (!combinedHoursByDay[day]) {
//           combinedHoursByDay[day] = 0
//         }
//         combinedHoursByDay[day] += Number(ordersCount)
//       }
//       res.status(200).json({
//         success: true,
//         data: combinedHoursByDay
//       })
//     }
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })
// exports.getTotalCustomers = asyncHandler(async (req, res) => {
//   try {
//     let customers = await admin
//       .firestore()
//       .collection('users')
//       .where('type', '==', 'customer')
//       .get()
//     let males = 0
//     let females = 0
//     let totalUsers = 0
//     if (req.query?.type == 'day') {
//       const today = new Date()
//       customers?.docs?.filter(user => {
//         const userCreationDate = user?.data()?.createdAt.toDate()
//         if (userCreationDate <= today && userCreationDate >= today) {
//           user?.data()?.gender == 'male' ? males++ : females++
//           totalUsers++
//         }
//       })
//     } else if (req.query?.type == 'week') {
//       const today = new Date()
//       const lastWeek = new Date(
//         today.getFullYear(),
//         today.getMonth(),
//         today.getDate() - 7
//       )
//       customers?.docs?.filter(user => {
//         const userCreationDate = user?.data()?.createdAt.toDate()
//         if (userCreationDate <= today && userCreationDate >= lastWeek) {
//           user?.data()?.gender == 'male' ? males++ : females++
//           totalUsers++
//         }
//       })
//     } else if (req.query?.type == 'month') {
//       const today = new Date()
//       const lastMonth = new Date(
//         today.getFullYear(),
//         today.getMonth() - 6,
//         today.getDate()
//       )
//       customers?.docs?.filter(user => {
//         const userCreationDate = user?.data()?.createdAt.toDate()
//         if (userCreationDate <= today && userCreationDate >= lastMonth) {
//           user?.data()?.gender == 'male' ? males++ : females++
//           totalUsers++
//         }
//       })
//     } else if (req.query?.type == 'range') {
//       const start = new Date(req.query?.startDate)
//       const end = new Date(req.query?.endDate)
//       customers?.docs?.filter(user => {
//         const userCreationDate = user?.data()?.createdAt.toDate()
//         if (userCreationDate <= end && userCreationDate >= start) {
//           user?.data()?.gender == 'male' ? males++ : females++
//           totalUsers++
//         }
//       })
//     } else {
//       totalUsers = customers?.docs?.length
//       males = customers?.docs?.filter(
//         user => user?.data()?.gender === 'male'
//       ).length
//       females = customers?.docs?.filter(
//         user => user?.data()?.gender === 'female'
//       ).length
//     }
//     let malePercentage = (males / totalUsers) * 100
//     let femalePercentage = (females / totalUsers) * 100
//     res.status(200).json({
//       success: true,
//       data: {
//         total: totalUsers,
//         male: males,
//         female: females
//       }
//     })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })
// exports.getOrderFrequency = asyncHandler(async (req, res) => {
//   try {
//     let orders = await admin.firestore().collection('orders').get()
//     if (req.query?.type == 'day') {
//       const hours = []
//       for (let hour = 0; hour < 24; hour += 2) {
//         for (let minute = 0; minute < 60; minute += 1) {
//           const date = new Date()
//           date.setHours(hour, minute, 0, 0)
//           const dateString = date.toISOString().slice(0, 13) + ':00:00'
//           hours.push(dateString)
//         }
//       }

//       const orderCounts = {}
//       hours.forEach(hour => {
//         const hourString = hour.slice(11, 13)
//         orderCounts[hourString] = 0
//       })
//       orders?.docs?.forEach(order => {
//         let today = moment().format('DD-MM-YYYY')
//         if (
//           moment.unix(order?.data()?.createdAt.seconds).format('DD-MM-YYYY') ==
//           today
//         ) {
//           const date = order?.data()?.createdAt.toDate()
//           const hour = Math.floor(date.getHours() / 2) * 2
//           const hourString = String(hour).padStart(2, '0')
//           orderCounts[hourString]++
//         }
//       })
//       res.status(200).json({
//         success: true,
//         data: orderCounts
//       })
//     } else if (req.query?.type == 'week') {
//       const oneDayMs = 86400000 // Number of milliseconds in one day
//       const today = new Date().getTime() // Get today's date in milliseconds
//       const last7Days = today - oneDayMs * 7 // Get the date 7 days ago in milliseconds
//       let categorizedOrders = {}

//       for (let i = 0; i < 7; i++) {
//         const dateMs = today - oneDayMs * i
//         const dateStr = new Date(dateMs).toISOString().substr(0, 10)
//         categorizedOrders[dateStr] = 0
//       }

//       orders?.docs?.forEach(order => {
//         const orderDate = order?.data()?.createdAt.toDate().getTime()
//         if (orderDate >= last7Days && orderDate <= today) {
//           const dateStr = new Date(orderDate).toISOString().substr(0, 10) // Get the date string in YYYY-MM-DD format
//           if (!categorizedOrders[dateStr]) {
//             categorizedOrders[dateStr] = 1
//           } else {
//             categorizedOrders[dateStr]++
//           }
//         }
//       })

//       res.status(200).json({
//         success: true,
//         data: categorizedOrders
//       })
//     } else if (req.query?.type == 'month') {
//       let year = new Date().getFullYear()
//       const allMonths = Array.from(
//         { length: 12 },
//         (_, i) => (i + 1).toString().padStart(2, '0') + `-${year}`
//       )
//       const ordersByMonth = {}

//       // Initialize the peakHoursByMonth object with all months having zero orders
//       allMonths.forEach(month => {
//         ordersByMonth[month] = 0
//       })
//       orders?.docs?.reduce((acc, order) => {
//         let key = moment
//           .unix(order?.data()?.createdAt?.seconds)
//           .format('MM-YYYY')
//         if (!ordersByMonth[key]) {
//           ordersByMonth[key] = 1
//         } else {
//           ordersByMonth[key]++
//         }
//       }, {})

//       res.status(200).json({
//         success: true,
//         data: ordersByMonth
//       })
//     } else if (req.query?.type == 'range') {
//       const startDate = new Date(req.query?.startDate)
//       const endDate = new Date(req.query?.endDate)
//       const counts = {}
//       const date = new Date(startDate.getTime())
//       while (date <= endDate) {
//         const dateStr = date.toISOString().substr(0, 10)
//         counts[dateStr] = 0
//         date.setDate(date.getDate() + 1)
//       }
//       orders?.docs?.forEach(order => {
//         const orderDate = order?.data()?.createdAt?.toDate()
//         if (orderDate >= startDate && orderDate <= endDate) {
//           const dateStr = orderDate.toISOString().substr(0, 10)
//           counts[dateStr]++
//         }
//       })
//       res.status(200).json({
//         success: true,
//         data: counts
//       })
//     }
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })
// exports.getProductStats = asyncHandler(async (req, res) => {
//   try {
//     let orders = await admin.firestore().collection('orders').get()
//     let menus = await admin.firestore().collection('menus').get()
//     let customers = await admin
//       .firestore()
//       .collection('users')
//       .where('type', '==', 'customer')
//       .get()

//     if (req.query?.type == 'day') {
//       const salesData = {}
//       for (let i = 0; i < orders?.docs.length; i++) {
//         const order = orders?.docs[i]?.data()
//         const currentDate = moment().format('DD-MM-YYYY')
//         const orderDate = moment
//           .unix(order?.createdAt?.seconds)
//           .format('DD-MM-YYYY')
//         const customer = customers?.docs.find(c => c.id === order.customerID)
//         if (currentDate !== orderDate) {
//           continue
//         }

//         // Loop through each product in the order and add its sales to the salesData object
//         order.order.forEach(p => {
//           const product = menus?.docs?.find(pr => pr.id === p.menuItemID)
//           if (product) {
//             const ageGroup = getAgeGroup(customer?.data()?.age)
//             const gender = customer?.data()?.gender
//             const productName = product?.data()?.name
//             const productImages = product?.data()?.images

//             if (!salesData[productName]) {
//               salesData[productName] = {
//                 male: 0,
//                 female: 0,
//                 male_age_group: [],
//                 female_age_group: [],
//                 productImages
//               }
//             }

//             salesData[productName][gender.toLowerCase()]++

//             salesData[productName][`${gender.toLowerCase()}_age_group`].push(
//               ageGroup
//             )
//           }
//         })
//       }

//       const response = Object.entries(salesData).map(([productName, sales]) => {
//         const {
//           male,
//           female,
//           male_age_group,
//           female_age_group,
//           productImages
//         } = sales
//         const age_group = male_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         const age_group_female = female_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         return {
//           productName,
//           productImages,
//           male,
//           female,
//           age_group: age_group ? age_group : '',
//           age_group_female: age_group_female ? age_group_female : ''
//         }
//       })

//       res.status(200).json({ success: true, data: response })
//     } else if (req.query?.type == 'week') {
//       const salesData = {}
//       for (let i = 0; i < orders?.docs.length; i++) {
//         const order = orders?.docs[i]?.data()
//         const currentDate = moment().format('DD-MM-YYYY')
//         const customer = customers?.docs.find(c => c.id === order.customerID)
//         const orderDate = order.createdAt.toDate()
//         const timeDiff = currentDate.getTime() - orderDate.getTime()
//         const daysDiff = timeDiff / (1000 * 3600 * 24)
//         if (daysDiff > 7) {
//           continue
//         }

//         // Loop through each product in the order and add its sales to the salesData object
//         order.order.forEach(p => {
//           const product = menus?.docs?.find(pr => pr.id === p.menuItemID)
//           if (product) {
//             const ageGroup = getAgeGroup(customer?.data()?.age)
//             const gender = customer?.data()?.gender
//             const productName = product?.data()?.name
//             const productImages = product?.data()?.images

//             if (!salesData[productName]) {
//               salesData[productName] = {
//                 male: 0,
//                 female: 0,
//                 male_age_group: [],
//                 female_age_group: [],
//                 productImages
//               }
//             }

//             salesData[productName][gender.toLowerCase()]++

//             salesData[productName][`${gender.toLowerCase()}_age_group`].push(
//               ageGroup
//             )
//           }
//         })
//       }

//       const response = Object.entries(salesData).map(([productName, sales]) => {
//         const {
//           male,
//           female,
//           male_age_group,
//           female_age_group,
//           productImages
//         } = sales
//         const age_group = male_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         const age_group_female = female_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         return {
//           productName,
//           productImages,
//           male,
//           female,
//           age_group: age_group ? age_group : '',
//           age_group_female: age_group_female ? age_group_female : ''
//         }
//       })

//       res.status(200).json({ success: true, data: response })
//     } else if (req.query?.type == 'month') {
//       const salesData = {}
//       for (let i = 0; i < orders?.docs.length; i++) {
//         const order = orders?.docs[i]?.data()
//         const currentDate = new Date()
//         const customer = customers?.docs.find(c => c.id === order.customerID)
//         const orderDate = order.createdAt.toDate()
//         const orderYear = orderDate.getFullYear()
//         const orderMonth = orderDate.getMonth() + 1
//         const currentYear = currentDate.getFullYear()
//         const currentMonth = currentDate.getMonth() + 1

//         if (orderYear !== currentYear && orderMonth !== currentMonth) {
//           continue
//         }

//         // Loop through each product in the order and add its sales to the salesData object
//         order.order.forEach(p => {
//           const product = menus?.docs?.find(pr => pr.id === p.menuItemID)
//           if (product) {
//             const ageGroup = getAgeGroup(customer?.data()?.age)
//             const gender = customer?.data()?.gender
//             const productName = product?.data()?.name
//             const productImages = product?.data()?.images

//             if (!salesData[productName]) {
//               salesData[productName] = {
//                 male: 0,
//                 female: 0,
//                 male_age_group: [],
//                 female_age_group: [],
//                 productImages
//               }
//             }

//             salesData[productName][gender.toLowerCase()]++

//             salesData[productName][`${gender.toLowerCase()}_age_group`].push(
//               ageGroup
//             )
//           }
//         })
//       }

//       const response = Object.entries(salesData).map(([productName, sales]) => {
//         const {
//           male,
//           female,
//           male_age_group,
//           female_age_group,
//           productImages
//         } = sales
//         const age_group = male_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         const age_group_female = female_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         return {
//           productName,
//           productImages,
//           male,
//           female,
//           age_group: age_group ? age_group : '',
//           age_group_female: age_group_female ? age_group_female : ''
//         }
//       })

//       res.status(200).json({ success: true, data: response })
//     } else if (req.query?.type == 'range') {
//       const salesData = {}
//       for (let i = 0; i < orders?.docs.length; i++) {
//         const order = orders?.docs[i]?.data()
//         const startDate = moment(req.query?.startDate).format('DD-MM-YYYY')
//         const endDate = moment(req.query?.endDate).format('DD-MM-YYYY')
//         const orderDate = moment
//           .unix(order?.createdAt?.seconds)
//           .format('DD-MM-YYYY')
//         const customer = customers?.docs.find(c => c.id === order.customerID)
//         if (orderDate <= endDate && orderDate >= startDate) {
//           order.order.forEach(p => {
//             const product = menus?.docs?.find(pr => pr.id === p.menuItemID)
//             if (product) {
//               const ageGroup = getAgeGroup(customer?.data()?.age)
//               const gender = customer?.data()?.gender
//               const productName = product?.data()?.name
//               const productImages = product?.data()?.images

//               if (!salesData[productName]) {
//                 salesData[productName] = {
//                   male: 0,
//                   female: 0,
//                   male_age_group: [],
//                   female_age_group: [],
//                   productImages
//                 }
//               }

//               salesData[productName][gender.toLowerCase()]++

//               salesData[productName][`${gender.toLowerCase()}_age_group`].push(
//                 ageGroup
//               )
//             }
//           })
//         }
//       }
//       const response = Object.entries(salesData).map(([productName, sales]) => {
//         const {
//           male,
//           female,
//           male_age_group,
//           female_age_group,
//           productImages
//         } = sales
//         const age_group = male_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         const age_group_female = female_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         return {
//           productName,
//           productImages,
//           male,
//           female,
//           age_group: age_group ? age_group : '',
//           age_group_female: age_group_female ? age_group_female : ''
//         }
//       })

//       res.status(200).json({ success: true, data: response })
//     } else {
//       const salesData = {}
//       for (let i = 0; i < orders?.docs.length; i++) {
//         const order = orders?.docs[i]?.data()
//         const customer = customers?.docs.find(c => c.id === order.customerID)

//         // Loop through each product in the order and add its sales to the salesData object
//         order.order.forEach(p => {
//           const product = menus?.docs?.find(pr => pr.id === p.menuItemID)
//           if (product) {
//             const ageGroup = getAgeGroup(customer?.data()?.age)
//             const gender = customer?.data()?.gender
//             const productName = product?.data()?.name
//             const productImages = product?.data()?.images

//             if (!salesData[productName]) {
//               salesData[productName] = {
//                 male: 0,
//                 female: 0,
//                 male_age_group: [],
//                 female_age_group: [],
//                 productImages
//               }
//             }

//             salesData[productName][gender.toLowerCase()]++

//             salesData[productName][`${gender.toLowerCase()}_age_group`].push(
//               ageGroup
//             )
//           }
//         })
//       }

//       const response = Object.entries(salesData).map(([productName, sales]) => {
//         const {
//           male,
//           female,
//           male_age_group,
//           female_age_group,
//           productImages
//         } = sales
//         const age_group = male_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         const age_group_female = female_age_group?.filter(ageGroup => {
//           const [min, max] = ageGroup?.split(' to ').map(Number)
//           const age = getAgeFromAgeGroup(min, max)
//           return age
//         })[0]
//         return {
//           productName,
//           productImages,
//           male,
//           female,
//           age_group: age_group ? age_group : '',
//           age_group_female: age_group_female ? age_group_female : ''
//         }
//       })

//       res.status(200).json({ success: true, data: response })
//     }
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })
// exports.getGenderPercentage = asyncHandler(async (req, res) => {
//   try {
//     const restaurantID = req?.query?.restaurant_id
//     const users = []
//     let orders = await admin
//       .firestore()
//       .collection('orders')
//       .where('restaurantID', '==', restaurantID)
//       .get()
//     for (let doc of orders?.docs) {
//       await admin
//         .firestore()
//         .collection('users')
//         .doc(doc?.data()?.customerID)
//         .get()
//         .then(doc => {
//           users.push(doc?.data()?.gender)
//         })
//     }

//     const totalUsers = users?.length
//     const maleCount = users.filter(user => user === 'male')?.length
//     const femaleCount = users.filter(user => user === 'female')?.length

//     const malePercentage = (maleCount / totalUsers) * 100
//     const femalePercentage = (femaleCount / totalUsers) * 100
//     res.status(200).json({
//       success: true,
//       malePercentage: malePercentage,
//       femalePercentage: femalePercentage
//     })
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       message: error?.message
//     })
//   }
// })
// function getAgeGroup (age) {
//   if (!age) {
//     return '0 to 0'
//   }

//   // const age = Math.floor((new Date() - new Date(dateOfBirth).getTime()) / 31536000000);

//   if (age < 15) {
//     return '0 to 15'
//   } else if (age <= 20) {
//     return '15 to 20'
//   } else if (age <= 25) {
//     return '20 to 25'
//   } else if (age <= 30) {
//     return '25 to 30'
//   } else {
//     return 'Over 30'
//   }
// }
// function getAgeFromAgeGroup (minAge, maxAge) {
//   // calculate the average of the min and max age
//   const avgAge = (minAge + maxAge) / 2
//   // round down to the nearest integer
//   return Math.floor(avgAge)
// }
// exports.getPaymentMethodsPercentage = asyncHandler(async (req, res) => {
//   try {
//     const orders = await admin.firestore().collection('orders').get()
//     const paymentMethodCounts = {}
//     let totalOrders = 0

//     if (req.query?.type == 'day') {
//       const today = new Date()
//       orders.docs.filter(order => {
//         const orderDate = order?.data()?.createdAt.toDate()
//         if (orderDate <= today && orderDate >= today) {
//           const paymentMethod = order?.data()?.paymentMethod

//           if (paymentMethod) {
//             if (!paymentMethodCounts[paymentMethod]) {
//               paymentMethodCounts[paymentMethod] = 0
//             }
//             paymentMethodCounts[paymentMethod]++
//             totalOrders++
//           }
//         }
//       })
//     } else if (req.query?.type == 'week') {
//       const today = new Date()
//       const lastWeek = new Date(
//         today.getFullYear(),
//         today.getMonth(),
//         today.getDate() - 7
//       )
//       orders.docs.filter(order => {
//         const orderDate = order?.data()?.createdAt.toDate()
//         if (orderDate <= today && orderDate >= lastWeek) {
//           const paymentMethod = order?.data()?.paymentMethod
//           if (paymentMethod) {
//             if (!paymentMethodCounts[paymentMethod]) {
//               paymentMethodCounts[paymentMethod] = 0
//             }
//             paymentMethodCounts[paymentMethod]++
//             totalOrders++
//           }
//         }
//       })
//     } else if (req.query?.type == 'month') {
//       const today = new Date()
//       const lastMonth = new Date(
//         today.getFullYear(),
//         today.getMonth() - 1,
//         today.getDate()
//       )
//       orders.docs.filter(order => {
//         const orderDate = order?.data()?.createdAt.toDate()
//         if (orderDate <= today && orderDate >= lastMonth) {
//           const paymentMethod = order?.data()?.paymentMethod
//           if (paymentMethod) {
//             if (!paymentMethodCounts[paymentMethod]) {
//               paymentMethodCounts[paymentMethod] = 0
//             }
//             paymentMethodCounts[paymentMethod]++
//             totalOrders++
//           }
//         }
//       })
//     } else if (req.query?.type === 'range') {
//       const start = new Date(req.query?.startDate)
//       const end = new Date(req.query?.endDate)
//       orders.docs.filter(order => {
//         const orderDate = order?.data()?.createdAt.toDate()
//         if (orderDate <= end && orderDate >= start) {
//           const paymentMethod = order?.data()?.paymentMethod
//           if (paymentMethod) {
//             if (!paymentMethodCounts[paymentMethod]) {
//               paymentMethodCounts[paymentMethod] = 0
//             }
//             paymentMethodCounts[paymentMethod]++
//             totalOrders++
//           }
//         }
//       })
//     } else {
//       orders.docs.filter(order => {
//         const paymentMethod = order?.data()?.paymentMethod
//         if (paymentMethod) {
//           if (!paymentMethodCounts[paymentMethod]) {
//             paymentMethodCounts[paymentMethod] = 0
//           }
//           paymentMethodCounts[paymentMethod]++
//           totalOrders++
//         }
//       })
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         total: totalOrders,
//         paymentMethods: paymentMethodCounts
//       }
//     })
//   } catch (err) {
//     res.status(400).json({
//       success: false,
//       message: err?.message
//     })
//   }
// })
