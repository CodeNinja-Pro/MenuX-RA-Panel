const initState = {
  loader: false,
  allNotifications: [],
  unreadNotifications: []
}
const notificationReducer = (state = initState, action) => {
  switch (action.type) {
    case 'LOADER':
      return {
        ...state,
        loader: action.payload
      }
    case 'GET_NOTIFICATIONS':
      return {
        ...state,
        allNotifications: action.payload
      }
    case 'GET_UNREAD_NOTIFICATIONS':
      return {
        ...state,
        unreadNotifications: action.payload
      }
    case 'UPDATE_NOTIFICATIONS': {
      return {
        ...state,
        allNotifications: state.allNotifications.map(item => {
          if (item.id === action.payload.id) {
            return { ...item, ...action.payload.updateData }
          }
          return item
        })
      }
    }
    case 'DELETE_NOTIFICATIONS': {
      return {
        ...state,
        allNotifications: state.allNotifications?.filter(
          item => item.id !== action.payload
        )
      }
    }
    default:
      return {
        ...state
      }
  }
}
export default notificationReducer
