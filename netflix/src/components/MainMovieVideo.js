import React from "react";
import useMovieTrailer from "../Hooks/useMovieTrailer";
import { useSelector } from "react-redux";

const MainMovieVideo = ({ movieId }) => {
  const movieTrailer = useSelector((store) => store.movie?.movieTrailers);

  useMovieTrailer(movieId);

  return (
    <div className="w-screen h-auto aspect-video">
      <iframe
        className="w-screen h-full mt-[-140px]"
        width="560"
        height="315"
        src={`https://www.youtube.com/embed/${movieTrailer?.key}?autoplay=1&mute=1&loop=1&playlist=${movieTrailer?.key}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default MainMovieVideo;
