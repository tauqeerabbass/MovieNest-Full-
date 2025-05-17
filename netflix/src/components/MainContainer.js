import React from 'react';
import MainMovieVideo from './MainMovieVideo';
import MainMovieTitle from './MainMovieTitle';
import { useSelector } from 'react-redux';

const MainContainer = () => {
    const moviesNowPlaying = useSelector((store) => store.movie?.nowPlayingMovies);
    if (!moviesNowPlaying) return;
    const mainMovie = moviesNowPlaying[0];

    const {original_title, overview, id} = mainMovie;

  return (
    <div>
        <MainMovieTitle title={original_title} overview={overview}  id={id}/>
        <MainMovieVideo movieId={id}/>
    </div>
  )
}

export default MainContainer;
