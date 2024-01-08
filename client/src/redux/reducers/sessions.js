import { GET_SESSIONS } from "../actions";

const initialState = {
  content: [],
};

const sessionReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SESSIONS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default sessionReducer;
