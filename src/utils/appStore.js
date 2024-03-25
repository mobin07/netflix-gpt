/** @format */

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice"; //we can import using any name as it was
// default export

import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice";
import configReduce from "./configSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptReducer,
    config: configReduce,
  },
});

export default appStore;
