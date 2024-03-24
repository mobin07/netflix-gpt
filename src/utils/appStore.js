/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; //we can import using any name as it was
// default export

import moviesReducer from "./moviesSlice";
const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
  },
});

export default appStore;
