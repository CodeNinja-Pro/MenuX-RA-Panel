const initState = {
  authError: '',
  uid: '',
  active: '',
  requested: false,
  registered: false,
  user: null,
  loading: false,
  userPermissions: {},
  forgetLoading: false,
  registerRequest: null
}
const authReducer = (state = initState, action) => {
  switch (action.type) {
    case 'REGISTER_REQUEST':
      return {
        ...state,
        registerRequest: action.payload
      }
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        uid: action.user?.id,
        active: action.user?.active,
        user: { ...action.user },
        authError: ''
      }
    case 'PERMISSIONS':
      return {
        ...state,
        userPermissions: action.payload
      }
    case 'LOGIN_FAIL':
      localStorage.clear()
      return {
        ...state,
        uid: '',
        authError: action.error.message
      }
    case 'LOGOUT_SUCCESS':
      return {
        ...state,
        authError: '',
        uid: '',
        registered: false,
        user: null
      }
    case 'LOGIN_REQUEST':
      return {
        ...state,
        loading: true
      }
    case 'LOGIN_REQUEST_END':
      return {
        ...state,
        loading: false
      }
    case 'FORGET_LOADER':
      return {
        ...state,
        forgetLoading: action.payload
      }
    case 'UPDATED_USER':
      return {
        ...state,
        user: action.payload
      }
    default:
      return {
        ...state
      }
  }
}
export default authReducer
