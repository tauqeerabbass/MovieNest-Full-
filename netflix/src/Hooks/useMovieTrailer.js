import { useDispatch, useSelector } from "react-redux";
import { API_OPTIONS } from "../utils/constans";
import { setMovieTrailers } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();
    const movieTrailer = useSelector(store=>store.movie.movieTrailers);

  const fetchMovieTrailer = async () => {
    const movieData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await movieData.json();

    const filteredTrailer = json.results.filter((video) => video.type === "Trailer");
    const trailer = filteredTrailer.length ? filteredTrailer[0] : json.results[0];
    dispatch(setMovieTrailers(trailer));
  };

  useEffect(() => {
    !movieTrailer && fetchMovieTrailer();
  });
}

export default useMovieTrailer;