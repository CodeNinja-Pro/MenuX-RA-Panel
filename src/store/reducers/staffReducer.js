const initState = {
  isLoading: false,
  staffData: [],
  staffs: [],
  staffRestData: null
}
const staffReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_STAFFS':
      return {
        ...state,
        staffs: action.payload
      }
    case 'NEW_STAFF_ADDED':
      return {
        ...state,
        staffs: [...state.staffs, action.payload]
      }
    case 'CURRENT_STAFF_DELETED':
      return {
        ...state,
        staffs: state.staffs?.filter(staff => staff.id !== action.payload)
      }
    case 'CURRENT_STAFF_UPDATED': {
      return {
        ...state,
        staffs: state.staffs.map(staff => {
          if (staff.id === action.payload.id) {
            return { ...staff, status: action.payload.status }
          }
          return staff
        })
      }
    }
    case 'STAFF_UPDATED': {
      return {
        ...state,
        staffs: state.staffs.map(staff => {
          if (staff.id === action.payload.id) {
            return { ...staff, ...action.payload.updateData }
          }
          return staff
        })
      }
    }
    case 'GET_ALL_STAFF':
      return {
        ...state,
        staffData: action.payload
      }
    case 'STAFF_DETAILS':
      return {
        ...state,
        staffRestData: action.payload
      }
    case 'STAFF_LOADER':
      return {
        ...state,
        isLoading: action.payload
      }
    case 'STAFF_DELETED':
      return {
        ...state,
        staffData: state.staffData?.filter(staff => staff.id !== action.payload)
      }

    case 'STAFF_ADDED':
      return {
        ...state,
        staffData: [...state.staffData, action.payload]
      }

    default:
      return {
        ...state
      }
  }
}
export default staffReducer
