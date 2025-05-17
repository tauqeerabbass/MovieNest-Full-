import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const MovieSuggestion = () => {
  const { movieNames, movieResults } = useSelector((store) => store.gpt);
  if (!movieNames || !movieResults) return;

  return (
    <div>
      {movieNames.map((movieName, index) => (
        <MovieList key={movieName} title={movieName} list={movieName[index]} />
      ))}
    </div>
  );
};

export default MovieSuggestion;
