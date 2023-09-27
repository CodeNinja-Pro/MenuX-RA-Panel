const initState = {
  isLoading: false,
  staffData: [],
  staffRestData: null,
};
const staffReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_STAFF":
      return {
        ...state,
        staffData: action.payload,
      };
    case "STAFF_DETAILS":
      return {
        ...state,
        staffRestData: action.payload,
      };
    case "STAFF_LOADER":
      return {
        ...state,
        isLoading: action.payload,
      };
    case "STAFF_DELETED":
      return {
        ...state,
        staffData: state.staffData?.filter(
          (staff) => staff.id !== action.payload
        ),
      };
    case "STAFF_UPDATED": {
      return {
        ...state,
        staffData: state.staffData.map((staff) => {
          if (staff.id === action.payload.id) {
            console.log(action.payload, "payload");
            return action.payload.obj;
          }
          return staff;
        }),
      };
    }
    case "STAFF_ADDED":
      return {
        ...state,
        staffData: [...state.staffData, action.payload],
      };
    default:
      return {
        ...state,
      };
  }
};
export default staffReducer;
