import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../reducers/settings";
import sessionReducer from "../reducers/sessions";

const myReducer = combineReducers({
  settings: settingsReducer,
  sessions: sessionReducer,
});

const store = configureStore({
  reducer: myReducer,
});

export default store;
