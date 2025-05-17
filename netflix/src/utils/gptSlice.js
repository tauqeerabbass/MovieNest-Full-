import { createSlice } from "@reduxjs/toolkit";

const gptSlice = createSlice({
    name : "gpt",
    initialState: {
        searchView: false,
        movieResults: [],
        movieNames: []
    },
    reducers:{
        setSearchView: (state) => {
            state.searchView =!state.searchView;
        },
        setMovieResults: (state, action) => {
            const {movieNames, movieResults} = action.payload;
            state.movieNames = movieNames;
            state.movieResults = movieResults;
        },
}})

export const { setSearchView, setMovieResults } = gptSlice.actions;

export default gptSlice.reducer;