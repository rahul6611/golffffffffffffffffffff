// ** Redux Imports
import navbar from "./navbar";
import layout from "./layout";

import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";

import authReducer from "./auth/slice";
import introducerReducer from "./introducers/slice";
import endUserReducer from "./endusers/slice"
import clubReducer from "./clubs/slice"

const rootReducer = {
  navbar,
  layout,
  auth: authReducer,
  introducer: introducerReducer,
  enduser: endUserReducer,
  club: clubReducer
};

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false
});

export default configureStore({
  reducer: rootReducer,
  middleware: customizedMiddleware
});
