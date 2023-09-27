const initState = {
  isLoading: false,
  adminsData: [],
  adminsRestData: null,
};
const subAdminReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_ALL_ADMINS":
      return {
        ...state,
        adminsData: action.payload,
      };
    case "DELETE_ADMIN": {
      return {
        ...state,
        adminsData: state.adminsData?.filter(
          (item) => item.id !== action.payload
        ),
      };
    }

    case "UPDATE_ADMIN": {
      const { id, obj } = action.payload;
      const updatedAdminsData = state.adminsData.map((data) => {
        if (data.id === id) {
          return {
            ...data,
            name: obj.name,
          };
        }
        return data;
      });

      return {
        ...state,
        adminsData: updatedAdminsData,
      };
    }

    case "ADMINS_DETAILS":
      return {
        ...state,
        adminsRestData: action.payload,
      };
    case "ADMIN_LOADER":
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};
export default subAdminReducer;
