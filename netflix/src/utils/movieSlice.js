import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name : "movie",
    initialState: {
        nowPlayingMovies: null,
        movieTrailers: null,
        popularMovies: null,
        topRatedMovies: null,
        upcomingMovies: null,
    },
    reducers:{
        setNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        setMovieTrailers: (state, action) => {
            state.movieTrailers = action.payload;
        },
        setPopularMovies: (state, action) => {
            state.popularMovies = action.payload;
        },
        setTopRatedMovies: (state, action) => {
            state.topRatedMovies = action.payload;
        },
        setUpcomingMovies: (state, action) => {
            state.upcomingMovies = action.payload;
        }
}})

export const { setNowPlayingMovies, setMovieTrailers, setPopularMovies, setTopRatedMovies, setUpcomingMovies} = movieSlice.actions;

export default movieSlice.reducer;