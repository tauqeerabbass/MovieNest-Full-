import React from "react";
import { POSTER_URL } from "../utils/constans";
import { Link } from "react-router-dom";

const MovieCard = ({ posterPath, id }) => {
  return (
    <div className="w-36 pr-4">
      <Link to={`/movie/${id}`}>
        <img src={POSTER_URL + posterPath} alt="movie poster" />
      </Link>
    </div>
  );
};

export default MovieCard;
