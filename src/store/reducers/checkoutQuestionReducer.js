const initState = {
  loading: false,
  question: [],
  responses: [],
};
const checkoutQuestionReducer = (state = initState, action) => {
  switch (action.type) {
    case "GET_QUESTION":
      return {
        ...state,
        question: action.payload,
      };
    case "GET_RESPONSES":
      return {
        ...state,
        responses: action.payload,
      };
    case "QUESTION_LOADER":
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return {
        ...state,
      };
  }
};
export default checkoutQuestionReducer;
