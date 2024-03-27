/** @format */

import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
  name: "gpt",
  initialState: {
    showGPTSearch: false,
    gptMovies: null,
    movieNames: null,
  },
  reducers: {
    toogleGPTSearchView: (state, action) => {
      state.showGPTSearch = !state.showGPTSearch;
    },
    addGPTMovieResult: (state, action) => {
      const { movieNames, movieResult } = action.payload;
      state.gptMovies = movieResult;
      state.movieNames = movieNames;
    },
  },
});

export const { toogleGPTSearchView, addGPTMovieResult } = gptSlice.actions;

export default gptSlice.reducer;
