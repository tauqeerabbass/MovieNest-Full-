import { useDispatch, useSelector } from "react-redux";
import { setUpcomingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constans';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const upcomingMovies = useSelector(store=>store.movie.upcomingMovies);

  const getUpcomingMovies = async () => {
    const movies = await fetch("https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1", API_OPTIONS);
    const json = await movies.json();
    
    dispatch(setUpcomingMovies(json.results));
  }
  
  useEffect(() => {
    !upcomingMovies && getUpcomingMovies();
  });
}

export default useUpcomingMovies;