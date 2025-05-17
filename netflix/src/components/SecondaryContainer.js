import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const moviesnowPlaying = useSelector((store) => store.movie?.nowPlayingMovies);
  const moviesPopular = useSelector((store) => store.movie?.popularMovies);
  const moviesTopRated = useSelector((store) => store.movie?.topRatedMovies);
  const moviesUpcoming = useSelector((store) => store.movie?.upcomingMovies);

  return (
    <div className='bg-black'>
      <div className='-mt-44 relative z-20'>
      <MovieList title={"Now Playing"} list={moviesnowPlaying}/>
      <MovieList title={"Popular"} list={moviesPopular}/>
      <MovieList title={"Top Rated"} list={moviesTopRated}/>
      <MovieList title={"Upcoming"} list={moviesUpcoming}/>
      </div>
    </div>
  )
}

export default SecondaryContainer;
