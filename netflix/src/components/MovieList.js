import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, list }) => {
  if (!Array.isArray(list)) {
    console.error("❌ MovieList: 'list' is not an array", list);
    return null;
  }

  if (list.length === 0) {
    return (
      <div className="px-6 mb-3 mt-5">
        <h1 className="font-bold text-2xl p-3 text-white">{title}</h1>
        <p className="text-white px-3">No movies found.</p>
      </div>
    );
  }

  return (
    <div className="px-6 mb-3 mt-5">
      <h1 className="font-bold text-2xl p-3 text-white">{title}</h1>
      <div className="flex overflow-x-scroll scrollbar-hide">
        <div className="flex">
          {list.map((movie) => (
            <MovieCard
              key={movie.id}
              id={movie.id}
              posterPath={movie.poster_path}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
