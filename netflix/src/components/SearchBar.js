import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langConstants";
import { API_OPTIONS } from "../utils/constans";
import { setMovieResults } from "../utils/gptSlice";
// import openai from "../utils/openAi"; // Uncomment if using OpenAI

const SearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const languageData = useSelector((store) => store.language.language);
  const [error, setError] = useState("");

  const searchMovieTmdb = async (movie) => {
    try {
      const data = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1`,
        API_OPTIONS
      );
      const json = await data.json();
      return json.results;
    } catch (err) {
      console.error("TMDB fetch error:", err.message);
      return [];
    }
  };

  const handleMovieSearch = async () => {
    const query = searchText.current.value.trim();
    if (!query) {
      setError("Please enter a movie name");
      return;
    }

    try {
      // === OpenAI GPT Search (Commented) ===
      /*
      const gptQuery = `Act as a movie recommendation system and give me some movies based on this query: ${query}. Only provide the top five movies as a comma-separated string.`;

      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const moviesList = gptResults.choices[0]?.message?.content || "";
      const gptMovies = moviesList.split(",").map((m) => m.trim());
      const tmdbResults = await Promise.all(gptMovies.map(searchMovieTmdb));
      dispatch(setMovieResults({ movieNames: gptMovies, movieResults: tmdbResults }));
      */

      // === TMDB Search Based on User Input ===
      const tmdbResults = await searchMovieTmdb(query);
      dispatch(setMovieResults({ movieNames: [query], movieResults: tmdbResults }));

      setError("");
    } catch (err) {
      console.error("Search failed:", err.message);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="mt-[10%] flex justify-center">
      <form
        className="bg-black p-3 w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[languageData].searchPlaceholder}
          className="p-3 my-1 mx-2 col-span-9 rounded-md"
        />
        <button
          onClick={handleMovieSearch}
          className="bg-red-600 text-white text-xl col-span-3 p-3 my-1 mx-2 rounded-lg"
        >
          {lang[languageData].search}
        </button>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
