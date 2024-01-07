import { combineReducers, configureStore } from "@reduxjs/toolkit";
import settingsReducer from "../reducers/settings";

const myReducer = combineReducers({
  settings: settingsReducer,
});

const store = configureStore({
  reducer: myReducer,
});

export default store;
