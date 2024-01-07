import { SET_SETTINGS } from "../actions";

const initialState = {
  content: {
    Pomodoro: 45,
    ShortBreak: 5,
    LongBreak: 15,
  },
};

const settingsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        content: action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
