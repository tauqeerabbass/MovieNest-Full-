import { useDispatch, useSelector } from "react-redux";
import { setNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constans';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();
    const nowPlayingMovies = useSelector(store=>store.movie.nowPlayingMovies);

  const getNowPlayingMovies = async () => {
    const movies = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", API_OPTIONS);
    const json = await movies.json();
    
    dispatch(setNowPlayingMovies(json.results));
  }
  
  useEffect(() => {
    !nowPlayingMovies && getNowPlayingMovies();
  });
}

export default useNowPlayingMovies;