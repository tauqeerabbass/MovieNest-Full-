import React from "react";
import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import SearchBar from "./SearchBar";
import { BGIMG_URL } from "../utils/constans";

const MovieSuggestion = () => {
  const { movieResults } = useSelector((store) => store.gpt);

  // Ensure movieResults is a valid array
  if (!Array.isArray(movieResults)) {
    console.error("❌ movieResults is not an array", movieResults);
    return null;
  }

  return (
    <>
    <div className="fixed -z-10 m-[-80px]">
        <img className="" src={BGIMG_URL} alt="logo" />
      </div>
    <SearchBar />
    <div className="bg-black mt-10">
      {movieResults.length > 0 && (
        <MovieList title="Search Results" list={movieResults} />
      )}
    </div>
    </>
  );
};

export default MovieSuggestion;
